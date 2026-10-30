#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = ["google-auth", "requests"]
# ///
"""
Extracción de datos para el informe de evolución y línea base (relevo del
equipo de marketing, oct 2026).

Lee, SIN MODIFICAR NADA, las tres fuentes instrumentadas y escribe:
    datos/datos.json   ← todo, legible y versionable
    datos/datos.js     ← lo mismo como `window.DATOS = …` para el HTML

    ./extraer.py                     # corte = hoy
    ./extraer.py --corte 2026-11-04  # para cerrar octubre completo

Cada fuente tiene su retraso propio, y se registra en `ventanas`:
  · Meta ........ hasta el día anterior al corte
  · Vercel ...... los 30 días anteriores al corte (el plan Hobby no guarda más)
  · Search Console ~3-4 días de retraso; se detecta el último día con datos
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

AQUI = Path(__file__).resolve().parent
AD_ACCOUNT_ID = "act_1661223548424128"
GSC_PROPERTY = "sc-domain:jennyveraspa.com"
GSC_KEY_PATH = Path.home() / ".config/claude-seo/service_account.json"
VERCEL = "projectId=prj_BdpkHBYax30cnheL3fxsEs8qhfyc&teamId=team_7OZdvuZD5tNTtWTel7Eyqdhy"
CONVERSACION = "onsite_conversion.messaging_conversation_started_7d"
PUENTES = ("/es/whatsapp", "/en/whatsapp")


def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


def sh(cmd: list[str], timeout: int = 120) -> str:
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
    if r.returncode != 0:
        raise RuntimeError(f"{' '.join(cmd[:4])}… → {r.returncode}: {r.stderr[-400:]}")
    return r.stdout


# ============================================================================
# Search Console
# ============================================================================
class GSC:
    def __init__(self) -> None:
        import requests
        from google.auth.transport.requests import Request
        from google.oauth2 import service_account

        creds = service_account.Credentials.from_service_account_file(
            str(GSC_KEY_PATH), scopes=["https://www.googleapis.com/auth/webmasters.readonly"])
        creds.refresh(Request())
        self.s = requests.Session()
        self.s.headers["Authorization"] = f"Bearer {creds.token}"
        self.url = ("https://www.googleapis.com/webmasters/v3/sites/"
                    f"{requests.utils.quote(GSC_PROPERTY, safe='')}/searchAnalytics/query")

    def q(self, desde: str, hasta: str, dims: list[str] | None = None, limit: int = 25000, **extra) -> list[dict]:
        filas, start = [], 0
        while True:
            body = {"startDate": desde, "endDate": hasta, "type": "web", "rowLimit": limit,
                    "startRow": start, "dataState": "final", **extra}
            if dims:
                body["dimensions"] = dims
            r = self.s.post(self.url, json=body, timeout=90)
            r.raise_for_status()
            rows = r.json().get("rows", [])
            filas += rows
            if not dims or len(rows) < limit:
                return filas
            start += limit


def tramo(pos: float) -> str:
    return "1-3" if pos <= 3.5 else "4-10" if pos <= 10.5 else "11-20" if pos <= 20.5 else "21-50" if pos <= 50.5 else "51+"


def extraer_gsc(corte: dt.date) -> dict:
    log("· Search Console")
    g = GSC()
    # Último día consolidado
    dias = g.q((corte - dt.timedelta(days=12)).isoformat(), corte.isoformat(), ["date"])
    ultimo = max(r["keys"][0] for r in dias)
    fin = dt.date.fromisoformat(ultimo)
    ini30 = fin - dt.timedelta(days=29)
    ini_prev = ini30 - dt.timedelta(days=30)
    fin_prev = ini30 - dt.timedelta(days=1)

    # Serie diaria de 16 meses → mensual
    diario = g.q("2025-07-01", ultimo, ["date"])
    mensual = defaultdict(lambda: {"clics": 0, "impresiones": 0, "dias": 0})
    for r in diario:
        m = r["keys"][0][:7]
        mensual[m]["clics"] += r["clicks"]
        mensual[m]["impresiones"] += r["impressions"]
        mensual[m]["dias"] += 1
    meses = []
    for m in sorted(mensual):
        v = mensual[m]
        a, mm = map(int, m.split("-"))
        dias_mes = ((dt.date(a + mm // 12, mm % 12 + 1, 1)) - dt.date(a, mm, 1)).days
        meses.append({"mes": m, **v, "dias_mes": dias_mes, "parcial": v["dias"] < dias_mes,
                      "clics_dia": round(v["clics"] / v["dias"], 2),
                      "ctr": round(100 * v["clics"] / v["impresiones"], 2) if v["impresiones"] else 0})

    def totales(d, h):
        r = g.q(d, h)
        r = r[0] if r else {"clicks": 0, "impressions": 0, "ctr": 0}
        return {"clics": int(r["clicks"]), "impresiones": int(r["impressions"]), "ctr": round(100 * r["ctr"], 2)}

    def top(dim, d, h, n):
        return [{"clave": r["keys"][0], "clics": int(r["clicks"]), "impresiones": int(r["impressions"]),
                 "posicion": round(r["position"], 1)}
                for r in sorted(g.q(d, h, [dim]), key=lambda r: (-r["clicks"], -r["impressions"]))[:n]]

    # Impresiones por tramo de posición (nivel consulta: solo el ~20 % visible)
    def tramos(d, h):
        acc = defaultdict(lambda: {"impresiones": 0, "clics": 0})
        for r in g.q(d, h, ["query"]):
            t = tramo(r["position"])
            acc[t]["impresiones"] += r["impressions"]
            acc[t]["clics"] += r["clicks"]
        return {t: acc[t] for t in ["1-3", "4-10", "11-20", "21-50", "51+"]}

    tramos_mes = {}
    for m in meses[-5:]:
        a, mm = map(int, m["mes"].split("-"))
        d0 = dt.date(a, mm, 1)
        d1 = min(dt.date(a + mm // 12, mm % 12 + 1, 1) - dt.timedelta(days=1), fin)
        tramos_mes[m["mes"]] = tramos(d0.isoformat(), d1.isoformat())

    a30, p30 = ini30.isoformat(), ultimo
    return {
        "ultimo_dia": ultimo,
        "ventana": {"desde": a30, "hasta": p30},
        "ventana_prev": {"desde": ini_prev.isoformat(), "hasta": fin_prev.isoformat()},
        "mensual": meses,
        "actual": totales(a30, p30),
        "anterior": totales(ini_prev.isoformat(), fin_prev.isoformat()),
        "paginas": top("page", a30, p30, 15),
        "paginas_prev": top("page", ini_prev.isoformat(), fin_prev.isoformat(), 40),
        "consultas": top("query", a30, p30, 20),
        "paises": top("country", a30, p30, 8),
        "dispositivos": top("device", a30, p30, 3),
        "tramos_mes": tramos_mes,
    }


# ============================================================================
# Meta Ads — SOLO LECTURA (insights get / list). Nunca create/update/delete.
# ============================================================================
def meta(args: list[str]) -> list[dict]:
    raw = sh(["meta", "--output", "json", "ads", "--ad-account-id", AD_ACCOUNT_ID, *args], timeout=180)
    d = json.loads(raw)
    return d.get("data", d) if isinstance(d, dict) else d


def fila_meta(r: dict) -> dict:
    conv = next((int(a["value"]) for a in r.get("actions", []) if a["action_type"] == CONVERSACION), 0)
    gasto = float(r.get("spend", 0) or 0)
    return {"gasto": round(gasto, 2), "impresiones": int(r.get("impressions", 0) or 0),
            "alcance": int(r.get("reach", 0) or 0), "clics": int(r.get("clicks", 0) or 0),
            "conversaciones": conv, "coste_conv": round(gasto / conv, 3) if conv else None}


def extraer_meta(corte: dt.date) -> dict:
    log("· Meta Ads")
    hasta = (corte - dt.timedelta(days=1)).isoformat()
    desde30 = (corte - dt.timedelta(days=30)).isoformat()
    campos = "spend,impressions,reach,clicks,ctr,frequency,actions"
    mensual = [{"mes": r["date_start"][:7], "desde": r["date_start"], "hasta": r["date_stop"], **fila_meta(r)}
               for r in meta(["insights", "get", "--since", "2024-01-01", "--until", hasta,
                              "--time-increment", "monthly", "--fields", campos, "--limit", "100"])]
    diario = [{"dia": r["date_start"], **fila_meta(r)}
              for r in meta(["insights", "get", "--since", mensual[0]["desde"], "--until", hasta,
                             "--time-increment", "daily", "--fields", campos, "--limit", "500"])]
    total30 = meta(["insights", "get", "--since", desde30, "--until", hasta, "--fields", campos])
    t30 = {**fila_meta(total30[0]), "ctr": float(total30[0].get("ctr", 0)),
           "frecuencia": float(total30[0].get("frequency", 0))} if total30 else {}
    desglose = {}
    # platform_position solo es válido junto a publisher_platform
    for nombre, bs in [("plataforma", ["publisher_platform"]),
                       ("posicion", ["publisher_platform", "platform_position"]),
                       ("edad", ["age"]), ("sexo", ["gender"])]:
        flags = [x for b in bs for x in ("--breakdown", b)]
        desglose[nombre] = [{"clave": " · ".join(str(r.get(b)) for b in bs), **fila_meta(r)}
                            for r in meta(["insights", "get", "--since", desde30, "--until", hasta,
                                           *flags, "--fields", campos, "--limit", "100"])]
    # Anuncios: estado y antigüedad de la creatividad (lo que más pesa en el coste)
    anuncios = []
    try:
        for a in meta(["ad", "list", "--limit", "200", "--fields", "id,name,status,effective_status,created_time"]):
            anuncios.append({k: a.get(k) for k in ("id", "name", "status", "effective_status", "created_time")})
    except Exception as e:  # noqa: BLE001
        log(f"  ! lista de anuncios: {e}")
    por_anuncio = []
    for a in anuncios:
        if a.get("effective_status") != "ACTIVE":
            continue
        r = meta(["insights", "get", "--ad-id", a["id"], "--since", desde30, "--until", hasta, "--fields", campos])
        if r:
            por_anuncio.append({"nombre": a["name"], "creado": (a.get("created_time") or "")[:10], **fila_meta(r[0])})
    # Rendimiento de cada anuncio en toda la vida de la cuenta (lo aprendido)
    historico = []
    for a in anuncios:
        r = meta(["insights", "get", "--ad-id", a["id"], "--since", mensual[0]["desde"], "--until", hasta,
                  "--fields", campos])
        if r:
            historico.append({"nombre": a["name"], "creado": (a.get("created_time") or "")[:10],
                              "estado": a.get("effective_status"), **fila_meta(r[0]),
                              "ctr": round(float(r[0].get("ctr", 0)), 2)})
    return {"ventana": {"desde": desde30, "hasta": hasta}, "mensual": mensual, "diario": diario,
            "anuncios_historico": historico,
            "ultimos30": t30, "desglose": desglose, "anuncios": anuncios, "anuncios_activos": por_anuncio}


# ============================================================================
# Vercel Web Analytics (CLI global `vercel`, NO npx)
# ============================================================================
def vercel(endpoint: str, extra: str) -> dict:
    raw = sh(["vercel", "api", f"/v1/query/web-analytics/{endpoint}?{VERCEL}{extra}"], timeout=90)
    return json.loads(raw[raw.find("{"):])


def extraer_vercel(corte: dt.date) -> dict:
    log("· Vercel")
    desde = (corte - dt.timedelta(days=30)).isoformat()
    hasta = (corte - dt.timedelta(days=1)).isoformat()
    rc = f"&since={desde}&until={hasta}"                      # count: fecha a secas
    ra = f"&since={desde}&until={hasta}T23:59:59Z"            # aggregate: con hora

    def agg(by: str, filtro: str = "", limit: int = 100) -> list[dict]:
        f = f"&filter={filtro}" if filtro else ""
        return vercel("visits/aggregate", f"{ra}&by={by}&limit={limit}{f}")["data"]

    bruto = vercel("visits/count", rc)["data"]
    paises = agg("country")
    # Regla de bots (oct 2026): visitantes ≈ páginas vistas (≤ 5 % de diferencia),
    # ≥ 4 visitantes, ≥ 90 % tráfico directo y país distinto de Ecuador.
    # El 1:1 EXACTO dejó de servir: China marcó 324/326 en esta ventana.
    bots, dudosos = [], []
    for p in paises:
        c, v, pv = p["country"], p["visitors"], p["pageviews"]
        if c in ("EC", "Others") or v < 4 or pv > v * 1.05:
            continue
        refs = agg("referrerHostname", f"country eq '{c}'", 20)
        directo = sum(r["visitors"] for r in refs if not r["referrerHostname"])
        fila = {"pais": c, "visitantes": v, "vistas": pv, "directo_pct": round(100 * directo / v)}
        (bots if directo >= 0.9 * v else dudosos).append(fila)
    bot_v = sum(b["visitantes"] for b in bots)
    bot_pv = sum(b["vistas"] for b in bots)
    bot_paises = {b["pais"] for b in bots}

    wa = {}
    for ruta in PUENTES:
        wa[ruta] = vercel("visits/count", f"{rc}&filter=requestPath eq '{ruta}'")["data"]
    wa_dia = defaultdict(int)
    for ruta in PUENTES:
        for r in agg("day", f"requestPath eq '{ruta}'"):
            wa_dia[r["timestamp"][:10]] += r["pageviews"]

    dias = agg("day")
    # Bots por día: suma diaria de los países marcados
    bot_dia = defaultdict(int)
    for c in bot_paises:
        for r in agg("day", f"country eq '{c}'"):
            bot_dia[r["timestamp"][:10]] += r["visitors"]
    serie = [{"dia": r["timestamp"][:10], "visitantes": r["visitors"], "vistas": r["pageviews"],
              "bots": bot_dia.get(r["timestamp"][:10], 0), "whatsapp": wa_dia.get(r["timestamp"][:10], 0)} for r in dias]

    filtro_limpio = " and ".join(f"country ne '{c}'" for c in sorted(bot_paises))
    return {
        "ventana": {"desde": desde, "hasta": hasta},
        "bruto": bruto,
        "bots": bots, "dudosos": dudosos,
        "limpio": {"visitors": bruto["visitors"] - bot_v, "pageviews": bruto["pageviews"] - bot_pv},
        "whatsapp": wa,
        "serie": serie,
        "paises": paises,
        "referrers": agg("referrerHostname", filtro_limpio, 25),
        "dispositivos": agg("deviceType", filtro_limpio, 5),
        "rutas": agg("requestPath", filtro_limpio, 100),
        "rutas_bruto": agg("requestPath", "", 40),
    }


# ============================================================================
# Facebook (Graph API) — seguidores de la página
# ============================================================================
def extraer_facebook() -> dict:
    log("· Facebook (Graph API)")
    import requests
    token = (Path.home() / ".config/meta/credentials").read_text().strip()
    r = requests.get("https://graph.facebook.com/v21.0/1504934889727982",
                     params={"fields": "name,followers_count,fan_count,category", "access_token": token}, timeout=30)
    return r.json() if r.ok else {"error": r.text[:300]}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corte", default=dt.date.today().isoformat())
    corte = dt.date.fromisoformat(ap.parse_args().corte)
    datos = {"corte": corte.isoformat(), "generado": dt.datetime.now().isoformat(timespec="minutes")}
    for nombre, fn in [("gsc", extraer_gsc), ("meta", extraer_meta), ("vercel", extraer_vercel)]:
        try:
            datos[nombre] = fn(corte)
        except Exception as e:  # noqa: BLE001 — una fuente caída no tumba las demás
            log(f"  ! {nombre}: {e}")
            datos[nombre] = {"error": str(e)}
    try:
        datos["facebook"] = extraer_facebook()
    except Exception as e:  # noqa: BLE001
        datos["facebook"] = {"error": str(e)}

    # Datos manuales: fuentes sin API (verificadas a mano, con fecha y método)
    manual = AQUI / "datos" / "manual.json"
    if manual.exists():
        datos["manual"] = json.loads(manual.read_text())

    out = AQUI / "datos"
    out.mkdir(exist_ok=True)
    texto = json.dumps(datos, ensure_ascii=False, indent=1)
    (out / "datos.json").write_text(texto)
    (out / "datos.js").write_text(f"window.DATOS = {texto};\n")
    log(f"✓ {out}/datos.json")


if __name__ == "__main__":
    main()

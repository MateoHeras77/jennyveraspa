#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = ["google-auth", "requests"]
# ///
"""
Informe unificado de canales — Jenny Vera Spa.

Junta en una sola lectura los tres sitios donde viven los datos del negocio:

  · Meta Ads ......... CLI oficial `meta`, SOLO LECTURA (ver CLAUDE.md)
  · Search Console ... API REST con la cuenta de servicio de ~/.config/claude-seo
  · Vercel ........... API de Web Analytics vía `npx vercel api`

Responde a la pregunta que ningún panel contesta por separado: cuántos contactos
genera cada canal y a qué coste.

Uso:
    ./scripts/informe-canales.py                    # últimos 30 días
    ./scripts/informe-canales.py --dias 90
    ./scripts/informe-canales.py --desde 2026-06-26 --hasta 2026-07-25

Requiere `uv` (gestiona las dependencias solo, no hace falta venv).
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import subprocess
import sys
from pathlib import Path

# --- Constantes del proyecto -------------------------------------------------

AD_ACCOUNT_ID = "act_1661223548424128"
GSC_PROPERTY = "sc-domain:jennyveraspa.com"
GSC_KEY_PATH = Path.home() / ".config/claude-seo/service_account.json"
VERCEL_PROJECT_ID = "prj_BdpkHBYax30cnheL3fxsEs8qhfyc"
VERCEL_TEAM_ID = "team_7OZdvuZD5tNTtWTel7Eyqdhy"

# Rutas puente de WhatsApp: cada visita es un clic a WhatsApp desde el sitio.
BRIDGE_PATHS = ("/es/whatsapp", "/en/whatsapp")

# Meta llama así al evento de conversación iniciada en la ventana de 7 días.
CONVERSATION_ACTION = "onsite_conversion.messaging_conversation_started_7d"


def run(cmd: list[str], *, timeout: int = 180) -> str:
    """Ejecuta un comando y devuelve stdout, o cadena vacía si falla."""
    try:
        out = subprocess.run(
            cmd, capture_output=True, text=True, timeout=timeout, check=False
        )
    except (subprocess.TimeoutExpired, FileNotFoundError) as exc:
        print(f"  ! {' '.join(cmd[:3])}…: {exc}", file=sys.stderr)
        return ""
    if out.returncode != 0:
        print(f"  ! {' '.join(cmd[:3])}… salió {out.returncode}", file=sys.stderr)
        return ""
    return out.stdout


# --- Meta Ads ----------------------------------------------------------------


def meta_insights(desde: str, hasta: str) -> dict | None:
    """
    Rendimiento de la cuenta publicitaria.

    SOLO LECTURA: este script no debe invocar nunca create/update/delete.
    """
    # `--ad-account-id` pertenece al grupo `ads`, no al subcomando `insights get`:
    # va antes de `insights`, o el CLI responde "No such option".
    raw = run(
        [
            "meta", "--output", "json", "ads",
            "--ad-account-id", AD_ACCOUNT_ID,
            "insights", "get",
            "--since", desde, "--until", hasta,
            "--fields", "spend,impressions,reach,clicks,ctr,cpc,frequency,actions",
        ]
    )
    if not raw.strip():
        return None
    try:
        data = json.loads(raw).get("data", [])
    except json.JSONDecodeError:
        return None
    if not data:
        return None

    row = data[0]
    conversaciones = next(
        (int(a["value"]) for a in row.get("actions", [])
         if a["action_type"] == CONVERSATION_ACTION),
        0,
    )
    gasto = float(row.get("spend", 0) or 0)
    return {
        "gasto": gasto,
        "impresiones": int(row.get("impressions", 0) or 0),
        "alcance": int(row.get("reach", 0) or 0),
        "clics": int(row.get("clicks", 0) or 0),
        "ctr": float(row.get("ctr", 0) or 0),
        "frecuencia": float(row.get("frequency", 0) or 0),
        "conversaciones": conversaciones,
        "coste_conversacion": (gasto / conversaciones) if conversaciones else None,
    }


# --- Google Search Console ---------------------------------------------------


def gsc_totales(desde: str, hasta: str) -> dict | None:
    """Clics, impresiones, CTR y posición media de la búsqueda orgánica."""
    if not GSC_KEY_PATH.exists():
        print(f"  ! falta {GSC_KEY_PATH}", file=sys.stderr)
        return None

    import requests
    from google.auth.transport.requests import Request
    from google.oauth2 import service_account

    creds = service_account.Credentials.from_service_account_file(
        str(GSC_KEY_PATH),
        scopes=["https://www.googleapis.com/auth/webmasters.readonly"],
    )
    creds.refresh(Request())

    resp = requests.post(
        f"https://www.googleapis.com/webmasters/v3/sites/"
        f"{requests.utils.quote(GSC_PROPERTY, safe='')}/searchAnalytics/query",
        headers={"Authorization": f"Bearer {creds.token}"},
        json={"startDate": desde, "endDate": hasta, "type": "web"},
        timeout=60,
    )
    if resp.status_code != 200:
        print(f"  ! GSC devolvió {resp.status_code}", file=sys.stderr)
        return None

    rows = resp.json().get("rows", [])
    if not rows:
        return None
    r = rows[0]
    return {
        "clics": int(r.get("clicks", 0)),
        "impresiones": int(r.get("impressions", 0)),
        "ctr": r.get("ctr", 0) * 100,
        "posicion": r.get("position", 0),
    }


# --- Vercel Web Analytics ----------------------------------------------------


def vercel_api(endpoint: str, extra: str = "") -> dict | None:
    """
    Llama a la API de Web Analytics. El CLI escribe su banner en stderr, así
    que stdout es JSON limpio; aun así se busca la primera llave por si una
    versión futura cambia de criterio.
    """
    base = (
        f"/v1/query/web-analytics/{endpoint}"
        f"?projectId={VERCEL_PROJECT_ID}&teamId={VERCEL_TEAM_ID}"
    )
    raw = run(["npx", "vercel@latest", "api", base + extra], timeout=240)
    inicio = raw.find("{")
    if inicio == -1:
        return None
    try:
        return json.loads(raw[inicio:])
    except json.JSONDecodeError:
        return None


def vercel_resumen(desde: str, hasta: str) -> dict | None:
    """
    Tráfico del sitio y clics a WhatsApp.

    OJO: el panel de Vercel incluye tráfico de bots — en julio de 2026 era
    ~42 % del total. La señal más fiable es una proporción visitantes:páginas
    vistas de exactamente 1:1 (un humano navega por el sitio; un bot pide una
    página y se va). Se marcan los sospechosos en lugar de descontarlos a
    ciegas: la decisión de excluirlos es del analista, contrastando con GSC.
    """
    rango = f"&since={desde}&until={hasta}"

    total = vercel_api("visits/count", rango)
    if total is None:
        return None

    paises = vercel_api("visits/aggregate", rango + "&by=country&limit=20") or {}

    sospechosos = []
    for fila in paises.get("data", []):
        visitantes = fila.get("visitors", 0)
        vistas = fila.get("pageviews", 0)
        if visitantes >= 20 and visitantes == vistas:
            sospechosos.append({"pais": fila.get("country"), "visitantes": visitantes})

    puente = {}
    for ruta in BRIDGE_PATHS:
        r = vercel_api("visits/count", rango + f"&filter=requestPath eq '{ruta}'")
        puente[ruta] = ((r or {}).get("data") or {}).get("pageviews", 0)

    # El desglose por `utm_source` (float, servicio-hero, servicio-cta…) NO está
    # disponible: `by=utmSource` responde 402 — exige plan Enterprise o el
    # complemento Web Analytics Plus. Se puede contar el TOTAL de clics a
    # WhatsApp (por requestPath, que sí es gratuito) pero no de dónde salió
    # cada uno. Para segmentarlos sin pagar habría que llevar el origen en la
    # ruta (p. ej. /es/whatsapp/float) en vez de en la query.

    return {
        "total": total.get("data", {}),
        "sospechosos": sospechosos,
        "puente": puente,
    }


# --- Presentación ------------------------------------------------------------


def informe(desde: str, hasta: str) -> None:
    print(f"\n{'=' * 62}")
    print(f"  INFORME DE CANALES — {desde} a {hasta}")
    print(f"{'=' * 62}\n")

    print("META ADS (de pago)")
    print("-" * 62)
    meta = meta_insights(desde, hasta)
    if meta:
        print(f"  Inversión .............. ${meta['gasto']:.2f}")
        print(f"  Impresiones / alcance .. {meta['impresiones']:,} / {meta['alcance']:,}")
        print(f"  Clics · CTR ............ {meta['clics']:,} · {meta['ctr']:.2f}%")
        print(f"  Frecuencia ............. {meta['frecuencia']:.2f}")
        print(f"  Conversaciones ......... {meta['conversaciones']}")
        if meta["coste_conversacion"]:
            print(f"  COSTE POR CONTACTO ..... ${meta['coste_conversacion']:.2f}")
        if meta["frecuencia"] >= 3:
            print("  ⚠  Frecuencia ≥ 3: posible desgaste de creatividades.")
    else:
        print("  (sin datos)")

    print("\nBÚSQUEDA ORGÁNICA (Google Search Console)")
    print("-" * 62)
    gsc = gsc_totales(desde, hasta)
    if gsc:
        print(f"  Clics .................. {gsc['clics']:,}")
        print(f"  Impresiones ............ {gsc['impresiones']:,}")
        print(f"  CTR .................... {gsc['ctr']:.2f}%")
        print(f"  Posición media ......... {gsc['posicion']:.1f}")
        print("  Nota: España aporta ~1/3 de las impresiones en posición ~77 con")
        print("        ~0 clics (ruido de «Cuenca, España»). El mercado real es")
        print("        Ecuador + EE. UU.")
    else:
        print("  (sin datos)")

    print("\nSITIO WEB (Vercel Analytics)")
    print("-" * 62)
    vercel = vercel_resumen(desde, hasta)
    if vercel:
        t = vercel["total"]
        brutos = t.get("visitors", 0)
        print(f"  Visitantes / páginas ... {brutos} / {t.get('pageviews', 0)}  (BRUTO, con bots)")
        if vercel["sospechosos"]:
            total_bots = sum(s["visitantes"] for s in vercel["sospechosos"])
            print("  ⚠  Proporción 1:1 — probable tráfico automatizado:")
            for s in vercel["sospechosos"]:
                print(f"       · {s['pais']}: {s['visitantes']} visitantes")
            if brutos:
                pct = total_bots / brutos * 100
                print(f"     Suman {total_bots} ({pct:.0f}% del bruto). Estimación limpia:")
                print(f"     ~{brutos - total_bots} visitantes. Contrastar con GSC.")

        clics_wa = sum(v for v in vercel["puente"].values() if isinstance(v, int))
        print(f"\n  CLICS A WHATSAPP DESDE LA WEB: {clics_wa}")
        for ruta, n in vercel["puente"].items():
            print(f"       {ruta} → {n}")
        print("  (el desglose por utm_source exige plan de pago en Vercel — ver")
        print("   el comentario en vercel_resumen)")
    else:
        print("  (sin datos)")

    print("\nCOMPARATIVA DE CANALES")
    print("-" * 62)
    if meta and vercel:
        pagados = meta["conversaciones"]
        organicos = sum(v for v in vercel["puente"].values() if isinstance(v, int))
        print(f"  Contactos de pago ...... {pagados}  (${meta['gasto']:.2f})")
        print(f"  Contactos orgánicos .... {organicos}  ($0 de inversión directa)")
        if meta["coste_conversacion"]:
            ahorro = organicos * meta["coste_conversacion"]
            print(f"  Los orgánicos costarían ${ahorro:.2f} comprados en Meta.")
        print("\n  No son equivalentes: el contacto de pago llega en frío desde un")
        print("  anuncio; el orgánico ya ha leído una página del sitio y suele")
        print("  llegar mejor informado. Sirve como orden de magnitud, no como")
        print("  comparación exacta.")
    else:
        print("  (faltan datos de algún canal)")

    print()


def main() -> None:
    p = argparse.ArgumentParser(description="Informe unificado de canales.")
    p.add_argument("--dias", type=int, default=30, help="días hacia atrás (por defecto 30)")
    p.add_argument("--desde", help="fecha inicial YYYY-MM-DD (tiene prioridad)")
    p.add_argument("--hasta", help="fecha final YYYY-MM-DD")
    args = p.parse_args()

    if args.desde:
        desde = args.desde
        hasta = args.hasta or dt.date.today().isoformat()
    else:
        # GSC va con 2-3 días de retraso; se deja margen para no leer días vacíos.
        hasta_d = dt.date.today() - dt.timedelta(days=3)
        desde = (hasta_d - dt.timedelta(days=args.dias)).isoformat()
        hasta = hasta_d.isoformat()

    informe(desde, hasta)


if __name__ == "__main__":
    main()

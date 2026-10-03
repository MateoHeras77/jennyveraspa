# Informe de Vercel Web Analytics — jennyveraspa.com

**Ventana:** 3 sep – 2 oct 2026 (30 días completos, todo lo que retiene el plan Hobby).
**Fecha del informe:** 3 de octubre de 2026. **Comparación:** snapshot del 15 sep 2026 (ventana 16 ago – 14 sep).
**Solo lectura.** No se modificó nada del repositorio ni del proyecto de Vercel.

### Notas de método (verificadas en esta sesión)

- Hay un `vercel` instalado globalmente (`/home/mateo/.local/share/pnpm/bin/vercel`, CLI 57.0.0). Responde en ~5 s; `npx vercel@latest` superó los 120 s de timeout. **Usar el binario global.**
- `by` admite exactamente: `hour, day, week, month, year, country, deviceType, environment, requestPath, referrerHostname, osName, browserName, route, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, flags`. **No existen `os`, `browser` ni `city`** → son `osName` y `browserName`.
- `limit` máximo = **100** (250 devuelve 400).
- **`until` se comporta al revés de lo documentado en el brief:** en `count`, `until=2026-10-02T23:59:59Z` truncó a `2026-10-02T00:00:00` (perdía el día 2); `until=2026-10-02` a secas devolvió `until=2026-10-03T00:00:00`, que es lo correcto. En `aggregate` sí hace falta el `T23:59:59Z`. Ventana validada cuadrando el total (880/1.483) con la suma exacta de los 30 días de `by=day`.
- **`by=week` ignora `since`/`until` y devuelve semanas naturales completas** (la última incluía el 3 de oct; la primera incluía 31 ago–2 sep, fuera de ventana). Suma 1.006/1.697 frente a los 880/1.483 reales. **No es usable para series acotadas**: las semanas de este informe se calcularon sumando `by=day`.
- Los `visitors` de `by=day` suman exactamente el total de 30 días, es decir, **Vercel no deduplica visitantes entre días**. Las sumas por dimensión sí sobrepasan el total (rutas: 1.230 vs 880) porque un visitante cuenta en cada valor que toca.

---

## A. Totales de los últimos 30 días

| Métrica | Bruto | Bot restado | **Limpio** | Cota inferior estricta |
|---|---|---|---|---|
| Visitantes | 880 | −189 | **691** | **~595** |
| Páginas vistas | 1.483 | −189 | **1.294** | ~1.195 |

**Contra el snapshot (664 / 1.374):** visitantes **+4 %**, páginas vistas **−6 %**. Páginas por visitante limpio: 1,87 (antes 2,07).

### Países sospechosos (regla: 1:1 exacto, ≥4 visitantes, sin referrer)

| País | Vis/PV | Referrers | Veredicto |
|---|---|---|---|
| CN | 122/122 | 100 % directo | **Bot A** — se resta |
| SG | 30/30 | 29 directo + 1 Google | **Bot B** — se resta |
| HK | 12/12 | 100 % directo | **Bot B** — se resta |
| FR | 8/8 | 100 % directo | **Bot B** — se resta |
| PL | 8/8 | 100 % directo | **Bot B** — se resta |
| IT | 5/5 | 100 % directo | **Bot B** — se resta |
| MY | 4/4 | 100 % directo | **Bot B** — se resta |
| **Total restado** | **189/189** | | |
| CA | 11/11 | 7 directo, 2 Google, 1 Bing, 1 DDG | **1:1 pero humano** — tiene un clic a `/es/whatsapp`. No se resta |
| CL | 8/8 | 4 Bing, 2 Google, 2 directo | **Real** (lectores chilenos). No se resta |
| PE | 5/5 | 3 Bing, 1 Google, 1 directo | **Real**. No se resta |

**Son dos bots distintos, con huellas opuestas:**

- **Bot A (China, 122 visitantes).** Rastreo amplio: 70 visitantes repartidos en la cola larga («Others»), 27 en `/es`, 3-4 en una docena de posts. 100 % directo, 1:1. Se declara iOS/Android (55/49) para pasar por móvil. Es el mismo de julio y agosto.
- **Bot B (distribuido, ≥14 países).** Lo contrario: golpea un **conjunto fijo y pequeño de URLs**. Sus dianas, con su firma «directo y 1:1»:

| Ruta | Total | Directo 1:1 | Con buscador (real) |
|---|---|---|---|
| `/es/blog/lipoescultura-360-ecuador-precios` | 98/98 | **79** | 16 Google + 3 Bing |
| `/es/blog/depilacion-laser-cuenca-precios` | 32/33 | **31** | 1 Bing + 1 ChatGPT |
| `/es/servicios/laser-co2-fraccionado` | 23/26 | 15 | 10 Google |
| `/en/blog/hifu-antes-y-despues` | 17/17 | **13** | 4 Google |
| `/en/blog/hifu-beneficios-riesgos` | 17/17 | **10** | 6 Google + 1 Bing |

El bot B también entra con IPs de Ecuador y EE. UU.: en el post de lipoescultura, **EC 21/21 y US 13/13 son 1:1 exacto**, así que ni el país ni el idioma lo filtran. Descontando el residuo del bot B que queda fuera de los siete países restados (≈97 visitantes), la **cota inferior estricta queda en ~595 visitantes**. Es un suelo: parte de ese tráfico «directo» sí es humano (app de Google, marcadores, enlaces desde WhatsApp que no mandan referrer).

> El post de lipoescultura ya no es «el post top»: de sus 98 visitantes, **~19-25 son reales**. Sigue exactamente igual que en el snapshot.

---

## B. Serie diaria y semanal

| Día | Vis | PV | | Día | Vis | PV | | Día | Vis | PV |
|---|---|---|---|---|---|---|---|---|---|---|
| 3 sep | 49 | 75 | | 13 sep | 12 | 16 | | 23 sep | 40 | 89 |
| 4 sep | 26 | 58 | | 14 sep | 26 | 57 | | 24 sep | 27 | 51 |
| 5 sep | 28 | 46 | | 15 sep | 45 | 58 | | 25 sep | 27 | 35 |
| 6 sep | 18 | 38 | | 16 sep | 43 | 70 | | 26 sep | 20 | 31 |
| 7 sep | 16 | 45 | | 17 sep | 41 | 79 | | 27 sep | 33 | 37 |
| 8 sep | 30 | 53 | | 18 sep | 31 | 39 | | **28 sep** | **64** | **83** |
| 9 sep | 35 | 82 | | 19 sep | 49 | 65 | | 29 sep | 21 | 29 |
| 10 sep | 16 | 21 | | 20 sep | 11 | 19 | | 30 sep | 25 | 32 |
| 11 sep | 33 | 62 | | 21 sep | 18 | 24 | | 1 oct | 28 | 51 |
| 12 sep | 20 | 44 | | 22 sep | 24 | 39 | | 2 oct | 24 | 55 |

**Días distorsionados por el bot:** el 15-17 de sep concentran el pico del bot (la semana 14-20 sep carga 68 de los 189 visitantes-bot, el 36 % del total). El **28 de sep (64 visitantes)** es el día más alto del mes, pero la semana 28 sep–2 oct también lleva 38 visitantes-bot, así que el pico es mitad bot: limpio queda en torno a 40-45.

### Semanas (lunes–domingo)

| Semana | Bruto vis | PV | Bot | **Limpio** |
|---|---|---|---|---|
| 3–6 sep *(parcial, jue–dom)* | 121 | 217 | 20 | 101 |
| 7–13 sep | 162 | 323 | 28 | 134 |
| 14–20 sep | 246 | 387 | 68 | 178 |
| 21–27 sep | 189 | 306 | 35 | 154 |
| 28 sep–2 oct *(parcial, lun–vie)* | 162 | 250 | 38 | 124 |

### Semana 26 sep – 2 oct aislada (7 días)

**215 brutos / 318 PV · 52 bot · 163 limpios · 15 clics a WhatsApp → 9,2 % de conversión.**
Es la semana más floja del mes en conversión y la que más carga de bot proporcional tiene (24 %).

---

## C. Clics a WhatsApp

Totales de 30 días (cada página vista de la ruta puente = un clic, igual que en el snapshot):

| Ruta | Visitantes | **Páginas vistas (clics)** | Snapshot |
|---|---|---|---|
| `/es/whatsapp` | 63 | **67** | 59 / 66 |
| `/en/whatsapp` | 13 | **16** | 17 / 18 |
| **Total** | 76 | **83** | **84** |

**Conversión global: 83 / 691 = 12,0 %** (snapshot: 84 / 664 = **12,7 %**). Sobre la cota estricta de 595 serían 13,9 %.

### Serie semanal

| Semana | Limpios | WA es | WA en | Total | **Conversión** |
|---|---|---|---|---|---|
| 3–6 sep *(parcial)* | 101 | 6 | 3 | 9 | 8,9 % |
| 7–13 sep | 134 | 18 | 1 | 19 | 14,2 % |
| 14–20 sep | 178 | 15 | 6 | 21 | 11,8 % |
| 21–27 sep | 154 | 19 | 4 | 23 | **14,9 %** |
| 28 sep–2 oct *(parcial)* | 124 | 9 | 2 | 11 | 8,9 % |

**Lectura:** el 12,7 % **se sostiene en lo esencial** (12,0 %, dentro del ruido de ±1 punto con estos volúmenes: 83 clics sobre 691). La serie no tiene tendencia: 14,2 → 11,8 → **14,9** → 8,9 %. La última semana cae, pero son 5 días de lunes a viernes sin fin de semana, y los lunes–viernes rinden menos que los sábados en este sitio. Con ~20 clics por semana, **un día bueno mueve 3 puntos de conversión**: no hay señal accionable por debajo de ±3 puntos.

**El inglés NO sigue subiendo. Se ha dado la vuelta:** 18 clics en el snapshot → **16** ahora, y la serie semanal es 3 → 1 → 6 → 4 → 2. La racha de 15,6 % del 8-14 sep no se repitió.

**Origen de los clics EN:** EE. UU. 9 vis / 11 PV, Ecuador 3/4, Brasil 1/1. Sigue siendo tráfico expat de EE. UU. (snapshot: EE. UU. 10, Ecuador 6, Brasil 1).
**Origen de los clics ES:** Ecuador 61/65, EE. UU. 1, Canadá 1. Prácticamente puro local.

---

## D. Referrers

El listado completo tiene **20 filas y ninguna «Others»**, así que no hay referrer oculto: lo que no está aquí, no existe.

| Grupo | Visitantes | PV | Detalle | Snapshot |
|---|---|---|---|---|
| **Directo** | 582 | 1.001 | incluye los 189 del bot → **~393 humanos** | 403 |
| **Buscadores** | 401 | 450 | Google 319/363 · Bing **54/58** · DuckDuckGo 12 · Google App 3 · Ecosia 3 · Brave 2 · Yahoo (5 dominios) 6 · Yandex 2 | 378 |
| **IA** | **14** | **24** | **ChatGPT 12/22** · Copilot 1 · Gemini 1 | **4** |
| **Redes sociales** | **7** | **7** | `m.facebook.com` 6 · `facebook.com` 1 | 3 |
| Otros | 1 | 1 | `scriblihelp.com` 1 (spam de referrer) | — |

**Lo que hay que mirar:**

- **Instagram: 0. TikTok: 0. LinkedIn: 0.** Quinto mes consecutivo a cero. **El negocio no puso el enlace al sitio en las redes**, o lo puso sin que nadie lo haya pulsado. No hay primera visita que datar.
- **La IA se triplica: 4 → 14 visitantes y 24 páginas vistas.** ChatGPT solo pasa de 2 a **12 visitantes / 22 páginas vistas**, y **9 de esos 12 entran a `/es/servicios` con 18 páginas vistas — 2 páginas por visitante**, el mejor ratio de navegación de todo el sitio. Es el único canal nuevo del mes. Aparecen además Copilot y, por primera vez, Gemini.
- **Bing crece de 30 a 54 visitantes (+80 %)** y está concentrado: **28 de los 54 van a `/es/blog/hifu-beneficios-riesgos`**, que es el segundo post real del sitio (49/57). Bing, DuckDuckGo y Yahoo comparten índice, y ese post suma 28+8+2 = 38 visitantes entre los tres. Hay un nicho de HIFU que Bing está sirviendo y Google no.
- Facebook sube de 3 a 7 pese a que **la cuenta de Meta Ads está pausada desde el 14 de sep**: es tráfico orgánico de la página, no de anuncios.

---

## E. Países, dispositivos y sistemas operativos

### Países (ya limpios: restados CN, SG, HK, FR, PL, IT, MY)

| País | Vis | % del limpio | Snapshot |
|---|---|---|---|
| **EC Ecuador** | 334 | **48 %** | 342 (51 %) |
| **US EE. UU.** | 143 | **21 %** | 136 (21 %) |
| ES España | 33 | 5 % | 27 |
| MX México | 21 | 3 % | — |
| GB Reino Unido | 15 | 2 % | 13 |
| NL Países Bajos | 15 | 2 % | — |
| JP Japón | 13 | 2 % | — |
| DE Alemania | 12 | 2 % | — |
| IN India | 12 | 2 % | — |
| AR Argentina | 11 | 2 % | — |
| CA Canadá | 11 | 2 % | — |
| BR Brasil | 8 | 1 % | — |
| CL Chile | 8 | 1 % | — |
| PE Perú | 5 | — | — |
| SE Suecia | 5 | — | — |
| Resto (+«Others» 26) | 45 | 7 % | — |

Los dos mercados que importan **se mantienen planos**: Ecuador 342 → 334, EE. UU. 136 → 143. Alemania (12/40) y Brasil (8/31) tienen 3-4 páginas por visitante: pocos, pero son los que más navegan.

### Dispositivos

| Tipo | Bruto | PV | Limpio aprox. |
|---|---|---|---|
| Móvil | 614 | 985 | ~465 (**67 %**) |
| Escritorio | 259 | 487 | ~228 (33 %) |
| Tablet | 3 | 7 | 3 |
| (sin dato) | 4 | 4 | 4 |

**El móvil baja del 77 % al ~67 %**, pero es un artefacto del bot: el bot A se declara móvil en 104 de sus 122 visitas. En los mercados reales, **Ecuador es 78 % móvil** (260 de 334) y **EE. UU. está casi partido: 77 móvil / 62 escritorio (55 %)**. El expat consulta desde ordenador mucho más que el cliente local.

### Sistemas operativos y navegadores (brutos)

| OS | Vis | PV | | Navegador | Vis | PV |
|---|---|---|---|---|---|---|
| iOS | 357 | 543 | | Chrome Mobile | 240 | 415 |
| Android | 260 | 449 | | Mobile Safari | 207 | 349 |
| Windows | 189 | 274 | | Chrome | 182 | 318 |
| Mac | 38 | **136** | | Chrome Mobile iOS | 121 | 142 |
| GNU/Linux | 31 | 76 | | Microsoft Edge | 57 | 89 |
| Chrome OS | 1 | 1 | | Google Search App | 29 | 52 |
| | | | | Safari | 16 | **67** |

iOS sigue por delante de Android (357 vs 260) y Windows sube de 128 a 189. **Mac y Safari de escritorio son los que más páginas por visitante dan: Mac 3,6 y Safari 4,2** — es el perfil del expat investigando a fondo. Edge con 57 visitantes encaja con el salto de Bing.

---

## F. Rutas top 30 y reparto por idioma

| # | Ruta | Vis | PV | Snapshot | Cambio |
|---|---|---|---|---|---|
| 1 | `/es` | 101 | 126 | 98 | = |
| 2 | `/es/blog/lipoescultura-360-ecuador-precios` | 98 | 98 | ~25 reales | **casi todo bot** |
| 3 | `/es/servicios` | 69 | 108 | 86 | **−20 %** |
| 4 | `/es/whatsapp` | 63 | 67 | 59 | +7 % |
| 5 | `/en` | 54 | 71 | 62 | −13 % |
| 6 | **`/es/blog/hifu-beneficios-riesgos`** | **49** | 57 | no estaba | **nuevo top** |
| 7 | `/en/servicios` | 33 | 65 | 45 | −27 % |
| 8 | `/es/blog/depilacion-laser-cuenca-precios` | 32 | 33 | — | 31 son bot |
| 9 | `/es/blog/botox-ecuador-cuanto-cuesta` | 28 | 34 | 37 | −24 % |
| 10 | `/es/blog/masajes-relajantes-en-cuenca-ecuador` | 26 | 32 | 36 | −28 % |
| 11 | `/es/contacto` | 25 | 28 | 29 | −14 % |
| 12 | `/es/servicios/laser-co2-fraccionado` | 23 | 26 | — | 10 de Google |
| 13 | `/es/blog/cuanto-cuesta-abdominoplastia-ecuador` | 22 | 29 | 29 | −24 % |
| 14 | `/es/blog/blefaroplastia-precio-ecuador` | 21 | 24 | — | |
| 15 | `/es/blog/spa-para-hombres-cuenca` | 20 | 23 | 26 | −23 % |
| 16 | `/es/servicios/masajes-relajantes` | 20 | 26 | — | |
| 17 | `/es/servicios/limpieza-facial` | 19 | 24 | 27 | −30 % |
| 18 | `/en/blog/hifu-antes-y-despues` | 17 | 17 | — | 13 son bot |
| 19 | `/en/blog/hifu-beneficios-riesgos` | 17 | 17 | — | 10 son bot |
| 20 | `/es/servicios/hifu` | 17 | 31 | — | 1,8 PV/vis |
| 21 | `/es/servicios/tratamiento-ojeras` | 17 | 18 | — | |
| 22 | `/es/servicios/eliminacion-lunares` | 15 | 15 | — | |
| 23 | `/en/contacto` | 13 | 16 | 30 | **−57 %** |
| 24 | `/en/whatsapp` | 13 | 16 | 17 | −24 % |
| 25 | `/es/blog/hifu-antes-y-despues` | 13 | 15 | — | |
| 26 | `/es/servicios/depilacion-laser` | 13 | 18 | — | |
| 27 | `/es/servicios/drenaje-postoperatorio` | 13 | 16 | — | |
| 28 | `/en/blog/botox-ecuador-cuanto-cuesta` | 12 | 12 | — | traducción |
| 29 | `/en/blog/cuanto-cuesta-abdominoplastia-ecuador` | 12 | 12 | — | traducción |
| 30 | `/en/servicios/hifu` | 11 | 15 | — | |

### Reparto por idioma y sección (sin rutas puente)

| | Visitantes | PV | Snapshot |
|---|---|---|---|
| **ES** | 819 | 985 | 700 |
| **EN** | 298 | 373 | 285 (29 %) |
| EN como % | **27 %** | | 29 % |

| Sección | Vis | PV | Snapshot | Cambio |
|---|---|---|---|---|
| Blog ES | 412 | 454 | 292 | +41 % *(inflado: ~110 son bot)* |
| **Servicios ES** | **270** | 366 | 168 | **+61 %** |
| Blog EN | 142 | 152 | 44 | +223 % *(≈23 son bot)* |
| **Servicios EN** | **81** | 126 | 80 | **= plano** |

El crecimiento real está en **servicios ES: 168 → 270 visitantes (+61 %)** con 366 páginas vistas. Es el movimiento más sano del mes y no lo explica el bot (solo 15 visitantes del bot caen en `laser-co2-fraccionado`). El blog ES y el blog EN crecen sobre el papel, pero la mitad del incremento es bot B.

### Las 6 traducciones del 7 de septiembre (casi 4 semanas)

| `/en/blog/...` | Vis | PV | Real (sin bot) | Versión ES |
|---|---|---|---|---|
| `botox-ecuador-cuanto-cuesta` | 12 | 12 | 12 | 28 |
| `cuanto-cuesta-abdominoplastia-ecuador` | 12 | 12 | 12 | 22 |
| `blefaroplastia-precio-ecuador` | 8 | 8 | 8 | 21 |
| `lipoescultura-360-ecuador-precios` | 6 | 6 | ~5 | 98 (19 reales) |
| `depilacion-laser-cuenca-precios` | **1** | 1 | 1 | 32 (1 real) |
| `spa-para-hombres-cuenca` | **0** | 0 | **0** | 20 |
| **Total** | **39** | **39** | **~38** | |

**Sí reciben visitas propias, y bastantes más de las que parecía.** El snapshot medía 4 visitantes en su primera semana; en 30 días llevan **39**, es decir ~10/semana y subiendo. Pero el reparto es muy desigual: las tres de precios médicos (botox, abdominoplastia, blefaroplastia) se llevan **32 de los 39**, mientras que `spa-para-hombres-cuenca` lleva **cero en un mes** y `depilacion-laser-cuenca-precios` una sola visita — y las dos tienen versión ES que funciona (20 y 32 visitantes). La traducción rinde cuando la consulta en inglés existe («how much does botox cost»), no por el hecho de traducir.

---

## G. Páginas de servicio — top 15

| # | Ruta | Vis | PV | PV/vis |
|---|---|---|---|---|
| 1 | `/es/servicios/laser-co2-fraccionado` | 23 | 26 | 1,1 |
| 2 | `/es/servicios/masajes-relajantes` | 20 | 26 | 1,3 |
| 3 | `/es/servicios/limpieza-facial` | 19 | 24 | 1,3 |
| 4 | `/es/servicios/hifu` | 17 | 31 | **1,8** |
| 5 | `/es/servicios/tratamiento-ojeras` | 17 | 18 | 1,1 |
| 6 | `/es/servicios/eliminacion-lunares` | 15 | 15 | 1,0 |
| 7 | `/es/servicios/depilacion-laser` | 13 | 18 | 1,4 |
| 8 | `/es/servicios/drenaje-postoperatorio` | 13 | 16 | 1,2 |
| 9 | `/en/servicios/hifu` | 11 | 15 | **1,4** |
| 10 | `/es/servicios/despigmentacion-zonas-intimas` | 11 | 15 | 1,4 |
| 11 | `/es/servicios/drenaje-linfatico-facial` | 9 | 11 | 1,2 |
| 12 | `/es/servicios/masajes-reductores` | 8 | 10 | 1,3 |
| 13 | `/en/servicios/limpieza-facial` | 6 | 6 | 1,0 |
| 14 | `/en/servicios/masajes-reductores` | 6 | 6 | 1,0 |
| 15 | `/es/servicios/despigmentacion-axilas` | 6 | 8 | 1,3 |

**HIFU es el servicio del mes**: `/es/servicios/hifu` 17/31 (la mejor navegación del catálogo), `/en/servicios/hifu` 11/15, más el post `/es/blog/hifu-beneficios-riesgos` con 49 visitantes y `/es/blog/hifu-antes-y-despues` con 13. El clúster HIFU suma **~107 visitantes reales**, el más grande del sitio, y lo alimenta Bing más que Google.
La página 1 (`laser-co2-fraccionado`) tiene 23 pero 10 son del bot B: su tráfico real de Google son 10 visitantes.

---

## H. Endpoint de eventos — 402 confirmado

```
/v1/query/web-analytics/events/count     → 402 Accessing Analytics custom events requires an Enterprise or Pro plan.
/v1/query/web-analytics/events/aggregate → 402 (idéntico)
```

No hay endpoint de eventos gratuito. **La página puente sigue siendo la única forma de contar clics a WhatsApp**, y `by=utmSource` sigue vetado, así que el desglose por origen (`float`, `servicio-hero`, …) no se puede consultar. Para segmentarlo habría que llevar el `source` en la ruta (`/es/whatsapp/float`), no en la query.

---

## Hallazgos clave

- **El tráfico está plano, no creciendo.** 691 visitantes limpios frente a 664 del snapshot (+4 %, dentro del ruido) y las páginas vistas **bajan un 6 %** (1.294 vs 1.374). Ecuador 342 → 334 y EE. UU. 136 → 143: los dos mercados que importan no se movieron. El mes no tuvo palanca nueva.
- **La conversión a WhatsApp se sostiene: 83 clics y 12,0 %** (antes 84 y 12,7 %). Es la métrica más estable del proyecto, tercer mes seguido entre el 10 y el 13 %. Con ~20 clics semanales, nada por debajo de ±3 puntos es señal.
- **El inglés se dio la vuelta.** `/en/whatsapp` cae de 18 a **16 clics** y la serie semanal es 3→1→6→4→2: el 15,6 % del 8-14 sep era ruido, no tendencia. Y `/en/contacto` se hunde un **57 %** (30 → 13). El embudo expat se está estrechando pese a las traducciones.
- **ChatGPT es el único canal nuevo: de 2 a 12 visitantes y 22 páginas vistas**, con 9 de ellos entrando a `/es/servicios` a 2 páginas por visitante — el mejor ratio de navegación del sitio. El tráfico de IA pasa de 4 a 14 visitantes y aparece Gemini por primera vez. Es pequeño pero es el que mejor califica.
- **Bing merece atención propia: +80 % (30 → 54 visitantes)** y 28 de ellos van a un solo post, `/es/blog/hifu-beneficios-riesgos`, que entra directo como **segundo contenido real del sitio** (49 visitantes, 0 en el snapshot). Sumando Bing + DuckDuckGo + Yahoo, ese post capta 38 visitantes de un índice donde Google no está sirviendo.
- **HIFU es el clúster más fuerte que tiene el sitio: ~107 visitantes reales** entre los dos servicios y los dos posts, con la mejor navegación del catálogo (`/es/servicios/hifu` a 1,8 páginas por visitante). Es el candidato natural para enlazado interno, que es lo único que `docs/aprendizajes-seo.md` tiene medido como eficaz.
- **Servicios ES crece un 61 % (168 → 270) y es crecimiento limpio**, no bot. En cambio `/es/servicios` (el índice) pierde un 20 % y `/en/servicios` un 27 %: la gente llega ahora a las fichas concretas, no al listado.
- **Las traducciones sí funcionan, pero solo las de intención de precio médico.** 39 visitantes en 30 días (≈10/semana, frente a los 4 de la primera semana), de los cuales **32 se los llevan botox, abdominoplastia y blefaroplastia**. `spa-para-hombres-cuenca` lleva **0 visitas en un mes** y `depilacion-laser-cuenca-precios` una sola, teniendo las dos una versión ES que sí recibe tráfico. Traducir no basta: hace falta que exista la consulta en inglés.
- **Instagram y TikTok siguen a cero: quinto mes.** No hay ni una visita, y el listado de referrers está completo (20 filas sin «Others»), así que no es un problema de muestreo. **El enlace al sitio no se ha puesto en las redes, o nadie lo ha pulsado.** Facebook sube de 3 a 7 pero es orgánico de la página, no de los anuncios: Meta Ads lleva pausada desde el 14 de sep y no se nota ningún corte en la serie diaria.
- **El bot B se ha consolidado y ya contamina el ranking de contenidos.** 189 visitantes de siete países se restan por la regla, y queda ~97 más repartidos por países mixtos y por IPs de Ecuador y EE. UU. Su firma es nítida: directo, 1:1 exacto, y siempre las mismas cinco URLs. Deja `/es/blog/lipoescultura-360-ecuador-precios` en 98 visitantes con solo ~19-25 reales, y mete dos posts `/en/blog/hifu-*` (17/17 cada uno) en el top 20 sin merecerlo. **Cualquier lectura de rutas que no filtre «directo con 1:1» va a dar conclusiones falsas.**

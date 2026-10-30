# Línea base — 30 de octubre de 2026

Punto de partida del **nuevo equipo de marketing**. Todo informe posterior se compara contra esta tabla, midiendo igual (misma fuente, misma ventana, mismos robots descontados).

- Informe completo (PDF): `docs/informes/2026-10-linea-base/informe.pdf`
- Datos crudos reproducibles: `docs/informes/2026-10-linea-base/datos/datos.json` (generado con `extraer.py --corte 2026-10-30`)
- Fuentes sin API: `docs/informes/2026-10-linea-base/datos/manual.json`

> **Pendiente:** re-ejecutar `./extraer.py --corte 2026-11-04` para cerrar octubre completo en GSC y guardar la ventana de Vercel antes de que caduque (30 días).

## Ventanas

| Fuente | Ventana | Nota |
|---|---|---|
| Search Console | 29 sep – 28 oct 2026 | Último día consolidado: 28 oct |
| Vercel | 30 sep – 29 oct 2026 | Solo guarda 30 días |
| Meta Ads | 30 sep – 29 oct 2026 | Último gasto: 14 oct |
| Ficha de Google (rendimiento) | may – 27 oct 2026 | Panel leído con el navegador en la cuenta del administrador |
| Redes y reseñas | 30 oct 2026 | Datos públicos |

## Cifras

| Métrica | Valor | Comparación | Cómo se mide |
|---|---|---|---|
| **Google orgánico** | | | |
| Clics | **297** | +2,4 % vs. 30 d anteriores (290) | GSC, 30 días hasta el último consolidado |
| Clics por día, octubre | **9,96** | máximo de 16 meses (ago: 9,81) | GSC, clics del mes ÷ días con datos |
| Impresiones · CTR | 19.903 · 1,49 % | 19.555 · 1,48 % | GSC |
| Impresiones en puestos 1-10, octubre (1-28) | **3.857** (1-3: 612 · 4-10: 3.245) | jun: 1.625 | GSC por consulta (solo el ~20 % no anonimizado) |
| Clics desde Ecuador · desde móvil | 85 % · 84 % | | GSC por país / dispositivo |
| **Web** | | | |
| Visitantes brutos del panel | 1.206 | | Vercel |
| Robots descontados | 519 (43 %) — CN 324, SG 168, HK 22, IN 5 | | Regla del anexo |
| Visitantes reales | **687** | 691 (3 sep – 2 oct) | Vercel menos países robot |
| Clics a WhatsApp | **58** (ES 46 · EN 12) | 83 (3 sep – 2 oct): **−30 %** | Páginas vistas de `/es/whatsapp` + `/en/whatsapp` |
| Conversión web → WhatsApp | **8,4 %** | 12,0 % | Clics WA ÷ visitantes reales |
| Desde Ecuador · móvil | 54 % (369) · 64 % | EC 334 | Vercel por país / dispositivo |
| Procedencia | Google 355 · directo 297 · Bing 81 · DuckDuckGo 18 · Yahoo 13 · ChatGPT 8 · Facebook 3 | Bing 54 | Vercel por referrer, sin robots |
| **Meta Ads** | | | |
| Anuncios activos | **0** (22 en pausa; último gasto 14 oct) | | `meta ads ad list` → `effective_status` |
| Inversión · conversaciones | $43,94 · 33 | | Insights, `messaging_conversation_started_7d` |
| Coste por conversación | **$1,33** | sep: $0,95 (mejor mes) | Inversión ÷ conversaciones |
| CTR · frecuencia | 2,78 % · 2,40 | | Insights |
| Vida de la cuenta (19 jun – 14 oct) | $299,31 · 227 conv. · $1,32 | | Insights mensual |
| Anuncios de tratamiento vs. cirugía (vida) | $0,97 vs. $2,00 por conversación | | Insights por anuncio, agrupado por nombre |
| **Ficha de Google** (rendimiento: 1–27 oct) | | | |
| Interacciones (llamadas + rutas + clics a la web) | **86** (7 · 54 · 25) | sep: 82 (10 · 47 · 25); ago: 138 | Business Profile → Rendimiento (leído a mano, sin API) |
| Vistas de la ficha | **2.078** (búsqueda móvil 1.487 · Maps móvil 313 · búsqueda escritorio 245 · Maps escritorio 33) | sep: 2.081 | Ídem |
| Búsquedas que mostraron la ficha | octubre aún no publicado | **sep: 242 (−63,5 % vs. sep 2025)** | Ídem; se publican al empezar el mes siguiente |
| Interacciones vs. año anterior | sep: **−42,7 %** · vistas −31,5 % | | Ídem |
| Seis meses (may – oct) | 603 interacciones · 59 llamadas · 333 rutas · 211 clics a la web · 0 reservas · 10.321 vistas · 811 búsquedas | | Ídem |
| Búsquedas principales (may – oct) | drenaje linfático 142 · limpieza facial cuenca 112 · spa 112 · limpieza facial 102 · masajes cuenca 93 · jenny 91 · vera 40 · depilación láser cuenca 38 | | Ídem |
| Reseñas · nota | **101** · 4,9 | 94 el 3 oct | Google Maps |
| Categoría principal | Spa de masajes | sin cambios desde sep | Google Maps |
| Ficha duplicada | «Jenny Vera Spa Plaza Médica» marcada «Duplicate» en el gestor | | Business Profile Manager |
| **Redes** | | | |
| Seguidores TikTok · Facebook · Instagram | 2.757 · 1.503 · 1.026 | 2.765 · 1.502 · 1.022 (3 oct) | Perfil público / Graph API |
| Redes con enlace a la web | **0 de 3** | | Revisión de biografías |

## Regla de robots usada (actualizada)

País con páginas vistas ≤ 1,05 × visitantes, ≥ 4 visitantes, ≥ 90 % sin referrer y distinto de Ecuador. La igualdad exacta 1:1 dejó de valer: China dio 324/326 en esta ventana. El bot distribuido de septiembre (lipoescultura, HIFU EN) prácticamente desapareció: el artículo `hifu-beneficios-riesgos`, el más visto, es tráfico real de Bing y Yahoo (MX, ES).

## Hallazgos que fija esta línea base

1. Orgánico en su mejor ritmo de la serie; la caída de la migración de abril (−62 %) está superada.
2. Meta apagado desde el 14 oct tras su mejor mes; las creatividades del 6 oct rindieron mal ($1,84 la semana del 5 oct).
3. Clics a WhatsApp −30 % con el mismo tráfico. La puente funciona (verificado 30 oct, 200 + redirección correcta). Causa sin identificar; confirmar en noviembre.
4. 0 de 3 recomendaciones del 15 sep aplicadas.
5. La ficha de Google cae frente a 2025 (sep: −42,7 % interacciones, −63,5 % búsquedas) y tiene una ficha duplicada. Sus clics a la web bajaron de ~50 al mes (jul-ago) a 25 (sep-oct); no explica la caída de WhatsApp de octubre, porque en septiembre los clics a WhatsApp seguían en 83.

## Cambios aplicados después de la línea base

| Fecha | Cambio | Qué medir y cuándo |
|---|---|---|
| 30 oct 2026 | **Ficha de Google: categoría principal «Massage spa» → «Medical spa»**. «Massage spa» pasa a secundaria; se mantienen Facial spa, Health spa, Skin care clinic y Laser hair removal service. Enviado desde Business Profile, quedó «pendiente de revisión» (Google indica ~10 min). | El **27 nov 2026** (4 semanas): búsquedas que muestran la ficha (sep: 242), interacciones (1–27 oct: 86), consultas de estética en el panel («drenaje linfático», «limpieza facial cuenca») y que «masajes cuenca» no se hunda. Comparar contra septiembre y octubre de esta tabla; separar de cualquier reactivación de Meta. |

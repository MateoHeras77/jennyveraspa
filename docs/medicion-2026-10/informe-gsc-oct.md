# Informe GSC — jennyveraspa.com · 3 de octubre de 2026

**Propiedad:** `sc-domain:jennyveraspa.com` · **`dataState: final`**
**Revisión 2 (3 oct, tarde):** la sección F3 se reescribió por completo. La primera versión atribuía el desplome del cluster «near me» a un cambio de categoría de la ficha de Google; **el equipo verificó que la categoría no cambió** y la atribución queda retirada. La reatribución, con test de cohortes, está en F3. Se añadió D4.1 con la API de inspección de URL.

**Último día con datos consolidados: 2026-09-29** (GSC va 4 días por detrás; 30 sep, 1, 2 y 3 oct todavía no existen). Por eso **no hay octubre parcial que informar** y la ventana post-despliegue del 7 de septiembre es de **22 días, no de 4 semanas**.

**Ventanas usadas**
| nombre | rango | días |
|---|---|---|
| 30 d actual | 2026-08-31 → 2026-09-29 | 30 |
| 30 d previa | 2026-08-01 → 2026-08-30 | 30 |
| POST despliegue | 2026-09-08 → 2026-09-29 | 22 |
| PRE despliegue (simétrica) | 2026-08-16 → 2026-09-06 | 22 |
| 90 d (línea base keywords) | 2026-07-02 → 2026-09-29 | 90 |

**Límites respetados.** Las cifras totales salen de `date`, `country`, `device` y `page`. Todo lo que lleva `query` es **solo el subconjunto visible**: en los 30 d actuales las consultas visibles suman **52 clics de 290 (18 %)**; en la previa, 59 de 288 (20 %). Las consultas sirven de dirección, nunca de total. La portada indexada como `http://jennyveraspa.com/` se cuenta como portada.

---

## Hallazgos clave

- **La «mejora de posición» de septiembre es un artefacto, no una mejora.** La posición media del sitio pasó de 44,6 a 29,2 en 30 días, pero es porque desaparecieron impresiones de las posiciones 80-95: en el subconjunto visible, impresiones en pos >50 cayeron de **9.939 a 5.169** y, semana a semana, de **2.214 (17-23 ago) a 547 (21-27 sep)**. En el mismo periodo las impresiones en **pos 1-10 SUBIERON de 3.057 a 3.649**. Lo útil creció; lo que se fue era ruido de página 3+.
- **Septiembre cierra en ~283 clics (274 en 29 días, 9,45 clics/día), por debajo de agosto (304) y de la proyección de 295.** No es una caída: es el segundo mejor mes del año y el CTR mensual es el mejor desde marzo (1,48 %).
- **D1 (título de masajes con «Ecuador») FUNCIONÓ.** `/es/servicios/masajes-relajantes`: 11 clics/240 impr/pos 8,3 en los 22 días POST frente a 3/71/pos 12,4 en los 22 PRE. Serie semanal de posición: 9,9 → 12,6 → 13,8 → 10,1 → 9,6 → **8,0** → 7,8, con un pico de **8 clics/156 impr en 21-27 sep**, la mejor semana de toda la serie. Las impresiones se multiplicaron por 7. La restauración de «Ecuador» queda validada por tercera vez.
- **`best massage near me` murió: 56 impresiones el 14 de septiembre, cero el 22.** Decaimiento diario limpio (56 → 24 → 14 → 10 → 8 → 4 → 0) con la **posición intacta en 6,9-7,2** y la página que la servía indexada y sana. No costó ni un clic: llevaba cinco mediciones a cero. **No fue la ficha de Google** (categoría sin cambios, verificado).
- **La hipótesis de «retirada por CTR cero» NO se sostiene como patrón general: el test de cohortes la refuta.** Quitando de la cohorte la propia consulta examinada, las otras **24 consultas con cero clics en pos 1-10 GANARON un 38 % de exposición** (14,8 → 20,5 impr/día), mejor que las 23 que sí recibían clics (91 %). `blefaroplastia precio ecuador`, con 0 clics en 74 días y pos 8,4, multiplicó sus impresiones por 3,9. En este sitio el CTR cero en primera página no cuesta exposición.
- **Lo que de verdad pasó el 15 de septiembre fue una poda de la cola de página 8-10, y es por página, no por consulta.** El grupo de posts informativos de HIFU/CO2/PRP/manchas pasó de 288,6 a 140,4 impresiones/día (49 %) **sin que su posición se moviera** (87,6 → 90,4; 81,5 → 80,4). Dentro de esa poda, **dos URL planas de la web antigua cayeron a cero exacto** (`/tipos-de-nariz-…` y `/lipoescultura-sin-cirugia-…`, pos 81-83): los 308 funcionan y Google por fin soltó los duplicados. Esas ~20 impresiones/día había que perderlas.
- **Para `best massage near me` quedan dos explicaciones que GSC no puede separar, y la segunda encaja mejor:** inanición por CTR cero (la apoya que su hermana `massage near me`, con 2 clics, creciera a su mejor semana mientras ella moría) o corrección de un desajuste de relevancia (un post sobre Cuenca emparejado con una consulta «cerca de mí» sin calificador geográfico). La segunda explica además por qué ninguna otra consulta de CTR cero fue castigada. **n = 1: no es un aprendizaje reutilizable todavía.** La prueba para zanjarlo ya está montada (ver F3.4).
- **D4 (6 traducciones EN) es un fracaso parcial medible: 5 clics en 22 días, y 2 de las 6 no tienen NI UNA impresión en todo julio-septiembre.** La inspección de URL separa los dos casos: `/en/blog/spa-para-hombres-cuenca` está **indexada y sana** (`PASS`, canónica propia, rastreada el 30 sep) — no compite, no es un fallo técnico; `/en/blog/depilacion-laser-cuenca-precios` está **«Rastreada: actualmente sin indexar»** (`NEUTRAL`, sin canónica asignada) y es la única que pide acción. **No es el sitemap**: verificado, la URL sí está en el sitemap de producción. Las otras cuatro empezaron a aparecer entre el 10 y el 21 de septiembre con 44-63 impresiones cada una.
- **No hay canibalización ES↔EN.** Las páginas EN traducidas mueven 44-63 impresiones frente a 193-1.053 de sus pares ES (1-6 %). Las caídas de `spa-para-hombres-cuenca` (-11 clics) y `botox-ecuador-cuanto-cuesta` (-10) son caídas de CTR con impresiones **al alza** (+48 y +100), que es el patrón de una SERP con más elementos, no de dos URLs peleándose.
- **D2 (láser CO2) y D3 (íntimos) siguen sin señal.** `/es/servicios/laser-co2-fraccionado` 6 clics/95 impr POST vs 5/108 PRE; `/es/servicios/hifu-intimo` 0/9 vs 1/7. Con 3-9 impresiones semanales no hay nada que medir. `/es/servicios/despigmentacion-zonas-intimas` sí sube (7 clics/37 impr/CTR 19 %/pos 4,1 vs 4/16), pero sobre un volumen minúsculo.
- **El escritorio está comiéndose terreno y el móvil retrocede en clics:** escritorio 32 → 50 clics (+18), móvil 254 → 238 (-16). Mismo total, distinto reparto. Ecuador se mantiene plano (240 → 241 clics) con +1.663 impresiones.
- **La portada es la mayor pérdida del mes: 42 → 26 clics (-16)** con impresiones casi iguales (1.849 → 1.490) y posición intacta (4,3 → 4,0). Es una caída de CTR en pos 4 sobre consultas de marca anonimizadas; es la alerta más grande del informe en términos absolutos.
- **Línea base de las keywords nuevas: 21 de los 23 términos de la investigación de mercado están en CERO a 90 días.** Solo tienen datos `masajes para hombres (en) cuenca` (6 clics/91 impr/pos 5,2), `spa para hombres cuenca` (2/8/5,2) y `armonización facial cuenca` (0 clics/7 impr/**pos 2,9**). Las 10 keywords EN: ninguna.

---

## A. Tendencia mensual (marzo–octubre 2026)

| mes | clics | impr | CTR | pos | clics/día | días |
|---|---|---|---|---|---|---|
| 2026-03 | 287 | 10.686 | 2,69 % | 18,3 | 9,26 | 31 |
| 2026-04 | 108 | 10.477 | 1,03 % | 44,4 | 3,60 | 30 |
| 2026-05 | 130 | 14.567 | 0,89 % | 49,0 | 4,19 | 31 |
| 2026-06 | 136 | 17.851 | 0,76 % | 52,9 | 4,53 | 30 |
| 2026-07 | 247 | 20.615 | 1,20 % | 48,9 | 7,97 | 31 |
| 2026-08 | **304** | 23.308 | 1,30 % | 44,3 | 9,81 | 31 |
| 2026-09 (1-29) | 274 | 18.574 | **1,48 %** | **28,9** | 9,45 | 29 |
| 2026-10 | — | — | — | — | — | sin datos consolidados |

### Cierre definitivo de septiembre

| referencia | clics |
|---|---|
| sep 1-13 (snapshot del 15 sep) | 128 (9,85 c/d) |
| sep 1-29 (dato firme de hoy) | **274** (9,45 c/d) |
| proyección a 30 días | ~283 |
| proyección del snapshot | 295 |
| agosto | 304 |

Septiembre se queda **~12 clics por debajo de su propia proyección y ~21 por debajo de agosto (-7 %)** con **4.734 impresiones menos**. El ritmo diario bajó muy poco (9,81 → 9,45 c/d). La caída de impresiones no es pérdida de visibilidad útil (ver sección H y el primer hallazgo).

Serie diaria de septiembre (clics/impr/pos): 1: 11/726/35,0 · 2: 13/746/34,2 · 3: 8/724/41,8 · 4: 10/694/35,0 · 5: 9/753/42,1 · 6: 8/847/48,5 · 7: 11/864/39,6 · 8: 6/761/35,3 · 9: 17/776/31,7 · 10: 10/625/31,3 · 11: 9/680/28,2 · 12: 10/638/30,6 · 13: 6/625/31,6 · 14: 7/853/30,3 · 15: 12/680/27,0 · 16: 7/599/21,6 · 17: 9/639/17,0 · 18: 12/518/22,3 · 19: 9/461/21,0 · 20: 6/407/18,8 · 21: 10/523/19,9 · 22: 12/531/19,0 · 23: 14/506/23,7 · 24: 9/587/25,1 · 25: 10/500/17,4 · 26: 9/584/18,0 · 27: 6/546/18,8 · 28: 5/615/20,2 · 29: 9/566/15,3

---

## B. Ventanas de 30 días

### Total

| ventana | clics | impr | CTR | pos | clics/día |
|---|---|---|---|---|---|
| 31 ago – 29 sep | **290** | 19.419 | 1,49 % | 29,2 | 9,67 |
| 1 – 30 ago | 288 | 22.463 | 1,28 % | 44,6 | 9,60 |
| delta | **+2** | **-3.044** | +0,21 pp | +15,4 (mejora aparente) | +0,07 |

> La mejora de posición de 15,4 puestos **no es real**. Ver sección H2.

### Por país (top 6 por clics)

| país | clics | impr | CTR | pos | prev clics | prev impr | prev pos | Δ clics |
|---|---|---|---|---|---|---|---|---|
| Ecuador | 241 | 11.123 | 2,17 % | 6,9 | 240 | 9.460 | 7,8 | +1 |
| EE. UU. | 32 | 1.000 | 3,20 % | 24,3 | 29 | 1.277 | 40,9 | +3 |
| España | 6 | 2.872 | 0,21 % | 73,0 | 8 | 5.233 | 80,5 | -2 |
| México | 3 | 485 | 0,62 % | 59,2 | 1 | 528 | 69,8 | +2 |
| Canadá | 2 | 96 | 2,08 % | 29,7 | 1 | 72 | 43,1 | +1 |
| Reino Unido | 2 | 739 | 0,27 % | 62,1 | 1 | 1.329 | 68,2 | +1 |

Ecuador gana 1.663 impresiones y mejora 0,9 puestos sin mover clics (CTR 2,54 % → 2,17 %). España se reduce a la mitad (ruido de «Cuenca, España»: 2.872 impresiones en pos 73 para 6 clics).

### Por dispositivo

| dispositivo | clics | impr | CTR | pos | prev | Δ clics |
|---|---|---|---|---|---|---|
| MOBILE | 238 | 10.726 | 2,22 % | 14,3 | 254 / 9.965 / 2,55 % / 19,7 | **-16** |
| DESKTOP | 50 | 8.609 | 0,58 % | 47,8 | 32 / 12.402 / 0,26 % / 64,5 | **+18** |
| TABLET | 2 | 84 | 2,38 % | 23,0 | 2 / 96 / 2,08 % / 55,2 | 0 |

### Por sección (prefijo de página; dimensión `page`+`date`)

| sección | clics | impr | CTR | pos | prev | Δ clics |
|---|---|---|---|---|---|---|
| ES (`/es/…`) | 230 | 14.695 | 1,57 % | 25,7 | 219 / 14.772 / 1,48 % / 40,0 | +11 |
| EN (`/en/…`) | 37 | 5.245 | 0,71 % | 40,0 | 32 / 7.059 / 0,45 % / 56,5 | +5 |
| portada `/` | 26 | 1.490 | 1,74 % | 4,0 | 42 / 1.849 / 2,27 % / 4,3 | **-16** |

La suma por `page`+`date` da 293 clics / 21.430 impresiones frente a 290 / 19.419 por `date`: discrepancia habitual de GSC (~10 % en impresiones) por filas sin página asignada. Los totales de referencia son los de `date`.

Top EN (30 d): `/en` 6 · `/en/blog/med-spa-cuenca-ecuador` 4 (41 impr, pos 10,1; venía de 0) · `/en/blog/best-massage-cuenca-ecuador` 3 (771 impr, pos 7,4; venía de 8) · `/en/servicios/masajes-relajantes` 3 (273 impr, pos 8,4; venía de 0) · `/en/servicios/laser-co2-fraccionado` 3 (47 impr, pos 5,0) · `/en/blog/blefaroplastia-precio-ecuador` 3 (nueva) · `/en/blog/hifu-beneficios-riesgos` 2 (454 impr, pos 64,5) · `/en/blog/botox-ecuador-cuanto-cuesta` 2 (nueva) · `/en/servicios/botox` 2 · `/en/servicios/microblading` 2.

---

## C. Semana a semana (lunes–domingo)

### C1. Sitio entero

| semana | clics | impr | CTR | pos |
|---|---|---|---|---|
| 17 – 23 ago | 79 | 5.333 | 1,48 % | 42,9 |
| 24 – 30 ago | 69 | 5.643 | 1,22 % | 45,0 |
| 31 ago – 6 sep | 75 | 5.335 | 1,41 % | 39,2 |
| **7 – 13 sep** (semana del despliegue) | 69 | 4.969 | 1,39 % | 32,9 |
| 14 – 20 sep | 62 | 4.157 | 1,49 % | 23,3 |
| 21 – 27 sep | 70 | 3.777 | **1,85 %** | 20,3 |
| 28 – 29 sep (PARCIAL, 2 días) | 14 | 1.181 | 1,19 % | 17,8 |

Clics estables entre 62 y 79 por semana durante siete semanas: **ninguna semana sale del rango de ruido**. Lo que se mueve de verdad son las impresiones (-29 % de 5.643 a 3.777) y el CTR (+0,63 pp), ambos efecto de la misma cosa: se fueron las impresiones de página 3+.

### C2. Cluster de masajes, por URL (clics / impr / pos)

| semana | CLUSTER total | `/es/servicios/masajes-relajantes` | `/es/blog/masajes-relajantes-en-cuenca-ecuador` | `/es/servicios/masajes-reductores` | `/en/blog/best-massage-cuenca-ecuador` | `/en/servicios/masajes-relajantes` | `/es/blog/masajes-relajantes` |
|---|---|---|---|---|---|---|---|
| 17-23 ago | 14 / 401 / 9,0 | 0 / 16 / 9,9 | 7 / 156 / 10,7 | 2 / 35 / 6,9 | 4 / 126 / 7,8 | 0 / 55 / 8,1 | 0 / 10 / 9,5 |
| 24-30 ago | 11 / 407 / 9,9 | 1 / 24 / 12,6 | 5 / 215 / 10,7 | 3 / 55 / 10,5 | 2 / 79 / 7,2 | 0 / 34 / 8,2 | 0 / — |
| 31 ago-6 sep | 6 / 594 / 8,9 | 2 / 30 / 13,8 | 3 / 178 / 11,2 | 0 / 27 / 10,9 | 0 / 264 / 6,9 | 1 / 94 / 8,2 | 0 / — |
| **7-13 sep** | 10 / 593 / 8,9 | 2 / 22 / 10,1 | 6 / 172 / 10,0 | 0 / 27 / 9,2 | 1 / 285 / 8,1 | 1 / 84 / 8,7 | 0 / — |
| 14-20 sep | 7 / 445 / 8,7 | 0 / 22 / 9,6 | 4 / 127 / 11,7 | 1 / 54 / 7,6 | 1 / 174 / 6,9 | 1 / 64 / 8,7 | 0 / — |
| **21-27 sep** | **15 / 338 / 11,5** | **8 / 156 / 8,0** | 5 / 94 / 19,8 | 1 / 17 / 12,1 | 1 / 41 / 8,0 | 0 / 29 / 7,8 | 0 / — |
| 28-29 sep (PARCIAL) | 1 / 104 / 9,8 | 1 / 46 / 7,8 | 0 / 37 / 12,6 | 0 / 10 / 8,4 | 0 / 7 / 11,9 | 0 / 2 / 6,5 | 0 / — |

El cluster toca su máximo de la serie en 21-27 sep (15 clics) y la página de servicio pasa de 16-30 a **156 impresiones** en una semana. Eso ya no es ruido: es un cambio de orden de magnitud en impresiones, sostenido en la semana parcial siguiente (46 impr en 2 días).

---

## D. Veredicto de los 4 despliegues del 7 de septiembre

**POST = 8-29 sep (22 d) · PRE = 16 ago-6 sep (22 d).** Nota: son 22 días, no 28. La ventana pedida de 4 semanas no existe todavía.

### D1 · Título de masajes, recuperó «Ecuador» → **FUNCIONÓ**

| página | POST | PRE | Δ |
|---|---|---|---|
| `/es/servicios/masajes-relajantes` | 11 / 240 / 4,58 % / **8,3** | 3 / 71 / 4,23 % / 12,4 | **+8 clics, +169 impr, +4,1 puestos** |
| `/en/servicios/masajes-relajantes` | 2 / 167 / 1,20 % / 8,4 | 1 / 196 / 0,51 % / 8,1 | +1 clic, sin cambio de posición |

Consultas (visibles) relacionadas:

| consulta | POST | PRE |
|---|---|---|
| `masajes cuenca` | 4 / 88 / 4,55 % / 9,2 | 0 / 129 / 0 % / 10,0 |
| `masajes relajantes cuenca` | 2 / 36 / 5,56 % / 4,4 | 1 / 53 / 1,89 % / 6,0 |
| **`masajes cuenca ecuador`** | 1 / 25 / 4,00 % / **7,2** | 1 / 37 / 2,70 % / 8,4 |
| `masajes en cuenca ecuador` | 1 / 26 / 3,85 % / 9,0 | 0 / 28 / 0 % / 8,2 |
| `massage cuenca ecuador` | 0 / 11 / 0 % / 7,3 | 0 / 7 / 0 % / 8,7 |
| `massage cuenca` | 0 / 12 / 0 % / 7,8 | 1 / 14 / 7,14 % / 9,0 |

**Sí volvió `masajes cuenca ecuador`**: pos 7,2 (venía de ~58 cuando se quitó «Ecuador» en agosto, y de 8,4 en la ventana PRE). Confirmado el aprendizaje de CLAUDE.md: «en Cuenca, Ecuador» se queda.
En **inglés no hay señal**: `massage cuenca ecuador` sigue en 11 impresiones y 0 clics, y `/en/servicios/masajes-relajantes` está plano en pos 8,4. El efecto es solo en ES.
**Matiz honesto:** en la comparación de 30 días el blog `/es/blog/masajes-relajantes-en-cuenca-ecuador` pierde 10 clics (28 → 18) mientras la página de servicio gana 7. El cluster **sí** crece en la serie semanal (máximo histórico la semana del 21), pero parte de la ganancia de la página de servicio es trasvase interno.

### D2 · 4 posts de láser CO2 → página de servicio → **SIN SEÑAL**

| página | POST | PRE | Δ |
|---|---|---|---|
| `/es/servicios/laser-co2-fraccionado` | 6 / 95 / 6,32 % / 6,5 | 5 / 108 / 4,63 % / 7,4 | +1 clic, -13 impr |
| `/en/servicios/laser-co2-fraccionado` | 3 / 35 / 8,57 % / 5,5 | 2 / 31 / 6,45 % / 4,9 | +1 clic |

En 30 días: 6 clics/130 impr/pos 6,6 frente a 8/100/7,7 — **menos clics que antes**. Los 142 impresiones que el snapshot vio a 6 días no se consolidaron en nada. Las consultas de CO2 (`laser co2 fraccionado`, `co2 laser before and after`, etc.) siguen todas en **posición 60-95 con 0 clics** y además perdieron impresiones. **No funcionó, y con 4-6 impresiones diarias tampoco hay cómo medirlo mejor.**

### D3 · Posts íntimos → `/es/servicios/hifu-intimo` y `/es/servicios/despigmentacion-zonas-intimas` → **MIXTO, volumen irrelevante**

| página | POST | PRE | Δ |
|---|---|---|---|
| `/es/servicios/despigmentacion-zonas-intimas` | 7 / 37 / 18,92 % / 4,1 | 4 / 16 / 25,00 % / 3,2 | +3 clics, +21 impr |
| `/en/servicios/despigmentacion-zonas-intimas` | 0 / 3 / 0 % / 3,3 | 0 / 3 | — |
| `/es/servicios/hifu-intimo` | **0** / 9 / 0 % / 7,0 | 1 / 7 / 14,29 % / 4,1 | -1 clic |
| `/en/servicios/hifu-intimo` | 0 / 2 | 1 / 2 | -1 clic |

`despigmentacion-zonas-intimas` mantiene el mejor CTR del sitio (19-21 %) en pos 4, y sube 10 clics en 30 d (vs 5). `hifu-intimo` tiene **9 impresiones en 22 días**: no hay nada. Las consultas de despigmentación íntima están todas en **pos 60-85** (`despigmentacion intima` 2 impr/pos 79,5), así que los 10 clics vienen de consultas anonimizadas, no del cluster que se intentó reforzar.

### D4 · 6 traducciones EN del blog → **FRACASO PARCIAL; una sola sin indexar**

| página EN | 1.er día con impresiones | POST (22 d) | par ES POST | par ES PRE | Δ ES |
|---|---|---|---|---|---|
| `/en/blog/spa-para-hombres-cuenca` | **nunca** (0 impr en todo jul-sep) | 0 / 0 | 9 / 196 / 4,59 % / 7,7 | 20 / 148 / 13,51 % / 6,4 | **-11** |
| `/en/blog/depilacion-laser-cuenca-precios` | **nunca** (0 impr en todo jul-sep) | 0 / 0 | 0 / 91 / 0 % / 6,2 | 0 / 74 / 0 % / 5,8 | 0 |
| `/en/blog/botox-ecuador-cuanto-cuesta` | 10 sep | **2** / 50 / 4,00 % / 4,6 | 13 / 1.053 / 1,23 % / 4,4 | 23 / 953 / 2,41 % / 4,9 | **-10** |
| `/en/blog/cuanto-cuesta-abdominoplastia-ecuador` | 11 sep | 0 / 63 / 0 % / 7,9 | 14 / 1.124 / 1,25 % / 6,0 | 8 / 972 / 0,82 % / 7,6 | **+6** |
| `/en/blog/blefaroplastia-precio-ecuador` | 15 sep | **3** / 44 / 6,82 % / 5,1 | 8 / 737 / 1,09 % / 5,8 | 5 / 519 / 0,96 % / 7,2 | +3 |
| `/en/blog/lipoescultura-360-ecuador-precios` | 21 sep | 0 / 47 / 0 % / 5,0 | 10 / 1.703 / 0,59 % / 7,7 | 16 / 1.308 / 1,22 % / 10,1 | -6 |

**¿Reciben clics propios?** Apenas: **5 clics en 22 días entre las seis** (botox 2, blefaroplastia 3). Cuatro aparecieron con retraso de 3 a 14 días tras el despliegue y se mueven en 44-63 impresiones. Dos **no han tenido ni una sola impresión en tres meses** — eso no es «falta de autoridad», es un síntoma de indexación: merece una inspección de URL en GSC.

**¿Canibalizan?** No. Dos razones:
1. **Escala.** Las EN mueven 44-63 impresiones; sus pares ES, 193-1.703. La EN representa el 1-6 % del par. No se puede explicar -10 clics con una página que recibe 50 impresiones.
2. **Mecánica.** Donde el ES cae, lo hace **con más impresiones y menos CTR** (`spa-para-hombres`: 148 → 196 impr, CTR 13,5 % → 4,6 %; `botox`: 953 → 1.053 impr, CTR 2,41 % → 1,23 %). Eso es la SERP metiendo más elementos por delante, no otra URL robando el clic. El desglose por consulta de las EN son fragmentos anonimizados de 1-3 impresiones (`'guayaquil'`, `'precios'`, `'en ecuador'`), no las consultas cabeza de sus pares ES.

**Veredicto:** las traducciones no han costado nada y no han aportado casi nada. La hipótesis de canibalización queda descartada con los datos actuales.

#### D4.1 · Inspección de URL (API `urlInspection/index:inspect`, 3 oct 2026)

| campo | `/en/blog/spa-para-hombres-cuenca` | `/en/blog/depilacion-laser-cuenca-precios` | `/en/blog/botox-ecuador-cuanto-cuesta` (referencia) |
|---|---|---|---|
| `coverageState` | **Enviada e indexada** | **Rastreada: actualmente sin indexar** | Enviada e indexada |
| `indexingState` | `INDEXING_ALLOWED` | `INDEXING_STATE_UNSPECIFIED` | `INDEXING_ALLOWED` |
| `robotsTxtState` | `ALLOWED` | `ALLOWED` | `ALLOWED` |
| `pageFetchState` | `SUCCESSFUL` | `SUCCESSFUL` | `SUCCESSFUL` |
| `lastCrawlTime` | 2026-09-30 06:18 Z | 2026-10-02 20:59 Z | 2026-09-10 07:04 Z |
| `googleCanonical` | ella misma | — (sin asignar) | ella misma |
| `userCanonical` | ella misma | — (sin asignar) | ella misma |
| `crawledAs` | MOBILE | MOBILE | MOBILE |
| `sitemap` asociado | `sitemap.xml` | — | `sitemap.xml` |
| `referringUrls` | su par ES | su par ES | su par ES |
| `verdict` | **PASS** | **NEUTRAL** | PASS |

**Son dos problemas distintos, no uno:**

1. **`/en/blog/spa-para-hombres-cuenca` está indexada y sana.** Canónica propia correcta (Google no eligió la versión ES), rastreada el 30 de septiembre, en el sitemap, `PASS`. Que tenga **0 impresiones en 90 días estando indexada** significa que no alcanza el top ~100 para ninguna consulta. No es un problema técnico: es que no compite. Su par ES, en cambio, rankea en pos 7,7 — así que el contenido sí vale, lo que falta es señal en inglés para esa consulta.
2. **`/en/blog/depilacion-laser-cuenca-precios` NO está indexada**: «Rastreada: actualmente sin indexar», sin canónica asignada, `verdict: NEUTRAL`. Google la rastreó el 2 de octubre y decidió no indexarla. Esto **sí** es accionable.
   - **No es un problema de sitemap**, aunque el campo `sitemap` salga vacío: verificado contra el sitemap en producción, la URL **sí está** (`https://www.jennyveraspa.com/sitemap.xml`, 198 URL, 58 de `/en/blog/`). GSC solo rellena ese campo para URL ya indexadas.
   - **Tampoco es el MDX**: `src/content/blog/en/depilacion-laser-cuenca-precios.mdx` existe (7.736 bytes, 7 sep), con frontmatter válido y sin marca de borrador.
   - «Rastreada: actualmente sin indexar» en una página que se rastrea sin error es, casi siempre, una decisión de calidad o de duplicación percibida. Nota relevante: su par ES `/es/blog/depilacion-laser-cuenca-precios` lleva **123 impresiones en pos 6,1 y cero clics** en 30 días, así que es una traducción de un post que tampoco convierte en su idioma original.

**Conclusión de D4 revisada:** de las seis traducciones, **cinco están indexadas y una no**. El caso de `spa-para-hombres-cuenca` no es técnico y no se resuelve con GSC; el de `depilacion-laser-cuenca-precios` es el único que pide acción, y la acción no es volver a enviar el sitemap (ya está dentro).


---

## E. Top 25 páginas y consultas (30 d, con cambio)

### E1. Páginas por clics

| página | clics | impr | CTR | pos | prev | Δ clics | marca |
|---|---|---|---|---|---|---|---|
| `/` (portada) | 26 | 1.490 | 1,74 % | 4,0 | 42 / 1.849 / 2,27 % / 4,3 | **-16** | **CAE ≥5** |
| `/es/blog/botox-ecuador-cuanto-cuesta` | 21 | 1.411 | 1,49 % | 4,5 | 22 / 1.117 / 1,97 % / 5,4 | -1 | |
| `/es/blog/spa-para-hombres-cuenca` | 19 | 265 | 7,17 % | 8,4 | 23 / 145 / 15,86 % / 6,2 | -4 | |
| `/es/blog/cuanto-cuesta-abdominoplastia-ecuador` | 18 | 1.484 | 1,21 % | 6,2 | 7 / 1.273 / 0,55 % / 7,3 | **+11** | **SUBE ≥5** |
| `/es/blog/masajes-relajantes-en-cuenca-ecuador` | 18 | 608 | 2,96 % | 12,4 | 28 / 697 / 4,02 % / 11,6 | **-10** | **CAE ≥5** |
| `/es/blog/lipoescultura-360-ecuador-precios` | 17 | 2.259 | 0,75 % | 8,3 | 13 / 1.012 / 1,28 % / 9,8 | +4 | |
| `/es` | 15 | 569 | 2,64 % | 8,6 | 17 / 639 / 2,66 % / 9,8 | -2 | |
| `/es/servicios/eliminacion-lunares` | 15 | 95 | 15,79 % | 3,4 | 7 / 86 / 8,14 % / 5,1 | **+8** | **SUBE ≥5** |
| `/es/servicios/masajes-relajantes` | 13 | 276 | 4,71 % | 8,9 | 6 / 168 / 3,57 % / 10,3 | **+7** | **SUBE ≥5** |
| `/es/blog/blefaroplastia-precio-ecuador` | 12 | 943 | 1,27 % | 5,9 | 7 / 743 / 0,94 % / 7,5 | **+5** | **SUBE ≥5** |
| `/es/servicios/limpieza-facial` | 10 | 313 | 3,19 % | 4,8 | 11 / 338 / 3,25 % / 7,4 | -1 | |
| `/es/servicios/despigmentacion-zonas-intimas` | 10 | 48 | 20,83 % | 4,0 | 5 / 17 / 29,41 % / 3,4 | **+5** | **SUBE ≥5** |
| `/en` | 6 | 359 | 1,67 % | 7,6 | 6 / 257 / 2,33 % / 7,7 | 0 | |
| `/es/servicios/depilacion-laser` | 6 | 270 | 2,22 % | 6,7 | 5 / 223 / 2,24 % / 7,6 | +1 | |
| `/es/servicios/drenaje-postoperatorio` | 6 | 211 | 2,84 % | 7,5 | 12 / 155 / 7,74 % / 6,8 | **-6** | **CAE ≥5** |
| `/es/servicios/laser-co2-fraccionado` | 6 | 130 | 4,62 % | 6,6 | 8 / 100 / 8,00 % / 7,7 | -2 | |
| `/es/servicios/hifu` | 6 | 126 | 4,76 % | 6,6 | 4 / 176 / 2,27 % / 5,3 | +2 | |
| `/es/servicios/drenaje-linfatico-facial` | 6 | 125 | 4,80 % | 4,9 | 5 / 101 / 4,95 % / 6,0 | +1 | |
| `/es/blog/hifu-antes-y-despues` | 4 | 433 | 0,92 % | 15,7 | 4 / 304 / 1,32 % / 16,5 | 0 | |
| `/es/servicios/plasma-rico-plaquetas` | 4 | 61 | 6,56 % | 5,2 | 2 / 40 / 5,00 % / 6,4 | +2 | |
| `/en/blog/med-spa-cuenca-ecuador` | 4 | 41 | 9,76 % | 10,1 | 0 / 57 / 0 % / 7,6 | +4 | |
| `/en/blog/best-massage-cuenca-ecuador` | 3 | 771 | 0,39 % | 7,4 | 8 / 782 / 1,02 % / 6,9 | **-5** | **CAE ≥5** |
| `/es/servicios` | 3 | 276 | 1,09 % | 3,6 | 2 / 285 / 0,70 % / 2,9 | +1 | |
| `/en/servicios/masajes-relajantes` | 3 | 273 | 1,10 % | 8,4 | 0 / 271 / 0 % / 8,4 | +3 | |
| `/es/servicios/microblading` | 3 | 89 | 3,37 % | 6,6 | 1 / 93 / 1,08 % / 6,7 | +2 | |

**Todas las páginas con |Δ clics| ≥ 5** (hay 10, ninguna fuera del top 25 salvo una):

| página | 30 d actual | 30 d previa | Δ |
|---|---|---|---|
| `/` | 26 / 1.490 | 42 / 1.849 | **-16** |
| `/es/blog/masajes-relajantes-en-cuenca-ecuador` | 18 / 608 | 28 / 697 | **-10** |
| `/es/servicios/drenaje-postoperatorio` | 6 / 211 | 12 / 155 | -6 |
| `/es/servicios/masajes-reductores` | 2 / 135 | 8 / 143 | -6 |
| `/en/blog/best-massage-cuenca-ecuador` | 3 / 771 | 8 / 782 | -5 |
| `/es/servicios/despigmentacion-zonas-intimas` | 10 / 48 | 5 / 17 | +5 |
| `/es/blog/blefaroplastia-precio-ecuador` | 12 / 943 | 7 / 743 | +5 |
| `/es/servicios/masajes-relajantes` | 13 / 276 | 6 / 168 | +7 |
| `/es/servicios/eliminacion-lunares` | 15 / 95 | 7 / 86 | +8 |
| `/es/blog/cuanto-cuesta-abdominoplastia-ecuador` | 18 / 1.484 | 7 / 1.273 | **+11** |

### E2. Top 25 consultas visibles

⚠️ **Estas 25 consultas suman 52 de los 290 clics (18 %).** No sirven para explicar el total; sirven para ver dirección.

| consulta | clics | impr | CTR | pos | prev | Δ clics |
|---|---|---|---|---|---|---|
| `masajes cuenca` | 4 | 141 | 2,84 % | 9,1 | 1 / 174 / 9,7 | +3 |
| `facials near me` | 4 | 15 | 26,67 % | 3,5 | 1 / 2 / 4,0 | +3 |
| `masajes relajantes cuenca` | 3 | 54 | 5,56 % | 4,7 | 2 / 53 / 6,2 | +1 |
| `masajes para hombres en cuenca` | 2 | 52 | 3,85 % | 5,6 | 3 / 13 / 5,8 | -1 |
| `massage near me` | 2 | 44 | 4,55 % | 6,6 | 0 / 30 / 7,3 | +2 |
| `cuanto vale una abdominoplastia en ecuador` | 2 | 21 | 9,52 % | 5,4 | 0 / 15 / 6,9 | +2 |
| `masaje cuenca` | 2 | 20 | 10,00 % | 7,3 | 1 / 25 / 11,6 | +1 |
| `cuanto cuesta una lipo en ecuador` | 1 | 105 | 0,95 % | 10,1 | 1 / 66 / 13,8 | 0 |
| `limpieza facial cuenca` | 1 | 61 | 1,64 % | 2,7 | 4 / 72 / 2,8 | -3 |
| `lipoescultura precio` | 1 | 43 | 2,33 % | 8,3 | 0 / 11 / 12,5 | +1 |
| `masajes cuenca ecuador` | 1 | 38 | 2,63 % | 6,9 | 2 / 40 / 8,0 | -1 |
| `masajes en cuenca ecuador` | 1 | 35 | 2,86 % | 8,7 | 0 / 39 / 8,2 | +1 |
| `masajes en cuenca` | 1 | 33 | 3,03 % | 8,4 | 3 / 45 / 11,0 | -2 |
| `spa` | 1 | 24 | 4,17 % | 9,8 | 0 / 22 / 10,1 | +1 |
| `masaje` | 1 | 23 | 4,35 % | 22,4 | 0 / 10 / 14,0 | +1 |
| `spa near me` | 1 | 21 | 4,76 % | 7,5 | 0 / 24 / 11,3 | +1 |
| `botox allergan precio ecuador` | 1 | 16 | 6,25 % | 3,6 | 0 / 16 / 4,1 | +1 |
| `lipoescultura precio guayaquil` | 1 | 15 | 6,67 % | 18,4 | 0 / 0 | +1 |
| `botox cuenca` | 1 | 8 | 12,50 % | 7,1 | 0 / 1 / 1,0 | +1 |
| `microblading cuenca` | 1 | 7 | 14,29 % | 5,6 | 1 / 8 / 4,8 | 0 |
| `precios` | 1 | 7 | 14,29 % | 3,1 | 0 / 2 | +1 |
| `hifu mala experiencia` | 1 | 6 | 16,67 % | 44,0 | 0 / 2 | +1 |
| `lipotransferencia precio` | 1 | 6 | 16,67 % | 8,5 | 0 / 0 | +1 |
| `liposuccion precio` | 1 | 5 | 20,00 % | 4,6 | 0 / 1 / 48,0 | +1 |
| `masaje tantrico cuenca ecuador` | 1 | 5 | 20,00 % | 8,6 | 0 / 0 | +1 |

**Consultas con |Δ clics| ≥ 5: ninguna.** Con 1-4 clics por consulta visible, ninguna consulta individual alcanza ese umbral — es una consecuencia directa de la anonimización, no una señal de estabilidad.

---

## F. Consultas de paquete de mapas

### F1. Ahora vs antes (30 d)

| consulta | clics | impr | CTR | pos | prev clics | prev impr | prev pos |
|---|---|---|---|---|---|---|---|
| `best massage near me` | **0** | 671 | 0 % | 6,9 | 0 | 655 | 6,1 |
| `massage near me` | 2 | 44 | 4,55 % | 6,6 | 0 | 30 | 7,3 |
| `facials near me` | 4 | 15 | 26,67 % | 3,5 | 1 | 2 | 4,0 |
| `spa near me` | 1 | 21 | 4,76 % | 7,5 | 0 | 24 | 11,3 |
| `limpieza facial cuenca` | 1 | 61 | 1,64 % | 2,7 | 4 | 72 | 2,8 |
| `masajes cuenca` | 4 | 141 | 2,84 % | 9,1 | 1 | 174 | 9,7 |
| `spa cuenca` | 0 | 31 | 0 % | 18,0 | 1 | 46 | 19,1 |
| `masajes cuenca ecuador` | 1 | 38 | 2,63 % | 6,9 | 2 | 40 | 8,0 |
| `botox cuenca` | 1 | 8 | 12,50 % | 7,1 | 0 | 1 | 1,0 |
| `depilacion laser cuenca` | 0 | 49 | 0 % | 5,9 | 3 | 48 | 7,4 |
| `hifu cuenca` | **sin datos** | — | — | — | — | — | — |

`best massage near me` cumple su **5.ª medición consecutiva con 0 clics** — y esta vez con el matiz de que ya casi no tiene impresiones.

### F2. Serie semanal (clics / impresiones / posición)

| consulta | 17 ago | 24 ago | 31 ago | 7 sep | 14 sep | **21 sep** | 28 sep (parcial) |
|---|---|---|---|---|---|---|---|
| `best massage near me` | 0/75/7,4 | 0/67/6,4 | 0/266/6,5 | 0/259/7,5 | 0/140/6,2 | **0/6/7,7** | 0/0/— |
| `massage near me` | 0/6/9,2 | 0/6/7,7 | 0/8/7,8 | 2/13/7,1 | 0/3/7,7 | 0/19/5,6 | 0/1/8,0 |
| `facials near me` | 0/0/— | 1/2/4,0 | 3/10/3,6 | 1/4/2,5 | 0/0/— | 0/1/6,0 | 0/0/— |
| `spa near me` | 0/7/19,6 | 0/2/7,5 | 0/6/8,0 | 0/7/7,1 | 1/4/8,0 | 0/4/7,0 | 0/0/— |
| `limpieza facial cuenca` | 1/17/2,8 | 1/9/2,1 | 0/11/4,5 | 1/19/2,4 | 0/19/1,9 | 0/8/2,5 | 0/4/2,5 |
| `masajes cuenca` | 0/37/10,3 | 0/50/10,4 | 0/42/9,2 | 2/37/9,2 | 0/12/10,1 | **2/41/8,8** | 0/9/7,3 |
| `spa cuenca` | 0/8/25,0 | 0/12/15,4 | 0/10/21,0 | 0/4/14,2 | 0/5/22,2 | 0/11/15,5 | 0/1/9,0 |
| `masajes cuenca ecuador` | 0/3/8,0 | 1/24/8,9 | 0/10/7,1 | 0/6/5,3 | 0/8/7,6 | 1/11/8,1 | 0/3/3,3 |
| `botox cuenca` | 0/0/— | 0/0/— | 0/2/2,5 | 1/4/10,5 | 0/1/7,0 | 0/1/3,0 | 0/0/— |
| `depilacion laser cuenca` | 0/5/9,2 | 2/15/5,6 | 0/9/5,7 | 0/6/4,7 | 0/13/6,8 | 0/15/6,3 | 0/6/4,5 |
| `hifu cuenca` | — | — | — | — | — | — | — |

### F3. ¿Por qué se desplomó el cluster «near me»? **No fue la ficha, y tampoco es un patrón general**

La categoría de la ficha **no cambió** (verificado por el equipo el 3 de octubre: sigue «Massage spa», 94 reseñas, sin reseñas nuevas en 5 meses). Retiro esa atribución. Lo que sigue contrasta la hipótesis de **retirada por CTR cero sostenido** con los datos.

#### F3.1 · Fechar la rotura: es un decaimiento, no un corte

Serie diaria (impresiones):

| día | `best massage near me` | «near me» EN | impr pos >50 | impr pos 1-10 | total sitio |
|---|---|---|---|---|---|
| 5 sep | 36 | 44 | 322 | 110 | 502 |
| 7 sep | 46 | 51 | 310 | 159 | 526 |
| 11 sep | 46 | 53 | 184 | 140 | 371 |
| 13 sep | 41 | 44 | 184 | 116 | 355 |
| **14 sep** | **56** (máximo) | 60 | 246 | 166 | 499 |
| 15 sep | 24 | 24 | 169 | 111 | 327 |
| 16 sep | 14 | 18 | 118 | 108 | 254 |
| 17 sep | 10 | 11 | 85 | 127 | 248 |
| 19 sep | 12 | 16 | 83 | 109 | 223 |
| 20 sep | 8 | 11 | 60 | 89 | 193 |
| 21 sep | 4 | 7 | 83 | 105 | 235 |
| **22 sep** | **0** | 6 | 80 | 110 | 232 |
| 29 sep | 0 | 5 | 54 | 143 | 271 |

El decaimiento arranca el **15 de septiembre** (justo después del máximo del 14) y llega a cero el 22. Dos hechos:
- **La cola de pos >50 decae en la misma ventana** (246 → 60 entre el 14 y el 20 de septiembre). Las dos cosas pasan a la vez.
- **Las impresiones en pos 1-10 no se mueven** (89-166/día todo el mes, y las más altas son del 28 y 29: 137 y 143). Lo que se perdió está fuera de la primera página… **salvo `best massage near me`, que estaba en pos 6,9.**

#### F3.2 · El test de cohortes refuta la hipótesis general

Cohortes definidas en 2 jul–13 sep (≥20 impresiones), medidas en 14–29 sep, normalizado a impresiones/día:

| tramo | cohorte | n | impr/día antes | impr/día después | retención |
|---|---|---|---|---|---|
| pos 1-10 | CTR CERO | 25 | 38,5 | 29,6 | 77,0 % |
| pos 1-10 | con clics | 23 | 28,7 | 26,2 | 91,4 % |
| pos 11-30 | CTR CERO | 16 | 9,7 | 9,6 | 98,3 % |
| pos 11-30 | con clics | 9 | 6,5 | 11,4 | 175,6 % |
| pos 31-60 | CTR CERO | 28 | 27,1 | 23,1 | 85,2 % |
| pos >60 | CTR CERO | 238 | 243,4 | 84,6 | **34,8 %** |

A primera vista la primera fila parece confirmar la hipótesis: 77 % frente a 91 %. **No la confirma.** El control decisivo es quitar de la cohorte la propia consulta que se está juzgando:

| cohorte pos 1-10 | n | impr/día antes | impr/día después | retención |
|---|---|---|---|---|
| CTR CERO **con** `best massage near me` | 25 | 38,5 | 29,6 | 77,0 % |
| CTR CERO **sin** `best massage near me` | 24 | 14,8 | 20,5 | **138,3 %** |
| con clics | 23 | 28,7 | 26,2 | 91,4 % |

`best massage near me` aportaba 23,6 de las 38,5 impresiones/día de su cohorte: **el 61 % de la cohorte era la consulta bajo examen**. Sin ella, las otras 24 consultas de CTR cero en primera página **ganaron** exposición (+38 %), y lo hicieron mejor que las que sí recibían clics (91 %). Ejemplos de consultas con **cero clics en 74 días** y posición 1-10 que subieron: `blefaroplastia precio ecuador` 0,49 → 1,88 impr/día (**385 %**), `cuanto cuesta una lipo` 0,34 → 1,06 (315 %), `botox allergan precio ecuador` 0,34 → 0,75 (222 %), `precio de una abdominoplastia en ecuador` 0,80 → 1,50 (188 %), `abdominoplastia precio ecuador` 3,86 → 5,62 (146 %).

**Conclusión del test: en este sitio, tener CTR cero en primera página NO cuesta exposición.** Decenas de consultas lo demuestran. El patrón no es generalizable y no debe escribirse como aprendizaje reutilizable.

#### F3.3 · Lo que sí ocurrió: se podó la cola de página 3+, por página

El desplome real es de **páginas**, no de consultas, y está concentrado en posts informativos que vivían en posición 80-90. Impresiones/día antes (2 jul-13 sep) → después (14-29 sep):

| página | impr/día antes → después | retención | pos antes → después | clics |
|---|---|---|---|---|
| `/es/blog/plasma-rico-en-plaquetas` | 41,7 → 7,9 | **19 %** | 87,6 → 90,4 | 0 / 0 |
| `/en/blog/que-es-hifu-facial` | 36,0 → 11,5 | 32 % | 81,5 → 80,4 | 0 / 0 |
| `/es/blog/lipoescultura-sin-cirugia-…` | 27,4 → 8,1 | 30 % | 85,4 → 80,9 | 0 / 0 |
| `/en/blog/laser-co2-antes-y-despues` | 26,0 → 8,1 | 31 % | 64,2 → 61,5 | 0 / 0 |
| `/es/blog/eliminar-manchas` | 17,7 → 4,2 | 24 % | 90,1 → 89,6 | 0 / 0 |
| `/es/blog/que-es-el-laser-co2` | 16,5 → 5,4 | 33 % | 83,3 → 87,2 | 0 / 0 |
| `/es/blog/laser-co2-fraccionado-para-que-sirve` | 16,8 → 6,8 | 41 % | 83,7 → 82,2 | 0 / 0 |
| `/en/blog/tipos-de-lunares` | 15,2 → 3,1 | 21 % | 84,5 → 79,1 | 0 / 0 |
| `/es/blog/laser-co2-cicatrices-acne` | 14,9 → 2,8 | **19 %** | 85,2 → 79,3 | 0 / 0 |
| `/es/blog/microneedling-dermapen` | 11,6 → 1,8 | **16 %** | 84,6 → 70,9 | 0 / 0 |
| **subtotal del grupo HIFU/CO2/PRP/manchas** | **288,6 → 140,4** | **49 %** | — | 0 / 0 |

**La posición de estas páginas apenas se movió** (87,6 → 90,4; 81,5 → 80,4; 84,5 → 79,1). Siguen rankeando igual de mal; simplemente se las muestra mucho menos. Eso no es castigo por CTR: a esas posiciones nunca hubo CTR que castigar. Es Google sirviendo menos resultados de página 8-10 para consultas informativas genéricas (`plasma rico en plaquetas`, `tipos de nariz`, `tratamiento manchas`, `microneedling cara`).

**Dentro de esta poda hay una parte que es buena noticia y es identificable:** dos URL planas de la web antigua, sin prefijo de locale, pasaron a **cero exacto**:

| URL legacy | impr/día antes → después | pos antes | estado HTTP hoy |
|---|---|---|---|
| `/tipos-de-nariz-segun-su-forma-y-estructura-procedimientos-esteticos` | 11,5 → **0,0** | 81,6 | 308 → `/es/blog/rinoplastia-ecuador-…` |
| `/lipoescultura-sin-cirugia-tratamientos-efectivos-comparativa-liposuccion-tradicional` | 8,8 → **0,0** | 83,2 | 308 → `/es/blog/lipoescultura-sin-cirugia-…` |

Los redirects funcionan. Google por fin dejó caer esos duplicados del índice en la segunda quincena de septiembre. Son ~20 impresiones/día de las perdidas que **había que perder**.

#### F3.4 · Qué queda en pie para `best massage near me`

Es el único caso que la poda de cola no explica, porque estaba en posición 6,9. Lo que se puede afirmar con datos:

| evidencia | dato |
|---|---|
| la página sigue indexada y sana | `/en/blog/best-massage-cuenca-ecuador`: «Enviada e indexada», canónica propia, `PASS`, rastreada 3 sep |
| la posición **no** se degradó | 6,9 → 7,2 en las ventanas PRE/POST; la página se mantuvo en pos 6,9-8,0 todas las semanas |
| **sólo** cayó la hermana sin clics | `best massage near me` (0 clics / 1.895 impr en 90 d) → 0. `massage near me` (2 clics / 89 impr) **subió** a 19 impr en 21-27 sep, su mejor semana. `spa near me` (1 clic) retuvo 79 % |
| no hubo sustitución | ninguna consulta nueva de intención equivalente recogió esas impresiones |
| el cluster local no se tocó | consultas con «cuenca»: 179 → 186 → 143 → 151 impr/semana |

**La retirada por inanición de clics es la mejor explicación disponible para esta consulta concreta**, y el contraste con `massage near me` la apoya: dentro de la misma familia, la que recibía clics creció y la que no recibía ninguno desapareció, con la misma página sirviéndolas y la misma posición.

**Pero hay una explicación alternativa que encaja igual de bien y que el test de cohortes favorece:** `best massage near me` es una consulta de intención local **sin calificador geográfico**. Google estaba emparejando un post sobre Cuenca con una consulta «cerca de mí» lanzada desde cualquier parte del mundo — un desajuste de relevancia. Dejar de servirlo es corregir el emparejamiento, no castigar el CTR. Esta lectura explica además lo que la hipótesis de inanición no explica: **por qué ninguna de las otras 24 consultas de CTR cero en primera página perdió exposición**. El CTR cero sería entonces el *síntoma* del desajuste (nadie en Miami pulsa un resultado de Cuenca), no su causa.

GSC no puede separar las dos. **Lo honesto es dejarlo en n = 1.** Y una afirmación en la que las dos coinciden, que sí es segura: era una consulta con **694 impresiones y cero clics en cinco mediciones**; perderla no ha costado nada, y explica parte de la mejora aparente de posición media.

**Cómo zanjarlo en la próxima medición:** si fuera un castigo por CTR, el efecto debería repetirse en otras consultas al llegar a cero sostenido. La prueba ya está montada: `depilacion laser cuenca` acumula **0 clics con 49 impresiones en pos 5,9** en los últimos 30 días (antes tenía 3 clics), y `/es/blog/depilacion-laser-cuenca-precios` lleva **123 impresiones en pos 6,1 y cero clics**. Si en octubre o noviembre pierden exposición manteniendo la posición, la hipótesis de inanición gana. Si la mantienen, queda descartada y el caso de `best massage near me` se cierra como corrección de relevancia.

---

## G. Línea base de las keywords nuevas (90 d: 2 jul – 29 sep, coincidencia parcial)

### Español

| keyword objetivo | estado | clics | impr | pos |
|---|---|---|---|---|
| `masajes para hombres cuenca` | **con datos** (2 variantes) | 6 | 91 | 5,2 |
| `spa para hombres cuenca` | **con datos** | 2 | 8 | 5,2 |
| `armonización facial cuenca` | **con datos** | 0 | 7 | **2,9** |
| `hidratación facial profunda cuenca` | sin datos | — | — | — |
| `skin booster cuenca` | sin datos | — | — | — |
| `masaje descontracturante cuenca` | sin datos | — | — | — |
| `masaje piedras calientes cuenca` | sin datos | — | — | — |
| `rellenos cuenca` | sin datos | — | — | — |
| `ácido hialurónico cuenca` | sin datos | — | — | — |
| `prp capilar cuenca` | sin datos | — | — | — |
| `depilación láser hombres cuenca` | sin datos | — | — | — |
| `flacidez después de bajar de peso` | sin datos | — | — | — |
| `drenaje linfático blefaroplastia` | sin datos | — | — | — |

Detalle de las tres con datos:
- `masajes para hombres en cuenca`: 6 clics / 84 impr / pos 5,3 · `masajes cuenca para hombres`: 0 / 7 / pos 3,9
- `spa para hombres cuenca`: 2 / 8 / pos 5,2
- `armonizacion facial cuenca`: 0 / 7 / **pos 2,9** — posición 3 sin un solo clic y sin página propia. Es la oportunidad más limpia de la lista.

### Inglés

| keyword objetivo | estado |
|---|---|
| `deep tissue massage cuenca` | sin datos |
| `hot stone massage cuenca` | sin datos |
| `couples massage cuenca` | sin datos |
| `men's spa cuenca` | sin datos |
| `skin booster cuenca ecuador` | sin datos |
| `salmon dna cuenca` | sin datos |
| `sun spots treatment cuenca` | sin datos |
| `lip filler cuenca ecuador` | sin datos |
| `post surgery lymphatic drainage cuenca` | sin datos |
| `hair prp cuenca` | sin datos |

**Las 10 EN en cero a 90 días.** Esta tabla es la línea base: cualquier impresión futura en estos términos será atribuible al trabajo que se haga desde octubre. Recordatorio para la próxima medición: con ~20 % de clics visibles, un término puede recibir clics y no aparecer aquí; la métrica fiable para estos términos serán las **impresiones y la posición**, no los clics.

---

## H. Oportunidades y alertas

### H1. Páginas con ≥100 impresiones y CTR <1 % (30 d)

| página | clics | impr | CTR | pos | prev |
|---|---|---|---|---|---|
| `/es/blog/lipoescultura-360-ecuador-precios` | 17 | 2.259 | 0,75 % | **8,3** | 13 / 1.012 / 9,8 |
| `/en/blog/hifu-antes-y-despues` | 1 | 908 | 0,11 % | 27,7 | 0 / 685 / 33,5 |
| `/en/blog/best-massage-cuenca-ecuador` | 3 | 771 | 0,39 % | **7,4** | 8 / 782 / 6,9 |
| `/en/blog/que-es-hifu-facial` | 0 | 736 | 0 % | 81,8 | 0 / 1.311 |
| `/es/blog/lipoescultura-sin-cirugia-…-liposuccion-tradicional` | 0 | 482 | 0 % | 84,9 | 0 / 802 |
| `/en/blog/laser-co2-antes-y-despues` | 0 | 466 | 0 % | 63,7 | 0 / 998 |
| `/es/blog/plasma-rico-en-plaquetas` | 0 | 463 | 0 % | 91,7 | 0 / 1.070 |
| `/en/blog/hifu-beneficios-riesgos` | 2 | 454 | 0,44 % | 64,5 | 1 / 701 |
| `/es/blog/hifu-antes-y-despues` | 4 | 433 | 0,92 % | 15,7 | 4 / 304 |
| `/es/blog/laser-co2-fraccionado-para-que-sirve` | 0 | 348 | 0 % | 83,5 | 0 / 535 |
| `/es/blog/que-es-el-laser-co2` | 0 | 299 | 0 % | 87,8 | 0 / 487 |
| `/es/blog/eliminar-manchas` | 0 | 254 | 0 % | 90,9 | 0 / 528 |
| `/es/blog/laser-co2-cicatrices-acne` | 0 | 232 | 0 % | 86,6 | 0 / 469 |
| `/en/blog/tipos-de-lunares` | 0 | 208 | 0 % | 84,9 | 0 / 524 |
| `/es/blog/mejores-clinicas-cirugia-plastica-guayaquil-…` | 0 | 171 | 0 % | **15,8** | 0 / 141 / 15,8 |
| `/es/blog/que-es-hifu-facial` | 0 | 171 | 0 % | 81,2 | 0 / 302 |
| `/es/blog/rejuvenecimiento-facial-con-hifu` | 0 | 169 | 0 % | 88,6 | 0 / 65 |
| `/es/blog/tratamiento-de-carbon-activo-con-laser` | 0 | 144 | 0 % | 75,1 | 0 / 301 |
| `/es/blog/microneedling-dermapen` | 0 | 131 | 0 % | 79,7 | 0 / 417 |
| `/es/blog/hifu-beneficios-riesgos` | 1 | 130 | 0,77 % | 27,9 | 2 / 115 |
| `/es/blog/lifting-facial-…-opciones-no-invasivas` | 0 | 129 | 0 % | 87,3 | 0 / 213 |
| `/es/blog/depilacion-laser-cuenca-precios` | 0 | 123 | 0 % | **6,1** | 2 / 106 / 5,8 |
| `/es/blog/laser-co2-antes-y-despues` | 0 | 118 | 0 % | 54,3 | 0 / 150 |
| `/es/blog/hifu-vs-botox` | 0 | 111 | 0 % | 35,7 | 3 / 90 |
| `/en/blog/exosomas-rejuvenecimiento` | 0 | 108 | 0 % | 85,0 | 0 / 169 |

**Hay que separar dos cosas.** La mayoría de esta lista está en **posición 54-92**: ahí el CTR 0 % es lo normal y no es una oportunidad de CTR, es ausencia de ranking. Las **oportunidades reales** son las cuatro que tienen buena posición y CTR bajo:

| página | impr | CTR | pos | diagnóstico |
|---|---|---|---|---|
| `/es/blog/lipoescultura-360-ecuador-precios` | 2.259 | 0,75 % | 8,3 | 2.259 impresiones en pos 8 y 17 clics. Mayor reserva de clics del sitio. |
| `/en/blog/best-massage-cuenca-ecuador` | 771 | 0,39 % | 7,4 | arrastrada por `best massage near me`; su CTR cae porque esas impresiones son de paquete de mapas. |
| `/es/blog/depilacion-laser-cuenca-precios` | 123 | **0 %** | 6,1 | 123 impresiones en pos 6 y **cero clics** en 30 días; antes tenía 2. |
| `/es/blog/mejores-clinicas-…-guayaquil` | 171 | 0 % | 15,8 | pos 16 estancada, consulta no local. |

### H2. Alertas: páginas que perdieron ≥5 clics

| página | 30 d actual | 30 d previa | Δ | lectura |
|---|---|---|---|---|
| `/` | 26 / 1.490 / 1,74 % / 4,0 | 42 / 1.849 / 2,27 % / 4,3 | **-16** | posición intacta (pos 4), impresiones -19 %, CTR -0,53 pp. Pérdida de clics de marca. **Mayor caída absoluta del mes.** |
| `/es/blog/masajes-relajantes-en-cuenca-ecuador` | 18 / 608 / 2,96 % / 12,4 | 28 / 697 / 4,02 % / 11,6 | **-10** | parte es trasvase a `/es/servicios/masajes-relajantes` (+7). El cluster sube en la serie semanal. |
| `/es/servicios/drenaje-postoperatorio` | 6 / 211 / 2,84 % / 7,5 | 12 / 155 / 7,74 % / 6,8 | -6 | impresiones **+56** y clics a la mitad: caída pura de CTR en pos 7. |
| `/es/servicios/masajes-reductores` | 2 / 135 / 1,48 % / 9,2 | 8 / 143 / 5,59 % / 7,6 | -6 | pierde 1,6 puestos y el CTR se divide por 4. |
| `/en/blog/best-massage-cuenca-ecuador` | 3 / 771 / 0,39 % / 7,4 | 8 / 782 / 1,02 % / 6,9 | -5 | coincide con la desaparición de `best massage near me`. |

### H3. El artefacto de posición, documentado

Impresiones por tramo de posición (subconjunto visible de consultas), semana a semana:

| semana | pos 1-10 | pos 11-20 | pos 21-50 | pos >50 | total | clics |
|---|---|---|---|---|---|---|
| 17-23 ago | 688 | 119 | 260 | **2.214** | 3.281 | 15 |
| 24-30 ago | 664 | 200 | 274 | **2.365** | 3.503 | 14 |
| 31 ago-6 sep | 882 | 136 | 257 | 2.068 | 3.343 | 15 |
| 7-13 sep | 907 | 130 | 243 | 1.570 | 2.850 | 14 |
| 14-20 sep | 810 | 93 | 221 | **854** | 1.978 | 7 |
| 21-27 sep | 770 | 138 | 415 | **547** | 1.870 | 12 |
| 28-29 sep (parcial) | 280 | 34 | 159 | 130 | 603 | 4 |

Y en las dos ventanas de 30 días:

| tramo | 31 ago-29 sep | 1-30 ago |
|---|---|---|
| pos 1-10 | 44 clics / **3.649** impr | 50 clics / **3.057** impr |
| pos 11-20 | 7 / 531 | 7 / 536 |
| pos 21-50 | 1 / 1.295 | 2 / 1.197 |
| pos >50 | 0 / **5.169** | 0 / **9.939** |

**Las impresiones de pos >50 se redujeron a la mitad (-4.770) y las de pos 1-10 crecieron un 19 % (+592).** Toda la mejora de posición media de 44,6 a 29,2 está ahí. Entre las consultas que desaparecen después del 13 sep con ≥30 impresiones previas y cero clics: `plasma rico en plaquetas` (436 impr, pos 92,1), `tipos de nariz` (166, pos 81,3), `tipos de narices` (132), `formas de nariz` (127), `tratamiento con plasma` (103), `reducir grasa localizada sin cirugía` (100). Son consultas informativas genéricas en página 8-10. **No informar la mejora de posición como un logro de SEO.** El desglose por página de esta poda, y los dos duplicados legacy que salieron del índice dentro de ella, están en **F3.3**.

---

## I. Sitemaps

| ruta | enviado | última descarga | avisos | errores | URLs enviadas |
|---|---|---|---|---|---|
| `https://www.jennyveraspa.com/sitemap.xml` | 2026-09-07 | **2026-10-02** | 0 | 0 | 198 |
| `https://jennyveraspa.com/sitemap.xml` (apex) | 2025-06-05 | **2026-10-03** | **1** | 0 | 198 |

- Ambos se descargan al día y sin errores. El de `www` se reenvió el 7 de septiembre, coherente con el despliegue de ese día.
- El de apex arrastra un envío de **junio de 2025** y **1 aviso**. El apex redirige 308 a `www` (configurado en Vercel), así que esta entrada es un residuo: Google la sigue descargando y le da el mismo contenido. No está causando errores, pero conviene quitarla del panel para no tener dos entradas del mismo sitemap.
- El campo `indexed: 0` que devuelve la API está **obsoleto** en los dos casos; Google dejó de rellenarlo. No es un indicador de que no haya nada indexado — para eso hay que mirar el informe de cobertura.
- **Pendiente:** el sitemap de `www` no se ha reenviado desde el 7 de septiembre. Si se despliega contenido en octubre, hay que reenviarlo.

---

## Qué es señal y qué es ruido (lectura crítica)

**Señal defendible:**
- D1 (título de masajes). Las impresiones de `/es/servicios/masajes-relajantes` pasan de 16-30 a 156 por semana: un factor 7 no es ruido, y va acompañado de posición 13,8 → 8,0 y del regreso de `masajes cuenca ecuador` a pos 7,2.
- El desplome del cluster «near me» (305 → 42 → 10 impr/semana) y su fecha: decaimiento diario desde el 15 de septiembre, cero el 22. El **hecho** es firme; la **causa** no (F3.4).
- La poda de la cola: el grupo HIFU/CO2/PRP pasó de 288,6 a 140,4 impr/día con la posición quieta, y dos URL legacy a cero exacto. Son magnitudes grandes sobre bases grandes.
- El resultado del test de cohortes (24 consultas de CTR cero ganando un 38 % de exposición) es suficiente para **descartar** la regla general. Descartar exige menos evidencia que afirmar.
- La redistribución móvil → escritorio (-16 / +18 clics) y la caída de la portada (-16 clics) sobre bases de 1.500-1.900 impresiones.
- Las 4.770 impresiones menos en pos >50 y las 592 más en pos 1-10.

**Ruido, no conclusiones:**
- Las variaciones semanales de clics del sitio (62-79) en siete semanas: todas dentro del mismo rango.
- D2 y D3. `/es/servicios/laser-co2-fraccionado` mueve 4-6 impresiones/día y `/es/servicios/hifu-intimo` 9 en 22 días. A ese volumen un clic de diferencia es azar; ni «funcionó» ni «no funcionó», simplemente **no hay medición posible**. Hace falta más volumen antes de volver a preguntar.
- Cualquier consulta visible individual con 1-4 clics (todo el top 25 de la sección E2).
- Los CTR de páginas con menos de 50 impresiones (`despigmentacion-zonas-intimas` con 48, `eliminacion-lunares` con 95): el 20 % de CTR es real pero el intervalo es enorme.
- Las 44-63 impresiones de las traducciones EN: todavía no permiten decir si funcionan. Lo que **sí** es un hecho firme es que dos de las seis tienen 0 impresiones en 90 días.

## Cuestiones que este informe deja abiertas

1. **¿Por qué la portada pierde 16 clics con la posición intacta?** Son clics de marca anonimizados. Habría que ver si la ficha de Google absorbe ahora esas búsquedas de marca (cosa que GSC no muestra).
2. ~~**`/en/blog/spa-para-hombres-cuenca` y `/en/blog/depilacion-laser-cuenca-precios`: 0 impresiones en 90 días.**~~ **RESUELTO** en D4.1: la primera está indexada y sana (problema de competitividad, no técnico); la segunda está «Rastreada: actualmente sin indexar» y es la única accionable.
3. **¿Inanición por CTR o corrección de relevancia?** Es la única pregunta abierta de F3 y se resuelve observando, sin tocar nada, si `depilacion laser cuenca` (0 clics, 49 impr, pos 5,9) y `/es/blog/depilacion-laser-cuenca-precios` (0 clics, 123 impr, pos 6,1) pierden exposición en octubre-noviembre manteniendo la posición. Hace falta no desplegar nada sobre ese cluster para que la prueba sea limpia.
4. **La próxima medición de D1 debe ser a 4 semanas completas** (desde el 5 de octubre ya habrá datos hasta ~1 de octubre), para cerrar el tema del título de masajes con la ventana que se prometió.
5. **La ficha de Google sigue sin tocarse.** No hubo cambio de categoría, no hay reseñas nuevas en 5 meses y ninguna de las tres recomendaciones del 15 de septiembre se aplicó. Nada de lo medido aquí altera ese diagnóstico: `best massage near me` en pos 7 con cero clics durante cinco mediciones, y ahora sin impresiones, sigue apuntando al GBP y no al repositorio.

---

### Reproducibilidad

Scripts y respuestas JSON crudas en `/tmp/claude-1000/-home-mateo-Desktop-Github-jennyveraspa/4745c7d1-6a8b-483a-a5a5-7f887af2843b/scratchpad/gsc-oct/`:
`gsc.py` (cliente, solo lectura) · `fetch.py` (descarga) · `lib.py` (agregación con posición ponderada por impresiones) · `a_b.py`, `c.py`, `d.py`, `e.py`, `f_g.py`, `extra.py`, `pos.py`, `en.py` · `recon.py` y `recon2.py` (reatribución del cluster «near me» y test de cohortes) · `urlinspect.py` (API de inspección de URL) · `raw-*.json` (13 respuestas de searchAnalytics + sitemaps + `raw-urlinspection*.json`) · `live-sitemap.xml` (sitemap de producción, 198 URL).
Ninguna consulta usa `dataState: all`; todo es `final`. No se modificó ningún archivo del repositorio.

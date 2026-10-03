# Informe Meta Ads — Jenny Vera Spa · 3 de octubre de 2026

Cuenta `act_1661223548424128` · Página `1504934889727982` · Pixel `882066591229888`
Periodo principal: **3 sep – 2 oct 2026** · Comparativa: 15 ago – 14 sep 2026
Todo obtenido en **solo lectura** (CLI `meta` + GET a Graph API v21.0).

---

## Hallazgos clave

- **Sí, la cuenta volvió a funcionar.** El equipo creó una campaña nueva (`ADS - CAMPAÑA - SEP 20`) el **20 de septiembre a las 10:45**, con cuatro creatividades nuevas. El parón duró exactamente **5 días completos** (15–19 de septiembre, gasto cero verificado) más la tarde del 14.
- **El parón costó entre 8 y 19 conversaciones, con ~14 como cifra central**, y unos $14 de presupuesto sin gastar. Al ritmo de los 15 días previos (41 conversaciones en 15 días = 2,73/día), 5 días a cero equivalen a ~14 contactos de WhatsApp perdidos; con el ritmo malo de la semana del 7 sep (1,57/día) serían 8, con el récord del 31 ago (3,86/día) serían 19.
- **El relanzamiento batió el récord histórico de coste por conversación.** 30 días: **$71,58, 71 conversaciones, $1,008/conv**, frente a $87,46 / 65 conv / $1,35 del periodo anterior. Es decir, **−18 % de inversión y +9 % de conversaciones**: −25 % de coste por contacto pese a perder 5 días.
- **La semana del 21 al 27 de septiembre es el mejor dato de la cuenta: $20,58, 29 conversaciones, $0,71/conv**, por delante del anterior récord ($0,74 del 31 ago). El CTR también subió: 2,61 % en 30 días frente a 2,39 %.
- **Esta vez renovaron antes y el desgaste todavía no ha pegado, pero ya se ve el inicio.** `REEL - LÁSER CO 2` lleva 13 días corriendo y su CTR semanal ya cae 2,88 % → 2,52 % con el coste/conv pasando de $0,74 a $1,48. Añadieron `REEL - FACIAL` y `REEL - OPERARTE` el 23 de septiembre (día 3) y un `POST . PROMO` el 2 de octubre, así que el ciclo de renovación se acortó de 3 semanas a ~2 semanas y media.
- **El reparto automático vuelve a estrangular a las creatividades secundarias**, igual que en agosto: `REEL - LÁSER CO 2` se lleva **$28,15 de $38,54 (73 %)** mientras `REEL - FACIAL`, que convierte a **$0,67/conv** (un 36 % más barato), solo recibió $7,32 — y en la última semana bajó a $1,07. Es el mismo patrón que dejó a `REEL - CIRUGÍA - AGOSTO 25` en $5,77.
- **Facebook Reels se confirma como la posición más barata: $0,70/conv** (19 conv, $13,23) frente a Facebook feed $1,08 (15 conv, $16,20 = 42 % del gasto). Tercera medición consecutiva con el mismo resultado y el feed sigue llevándose la mayor tajada.
- **La ventaja de los hombres desapareció.** Mujeres $0,84/conv (27 conv) vs hombres $0,87 (18 conv) — prácticamente empate, frente al $0,86 vs $1,75 del mes anterior. Por edad manda **25-34 ($0,68, 19 conv)**; los extremos 65+ ($0,41) y 55-64 ($0,79) son baratos pero con volumen mínimo.
- **El pixel sigue mudo en `Contact`: 841 `PageView` y CERO `Contact` en 28 días**, idéntico al diagnóstico de septiembre. `last_fired_time` 2026-10-02 23:33 UTC, `is_unavailable: false` — el pixel funciona, pero Meta sigue descartando la baliza de imagen de la página puente.
- **Sin alertas graves**: ningún anuncio activo pasa de 13 días, el único `DISAPPROVED` está en una campaña pausada, el CTR del ad set (2,99 %) está muy por encima del 1 % y el presupuesto se entrega al 98,8 % ($38,54 de $39 disponibles en 13 días).

---

## A. Estado actual de la cuenta

**Hay actividad.** Una campaña activa, un ad set activo y cuatro anuncios entregando.

| Campaña | Estado | Presupuesto | Creada | Último cambio |
|---|---|---|---|---|
| **ADS - CAMPAÑA - SEP 20** | **ACTIVE** | $3,00/día (campaña) | 20 sep 10:45:15 | 20 sep 10:45:15 |
| ADS - CAMPAÑA - AGOSTO 25 | PAUSED | $3,00/día | 25 ago | **14 sep 16:42:42** (pausa) |
| ADS - POST QUIRURGICO 3 - AGOSTO 3 | PAUSED | $3,00/día | 3 ago | **14 sep 16:41:27** (pausa) |
| ADS . POST QUIRÚRGICO 2 - JULIO 21 | ACTIVE (caducada) | $3,10/día | 21 jul | 27 jul |
| ADS - POSTQUIRÚRGICO - JULIO 6 | ACTIVE (caducada) | $3,00/día | 6 jul | 6 jul |
| ADS - JENNY VERA - JUNIO 19 | ACTIVE (caducada) | $3,00/día | 19 jun | 19 jun |

Las tres marcadas «caducada» tienen `stop_time` ya pasado (29 jun, 21 jul, 31 jul), así que no entregan aunque figuren como `ACTIVE`.

**Cronología de lo ocurrido desde el 14 de septiembre:**

| Fecha y hora | Qué pasó |
|---|---|
| 14 sep 16:41 | Pausan `AGOSTO 3` |
| 14 sep 16:42 | Pausan `AGOSTO 25` → cuenta a cero |
| 15–19 sep | **Cinco días sin entrega ni gasto** |
| **20 sep 10:45** | Crean campaña `SEP 20` + ad set `AZUAY - SEP 20` + anuncio `REEL - LÁSER CO 2` |
| 20 sep 10:47 | Crean `REEL - POST QUIRÚRGICO - SEP 20` |
| 23 sep 17:58 | **Pausan** `REEL - POST QUIRÚRGICO - SEP 20` (tras 3 días y $0,51) |
| 23 sep 18:04 | Crean `REEL - OPERARTE - SEP 23` |
| 23 sep 18:05 | Crean `REEL - FACIAL - SEP 23` |
| **2 oct 09:16** | Crean `POST . PROMO - SEP 30` (ojo: el nombre dice «SEP 30» pero se creó el 2 de octubre) |

**Anuncios en la campaña activa** (los cinco cuelgan del mismo ad set `AZUAY - SEP 20`):

| Anuncio | Estado | Tipo | Tema | Creado |
|---|---|---|---|---|
| REEL - LÁSER CO 2 - SEP 20 | ACTIVE | vídeo | Láser CO₂ fraccionado (textura, manchas, cicatrices de acné) | 20 sep |
| REEL - POST QUIRÚRGICO - SEP 20 | **PAUSED** | vídeo | Cuidados postquirúrgicos | 20 sep |
| REEL - FACIAL - SEP 23 | ACTIVE | vídeo | «Dime qué piel tienes y te diré qué facial necesitas» | 23 sep |
| REEL - OPERARTE - SEP 23 | ACTIVE | vídeo | Paquete de 10 masajes linfáticos postoperatorios | 23 sep |
| POST . PROMO - SEP 30 | ACTIVE | **foto** | HIFU facial + esperma de salmón, 20 % de descuento | 2 oct |

Todos con CTA `WHATSAPP_MESSAGE`. `POST . PROMO` es el **primer anuncio de imagen estática** de la cuenta en meses: todo lo anterior era vídeo.

**Configuración**: el ad set `AZUAY - SEP 20` repite el molde de siempre — objetivo `CONVERSATIONS`, puja coste más bajo, **presupuesto en la campaña y no en el ad set**, Cuenca 40 km + Azogues 17 km, edades 20-65, sin segmentación de género, Advantage+ audience activo. Único cambio: añadieron `frequently_in` a los tipos de ubicación (antes solo `home` y `recent`), lo que amplía el alcance a quien frecuenta la zona sin vivir en ella.

---

## B. Totales

| Métrica | **3 sep – 2 oct** | 15 ago – 14 sep | Variación |
|---|---|---|---|
| Inversión | **$71,58** | $87,46 | −18,2 % |
| Impresiones | 25.725 | 28.064 | −8,3 % |
| Alcance | 10.396 | 9.450 | +10,0 % |
| Clics | 671 | 672 | ≈ igual |
| CTR | **2,61 %** | 2,39 % | +9,0 % |
| CPC | **$0,1067** | $0,1301 | −18,0 % |
| CPM | **$2,78** | $3,12 | −10,8 % |
| Frecuencia | **2,47** | 2,97 | −16,8 % |
| **Conversaciones iniciadas (7d)** | **71** | 65 | **+9,2 %** |
| **Coste por conversación** | **$1,008** | $1,35 | **−25,3 %** |

**Hubo días a cero**: 15, 16, 17, 18 y 19 de septiembre (5 días; el 15 devuelve fila con gasto 0, los otros cuatro no devuelven fila). Métricas recalculadas solo sobre los **25 días con gasto**:

| Métrica normalizada | 25 días con gasto | 15 ago–14 sep (31 días) |
|---|---|---|
| Inversión/día | $2,86 | $2,82 |
| Conversaciones/día | **2,84** | 2,10 |
| Impresiones/día | 1.029 | 905 |

Normalizado por día entregado, el relanzamiento rinde **+35 % de conversaciones diarias** con la misma inversión diaria.

---

## C. Series temporales

### Serie semanal (lunes–domingo)

| Semana | Inversión | Impresiones | Alcance (suma diaria) | Conv. | $/conv | Días con gasto |
|---|---|---|---|---|---|---|
| 31 ago – 6 sep | $19,97 | 7.493 | 6.173 | 27 | $0,74 | 7/7 |
| 7 – 13 sep | $20,97 | 6.573 | 5.549 | 11 | **$1,91** | 7/7 |
| 14 – 20 sep | $4,31 | 1.168 | 873 | 7 | $0,62 | **2/7** |
| **21 – 27 sep** | **$20,58** | 8.835 | 6.926 | **29** | **$0,71** | 7/7 |
| 28 sep – 2 oct (5 d) | $15,49 | 5.070 | 4.007 | 12 | $1,29 | 5/5 |

La semana del 14 al 20 de septiembre es la del parón: solo entregó el 14 (hasta las 16:41) y el 20 (desde las 10:45).

### Serie diaria (10 sep – 2 oct)

| Día | Inv. | Alcance | Conv. | | Día | Inv. | Alcance | Conv. |
|---|---|---|---|---|---|---|---|---|
| 10 sep | $3,41 | 887 | 3 | | 22 sep | $3,56 | 1.182 | **0** |
| 11 sep | $2,41 | 527 | 2 | | 23 sep | $2,07 | 572 | 5 |
| 12 sep | $1,96 | 489 | 1 | | 24 sep | $3,56 | 914 | 6 |
| 13 sep | $3,00 | 547 | 2 | | 25 sep | $2,86 | 1.079 | 6 |
| **14 sep** | $1,84 | 360 | 3 | | 26 sep | $2,70 | 1.410 | 3 |
| **15 sep** | **$0** | 0 | 0 | | 27 sep | $3,52 | 1.236 | 3 |
| **16 sep** | — | — | — | | 28 sep | $3,33 | 828 | 1 |
| **17 sep** | — | — | — | | 29 sep | $2,78 | 762 | 1 |
| **18 sep** | — | — | — | | 30 sep | $3,53 | 1.010 | 4 |
| **19 sep** | — | — | — | | 1 oct | $3,00 | 687 | 3 |
| **20 sep** | $2,47 | 513 | 4 | | 2 oct | $2,85 | 720 | 3 |
| 21 sep | $2,31 | 533 | 6 | | | | | |

El arranque fue inmediato: 4 conversaciones el primer día parcial y 6 el segundo, los dos mejores días desde el 2 de septiembre.

---

## D. Rendimiento por anuncio desde la reactivación (20 sep – 2 oct)

| Anuncio | Inv. | % gasto | Impr. | Alcance | Clics | CTR | Frec. | Conv. | $/conv | Días |
|---|---|---|---|---|---|---|---|---|---|---|
| **REEL - LÁSER CO 2 - SEP 20** | $28,15 | **73 %** | 10.328 | 4.470 | 277 | 2,68 % | 2,31 | **27** | $1,04 | 13 |
| REEL - FACIAL - SEP 23 | $7,32 | 19 % | 3.213 | 1.977 | 102 | 3,17 % | 1,63 | 11 | **$0,67** | 10 |
| POST . PROMO - SEP 30 | $1,41 | 4 % | 494 | 336 | 30 | **6,07 %** | 1,47 | 3 | **$0,47** | 1 |
| REEL - OPERARTE - SEP 23 | $1,15 | 3 % | 485 | 221 | 19 | 3,92 % | 2,19 | 3 | **$0,38** | 10 |
| REEL - POST QUIRÚRGICO - SEP 20 | $0,51 | 1 % | 151 | 80 | 11 | 7,28 % | 1,89 | 1 | $0,51 | 3 (pausado) |

### ¿Se repite el desgaste a las 3 semanas?

Todavía no ha habido tiempo (13 días), pero **la señal limpia —el CTR de la creatividad— ya empezó a bajar**:

| Anuncio | Semana 1 (20-26 sep) | Semana 2 (27 sep-2 oct) |
|---|---|---|
| REEL - LÁSER CO 2 | $11,91 · CTR **2,88 %** · frec 2,01 · 16 conv · **$0,74** | $16,24 · CTR **2,52 %** · frec 1,85 · 11 conv · **$1,48** |
| REEL - FACIAL | $6,25 · CTR 3,11 % · frec 1,51 · 10 conv · $0,62 | $1,07 · CTR 3,60 % · frec 1,17 · 1 conv · $1,07 |

`LÁSER CO 2` reproduce el patrón conocido: CTR monótono a la baja (2,88 → 2,52 %) y el coste/conv duplicándose ($0,74 → $1,48), exactamente el perfil que precedió al agotamiento de `REEL - LIMPIEZA FACIAL` en agosto. **La diferencia es que esta vez renovaron el día 3** (dos creatividades nuevas el 23 sep) y añadieron una tercera el 2 de octubre, en lugar de esperar a la tercera semana.

`REEL - FACIAL` es el caso opuesto y el más preocupante desde el punto de vista del reparto: su CTR **sube** (3,11 → 3,60 %) y su frecuencia es baja (1,17), pero el algoritmo le recortó el gasto de $6,25 a $1,07. Es una creatividad fresca a la que se está apagando la entrega.

---

## E. Breakdowns (20 sep – 2 oct, periodo con la campaña nueva)

### Por posición (Graph API, `publisher_platform,platform_position`)

| Plataforma | Posición | Inv. | % gasto | Impr. | Clics | CTR | Frec. | Conv. | $/conv |
|---|---|---|---|---|---|---|---|---|---|
| Facebook | feed | $16,20 | 42 % | 6.717 | 254 | 3,78 % | 1,96 | 15 | $1,08 |
| **Facebook** | **facebook_reels** | **$13,23** | 34 % | 4.526 | 121 | 2,67 % | 1,75 | **19** | **$0,70** |
| Instagram | feed | $3,35 | 9 % | 1.157 | 17 | 1,47 % | 1,50 | 4 | $0,84 |
| Instagram | instagram_reels | $2,83 | 7 % | 1.381 | 17 | 1,23 % | 1,60 | 3 | $0,94 |
| Instagram | instagram_stories | $1,84 | 5 % | 504 | 19 | 3,77 % | 1,63 | 2 | $0,92 |
| Facebook | facebook_stories | $0,76 | 2 % | 295 | 5 | 1,69 % | 1,44 | 1 | $0,76 |
| Facebook | instream_video | $0,33 | 1 % | 83 | 6 | 7,23 % | 1,24 | 1 | $0,33 |
| Instagram | explore_grid_home | $0,00 | — | 3 | 0 | — | 1,00 | 0 | — |
| Facebook | search | $0,00 | — | 5 | 0 | — | 1,00 | 0 | — |

**Confirmado por tercera vez: Facebook Reels es la posición más barata** ($0,70/conv) y el feed de Facebook sigue consumiendo la mayor parte del presupuesto a un coste 54 % superior. Los Stories, que en agosto eran lo más caro ($2,06-2,13), ahora rinden $0,76-0,92, aunque con 1-2 conversiones el dato no es concluyente.

### Por plataforma

| Plataforma | Inv. | Impr. | Alcance | Clics | CTR | Frec. | Conv. | $/conv |
|---|---|---|---|---|---|---|---|---|
| Facebook | $30,52 | 11.626 | 5.197 | 386 | **3,32 %** | 2,24 | 36 | **$0,85** |
| Instagram | $8,02 | 3.045 | 1.626 | 53 | 1,74 % | 1,87 | 9 | $0,89 |

### Por edad

| Edad | Inv. | % gasto | Clics | CTR | Frec. | Conv. | $/conv |
|---|---|---|---|---|---|---|---|
| 18-24 | $3,89 | 10 % | 33 | 1,61 % | 2,45 | 3 | $1,30 |
| **25-34** | $12,95 | **34 %** | 123 | 2,41 % | 2,49 | **19** | **$0,68** |
| 35-44 | $11,57 | 30 % | 118 | 2,81 % | 2,28 | 12 | $0,96 |
| 45-54 | $6,11 | 16 % | 90 | 4,14 % | 2,22 | 4 | $1,53 |
| 55-64 | $2,38 | 6 % | 45 | 6,04 % | 1,99 | 3 | $0,79 |
| 65+ | $1,64 | 4 % | 30 | **7,67 %** | 2,27 | 4 | **$0,41** |

Se invierte el cuadro de agosto: el núcleo **25-34 pasa a ser el mejor segmento** ($0,68, antes $1,31-1,56) y **18-24 se hunde** ($1,30, antes $0,78). Los mayores de 55 mantienen CTR altísimo (6-7,7 %) y coste bajo con volumen pequeño.

### Por género

| Género | Inv. | Clics | CTR | Frec. | Conv. | $/conv |
|---|---|---|---|---|---|---|
| Mujeres | $22,65 | 303 | 3,52 % | 2,26 | 27 | $0,84 |
| Hombres | $15,72 | 134 | 2,24 % | 2,35 | 18 | $0,87 |
| Desconocido | $0,17 | 2 | 3,33 % | 2,22 | 0 | — |

**La ventaja masculina del mes anterior no se confirma.** De $0,86 vs $1,75 (hombres casi el doble de eficientes) pasamos a $0,84 vs $0,87, un empate técnico. Era un artefacto de la creatividad de agosto, no una propiedad del público.

### Por dispositivo

| Dispositivo | Inv. | Impr. | Clics | CTR | Conv. | $/conv |
|---|---|---|---|---|---|---|
| mobile_app | $38,49 | 14.657 | 438 | 2,99 % | 45 | $0,86 |
| mobile_web | $0,05 | 14 | 1 | 7,14 % | 0 | — |

Entrega 100 % móvil dentro de las apps. Nota: `device_platform` no desglosa iOS/Android — el dato de agosto venía de `impression_device`.

---

## F. Pixel `882066591229888`

| Campo | Valor |
|---|---|
| `name` | WebsitePixel |
| `last_fired_time` | **2026-10-02T23:33:05+0000** |
| `is_unavailable` | `false` |
| `creation_time` | 2026-07-26 |

**Eventos de los últimos 28 días (5 sep – 3 oct, agregación por evento, 2 páginas paginadas):**

| Evento | Total |
|---|---|
| PageView | **841** |
| **Contact** | **0** |

**Sigue exactamente igual que en septiembre.** El pixel dispara con normalidad (`PageView` llegando hasta anteayer por la noche) pero **no se ha registrado ni un solo `Contact`**. Los `PageView` bajan de 966 a 841 (−13 %), coherente con el parón de 5 días en la publicidad.

No se ha vuelto a diagnosticar la causa: el motivo ya está documentado (la baliza de imagen sale, Meta responde 200 y la descarta por falta de `dl` y de cookie `fbp`). La consecuencia operativa es la de siempre: **la optimización por conversión web es imposible** y la única métrica de contacto utilizable sigue siendo `onsite_conversion.messaging_conversation_started_7d`, que se mide dentro de Meta.

---

## G. Alertas

| Alerta | Estado | Detalle |
|---|---|---|
| **Frecuencia ≥ 3** | **Sin alerta** | Frecuencia de 30 días en 2,47 (bajó desde 2,97). El anuncio más expuesto, `REEL - LÁSER CO 2`, va en 2,31 y su frecuencia semanal incluso bajó (2,01 → 1,85). Por edad, 25-34 llega a 2,49 — el máximo de la cuenta, todavía bajo el umbral. |
| **Anuncios con > 21 días corriendo** | **Sin alerta** | El anuncio activo más antiguo (`REEL - LÁSER CO 2`) lleva **13 días**. Ninguno se acerca al umbral. |
| **Anuncios `DISAPPROVED`** | **Alerta residual** | `REEL - MASAJE LINFÁTICO - AGOSTO 3` sigue rechazado desde el 7 de agosto, pero su campaña está pausada, así que no bloquea entrega. Conviene eliminarlo o corregirlo para que no ensucie la calidad de la cuenta (acción del equipo de marketing). |
| **Ad sets con CTR < 1 %** | **Sin alerta** | `AZUAY - SEP 20` va en **2,99 %** de CTR. La peor posición individual es `instagram_reels` con 1,23 %, por encima del 1 %. |
| **Presupuesto sin entregar** | **Sin alerta** | $38,54 gastados de $39,00 disponibles en 13 días = **98,8 % de entrega**. El 30 de septiembre llegó a $3,53, por encima del nominal (Meta permite picos diarios). |
| **Reparto desequilibrado entre creatividades** | **Alerta** | `REEL - LÁSER CO 2` concentra el 73 % del gasto a $1,04/conv mientras `REEL - FACIAL` ($0,67/conv) y `REEL - OPERARTE` ($0,38/conv) reciben el 19 % y el 3 %. Es la tercera vez que el reparto automático premia a la creatividad peor y la cuenta deja dinero sobre la mesa. |
| **Día en blanco** | **Observación** | El 22 de septiembre gastó $3,56 (el tercer día de más gasto del periodo) y produjo **cero conversaciones** — el único día así desde el relanzamiento. Coincide con el máximo de impresiones de la semana (1.592), señal de entrega mal cualificada ese día. |
| **Nomenclatura** | **Observación** | `POST . PROMO - SEP 30` se creó el **2 de octubre**, no el 30 de septiembre. Si el equipo usa los nombres para fechar ciclos de renovación, la etiqueta induce a error en el seguimiento del desgaste. |

---

## Para la próxima medición (sugerido: ~17 de octubre)

1. **El desgaste de `REEL - LÁSER CO 2` cumple 3 semanas el 11 de octubre.** Esa fecha es el punto de control: si el CTR sigue la pendiente 2,88 → 2,52 %, debería estar en torno al 2,2 % y el coste/conv por encima de $1,50. Es la cuarta oportunidad de validar el ciclo de 3 semanas.
2. **Medir si `POST . PROMO` (foto, 20 % de descuento) aguanta.** Arrancó con un CTR del 6,07 % y $0,47/conv en un solo día: es el primer formato estático y la primera creatividad con oferta explícita de la cuenta. Con 13 días de datos será la prueba de si la promoción con descuento bate al contenido educativo.
3. **El reparto automático es el punto de fuga recurrente.** Con presupuesto a nivel de campaña y Advantage+ activo, no hay forma de proteger a la creatividad eficiente. Es una recomendación para el equipo de marketing, no una acción nuestra: separar `REEL - FACIAL` en su propia campaña con su propio presupuesto permitiría comprobar si a $0,67/conv escala o si ese coste solo existe mientras recibe poco gasto.
4. **Comprobar si se mantiene el empate entre géneros.** Dos mediciones contradictorias (hombres el doble de eficientes en agosto, empate en septiembre) indican que el dato depende de la creatividad, no del público. Una tercera medición decide si merece la pena segmentar.

---

*Informe generado en modo solo lectura: `meta auth status`, `campaign/adset/ad list`, `ad get`, `insights get` (con `--breakdown` y `--time-increment daily|weekly`) y peticiones GET a Graph API v21.0 para `platform_position` y los datos del pixel. No se ejecutó ninguna operación de escritura sobre la cuenta publicitaria.*

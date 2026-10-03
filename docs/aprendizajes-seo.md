# Aprendizajes — qué mueve la aguja en este sitio y qué no

**Última actualización:** 7 de septiembre de 2026.

Este documento recoge lo que hemos **medido**, no lo que suena razonable. Cada afirmación va con la cifra que la sostiene y la fecha en que se comprobó. Si una intervención futura contradice algo de aquí, actualizar el documento con los datos nuevos en lugar de borrarlo: el historial de lo que falló vale tanto como el de lo que funcionó.

Las mediciones salen de `docs/snapshot-*.md`. Las intervenciones, del historial de git.

---

## 1. Lo que funciona

### 1.1 Reparar el enlazado interno — la palanca más fiable

Es lo único que ha dado un retorno grande, rápido y sin efectos secundarios.

| Página | Antes | Después | Intervención |
|---|---|---|---|
| `cuanto-cuesta-abdominoplastia-ecuador` | 2 clics · CTR 0,24 % | **9 clics · CTR 0,90 %** | Pasó de 0 a 3 enlaces entrantes |
| `/es/servicios/plasma-rico-plaquetas` | pos 12,2 · CTR 4,76 % | **pos 4,2 · CTR 9,09 %** | +1 enlace desde su post |
| `/en/servicios/botox` | pos 5,4 | **pos 3,2 · CTR 23 %** | +1 enlace desde su post |

**Por qué funciona aquí:** con DR 0,1 y casi sin enlaces externos, la autoridad interna es prácticamente la única señal que podemos controlar. Una página huérfana no recibe nada.

**Cómo encontrar las oportunidades:** hay que construir el grafo **real**, no el aparente. Ver §3.1.

### 1.1 bis Matiz medido el 3 oct 2026: el enlazado solo rinde si la página destino tiene volumen

El enlazado interno funcionó espectacularmente en agosto (`abdominoplastia` ×4,5 en clics, `plasma-rico-plaquetas` +8 puestos) porque esas páginas ya recibían cientos de impresiones. Repetido en septiembre sobre páginas sin volumen, **no dio nada**: `/es/servicios/laser-co2-fraccionado` mueve 4-6 impresiones diarias y quedó en 6 clics frente a 5; `/es/servicios/hifu-intimo` tuvo **9 impresiones en 22 días**. No es que falle: es que a ese volumen no hay medición posible.

**Regla:** antes de enlazar hacia una página, comprobar que tiene al menos ~100 impresiones mensuales. Si no las tiene, el problema no es el enlazado.

### 1.2 Contenido para keywords locales sin competencia

`spa-para-hombres-cuenca` (creado el 7 de julio) está en **posición 6,3 con 14,8 % de CTR**. Es de los mejores rendimientos del sitio.

El patrón que funciona: intención local + nicho poco disputado. Lo que **no** funciona es contenido sobre términos nacionales genéricos (`plasma rico en plaquetas`, `microneedling`, `laser co2`): están en posición 76-91 y llevan meses sin moverse, porque ahí compite la autoridad de dominio, que no tenemos.

### 1.3 Renovar creatividades en Meta cada ~3 semanas

Validado en **cuatro** ciclos independientes (el cuarto, el del 20 de septiembre, es además la prueba de que renovar ANTES funciona mejor):

| Ciclo | Antes de renovar | Después | Tres semanas después |
|---|---|---|---|
| 3 de agosto | $2,98 / conversación | **$1,03** | $2,69 |
| 25 de agosto | $2,32 / conversación | **$0,74** | $1,91 |
| **20 de septiembre** (renovaron el día 3, no en la semana 3) | $1,91 | **$0,71** · 29 conv · mejor semana histórica | por medir el 11 de octubre |

El ciclo del 20 de septiembre cerró el mes a **$1,008/conversación con un 18 % menos de inversión y un 9 % más de conversaciones**, perdiendo cinco días de pausa. Renovar en el día 14-18 en lugar de esperar al 21 está validado.

**Dos patrones colaterales confirmados tres veces cada uno:** Facebook Reels es la posición más barata ($0,70-0,83/conv frente a $1,08-1,74 del feed, que se lleva el 42-44 % del gasto); y **el reparto automático de Meta estrangula la pieza buena** si comparte conjunto de anuncios con otra (`REEL - FACIAL` convierte a $0,67 y cayó de $6,25 a $1,07 semanales *subiendo* su CTR, mientras `REEL - LÁSER CO 2` acaparaba el 73 % del gasto a $1,04). Una pieza que se quiera probar va en conjunto aparte.

**Creencia derribada el 3 oct 2026:** la ventaja de los hombres ($0,86 frente a $1,75 de las mujeres en agosto) era **artefacto de la creatividad**, no del público: con las piezas nuevas quedó en $0,87 frente a $0,84, y el segmento 25-34 pasó de peor a mejor ($0,68). No resegmentar sobre un mes de datos.

El patrón es mecánico: renuevan → el coste se desploma; se dejan correr tres semanas → se multiplica por ~2,6. El 7 de septiembre quedó escrita la predicción de que el coste subiría esa semana, y subió. La señal limpia no es el coste diario (ruidoso con 1-6 conversaciones/día) sino **el CTR de la creatividad**, que baja de forma monótona semana a semana (2,95 → 2,41 → 2,21 %). Conviene programar la renovación para el día 14-18, y probar la segunda pieza en un ad set separado: en el mismo ad set Meta la estrangula a los tres días ($5,77 en 20 días para `REEL - CIRUGÍA`).

### 1.4 La página puente para medir clics a WhatsApp

Los eventos personalizados de Vercel Analytics cuestan plan Pro (402). Enrutar todos los CTA por `/[locale]/whatsapp` convierte cada clic en un pageview, que sí es gratuito. Funciona y ya da la única métrica de conversión del sitio: **84 clics/mes, 12,7 % de los visitantes limpios** (sep 2026; 66 y 10,2 % en agosto).

---

## 2. Lo que NO funciona

### 2.1 Tocar títulos que ya rinden — dos fracasos medidos

**Experimento 1 (25 de julio): meter la cifra de precio en el título.**
Hipótesis: los títulos se truncaban y no mostraban cifra, por eso el CTR era ~0 en consultas de precio.

| | Antes | Después |
|---|---|---|
| 5 páginas retituladas | 19 clics · 1.736 impr · CTR 1,09 % | **11 clics · 2.248 impr · CTR 0,49 %** |

Menos clics con más impresiones. El CTR se partió por la mitad.

**Experimento 2 (13 de agosto): acortar el título para evitar el truncado.**
Se acortó `Masajes Relajantes en Cuenca, Ecuador — Spa Profesional` a `Masajes Relajantes en Cuenca`, lo que eliminó la palabra «Ecuador».

| Semana | Clics | Impr. | Pos. |
|---|---|---|---|
| 21–27 jul (antes) | 3 | 76 | **9,0** |
| 1–6 sep (después) | 0 | 22 | **15,7** |

`masajes cuenca ecuador` pasó de la posición ~10 a la **58**. `massage cuenca ecuador` desapareció.

**La evidencia que cierra el caso:** hay **14 títulos truncados en español y 10 en inglés** que llevan meses así, y son de los que mejor convierten del sitio (CTR del 23 % y del 33 %). **El truncado nunca fue el problema.**

> **Regla:** no tocar el título de una página que ya recibe clics. Si hay que tocarlo, cambiar uno solo, medir cuatro semanas y solo entonces extender. Nunca en lote.

### 2.1 bis Confirmado el 3 oct 2026: devolver el modificador geográfico recuperó la página

Cierre del experimento. Al devolver «Ecuador» al título de `/es/servicios/masajes-relajantes` el 7 de septiembre, medido a 22 días contra ventana simétrica:

| | Post (8–29 sep) | Pre (16 ago–6 sep) |
|---|---|---|
| Clics | **11** | 3 |
| Impresiones | **240** | 71 |
| Posición | **8,3** | 12,4 |
| `masajes cuenca ecuador` | pos **7,2** | pos 8,4 (y pos 58 en agosto, sin «Ecuador») |

Impresiones ×7 y 4 puestos recuperados. **La regla de CLAUDE.md queda validada con datos en ambas direcciones**: quitarlo costó 6 puestos, devolverlo los recuperó. En inglés no hubo ningún efecto: el cambio solo movió el mercado ES.

### 2.2 Quitar el modificador geográfico

Corolario del anterior, pero merece su propia regla porque el daño fue el mayor de todos.

19 de las 20 páginas de servicio en español llevan «Ecuador» en el título. Quitarlo de una sola rompió el patrón del sitio y le costó **seis puestos de posición**.

> **Regla:** «en Cuenca, Ecuador» se mantiene en el título de toda página de servicio. Es la señal geográfica que sostiene el posicionamiento local.

### 2.3 Consolidar un cluster con 301 — resultado negativo por ahora

El 13 de agosto se fusionaron dos posts casi duplicados y se redirigió el débil al fuerte.

| | Antes | Después |
|---|---|---|
| Cluster de masajes completo | 46 clics | **19 clics (−59 %)** |

**Matices honestos:** el 301 funcionó técnicamente (la URL fusionada dejó de recibir impresiones, un solo salto, sin cadenas), la consulta `masajes cuenca` mantuvo impresiones y posición estables, y un 301 tarda entre 2 y 6 semanas en consolidar. Parte de la caída se solapa con el error del título (§2.2), que se corrigió el 7 de septiembre.

> **Regla:** no combinar nunca un 301 con un cambio de título en el mismo despliegue. Al medir es imposible saber cuál de los dos causó el efecto. Uno, medir, y después el otro.

### 2.4 Escribir más blogs

Con 59 posts en español y 35 en inglés, el limitante no es el volumen. Las páginas que no rankean llevan meses en posición 76-91 por autoridad de dominio, no por falta de contenido.

Lo que sí falta: traducciones al inglés de posts que ya rinden, y enlaces hacia lo que ya existe.

---

### 2.5 Traducir al inglés posts que rankean en español — no rindió

Era la táctica recomendada («lo que sí rinde: enlazado interno y traducciones EN de posts que ya rankean»). Medido a 22 días sobre las seis traducciones del 7 de septiembre: **5 clics en total**, 44-63 impresiones cada una, y **dos sin una sola impresión en tres meses** (`/en/blog/spa-para-hombres-cuenca`, `/en/blog/depilacion-laser-cuenca-precios`) pese a estar en el sitemap, devolver 200, tener canonical autorreferencial y no llevar `noindex`.

La canibalización **sí quedó descartada** (las EN mueven el 1-6 % de las impresiones de sus pares ES, y donde el ES cae lo hace con más impresiones y menos CTR, que es patrón de SERP). Pero el conjunto del inglés retrocedió ese mes: `/en/contacto` −57 % de visitas, clics EN a WhatsApp 18 → 16.

**Conclusión:** traducir no cuesta tráfico, pero tampoco lo trae por sí solo. Antes de traducir más, entender por qué dos no se indexaron y reenviar el sitemap (llevaba sin reenviarse desde el despliegue).

## 3. Trampas del entorno que ya nos han costado tiempo

### 3.1 El grafo de enlaces aparente no es el real

`getRelatedPostsByTags` (`src/lib/blog-content.ts`) genera enlaces **en tiempo de render** a partir del solapamiento de tags. No aparecen en ningún MDX.

Contar solo los enlaces escritos a mano llevó a un diagnóstico equivocado: creí que cuatro posts de precio eran huérfanos cuando solo lo era uno. Para auditar hay que **replicar el algoritmo**: solapamiento de tags, desempate por fecha, límite de 3, y comparación **dentro del mismo locale**.

Un `relatedPost` que apunte a un slug inexistente en ese idioma **se ignora en silencio**: el bloque sale vacío sin error. Cuatro páginas de servicio en inglés estuvieron así meses.

### 3.2 Vercel Analytics infla el tráfico con bots

Entre el 25 % y el 42 % del panel es tráfico automatizado. La señal fiable es una proporción **visitantes : páginas vistas de exactamente 1:1** (un humano navega; un bot pide una página y se va).

China lleva cuatro mediciones seguidas apareciendo así (100 → 203 → 222 → 162 visitantes). **Restarlo siempre antes de citar cualquier cifra**, y contrastar contra GSC.

Desde septiembre de 2026 hay un **segundo bot con IPs rotadas por 14+ países** (México, Singapur, Hong Kong, Malasia… 4-16 visitantes cada uno, 1:1, sin referrer, cero Ecuador) que la regla «≥20 y 1:1» ya no atrapa. Infló `lipoescultura-360-ecuador-precios` de ~25 a 60 visitantes. Regla ampliada: **país 1:1 con ≥4 visitantes, sin referrer y 0 % Ecuador**. `filter=country ne 'CN'` funciona en la API y es la limpieza barata.

Otros límites del panel descubiertos el 15 sep: el plan Hobby solo sirve **30 días** (la ventana anterior deja de ser consultable — comparar contra el snapshot escrito); `by=day` existe y es gratis; en `aggregate` hay que pasar `until=YYYY-MM-DDT23:59:59Z` o corta a la 01:00 de ese día.

### 3.3 Comparar sin ventanas simétricas engaña

Todas las comparativas de estos snapshots usan ventanas del mismo número de días alrededor de la fecha de despliegue. Comparar «los últimos 30 días» contra «el mes pasado» mezcla efectos estacionales con los de la intervención.

Ojo también con el desfase de GSC: los datos tardan 2-3 días. El último día disponible nunca es hoy.

### 3.4 Verificar un despliegue con una señal que ya existía

Al comprobar si un deploy había propagado busqué `href="/en/blog/` en una página que ya tenía esos enlaces en su navegación. Dio positivo al primer intento y era falso.

> **Regla:** verificar siempre con una cadena **única del cambio nuevo**, y añadir un parámetro anticaché (`?cb=$RANDOM`).

### 3.5 Detalles de comandos que fallan en silencio

| Síntoma | Causa | Solución |
|---|---|---|
| `npm run start -p 4311` → «no such directory: 4311» | npm se come el flag | `npm run start -- -p 4311` |
| El servidor sigue sirviendo la versión vieja | `pkill -f next-server` no lo mata | `fuser -k 4311/tcp` |
| `meta auth status` dice «Authenticated» pero todo falla con error 190 | El fichero de credenciales tiene formato dotenv | Token **pelado**, sin `ACCESS_TOKEN=`. `auth status` no valida contra la API: comprobar con `meta ads adaccount list` |
| `by=utmSource` en Vercel → 402 | Exige Enterprise o Web Analytics Plus | Solo se puede contar el total por `requestPath` |
| El Pixel de Meta instalado pero mudo | La CSP bloquea `connect.facebook.net` | Añadirlo a `script-src` en `next.config.ts` |
| `fbq('track', …)` no dispara en la página puente | `next/script` con `afterInteractive` inyecta **después** de la hidratación; `window.fbq` aún no existe | Baliza de imagen: `new Image().src = "https://www.facebook.com/tr?id=…&ev=Contact&noscript=1"` |
| Un script de limpieza masiva se traga el fichero entero | Con el flag `re.S`, un `.*$` no para en el salto de línea | Usar `[^\n]*` en los patrones de línea |

### 3.6 El paquete de mapas no se combate con código

`best massage near me` lleva **cuatro mediciones consecutivas** en primera página (posición 5,7-7,0) con **cero clics** (694 impr en la última ventana de 30 días).

Cuando el título está bien, la posición es buena y aun así el CTR es cero, no es un problema técnico: el paquete de mapas se lleva el tráfico. La única palanca es el Google Business Profile (`fase-1-gbp-y-resenas.md`). Ninguna cantidad de trabajo en el repo lo va a mover.

---

### 3.7 «Las redes no traen tráfico» tenía una causa trivial que nadie miró

Tres snapshots seguidos (jul, ago, sep) reportaron cero visitas desde Instagram/TikTok y recomendaron «revisar el enlace de la bio». El 15 de septiembre se consultó la Graph API y la ficha pública: **ninguna de las tres redes tenía enlace al sitio** — Instagram con `bio_links` vacío, Facebook sin `website` y con «www.jenny vera. com» escrito con espacios en la descripción, TikTok sin enlace. Lección: **cuando una métrica lleva meses en cero exacto, verificar el mecanismo antes de seguir midiendo**. Un cero exacto casi nunca es «bajo rendimiento»; es que la tubería no existe.

### 3.8 Que la baliza salga no significa que Meta la cuente

El pixel registró 966 PageView y **cero `Contact`** en 28 días pese a 84 clics reales a WhatsApp. La baliza de imagen (`/tr?ev=Contact&noscript=1`) sí se envía y Meta responde 200 — verificado en Playwright —, pero Meta descarta hits sin `dl`, sin `fbp` ni contexto de navegador. **Verificar una integración de analítica por el lado del receptor** (`/{pixel}/stats?aggregation=event`), no solo por el emisor. Arreglo pendiente: stub `fbq` inline y `fbq('track','Contact')` con la cola estándar.

### 3.9 Dos límites de la API de Search Console que cambian la lectura

- **~80 % de los clics vienen de consultas anonimizadas** (63 de 314 visibles) porque la marca es un nombre de persona y Google oculta esas consultas. Toda tabla de consultas es una muestra del 20 %; «jenny vera spa» no aparecerá nunca. Los totales por página, país, dispositivo y fecha sí son completos: **usar esas dimensiones para las cifras y las consultas solo para dirección**.
- El salto `/` → `/es|/en` del proxy es un **307** (`NextResponse.redirect` sin código), así que Google indexa la portada como `http://jennyveraspa.com/` (39 clics, pos 4,3) y reparte su señal entre tres URLs. Los clics no se pierden. Arreglo sin riesgo: 308 solo para bots.

### 3.10 La posición media de este sitio no informa de nada

En el snapshot del 15 sep 2026 reporté la mejora de 44,3 → 36,1 como logro. **Era un artefacto.** Medido el 3 de octubre:

| Tramo | Antes | Ahora |
|---|---|---|
| Posiciones 1-10 | 3.057 impr | **3.649** (+592) |
| Posiciones >50 | 9.939 impr | 5.169 (**−4.770**) |

La media «mejoró» porque desapareció cola larga en página 8-10 que nunca dio un clic. El sitio mezcla dos poblaciones —páginas locales en posición 5-10 y posts informativos en posición 60-90— y promediarlas no significa nada. **Reportar impresiones por tramo de posición, no la media.**

### 3.11 Google poda la cola larga por página — y el CTR cero NO cuesta exposición (hipótesis refutada)

En septiembre de 2026 escribí como predicción que «una posición alta con CTR cero se consume». **Un test de cohortes en octubre la refutó**, y conviene dejarlo escrito para no repetir el error:

- Las **24 consultas con cero clics en posiciones 1-10 ganaron un 38 % de exposición** (14,8 → 20,5 impresiones diarias), mejor que las 23 que sí recibían clics (+91 %).
- `blefaroplastia precio ecuador`, con **cero clics en 74 días** en posición 8,4, **multiplicó sus impresiones por 3,9**.

Lo que de verdad ocurrió el 15 de septiembre fue **una poda de la cola de página 8-10, por página y no por consulta**: los posts informativos de HIFU/CO2/PRP/manchas pasaron de 288,6 a 140,4 impresiones diarias (−49 %) **sin que su posición se moviera** (87,6 → 90,4). Con ella, **dos URL planas de la web antigua cayeron a cero exacto** (pos 81-83): los redirects 308 funcionan y Google soltó por fin los duplicados de la migración de abril. Esas impresiones había que perderlas.

Caso aparte, sin resolver: `best massage near me` murió del 14 al 22 de septiembre (56 → 0 impresiones) con la posición intacta en 7,0 y su página sana, mientras ninguna otra consulta de CTR cero era castigada. La explicación que mejor encaja es una **corrección de desajuste de relevancia** (un post sobre Cuenca emparejado con una consulta «cerca de mí» sin calificador geográfico), no la inanición de clics. **n = 1: no es regla.**

**Lección de método:** una hipótesis que explica un caso hay que probarla contra la cohorte completa antes de convertirla en regla. Esta estuvo dos semanas escrita en el CLAUDE.md como si fuera un hecho.

### 3.12 `WebFetch` alucina al leer fichas públicas de redes sociales

El 3 de octubre, un `WebFetch` del perfil de Instagram **informó de un enlace a jennyveraspa.com que no existe**, e inventó además una dirección postal deformada. Era exactamente el dato que esperábamos encontrar. Se verificó con navegador (Playwright) y es falso.

**Para comprobar fichas públicas, navegador y no `WebFetch`.** Y desconfiar en particular cuando el resultado confirma lo que se quería ver.

### 3.13 Métricas de Meta que no sirven en campañas de clic-a-WhatsApp

`messaging_conversation_replied_7d` marcó **1** sobre 71 conversaciones, lo que sugiere que no se responden los mensajes. Es falso: `messaging_first_reply` = 61 (86 %), `messaging_user_depth_2_message_send` = 37 y `_depth_5_` = 35. Esa métrica no tiene visibilidad cuando la conversación ocurre dentro de WhatsApp, fuera del perímetro de Meta.

**Usar `first_reply` y las de profundidad.** Y tener presente que **el cierre (si la conversación acaba en cita) no es medible desde Meta**: eso solo lo sabe quien atiende el WhatsApp.

## 4. Método de trabajo que se ha demostrado útil

1. **Medir antes de tocar.** Los dos fracasos de título vinieron de actuar sobre una hipótesis razonable sin comprobarla primero.
2. **Un cambio por despliegue** cuando se quiere atribuir el efecto.
3. **No tocar lo que funciona.** Si una página recibe clics, cualquier cambio tiene más riesgo que ganancia esperada.
4. **Anotar en el snapshot lo que se despliega y con qué métrica de partida**, para poder atribuir después.
5. **Separar los efectos al leer.** El orgánico se mide en GSC, el de pago en Meta, la ficha en las consultas locales con CTR cero. Coinciden en el tiempo y es fácil atribuirse mérito ajeno.
6. **Reportar lo que salió mal con la misma claridad que lo que salió bien.** Un fracaso medido es información; un fracaso silenciado se repite.

---

## 5. Historial de intervenciones y su resultado

| Fecha | Intervención | Resultado |
|---|---|---|
| 7 jul | Contenido nuevo (10 páginas, keywords locales) | **Bueno.** +78 % de clics; `spa-para-hombres-cuenca` en posición 4,3 |
| 25 jul | Títulos con cifra de precio (5 páginas) | **Malo.** −42 % de clics en esas páginas |
| 25 jul | Página puente de WhatsApp | **Bueno.** Habilitó medir la conversión del sitio |
| 26 jul | Pixel de Meta | **Neutro por ahora.** Nada accionable hasta ~noviembre |
| 13 ago | Enlazado interno (P2) | **Bueno.** `abdominoplastia` ×4,5 en clics |
| 13 ago | Consolidación del cluster + cambio de título (P1) | **Malo.** −59 % en el cluster; posición 9,0 → 15,7 |
| 13 ago | Fechas deterministas y fin del error de hidratación | **Correcto.** Las fechas se mostraban un día antes para todo el público |
| 13 ago | Restauración de tildes (68 ficheros) | **Correcto.** Sin efecto medible en tráfico, pero era deuda de calidad |
| 7 sep | «Ecuador» devuelto al título de masajes | **BUENO, confirmado el 3 oct.** 11 clics (vs 3), impresiones ×7, pos 12,4 → 8,3, `masajes cuenca ecuador` de vuelta en pos 7,2. Solo en ES |
| 7 sep | Enlazado de láser CO2 y temas íntimos | **SIN SEÑAL.** CO2 6 clics vs 5 (menos en 30 d); `hifu-intimo` 9 impresiones en 22 días. Las páginas destino no tienen volumen para medir |
| 7 sep | Seis traducciones EN de posts de precio | **FRACASO PARCIAL.** 5 clics en 22 días entre las seis; dos con 0 impresiones en 3 meses. Canibalización descartada. El conjunto del inglés retrocedió ese mes |

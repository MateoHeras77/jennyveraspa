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

### 1.2 Contenido para keywords locales sin competencia

`spa-para-hombres-cuenca` (creado el 7 de julio) está en **posición 6,3 con 14,8 % de CTR**. Es de los mejores rendimientos del sitio.

El patrón que funciona: intención local + nicho poco disputado. Lo que **no** funciona es contenido sobre términos nacionales genéricos (`plasma rico en plaquetas`, `microneedling`, `laser co2`): están en posición 76-91 y llevan meses sin moverse, porque ahí compite la autoridad de dominio, que no tenemos.

### 1.3 Renovar creatividades en Meta cada ~3 semanas

Validado en dos ciclos independientes:

| Ciclo | Antes de renovar | Después |
|---|---|---|
| 3 de agosto | $2,98 / conversación | **$1,03** |
| 25 de agosto | $2,32 / conversación | **$0,74** |

El patrón es mecánico: renuevan → el coste se desploma; se dejan correr tres semanas → se duplica. Conviene que sea rutina de calendario, no reacción cuando el coste sube.

### 1.4 La página puente para medir clics a WhatsApp

Los eventos personalizados de Vercel Analytics cuestan plan Pro (402). Enrutar todos los CTA por `/[locale]/whatsapp` convierte cada clic en un pageview, que sí es gratuito. Funciona y ya da la única métrica de conversión del sitio: **66 clics/mes, 10,2 % de los visitantes limpios**.

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

## 3. Trampas del entorno que ya nos han costado tiempo

### 3.1 El grafo de enlaces aparente no es el real

`getRelatedPostsByTags` (`src/lib/blog-content.ts`) genera enlaces **en tiempo de render** a partir del solapamiento de tags. No aparecen en ningún MDX.

Contar solo los enlaces escritos a mano llevó a un diagnóstico equivocado: creí que cuatro posts de precio eran huérfanos cuando solo lo era uno. Para auditar hay que **replicar el algoritmo**: solapamiento de tags, desempate por fecha, límite de 3, y comparación **dentro del mismo locale**.

Un `relatedPost` que apunte a un slug inexistente en ese idioma **se ignora en silencio**: el bloque sale vacío sin error. Cuatro páginas de servicio en inglés estuvieron así meses.

### 3.2 Vercel Analytics infla el tráfico con bots

Entre el 25 % y el 42 % del panel es tráfico automatizado. La señal fiable es una proporción **visitantes : páginas vistas de exactamente 1:1** (un humano navega; un bot pide una página y se va).

China lleva tres mediciones seguidas apareciendo así (100 → 203 → 222 visitantes). **Restarlo siempre antes de citar cualquier cifra**, y contrastar contra GSC.

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

`best massage near me` lleva **tres mediciones consecutivas** en primera página (posición 5,7-6,6) con **cero clics**, y las impresiones ya empezaron a caer (903 → 426).

Cuando el título está bien, la posición es buena y aun así el CTR es cero, no es un problema técnico: el paquete de mapas se lleva el tráfico. La única palanca es el Google Business Profile (`fase-1-gbp-y-resenas.md`). Ninguna cantidad de trabajo en el repo lo va a mover.

---

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
| 7 sep | «Ecuador» devuelto al título de masajes | Pendiente de medir (~10 de octubre) |
| 7 sep | Enlazado de láser CO2 y temas íntimos | Pendiente de medir (~10 de octubre) |

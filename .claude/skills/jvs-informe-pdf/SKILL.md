---
name: jvs-informe-pdf
description: Identidad visual y maquetación de los informes en PDF de Jenny Vera Spa (colores, logos, tipografías, portada con banner, cabecera/pie, tablas, KPI, gráficos ECharts) y el flujo para generarlos con HTML + Chrome headless. Usar SIEMPRE que se pida un informe, reporte, resumen de resultados, presentación de métricas o cualquier documento PDF del spa para la dirección, el equipo o terceros ("hazme un informe", "PDF de cómo va el negocio", "reporte mensual", "resumen para Jenny"). Para manipular PDFs existentes (unir, extraer texto, formularios) usar la skill `pdf`; esta define cómo se VE el nuestro.
---

# Informes PDF de Jenny Vera Spa

Esta skill fija la **parte visual** de todo PDF del spa para que cada informe parezca de la misma casa. La parte de contenido (qué datos, cómo se consultan) está en el `CLAUDE.md` del proyecto; aquí solo se repiten las reglas que afectan a cómo se presenta un número.

**Cómo se produce:** HTML con `assets/estilos.css` → `scripts/render.sh` (Chrome headless) → PDF. No usar reportlab ni docx: la tipografía y los colores de la marca solo salen fieles por esta vía.

```
jvs-informe-pdf/
├── assets/estilos.css        ← tokens y componentes (NO editar por informe)
├── assets/plantilla.html     ← punto de partida, con un ejemplo de cada pieza
├── assets/logos/             ← logo e isotipo en 4 colores, PNG transparente
├── assets/fonts/             ← Playfair Display + Inter (OFL), incrustadas
├── assets/graficos.js        ← gráficos de la marca sobre ECharts (SVG)
├── assets/vendor/            ← echarts.min.js 6.1 (local: el render no depende de internet)
├── assets/ejemplo/           ← PDF de referencia de cómo debe verse
└── scripts/render.sh         ← HTML → PDF (+ previews PNG, comprueba fuentes y gráficos)
```

Ejemplo real completo: `docs/informes/2026-10-linea-base/` (extracción reproducible con `extraer.py` → `datos/datos.js`, informe de 10 páginas).

## 1. Identidad

### Logo

El logo es un isotipo (hoja + perfil de rostro dentro de un arco) sobre el nombre «Jenny Vera» en caligrafía y «Estética Profesional & Spa». Variantes en `assets/logos/`:

| Archivo | Cuándo |
|---|---|
| `logo-blanco.png` | Sobre carbón (el banner de portada). Es el uso principal. |
| `logo-negro.png` | Sobre blanco o crema, cuando no hay banner (anexos, una hoja suelta). |
| `logo-dorado-oscuro.png` | Sobre claro, si se quiere un toque de marca sin negro. |
| `logo-dorado.png` | Solo sobre carbón. **Nunca sobre blanco** (contraste 2,1:1). |
| `isotipo-*.png` | Sin texto: marca de agua del banner, cierre del informe, cabeceras pequeñas. |

Reglas: altura mínima del logo completo **18 mm** (por debajo la caligrafía se empasta; usar el isotipo). Margen libre alrededor ≥ la altura de la «J». No deformar, no rotar, no añadir sombras ni contornos, no recolorear fuera de estas cuatro variantes. El isotipo como marca de agua va al **7 % de opacidad** y siempre recortado por el borde.

### Paleta

Extraída del sitio (`#D4AF37` aparece 149 veces en `src/`, `#1B1B1B` 53). Son los tokens de `estilos.css` y de `graficos.js`:

| Token | Hex | Uso | Regla |
|---|---|---|---|
| `--oro` | `#D4AF37` | Banner, filetes, borde superior de KPI, números de sección | **Nunca texto sobre claro** (2,1:1) |
| `--oro-texto` | `#7A6422` | Texto dorado sobre blanco/crema: eyebrows, enlaces, viñetas | 5,7:1 ✓ |
| `--oro-medio` | `#9A7A1F` | Solo texto grande (≥ 14 pt) | 4,1:1 |
| `--oro-claro` | `#F3E5AB` | Texto dorado sobre carbón | 13,6:1 ✓ |
| `--carbon` | `#1B1B1B` | Banner, títulos, texto principal | |
| `--crema` | `#FDFBF7` | Fondo de portada, cajas `.nota` | |
| `--arena` | `#F5F2EB` | Zebra de tablas | |
| `--linea` | `#E6DECD` | Bordes y separadores | |
| `--tinta-3` | `#6B6B6B` | Gris más claro permitido para texto | 5,3:1 ✓ |
| `--positivo` / `--negativo` | `#1B7F4C` / `#B3402E` | Deltas y cajas `.ok` / `.alerta` | Siempre con glifo ▲ ▼ ■ |

El tono es **lujo sobrio**: mucho blanco, el oro como acento (filetes finos, no bloques), el carbón para el peso. Nunca fondos dorados a sangre ni degradados llamativos.

### Tipografía

Las mismas del sitio (`src/app/layout.tsx`): **Playfair Display** (serif, títulos y cifras) + **Inter** (sans, todo lo demás).

| Elemento | Fuente | Tamaño |
|---|---|---|
| Título de portada | Playfair 500 | 36 pt |
| H2 de sección | Playfair 500 | 19 pt |
| H3 | Playfair 500 | 12,5 pt |
| Cifra de KPI | Playfair 500, `tabular-nums` | 22 pt |
| Entradilla (conclusión de sección) | Inter | 11 pt |
| Cuerpo | Inter | 9,5 pt / 1,55 |
| Tablas | Inter | 8,5 pt |
| Eyebrow / etiquetas | Inter 600, MAYÚSCULAS, tracking 0,14-0,22 em | 6,5-7,5 pt |
| Fuente / notas al pie | Inter | 6,8 pt |

Cursiva de Playfair solo para el periodo de la portada.

## 2. Maquetación

- **A4 vertical.** Márgenes interiores 24 / 18 / 20 / 18 mm (sup / der / inf / izq).
- **Portada (página 1, a sangre):** banner carbón de 132 mm con logo blanco, filete dorado, eyebrow, título y periodo; isotipo dorado de marca de agua a la derecha; filete inferior de 1,4 mm en oro. Debajo, sobre crema: **4 KPI** + **«Lo esencial»** (3 conclusiones numeradas) + pie con destinatario, fuentes y fecha. La portada es un resumen ejecutivo completo: quien solo lea esa página debe saber cómo va el negocio.
- **Páginas interiores:** cabecera corrida «Jenny Vera · Estética Profesional & Spa» (Playfair) a la izquierda y el periodo en mayúsculas doradas a la derecha, sobre filete oro; pie con web y dirección a la izquierda y `n / total` a la derecha. Todo esto lo pone `@page` de `estilos.css`; el periodo se fija en el `<style>` de la plantilla.
- **Secciones** numeradas `01`, `02`… con eyebrow + H2. El primer párrafo (`.entradilla`) **es la conclusión**, no la introducción. `.salto` en la sección fuerza página nueva; úsalo cuando una sección quedaría partida de forma fea.

## 3. Componentes (clases de `estilos.css`)

| Pieza | Marcado | Notas |
|---|---|---|
| KPI | `.kpis > .kpi > .kpi__etiqueta + .kpi__valor + .kpi__nota` | `.kpis--3` / `--2` para menos columnas. Etiqueta ≤ 16 caracteres en rejilla de 4 o salta de línea y desalinea. |
| Delta | `<span class="delta delta--sube">+18 %</span>` | `--sube` / `--baja` / `--igual`. El color indica **bueno/malo, no arriba/abajo**: un coste que sube es `--baja`. |
| Tabla | `table.datos` con `thead`, `tbody`, `tfoot` opcional | Números con `class="num"` (alineados a la derecha, tabulares). El `thead` se repite al cortar página. |
| Fuente | `<p class="fuente">…</p>` | Antepone «Fuente:». **Obligatoria** bajo toda tabla y gráfico. |
| Gráfico | `figure.grafico > figcaption(título + <span>unidad · periodo</span>) + div.grafico-js` | ECharts vía `graficos.js` (sección 4). La altura va en el `style` del div. |
| Cajas | `.nota` (oro, metodología/lectura), `.alerta` (riesgo), `.ok` (lo que funcionó) | Con `__titulo` en mayúsculas. Máx. 1-2 por página. |
| Lo esencial | `ol.esencial > li` | Solo en portada. 3 puntos, cada uno con la idea en `<strong>`. |
| Próximos pasos | `ul.acciones > li > span + span.responsable` | Acción en verbo infinitivo + responsable · fecha. |
| Dos columnas | `.dos-columnas` | Dos gráficos medianos, o texto + gráfico. |
| Cierre | `.cierre` con isotipo dorado | Al final del documento. |
| Cronología | `ul.cronologia > li(.clave \| .malo) > span.cronologia__fecha + span.cronologia__hecho(strong + span)` | Hitos en vertical; `.clave` = punto dorado, `.malo` = rojo. |
| Tabla de línea base | `table.datos` con `tr.grupo` (cabecera de bloque), `td.valor-base` (cifra en serif) y `<span class="def">` (definición) | Métrica · valor · fuente y cómo se mide. |

## 4. Gráficos

**Apache ECharts con renderer SVG** vía `assets/graficos.js` (decisión del usuario, oct 2026: matplotlib quedaba tosco para un spa). Salen vectoriales en el PDF, con curvas suaves, áreas con degradado y barras redondeadas, sin animación (Chrome imprime el estado final).

```html
<script src="{{SKILL}}/assets/vendor/echarts.min.js"></script>
<script src="{{SKILL}}/assets/graficos.js"></script>
<script src="datos/datos.js"></script>   <!-- window.DATOS, generado por el script de extracción -->
…
<figure class="grafico">
  <figcaption>Título que dice la conclusión<span>Unidad · periodo</span></figcaption>
  <div class="grafico-js" id="g-clics" style="height:56mm"></div>
</figure>
<p class="fuente">…</p>
<script>
  JVS.linea("#g-clics", { categorias: [...], series: [{ nombre: "Clics", canal: "gsc", datos: [...] }] });
</script>
```

| Función | Para qué | Opciones clave |
|---|---|---|
| `JVS.linea` | Evolución temporal (≤ 5 series) | `area`, `punteada`, `valores: "todos"/"ultimo"`, `hitos: [{x, texto}]`, `tramos: [{desde, hasta, texto}]` (banda de fondo: una pausa, una migración), `destacar: {x: "ultimo" \| etiqueta, texto}`, `formato` |
| `JVS.barras` | Magnitud, rankings, partes de un total | `horizontal`, `apilado`, `colores: [...]` (un color por barra), `etiquetaTexto: (v, i) => …` |
| `JVS.donut` | Reparto en ≤ 5 partes | `centro: {valor, texto}` |
| `JVS.mini` | Sparkline dentro de una tarjeta KPI (`.kpi__mini`) | `canal`, `min` |

`formato`: `"numero"` (1.284), `"dolar"`, `"dolar2"` ($3,40), `"pct"` (18 %) o una función. `JVS.fmt(v, decimales)` formatea en español. Los datos van en `window.DATOS` (un `datos/datos.js` con `window.DATOS = {...}`): `fetch()` de JSON no funciona desde `file://`.

**El color sigue al canal en todos los informes**, salga o no en ese gráfico (paleta validada con el validador de la skill `dataviz` para daltonismo y contraste, sobre blanco y crema):

| `canal:` | Color | Canal |
|---|---|---|
| `total` | oro `#A88420` | Total del negocio o serie única |
| `meta` | azul `#2F6AA8` | Meta Ads (Facebook + Instagram) |
| `gsc` | verde `#1E8C66` | Google orgánico (Search Console) |
| `gbp` | terracota `#C65A2E` | Ficha de Google (Business Profile) |
| `otros` | violeta `#8A5AAE` | TikTok / otros |

Magnitud de un solo tono (tramos de posición, intensidad): `JVS.RAMPA_ORO`, claro → oscuro. Para «descontado / fuera de foco» (robots), gris arena `#D9D2C3`. Para marcar un valor malo en una serie de barras: `colores` con `JVS.COLORES.negativo`.

Reglas (de la skill `dataviz`, que hay que cargar si el gráfico se sale de estas formas):
- **Nunca doble eje Y.** Dos magnitudes distintas → dos gráficos en `.dos-columnas` (p. ej. conversaciones y coste por conversación).
- ≥ 2 series en línea: leyenda **y** etiqueta al final de cada línea (automático). Máximo 5 series.
- Una sola serie: sin leyenda; el `figcaption` la nombra.
- Etiquetas de categoría **cortas y únicas** («7 sep», no «8 ago – 7 sep»): ECharts oculta las que no caben, y con etiquetas repetidas (dos «oct» en 16 meses) `destacar` y `tramos` apuntan a la primera. Para el último punto usar `destacar: { x: "ultimo" }`.
- Medias diarias para comparar un mes en curso con meses cerrados, nunca el total parcial.

### Trampas del render (verificadas)
- **ECharts fija el ancho del SVG al dibujar en pantalla.** Si la pantalla es más ancha que el área útil, al imprimir desborda y Chrome **encoge todo el documento** (la portada sale estrecha). `estilos.css` lo evita con `@media screen { body { width: 174mm } }`: no quitarlo.
- **Playfair trae cifras de estilo antiguo** (el 0 parece una «o»). Todo número en serif necesita `font-variant-numeric: lining-nums` (ya aplicado en KPI, títulos y `.valor-base`).
- `render.sh` avisa si los gráficos no terminaron (`data-graficos="listo"`) o si falta una fuente.

## 5. Reglas de presentación de datos

Vienen del `CLAUDE.md`; aquí se listan las que cambian cómo se muestra un número:

1. **Conclusión primero.** Portada → «Lo esencial»; sección → entradilla. Los datos sostienen la frase, no la sustituyen. Público: la dirección del spa, sin conocimientos técnicos; nada de jerga (CTR, impresiones) sin traducir la primera vez.
2. **Cada cifra con periodo, comparación y fuente.** «127 contactos (+18 % vs. septiembre)» y la línea `.fuente` debajo.
3. **Separar los tres canales** (orgánico = GSC, pago = Meta, ficha = consultas locales). Nunca atribuir a uno el mérito de otro.
4. **Vercel siempre sin bots** (regla 1:1 del `CLAUDE.md`) y decirlo en la fuente. Si no se descontaron, no se publica la cifra.
5. **No mostrar la posición media de Google.** Si hace falta, impresiones por tramo de posición.
6. **No publicar precios propios del spa.**
7. Lo que no se puede medir se dice (`.nota`): p. ej. el desglose de WhatsApp por origen no existe en el plan Hobby.
8. **Formato español:** miles con punto (`1.284`), decimales con coma (`3,40`), espacio antes de `%` (`18 %`), dólares con `$` delante (`$231`), fechas «30 de octubre de 2026». Tildes y ¿¡ impecables.

## 6. Flujo

1. Carpeta del informe: `docs/informes/AAAA-MM-tema/` (p. ej. `docs/informes/2026-10-mensual/`).
2. Copiar `assets/plantilla.html` como `informe.html`. Cambiar el `<title>`, el periodo del `@page` y el contenido; borrar las piezas que no se usen. **Todas las cifras de la plantilla son ficticias: no dejar ninguna.**
3. Sacar los datos con un script reproducible que escriba `datos/datos.json` y `datos/datos.js` (copiar y adaptar `docs/informes/2026-10-linea-base/extraer.py`: GSC, Meta en solo lectura, Vercel con la regla de robots). Lo que no tiene API (redes, ficha) va en `datos/manual.json` con fecha y método. Las cifras del texto se escriben a mano desde `datos.json`; los gráficos leen `DATOS` solos.
4. Renderizar: `.claude/skills/jvs-informe-pdf/scripts/render.sh docs/informes/…/informe.html --preview`. El script avisa si Inter o Playfair no se incrustaron.
5. **Mirar cada PNG de preview** (con Read) antes de entregar. Comprobar:
   - Título de portada visible y portada en una sola página.
   - Ninguna cabecera de sección huérfana al pie, ni tabla/gráfico partido.
   - Última página sin quedar casi vacía (mover `.salto` o ajustar).
   - Etiquetas de KPI en una línea; ningún texto encima de otro en los gráficos.
   - Sin cifras de ejemplo de la plantilla.
6. Borrar los `*-pag-*.png` de preview antes de hacer commit; versionar `informe.html`, `datos/`, el script de extracción y el PDF.

Referencia visual de cómo debe quedar: `assets/ejemplo/informe-ejemplo.pdf`.

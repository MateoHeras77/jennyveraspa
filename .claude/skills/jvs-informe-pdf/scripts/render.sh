#!/usr/bin/env bash
# Imprime un informe HTML de Jenny Vera Spa a PDF con Chrome headless.
#
#   render.sh informe.html [salida.pdf] [--preview]
#
# - Sustituye {{SKILL}} por la ruta absoluta de la skill (estilos, logos, fuentes).
# - --preview genera además PNG de cada página (pdftoppm) junto al PDF para revisarlo.
set -euo pipefail

SKILL="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENTRADA=""; SALIDA=""; PREVIEW=0
for arg in "$@"; do
  case "$arg" in
    --preview) PREVIEW=1 ;;
    *) if [[ -z "$ENTRADA" ]]; then ENTRADA="$arg"; else SALIDA="$arg"; fi ;;
  esac
done
[[ -n "$ENTRADA" && -f "$ENTRADA" ]] || { echo "uso: render.sh informe.html [salida.pdf] [--preview]" >&2; exit 1; }

ENTRADA="$(realpath "$ENTRADA")"
DIR="$(dirname "$ENTRADA")"
SALIDA="$(realpath -m "${SALIDA:-${ENTRADA%.html}.pdf}")"

CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
[[ -n "$CHROME" ]] || { echo "No se encontró Chrome/Chromium" >&2; exit 1; }

# El HTML temporal vive en la MISMA carpeta para que sus rutas relativas (graficos/…) funcionen
TMP="$(mktemp "$DIR/.render-XXXXXX.html")"
trap 'rm -f "$TMP"' EXIT
sed "s#{{SKILL}}#$SKILL#g" "$ENTRADA" > "$TMP"

timeout 120 "$CHROME" --headless=new --disable-gpu --no-sandbox \
  --no-pdf-header-footer --run-all-compositor-stages-before-draw \
  --virtual-time-budget=10000 \
  --print-to-pdf="$SALIDA" "file://$TMP" 2>/dev/null

[[ -s "$SALIDA" ]] || { echo "Chrome no generó el PDF" >&2; exit 1; }

# Si hay gráficos ECharts, comprobar que se dibujaron todos (graficos.js marca
# <html data-graficos="listo">) y que no hubo errores de JS
if grep -q "grafico-js" "$TMP"; then
  DOM="$(timeout 120 "$CHROME" --headless=new --disable-gpu --no-sandbox \
    --virtual-time-budget=10000 --dump-dom "file://$TMP" 2>/dev/null || true)"
  if grep -q 'data-graficos="listo"' <<<"$DOM"; then
    echo "Gráficos: $(grep -o '<svg' <<<"$DOM" | wc -l) SVG dibujados"
  else
    echo "AVISO: los gráficos no terminaron de dibujarse (revisar la consola: datos mal formados o selector inexistente)" >&2
  fi
fi
PAGINAS="$(pdfinfo "$SALIDA" 2>/dev/null | awk '/^Pages:/{print $2}')"
echo "PDF: $SALIDA (${PAGINAS:-?} páginas)"

# Comprobación de fuentes: si falta Inter o Playfair, Chrome cayó a una de sistema
if command -v pdffonts >/dev/null; then
  FUENTES="$(pdffonts "$SALIDA" 2>/dev/null | tail -n +3 | awk '{print $1}' | sort -u | tr '\n' ' ')"
  echo "Fuentes: $FUENTES"
  for f in Inter Playfair; do
    grep -q "$f" <<<"$FUENTES" || echo "AVISO: no se incrustó $f — revisar rutas de {{SKILL}}/assets/fonts" >&2
  done
fi

if [[ $PREVIEW -eq 1 ]]; then
  pdftoppm -r 60 -png "$SALIDA" "${SALIDA%.pdf}-pag"
  echo "Previews: ${SALIDA%.pdf}-pag-*.png"
fi

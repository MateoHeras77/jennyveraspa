import type { Locale } from "@/lib/i18n";

/**
 * Formateo de las fechas de publicación del blog.
 *
 * No usa `new Date(...).toLocaleDateString(...)` a propósito, por dos motivos
 * que se daban a la vez y producían un error de hidratación (React #418):
 *
 * 1. **Desfase de un día.** El frontmatter trae fechas ISO cortas
 *    (`"2023-08-29"`), que `new Date()` interpreta como medianoche UTC. Al
 *    formatearlas en una zona horaria negativa —Ecuador es UTC-5 y Estados
 *    Unidos también lo es, o sea todo nuestro público— el resultado retrocedía
 *    al día anterior: se mostraba «28 ago 2023».
 * 2. **ICU distinto en servidor y navegador.** El servidor renderiza con los
 *    datos de internacionalización de Node y el navegador con los suyos. Si no
 *    coinciden, el HTML servido y el hidratado difieren y React descarta el
 *    árbol para volver a pintarlo en cliente.
 *
 * Al partir la cadena ISO por sus componentes y resolver el nombre del mes con
 * una tabla propia, el resultado es idéntico en cualquier entorno y zona
 * horaria, que es justo lo que necesita un componente que se hidrata.
 */

const MESES: Record<Locale, readonly string[]> = {
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
       "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  en: ["January", "February", "March", "April", "May", "June", "July",
       "August", "September", "October", "November", "December"],
};

const MESES_ABREVIADOS: Record<Locale, readonly string[]> = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul",
       "ago", "sept", "oct", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
       "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const ISO_CORTA = /^(\d{4})-(\d{2})-(\d{2})/;

/**
 * Devuelve la fecha lista para mostrar. `style: "short"` da «29 ago 2023» /
 * «Aug 29, 2023»; `"long"` da «29 de agosto de 2023» / «August 29, 2023».
 *
 * Si la cadena no es una fecha ISO reconocible se devuelve tal cual, para que
 * un error de frontmatter se vea en la página en lugar de romper el render.
 */
export function formatPublishedDate(
  iso: string,
  locale: Locale,
  style: "short" | "long" = "short"
): string {
  const partes = ISO_CORTA.exec(iso);
  if (!partes) {
    return iso;
  }

  const [, anio, mes, dia] = partes;
  const indiceMes = Number(mes) - 1;
  if (indiceMes < 0 || indiceMes > 11) {
    return iso;
  }

  const numeroDia = Number(dia);
  const nombreMes = (style === "long" ? MESES : MESES_ABREVIADOS)[locale][indiceMes];

  if (locale === "en") {
    return `${nombreMes} ${numeroDia}, ${anio}`;
  }

  return style === "long"
    ? `${numeroDia} de ${nombreMes} de ${anio}`
    : `${numeroDia} ${nombreMes} ${anio}`;
}

// src/lib/constants.ts
// This file contains shared application data.

export const CONTACT_PHONE_E164 = "+593999152853";
export const CONTACT_PHONE_DISPLAY = "+593 999 152 853";

export const SOCIAL_INSTAGRAM_URL = "https://www.instagram.com/jenny_vera_spa/";
export const SOCIAL_FACEBOOK_URL = "https://www.facebook.com/JennyVeraSpa/";
export const SOCIAL_TIKTOK_URL = "https://www.tiktok.com/@jennyveraspa";
export const GOOGLE_REVIEW_URL = "https://g.page/r/Cbso4rpRXTOYEAI";

/**
 * Pixel de Meta (dataset "WebsitePixel" de la cuenta act_1661223548424128).
 * Vive aquí y no en una variable de entorno porque no es un secreto: viaja en
 * el HTML que se sirve al navegador. El renderizado se limita a producción
 * desde `layout.tsx` para que desarrollo y previews no ensucien los datos.
 */
export const META_PIXEL_ID = "882066591229888";

export const WHATSAPP_CONTACT_URL =
  "https://api.whatsapp.com/send/?phone=593999152853&text=%C2%A1Hola+desde+JennyVeraSpa+en+Cuenca%2C+Ecuador%21+%C2%BFC%C3%B3mo+podemos+ayudarte+hoy+con+nuestros+tratamientos+%3F+Estamos+aqu%C3%AD+para+ofrecerte+la+mejor+experiencia+de+spa.+%C2%A1Escr%C3%ADbenos+y+programa+tu+cita+ahora+mismo%21&type=phone_number&app_absent=0";

/**
 * Ruta puente hacia WhatsApp. Los enlaces del sitio apuntan aquí en vez de ir
 * directo a api.whatsapp.com: la visita a esta página queda registrada en
 * Vercel Analytics (los pageviews son gratuitos; los eventos personalizados de
 * `track()` exigen plan Pro y devuelven 402), de modo que se puede contar
 * cuántos clics a WhatsApp genera el sitio. El `utm_source` llega a Analytics
 * como dimensión `utmSource` y permite separar el origen del clic.
 *
 * Consulta:
 *   npx vercel@latest api "/v1/query/web-analytics/visits/count?projectId=…&filter=requestPath eq '/es/whatsapp'"
 */
export function whatsappBridgePath(locale: string, source: string): string {
  return `/${locale}/whatsapp?utm_source=${encodeURIComponent(source)}`;
}

export const SERVICE_CATEGORIES = [
  {
    category: "Faciales Avanzados",
    description: "Protocolos para iluminar, renovar y rejuvenecer tu rostro con resultados visibles y naturales.",
    services: [
      { name: "Limpieza Facial Profunda", benefit: "Purifica poros y mejora textura desde la primera sesión." },
      { name: "Hidratación Profunda con Vitamina C", benefit: "Aporta luminosidad y suavidad en pieles opacas." },
      { name: "Tratamiento de Manchas", benefit: "Unifica el tono y reduce pigmentación localizada." },
      { name: "Control de Acné y Piel Grasa", benefit: "Disminuye brotes activos y regula el exceso de sebo." },
      { name: "Rejuvenecimiento Facial con HIFU", benefit: "Efecto tensor sin cirugía para redefinir contornos." },
      { name: "Plasma Rico en Plaquetas", benefit: "Estimula regeneración natural para una piel revitalizada." },
      { name: "Mesoterapia Facial", benefit: "Nutrición intensiva para piel más firme y uniforme." },
      { name: "Tratamiento de Ojeras", benefit: "Mejora el aspecto cansado y aporta frescura a la mirada." },
      { name: "Botox", benefit: "Suaviza líneas de expresión con resultados naturales." },
      { name: "Armonización Facial", benefit: "Equilibra las proporciones del rostro con ácido hialurónico." },
      { name: "Microblading", benefit: "Cejas definidas y naturales con técnica pelo a pelo." },
    ],
  },
  {
    category: "Corporales y Bienestar",
    description: "Tratamientos diseñados para relajar, moldear y recuperar bienestar corporal con enfoque integral.",
    services: [
      { name: "Masajes Relajantes", benefit: "Alivian tensiones y promueven descanso profundo." },
      { name: "Masajes Reductores", benefit: "Favorecen modelado corporal y mejoran circulación." },
      { name: "Líneas de Expresión", benefit: "Atenúa marcas finas para un rostro más descansado." },
      { name: "Drenaje Linfático Facial", benefit: "Reduce inflamación y mejora definición del contorno." },
    ],
  },
  {
    category: "Láser y Zonas Específicas",
    description: "Tecnología láser para depilación, renovación y despigmentación en zonas estratégicas.",
    services: [
      { name: "Depilación Definitiva con Láser Diodo", benefit: "Disminuye el vello de forma progresiva y duradera." },
      { name: "Carbón Activo con Láser", benefit: "Limpia, ilumina y mejora visiblemente la textura." },
      { name: "HIFU Intimo", benefit: "Reafirma tejidos y mejora confort en zona intima." },
      { name: "Despigmentacion de Zonas Intimas", benefit: "Aclara de forma gradual para un tono mas uniforme." },
      { name: "Despigmentacion de Axilas", benefit: "Reduce oscurecimiento y homogeneiza el color." },
    ],
  },
  {
    category: "Post-Operatorios",
    description: "Acompanamiento especializado para acelerar recuperacion y potenciar resultados esteticos.",
    services: [
      { name: "Post Operatorios de Cirugias Esteticas", benefit: "Controla inflamacion y favorece una recuperacion segura." },
      { name: "Drenajes Linfaticos Postoperatorios", benefit: "Ayudan a desinflamar y mejorar la evolucion postquirurgica." },
    ],
  },
  {
    category: "Tratamientos con Láser",
    description: "Soluciones laser avanzadas para cicatrices, rejuvenecimiento y zonas especificas con resultados precisos.",
    services: [
      { name: "CO2 Fraccionado", benefit: "Trata cicatrices de acne y rejuvenece la piel con resurfacing de precision." },
      { name: "Láser para Eliminación de Lunares", benefit: "Elimina lunares de forma segura y con minima cicatrizacion." },
      { name: "Láser Íntimo", benefit: "Reafirma y rejuvenece la zona intima sin cirugia." },
    ],
  },
  {
    category: "Tecnología Facial y Corporal",
    description: "Equipos de ultima generacion para lifting, tensado y modelado corporal sin procedimientos invasivos.",
    services: [
      { name: "HIFU 360 Max (25D)", benefit: "Lifting facial y tensado corporal profundo con ultrasonido focalizado." },
      { name: "Exilis Ultra 360", benefit: "Rejuvenecimiento facial y reduccion de grasa con radiofrecuencia y ultrasonido." },
    ],
  },
  {
    category: "Medicina Regenerativa y Rejuvenecimiento",
    description: "Regeneracion celular avanzada para resultados profundos, duraderos y naturales desde el interior.",
    services: [
      { name: "Tratamientos con Exosomas", benefit: "Estimulan renovacion celular para una piel mas joven y luminosa." },
      { name: "PDRN de Salmón", benefit: "Rejuvenecimiento celular profundo con bioestimulacion natural." },
      { name: "Microneedling (Dermapen)", benefit: "Activa la produccion de colageno para mejorar textura y firmeza." },
      { name: "Tratamientos con Células Madre", benefit: "Regeneracion tisular avanzada para resultados antiedad duraderos." },
    ],
  },
  {
    category: "Hidratación y Skin Boosters",
    description: "Hidratacion profunda e inteligente con activos premium para una piel radiante y saludable.",
    services: [
      { name: "Hidratación Profunda con Exosomas", benefit: "Repone agua y nutrientes celulares para maxima luminosidad." },
      { name: "Hidratación con PDRN", benefit: "Revitaliza y sella la hidratacion con factor de crecimiento celular." },
    ],
  },
] as const;

/**
 * Enlaza cada servicio del catálogo con su página de detalle.
 *
 * La clave es el `name` EXACTO de `SERVICE_CATEGORIES`; el valor, el slug del
 * MDX de `src/content/services/`. Un servicio sin entrada aquí se muestra en el
 * listado como tarjeta sin enlace, que es lo correcto cuando todavía no tiene
 * página propia (p. ej. «Exilis Ultra 360»).
 *
 * Varias entradas del catálogo describen el mismo tratamiento desde ángulos
 * distintos («Rejuvenecimiento Facial con HIFU» y «HIFU 360 Max (25D)»). Solo se
 * mapea una de ellas a propósito: dos enlaces a la misma URL en la misma página
 * no aportan nada y ensucian el grafo de enlaces.
 *
 * CUIDADO con dónde viven los nombres. `src/app/(sitio)/servicios/page.tsx`
 * mantiene su PROPIA copia de las categorías (necesita imagen, icono y textos
 * traducidos que no están aquí) y esa copia se había desincronizado: le
 * faltaban Botox, Armonización Facial y Microblading, y escribía con tildes
 * («HIFU Íntimo») lo que aquí va sin ellas («HIFU Intimo»). Las claves de este
 * mapa son las de ESA página —ES y EN—, porque es la que lo consume.
 *
 * Al añadir un servicio nuevo hay que tocar cuatro sitios:
 *   1. `SERVICE_CATEGORIES` (aquí) — alimenta el formulario de contacto.
 *   2. Este mapa, con la clave tal y como la escribe la página de servicios.
 *   3. `serviceLabelsEn` de `src/components/forms/contact-form.tsx`, con la
 *      clave EXACTA de `SERVICE_CATEGORIES`.
 *   4. La copia de categorías de `src/app/(sitio)/servicios/page.tsx`, en ES
 *      y EN, o el servicio no se mostrará en el listado.
 */
export const SERVICE_PAGE_SLUGS: Record<string, string> = {
  // --- Español ---
  "Limpieza Facial Profunda": "limpieza-facial",
  "Tratamiento de Manchas": "manchas",
  "Control de Acné y Piel Grasa": "tratamiento-acne",
  "Rejuvenecimiento Facial con HIFU": "hifu",
  "Plasma Rico en Plaquetas": "plasma-rico-plaquetas",
  "Mesoterapia Facial": "mesoterapia-facial",
  "Tratamiento de Ojeras": "tratamiento-ojeras",
  "Botox": "botox",
  "Armonización Facial": "armonizacion-facial",
  "Microblading": "microblading",
  "Masajes Relajantes": "masajes-relajantes",
  "Masajes Reductores": "masajes-reductores",
  "Drenaje Linfático Facial": "drenaje-linfatico-facial",
  "Depilación Definitiva con Láser Diodo": "depilacion-laser",
  "Carbón Activo con Láser": "carbon-activo-laser",
  "HIFU Íntimo": "hifu-intimo",
  "Despigmentación de Zonas Íntimas": "despigmentacion-zonas-intimas",
  "Despigmentación de Axilas": "despigmentacion-axilas",
  "Drenajes Linfáticos Postoperatorios": "drenaje-postoperatorio",
  "CO2 Fraccionado": "laser-co2-fraccionado",
  "Láser para Eliminación de Lunares": "eliminacion-lunares",
  "Tratamientos con Exosomas": "exosomas",
  "PDRN de Salmón": "pdrn-salmon",
  "Microneedling (Dermapen)": "microneedling",

  // --- English ---
  // Los nombres en inglés son propios de la página de servicios, no una
  // traducción mecánica, así que necesitan sus propias claves.
  "Deep Facial Cleansing": "limpieza-facial",
  "Dark Spot Treatment": "manchas",
  "Acne and Oily Skin Control": "tratamiento-acne",
  "HIFU Facial Rejuvenation": "hifu",
  "Platelet-Rich Plasma (PRP)": "plasma-rico-plaquetas",
  "Facial Mesotherapy": "mesoterapia-facial",
  "Under-Eye Treatment": "tratamiento-ojeras",
  "Facial Harmonization": "armonizacion-facial",
  "Relaxing Massages": "masajes-relajantes",
  "Body Sculpting Massages": "masajes-reductores",
  "Facial Lymphatic Drainage": "drenaje-linfatico-facial",
  "Diode Laser Hair Reduction": "depilacion-laser",
  "Laser Carbon Peel": "carbon-activo-laser",
  "Intimate HIFU": "hifu-intimo",
  "Intimate Area Brightening": "despigmentacion-zonas-intimas",
  "Underarm Brightening": "despigmentacion-axilas",
  "Post-Op Lymphatic Drainage": "drenaje-postoperatorio",
  "Fractional CO2 Laser": "laser-co2-fraccionado",
  "Laser Mole Removal": "eliminacion-lunares",
  "Exosome Treatments": "exosomas",
  "Salmon PDRN (Cellular Rejuvenation)": "pdrn-salmon",
};

export type ServiceCategory = typeof SERVICE_CATEGORIES[number];
export type ServiceItem = ServiceCategory['services'][number];

// src/lib/constants.ts
// This file contains shared application data.

export const CONTACT_PHONE_E164 = "+593999152853";
export const CONTACT_PHONE_DISPLAY = "+593 999 152 853";
export const WHATSAPP_CONTACT_URL =
  "https://api.whatsapp.com/send/?phone=593999152853&text=%C2%A1Hola+desde+JennyVeraSpa+en+Cuenca%2C+Ecuador%21+%C2%BFC%C3%B3mo+podemos+ayudarte+hoy+con+nuestros+tratamientos+%3F+Estamos+aqu%C3%AD+para+ofrecerte+la+mejor+experiencia+de+spa.+%C2%A1Escr%C3%ADbenos+y+programa+tu+cita+ahora+mismo%21&type=phone_number&app_absent=0";

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

export type ServiceCategory = typeof SERVICE_CATEGORIES[number];
export type ServiceItem = ServiceCategory['services'][number];

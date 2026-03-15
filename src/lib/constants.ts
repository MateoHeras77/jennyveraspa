// src/lib/constants.ts
// This file contains shared application data.

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
      { name: "Parafina para Manos y Pies", benefit: "Hidratación intensa para una piel suave y renovada." },
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
] as const;

export type ServiceCategory = typeof SERVICE_CATEGORIES[number];
export type ServiceItem = ServiceCategory['services'][number];

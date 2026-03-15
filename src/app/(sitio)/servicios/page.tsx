"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Hand,
  ScanLine,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type ServiceItem = {
  name: string;
  benefit: string;
};

type ServiceCategory = {
  category: string;
  description: string;
  img: string;
  icon: LucideIcon;
  services: ServiceItem[];
};

function getCategoryId(name: string) {
  if (name.includes("Faciales")) return "faciales";
  if (name.includes("Corporales")) return "corporales";
  if (name.includes("Láser")) return "tecnologia";
  if (name.includes("Post")) return "post-op";
  return name.toLowerCase().replace(/\s+/g, "-");
}

const categories: ServiceCategory[] = [
  {
    category: "Faciales Avanzados",
    description:
      "Protocolos para iluminar, renovar y rejuvenecer tu rostro con resultados visibles y naturales.",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
    icon: Sparkles,
    services: [
      {
        name: "Limpieza Facial Profunda",
        benefit: "Purifica poros y mejora textura desde la primera sesión.",
      },
      {
        name: "Hidratación Profunda con Vitamina C",
        benefit: "Aporta luminosidad y suavidad en pieles opacas.",
      },
      {
        name: "Tratamiento de Manchas",
        benefit: "Unifica el tono y reduce pigmentación localizada.",
      },
      {
        name: "Control de Acné y Piel Grasa",
        benefit: "Disminuye brotes activos y regula el exceso de sebo.",
      },
      {
        name: "Rejuvenecimiento Facial con HIFU",
        benefit: "Efecto tensor sin cirugía para redefinir contornos.",
      },
      {
        name: "Plasma Rico en Plaquetas",
        benefit: "Estimula regeneración natural para una piel revitalizada.",
      },
      {
        name: "Mesoterapia Facial",
        benefit: "Nutrición intensiva para piel más firme y uniforme.",
      },
      {
        name: "Tratamiento de Ojeras",
        benefit: "Mejora el aspecto cansado y aporta frescura a la mirada.",
      },
    ],
  },
  {
    category: "Corporales y Bienestar",
    description:
      "Tratamientos diseñados para relajar, moldear y recuperar bienestar corporal con enfoque integral.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
    icon: Hand,
    services: [
      {
        name: "Masajes Relajantes",
        benefit: "Alivian tensiones y promueven descanso profundo.",
      },
      {
        name: "Masajes Reductores",
        benefit: "Favorecen modelado corporal y mejoran circulación.",
      },
      {
        name: "Parafina para Manos y Pies",
        benefit: "Hidratación intensa para una piel suave y renovada.",
      },
      {
        name: "Líneas de Expresión",
        benefit: "Atenúa marcas finas para un rostro más descansado.",
      },
      {
        name: "Drenaje Linfático Facial",
        benefit: "Reduce inflamación y mejora definición del contorno.",
      },
    ],
  },
  {
    category: "Láser y Zonas Específicas",
    description:
      "Tecnología láser para depilación, renovación y despigmentación en zonas estratégicas.",
    img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1600&q=80",
    icon: ScanLine,
    services: [
      {
        name: "Depilación Definitiva con Láser Diodo",
        benefit: "Disminuye el vello de forma progresiva y duradera.",
      },
      {
        name: "Carbón Activo con Láser",
        benefit: "Limpia, ilumina y mejora visiblemente la textura.",
      },
      {
        name: "HIFU Intimo",
        benefit: "Reafirma tejidos y mejora confort en zona intima.",
      },
      {
        name: "Despigmentacion de Zonas Intimas",
        benefit: "Aclara de forma gradual para un tono mas uniforme.",
      },
      {
        name: "Despigmentacion de Axilas",
        benefit: "Reduce oscurecimiento y homogeneiza el color.",
      },
    ],
  },
  {
    category: "Post-Operatorios",
    description:
      "Acompanamiento especializado para acelerar recuperacion y potenciar resultados esteticos.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    icon: ShieldCheck,
    services: [
      {
        name: "Post Operatorios de Cirugias Esteticas",
        benefit: "Controla inflamacion y favorece una recuperacion segura.",
      },
      {
        name: "Drenajes Linfaticos Postoperatorios",
        benefit: "Ayudan a desinflamar y mejorar la evolucion postquirurgica.",
      },
    ],
  },
];

export default function ServiciosPage() {
  return (
    <div className="relative pt-32 pb-24 bg-[#FDFBF7] min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -left-12 h-56 w-56 rounded-full bg-[#1A1A1A]/5 blur-3xl" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
            Nuestros Tratamientos
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6">
            Servicios Que Cuidan Tu Belleza
          </h1>
          <p className="text-gray-600 text-lg font-light">
            Seleccionamos nuestros tratamientos mas solicitados para que encuentres opciones claras,
            efectivas y adaptadas a tus objetivos.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-widest">
            {categories.map((group) => (
              <span
                key={group.category}
                className="rounded-full border border-[#D4AF37]/30 px-4 py-2 text-gray-700"
              >
                {group.category}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="space-y-24">
          {categories.map((group, idx) => {
            const Icon = group.icon;

            return (
              <motion.section
              id={getCategoryId(group.category)}
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`scroll-mt-32 grid grid-cols-1 md:grid-cols-2 items-start gap-10 ${
                idx % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <div className="relative h-[420px] w-full rounded-sm overflow-hidden shadow-xl">
                  <Image src={group.img} alt={group.category} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Icon size={18} />
                    </span>
                    <p className="text-sm uppercase tracking-widest">Especialidad</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">{group.category}</h2>
                  <p className="text-gray-600 text-lg font-light leading-relaxed max-w-xl">
                    {group.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {group.services.map((service) => (
                    <article
                      key={service.name}
                      className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <h3 className="flex items-start gap-2 text-gray-900 font-medium leading-tight">
                        <Check size={16} className="mt-1 shrink-0 text-[#D4AF37]" />
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 font-light">{service.benefit}</p>
                    </article>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium text-[#D4AF37] hover:text-[#b5952f] transition-colors group"
                  >
                    Agendar Evaluacion
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.section>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 rounded-sm bg-[#1A1A1A] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <p className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] mb-2">
              Evaluacion Personalizada
            </p>
            <h3 className="text-2xl md:text-3xl font-serif mb-3">
              Te ayudamos a elegir el protocolo ideal para ti
            </h3>
            <p className="text-gray-300 font-light">
              Agenda tu cita y recibe una recomendacion profesional segun tu tipo de piel,
              objetivos y estilo de vida.
            </p>
          </div>
          <Link
            href="/contacto"
            className="bg-[#D4AF37] text-white px-7 py-3 rounded-sm hover:bg-[#b5952f] transition-colors uppercase text-sm tracking-widest whitespace-nowrap"
          >
            Quiero mi valoracion
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Cpu,
  Droplets,
  FlaskConical,
  Hand,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { type Locale, withLocalePath } from "@/lib/i18n";

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

type ServicesCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  specialty: string;
  scheduleEvaluation: string;
  personalizedEval: string;
  idealProtocol: string;
  finalText: string;
  finalCta: string;
  stepLabel: string;
};

type ServicesData = {
  copy: ServicesCopy;
  categories: ServiceCategory[];
};

function getCategoryId(name: string) {
  if (name.includes("Tecnolog") || name.includes("Technology") || name.includes("Facial y Corporal") || name.includes("Face & Body")) return "tecnologia-corporal";
  if (name.includes("Regenerativa") || name.includes("Regenerative")) return "regenerativa";
  if (name.includes("Hidratac") || name.includes("Hydration") || name.includes("Skin Booster")) return "hidratacion";
  if (name.includes("Faciales") || name.includes("Advanced Facial")) return "faciales";
  if (name.includes("Corporales") || name.includes("Body and")) return "corporales";
  if (name.includes("Láser") || name.includes("Laser")) return "laser";
  if (name.includes("Post")) return "post-op";
  return name.toLowerCase().replace(/\s+/g, "-");
}

const servicesByLocale: Record<Locale, ServicesData> = {
  es: {
    copy: {
      eyebrow: "Nuestros Tratamientos",
      title: "Servicios Que Cuidan Tu Belleza",
      subtitle:
        "Seleccionamos nuestros tratamientos mas solicitados para que encuentres opciones claras, efectivas y adaptadas a tus objetivos.",
      specialty: "Especialidad",
      scheduleEvaluation: "Agendar Evaluacion",
      personalizedEval: "Evaluacion Personalizada",
      idealProtocol: "Te ayudamos a elegir el protocolo ideal para ti",
      finalText:
        "Agenda tu cita y recibe una recomendacion profesional segun tu tipo de piel, objetivos y estilo de vida.",
      finalCta: "Quiero mi valoracion",
      stepLabel: "Paso",
    },
    categories: [
      {
        category: "Faciales Avanzados",
        description:
          "Protocolos para iluminar, renovar y rejuvenecer tu rostro con resultados visibles y naturales.",
        img: "/images/unsplash/photo-1522335789203-aabd1fc54bc9.webp",
        icon: Sparkles,
        services: [
          {
            name: "Limpieza Facial Profunda",
            benefit: "Purifica poros y mejora textura desde la primera sesion.",
          },
          {
            name: "Hidratacion Profunda con Vitamina C",
            benefit: "Aporta luminosidad y suavidad en pieles opacas.",
          },
          {
            name: "Tratamiento de Manchas",
            benefit: "Unifica el tono y reduce pigmentacion localizada.",
          },
          {
            name: "Control de Acne y Piel Grasa",
            benefit: "Disminuye brotes activos y regula el exceso de sebo.",
          },
          {
            name: "Rejuvenecimiento Facial con HIFU",
            benefit: "Efecto tensor sin cirugia para redefinir contornos.",
          },
          {
            name: "Plasma Rico en Plaquetas",
            benefit: "Estimula regeneracion natural para una piel revitalizada.",
          },
          {
            name: "Mesoterapia Facial",
            benefit: "Nutricion intensiva para piel mas firme y uniforme.",
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
          "Tratamientos disenados para relajar, moldear y recuperar bienestar corporal con enfoque integral.",
        img: "/images/unsplash/photo-1544161515-4ab6ce6db874.webp",
        icon: Hand,
        services: [
          {
            name: "Masajes Relajantes",
            benefit: "Alivian tensiones y promueven descanso profundo.",
          },
          {
            name: "Masajes Reductores",
            benefit: "Favorecen modelado corporal y mejoran circulacion.",
          },
          {
            name: "Lineas de Expresion",
            benefit: "Atenua marcas finas para un rostro mas descansado.",
          },
          {
            name: "Drenaje Linfatico Facial",
            benefit: "Reduce inflamacion y mejora definicion del contorno.",
          },
        ],
      },
      {
        category: "Laser y Zonas Especificas",
        description:
          "Tecnologia laser para depilacion, renovacion y despigmentacion en zonas estrategicas.",
        img: "/images/unsplash/photo-1512290923902-8a9f81dc236c.webp",
        icon: ScanLine,
        services: [
          {
            name: "Depilacion Definitiva con Laser Diodo",
            benefit: "Disminuye el vello de forma progresiva y duradera.",
          },
          {
            name: "Carbon Activo con Laser",
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
        img: "/images/unsplash/photo-1576091160550-2173dba999ef.webp",
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
      {
        category: "Tratamientos con Láser",
        description:
          "Soluciones laser avanzadas para cicatrices de acne, rejuvenecimiento y zonas especificas con resultados de precision.",
        img: "/images/unsplash/photo-1570172619644-dfd03ed5d881.webp",
        icon: Zap,
        services: [
          {
            name: "CO2 Fraccionado",
            benefit: "Trata cicatrices de acne y rejuvenece la piel con resurfacing de precision.",
          },
          {
            name: "Laser para Eliminacion de Lunares",
            benefit: "Elimina lunares de forma segura y con minima cicatrizacion.",
          },
          {
            name: "Laser Intimo",
            benefit: "Reafirma y rejuvenece la zona intima sin cirugia.",
          },
        ],
      },
      {
        category: "Tecnologia Facial y Corporal",
        description:
          "Equipos premium de ultima generacion para lifting, tensado y modelado corporal sin procedimientos invasivos.",
        img: "/images/unsplash/photo-1612817288484-6f916006741a.webp",
        icon: Cpu,
        services: [
          {
            name: "HIFU 360 Max (25D)",
            benefit: "Lifting facial y tensado corporal profundo con ultrasonido focalizado de alta intensidad.",
          },
          {
            name: "Exilis Ultra 360",
            benefit: "Rejuvenecimiento facial y reduccion de grasa con radiofrecuencia y ultrasonido combinados.",
          },
        ],
      },
      {
        category: "Medicina Regenerativa y Rejuvenecimiento",
        description:
          "Regeneracion celular avanzada para resultados profundos, duraderos y naturales desde el interior.",
        img: "/images/unsplash/photo-1552693673-1bf958298935.webp",
        icon: FlaskConical,
        services: [
          {
            name: "Tratamientos con Exosomas",
            benefit: "Estimulan la renovacion celular para una piel mas joven y luminosa.",
          },
          {
            name: "PDRN de Salmon",
            benefit: "Rejuvenecimiento celular profundo con bioestimulacion natural de origen marino.",
          },
          {
            name: "Microneedling (Dermapen)",
            benefit: "Activa la produccion de colageno para mejorar textura y firmeza de la piel.",
          },
          {
            name: "Tratamientos con Celulas Madre",
            benefit: "Regeneracion tisular avanzada para resultados antiedad duraderos.",
          },
        ],
      },
      {
        category: "Hidratacion y Skin Boosters",
        description:
          "Hidratacion profunda e inteligente con activos premium para una piel radiante y saludable.",
        img: "/images/unsplash/photo-1526758097130-bab247274f58.webp",
        icon: Droplets,
        services: [
          {
            name: "Hidratacion Profunda con Exosomas",
            benefit: "Repone agua y nutrientes celulares para maxima luminosidad y vitalidad.",
          },
          {
            name: "Hidratacion con PDRN",
            benefit: "Revitaliza y sella la hidratacion con factor de crecimiento celular.",
          },
        ],
      },
    ],
  },
  en: {
    copy: {
      eyebrow: "Our Treatments",
      title: "Services That Elevate Your Beauty",
      subtitle:
        "We selected our most requested treatments so you can find clear, effective options tailored to your goals.",
      specialty: "Specialty",
      scheduleEvaluation: "Book Evaluation",
      personalizedEval: "Personalized Evaluation",
      idealProtocol: "We help you choose the ideal protocol for your needs",
      finalText:
        "Book your appointment and receive a professional recommendation based on your skin type, goals, and lifestyle.",
      finalCta: "I want my consultation",
      stepLabel: "Step",
    },
    categories: [
      {
        category: "Advanced Facial Treatments",
        description:
          "Protocols designed to brighten, renew, and rejuvenate your face with visible, natural-looking results.",
        img: "/images/unsplash/photo-1522335789203-aabd1fc54bc9.webp",
        icon: Sparkles,
        services: [
          {
            name: "Deep Facial Cleansing",
            benefit: "Purifies pores and improves skin texture from the first session.",
          },
          {
            name: "Deep Hydration with Vitamin C",
            benefit: "Adds glow and softness to dull-looking skin.",
          },
          {
            name: "Dark Spot Treatment",
            benefit: "Evens out tone and reduces localized pigmentation.",
          },
          {
            name: "Acne and Oily Skin Control",
            benefit: "Reduces active breakouts and regulates excess oil production.",
          },
          {
            name: "HIFU Facial Rejuvenation",
            benefit: "Non-surgical lifting effect to redefine facial contours.",
          },
          {
            name: "Platelet-Rich Plasma (PRP)",
            benefit: "Stimulates natural regeneration for revitalized skin.",
          },
          {
            name: "Facial Mesotherapy",
            benefit: "Intensive nourishment for firmer and more even skin.",
          },
          {
            name: "Under-Eye Treatment",
            benefit: "Improves tired-looking eyes and restores freshness.",
          },
        ],
      },
      {
        category: "Body and Wellness Treatments",
        description:
          "Treatments designed to relax, sculpt, and restore body wellness with a holistic approach.",
        img: "/images/unsplash/photo-1544161515-4ab6ce6db874.webp",
        icon: Hand,
        services: [
          {
            name: "Relaxing Massages",
            benefit: "Relieve muscle tension and promote deep rest.",
          },
          {
            name: "Body Sculpting Massages",
            benefit: "Support contouring goals and improve circulation.",
          },
          {
            name: "Expression Line Care",
            benefit: "Softens fine lines for a more rested appearance.",
          },
          {
            name: "Facial Lymphatic Drainage",
            benefit: "Reduces puffiness and improves contour definition.",
          },
        ],
      },
      {
        category: "Laser and Targeted Areas",
        description:
          "Laser technology for hair reduction, skin renewal, and pigmentation care in strategic areas.",
        img: "/images/unsplash/photo-1512290923902-8a9f81dc236c.webp",
        icon: ScanLine,
        services: [
          {
            name: "Diode Laser Hair Reduction",
            benefit: "Progressively reduces unwanted hair with long-lasting results.",
          },
          {
            name: "Laser Carbon Peel",
            benefit: "Cleanses, brightens, and visibly improves skin texture.",
          },
          {
            name: "Intimate HIFU",
            benefit: "Helps tighten tissue and improve intimate comfort.",
          },
          {
            name: "Intimate Area Brightening",
            benefit: "Gradually evens skin tone in intimate areas.",
          },
          {
            name: "Underarm Brightening",
            benefit: "Reduces darkening and improves tone uniformity.",
          },
        ],
      },
      {
        category: "Post-Operative Care",
        description:
          "Specialized support to accelerate recovery and enhance aesthetic outcomes.",
        img: "/images/unsplash/photo-1576091160550-2173dba999ef.webp",
        icon: ShieldCheck,
        services: [
          {
            name: "Post-Op Aesthetic Surgery Care",
            benefit: "Helps control inflammation and supports safe recovery.",
          },
          {
            name: "Post-Op Lymphatic Drainage",
            benefit: "Helps reduce swelling and improves post-surgical recovery progress.",
          },
        ],
      },
      {
        category: "Laser Treatments",
        description:
          "Advanced laser solutions for acne scars, skin rejuvenation, and targeted areas with precise, lasting results.",
        img: "/images/unsplash/photo-1570172619644-dfd03ed5d881.webp",
        icon: Zap,
        services: [
          {
            name: "Fractional CO2 Laser",
            benefit: "Treats acne scars and rejuvenates skin through precision resurfacing.",
          },
          {
            name: "Laser Mole Removal",
            benefit: "Safely removes moles with minimal scarring and high precision.",
          },
          {
            name: "Intimate Laser",
            benefit: "Non-surgical firming and rejuvenation for the intimate area.",
          },
        ],
      },
      {
        category: "Advanced Technology: Face & Body",
        description:
          "Premium, cutting-edge devices for lifting, tightening, and body contouring without invasive procedures.",
        img: "/images/unsplash/photo-1612817288484-6f916006741a.webp",
        icon: Cpu,
        services: [
          {
            name: "HIFU 360 Max (25D)",
            benefit: "Deep facial lifting and body tightening using high-intensity focused ultrasound.",
          },
          {
            name: "Exilis Ultra 360",
            benefit: "Facial rejuvenation and fat reduction combining radiofrequency and ultrasound.",
          },
        ],
      },
      {
        category: "Regenerative Medicine & Rejuvenation",
        description:
          "Advanced cellular regeneration for deep, long-lasting, and natural-looking results from within.",
        img: "/images/unsplash/photo-1552693673-1bf958298935.webp",
        icon: FlaskConical,
        services: [
          {
            name: "Exosome Treatments",
            benefit: "Stimulate cellular renewal for younger, more radiant-looking skin.",
          },
          {
            name: "Salmon PDRN (Cellular Rejuvenation)",
            benefit: "Deep cellular rejuvenation through natural marine-origin biostimulation.",
          },
          {
            name: "Microneedling (Dermapen)",
            benefit: "Activates collagen production to improve skin texture and firmness.",
          },
          {
            name: "Stem Cell Treatments",
            benefit: "Advanced tissue regeneration for long-lasting anti-aging results.",
          },
        ],
      },
      {
        category: "Hydration & Skin Boosters",
        description:
          "Deep, intelligent hydration with premium active ingredients for radiant, healthy skin.",
        img: "/images/unsplash/photo-1526758097130-bab247274f58.webp",
        icon: Droplets,
        services: [
          {
            name: "Deep Hydration with Exosomes",
            benefit: "Replenishes cellular water and nutrients for maximum glow and vitality.",
          },
          {
            name: "PDRN Hydration",
            benefit: "Revitalizes and seals in hydration with cellular growth factor.",
          },
        ],
      },
    ],
  },
};

type ServiciosPageProps = {
  locale?: Locale;
};

export default function ServiciosPage({ locale = "es" }: ServiciosPageProps) {
  const localize = (path: string) => withLocalePath(locale, path);
  const { copy, categories } = servicesByLocale[locale];

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
            {copy.eyebrow}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6">{copy.title}</h1>
          <p className="text-gray-600 text-lg font-light">{copy.subtitle}</p>

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
                      <p className="text-sm uppercase tracking-widest">{copy.specialty}</p>
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
                      href={localize("/contacto")}
                      className="inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium text-[#D4AF37] hover:text-[#b5952f] transition-colors group"
                    >
                      {copy.scheduleEvaluation}
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
            <p className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] mb-2">{copy.personalizedEval}</p>
            <h3 className="text-2xl md:text-3xl font-serif mb-3">{copy.idealProtocol}</h3>
            <p className="text-gray-300 font-light">{copy.finalText}</p>
          </div>
          <Link
            href={localize("/contacto")}
            className="bg-[#D4AF37] text-white px-7 py-3 rounded-sm hover:bg-[#b5952f] transition-colors uppercase text-sm tracking-widest whitespace-nowrap"
          >
            {copy.finalCta}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

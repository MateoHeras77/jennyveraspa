"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, getLocaleFromPathname } from "@/lib/i18n";

const contactCopy = {
  es: {
    eyebrow: "Contacto",
    title: "Reserva tu Experiencia",
    description:
      "Estamos aqui para guiarte en tu camino hacia el bienestar. Contactanos para agendar una evaluacion personalizada y descubrir el tratamiento ideal para ti.",
    visit: "Visitanos",
    call: "Llamanos",
    hours: "Horarios",
    hoursValue: "Lunes a Viernes: 09:00 - 18:00\nSabados: 09:00 - 13:00",
    sendMessage: "Envianos un Mensaje",
  },
  en: {
    eyebrow: "Contact",
    title: "Book Your Experience",
    description:
      "We are here to guide you on your wellness journey. Contact us to schedule a personalized evaluation and discover the ideal treatment for you.",
    visit: "Visit Us",
    call: "Call Us",
    hours: "Business Hours",
    hoursValue: "Monday to Friday: 09:00 - 18:00\nSaturday: 09:00 - 13:00",
    sendMessage: "Send Us a Message",
  },
} as const;

export default function ContactoPage() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? DEFAULT_LOCALE;
  const copy = contactCopy[locale];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">{copy.eyebrow}</span>
              <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">{copy.title}</h1>
              <p className="text-gray-600 font-light text-lg">
                {copy.description}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FDFBF7] rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-[#D4AF37]" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-gray-900 mb-2">{copy.visit}</h3>
                  <p className="text-gray-600 font-light">Edificio Plaza Médica 4to piso<br/>Av. Manuel de J. Calle y Paucarbamba<br/>Cuenca, Ecuador</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FDFBF7] rounded-full flex items-center justify-center shrink-0">
                  <Phone className="text-[#D4AF37]" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-gray-900 mb-2">{copy.call}</h3>
                  <a href={`tel:${CONTACT_PHONE_E164}`} className="text-gray-600 font-light hover:text-[#D4AF37] transition-colors">
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FDFBF7] rounded-full flex items-center justify-center shrink-0">
                  <Clock className="text-[#D4AF37]" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-gray-900 mb-2">{copy.hours}</h3>
                  <p className="text-gray-600 font-light whitespace-pre-line">{copy.hoursValue}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#FDFBF7] p-10 rounded-sm shadow-xl border border-[#D4AF37]/10"
          >
            <h2 className="text-2xl font-serif text-gray-900 mb-8">{copy.sendMessage}</h2>
            
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </div>
  );
}

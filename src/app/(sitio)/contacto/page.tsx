"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";

export default function ContactoPage() {
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
              <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">Contacto</span>
              <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Reserva tu Experiencia</h1>
              <p className="text-gray-600 font-light text-lg">
                Estamos aquí para guiarte en tu camino hacia el bienestar. Contáctanos para agendar una evaluación personalizada y descubrir el tratamiento ideal para ti.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FDFBF7] rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-[#D4AF37]" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-gray-900 mb-2">Visítanos</h3>
                  <p className="text-gray-600 font-light">Edificio Plaza Médica 4to piso<br/>Av. Manuel de J. Calle y Paucarbamba<br/>Cuenca, Ecuador</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FDFBF7] rounded-full flex items-center justify-center shrink-0">
                  <Phone className="text-[#D4AF37]" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-gray-900 mb-2">Llámanos</h3>
                  <p className="text-gray-600 font-light">+593 90 000 0000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FDFBF7] rounded-full flex items-center justify-center shrink-0">
                  <Clock className="text-[#D4AF37]" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-gray-900 mb-2">Horarios</h3>
                  <p className="text-gray-600 font-light">Lunes a Viernes: 09:00 - 18:00<br/>Sábados: 09:00 - 13:00</p>
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
            <h2 className="text-2xl font-serif text-gray-900 mb-8">Envíanos un Mensaje</h2>
            
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </div>
  );
}

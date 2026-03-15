import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, MapPin, Phone } from "lucide-react";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-400 py-20 border-t border-[#222]">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-6 md:col-span-1">
          <div className="relative w-32 h-12 mb-6">
             <Image 
               src="/logo-white.png" 
               alt="Jenny Vera Spa" 
               fill
               className="object-contain object-left"
             />
          </div>
          <p className="text-sm font-light leading-relaxed text-gray-500">
            Santuario de belleza y bienestar en Cuenca. Elevando la estética con ciencia, lujo y arte.
          </p>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-white uppercase tracking-[0.2em] text-xs font-semibold">Tratamientos</h4>
          <ul className="space-y-3 text-sm font-light">
            <li><Link href="/servicios#faciales" className="hover:text-[#D4AF37] transition-colors">Rejuvenecimiento Facial</Link></li>
            <li><Link href="/servicios#corporales" className="hover:text-[#D4AF37] transition-colors">Remodelación Corporal</Link></li>
            <li><Link href="/servicios#post-op" className="hover:text-[#D4AF37] transition-colors">Post-Operatorios Especializados</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white uppercase tracking-[0.2em] text-xs font-semibold">Ubicación</h4>
          <ul className="space-y-4 text-sm font-light">
            <li className="flex items-start gap-4">
              <MapPin size={18} className="text-[#D4AF37] mt-0.5 shrink-0" />
              <span>Edificio Plaza Médica, 4to piso<br/>Av. Manuel de J. Calle<br/>Cuenca, Ecuador</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone size={18} className="text-[#D4AF37] shrink-0" />
              <a href={`tel:${CONTACT_PHONE_E164}`} className="hover:text-[#D4AF37] transition-colors">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white uppercase tracking-[0.2em] text-xs font-semibold">Conecta</h4>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 mt-20 pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs font-light text-gray-600 tracking-[0.1em] uppercase">
          © {new Date().getFullYear()} Jenny Vera Spa.
        </span>
      </div>
    </footer>
  );
}
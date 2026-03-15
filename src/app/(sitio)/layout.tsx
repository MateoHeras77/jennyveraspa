import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, MapPin, Phone } from "lucide-react";

export default function SitioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FCFBF8] text-stone-800">
      {/* Navbar de Lujo */}
      <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-[#1A1A1A]/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-1 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <Image 
                src="/logo-white.png" 
                alt="Jenny Vera Spa Logo" 
                width={120} 
                height={50}
                className="object-contain" 
              />
            </div>
          </Link>
          
          <nav className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-stone-300">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors duration-300">Inicio</Link>
            <Link href="/servicios" className="hover:text-[#D4AF37] transition-colors duration-300">Servicios</Link>
            <Link href="/blog" className="hover:text-[#D4AF37] transition-colors duration-300">Blog</Link>
            <Link href="/contacto" className="hover:text-[#D4AF37] transition-colors duration-300">Contacto</Link>
          </nav>

          <Link href="/contacto" className="hidden md:flex bg-[#D4AF37] text-white px-6 py-2 rounded-sm uppercase text-xs tracking-widest hover:bg-[#b08d27] transition-colors">
            Agendar Cita
          </Link>
        </div>
      </header>

      {/* Espaciador para el navbar fix */}
      <div className="h-[80px] bg-[#1A1A1A]"></div>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer de Lujo */}
      <footer className="w-full bg-[#1A1A1A] text-stone-400 py-16 border-t border-white/5 pt-20">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1 */}
          <div className="space-y-6">
            <Image 
              src="/logo-white.png" 
              alt="Jenny Vera Spa Logo" 
              width={140} 
              height={60}
              className="object-contain opacity-80 hover:opacity-100 transition-opacity" 
            />
            <p className="text-sm leading-relaxed max-w-sm">
              Centro de estética avanzada, masajes y cuidados post-operatorios enfocados en resaltar tu belleza natural con la más alta tecnología.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-6">
            <h3 className="text-white text-lg tracking-widest uppercase font-light">Contáctanos</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Edificio Plaza Médica 4to piso<br/>Av. Manuel de J. Calle y Paucarbamba<br/>Cuenca, Ecuador</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>+593 90 000 0000</span>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-6">
            <h3 className="text-white text-lg tracking-widest uppercase font-light">Horarios</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Lunes - Viernes</span>
                <span className="text-[#D4AF37]">09:00 - 18:00</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Sábados</span>
                <span className="text-[#D4AF37]">09:00 - 14:00</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Domingos</span>
                <span className="text-stone-500">Cerrado</span>
              </li>
            </ul>
            <div className="pt-4 flex gap-4">
              <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} Jenny Vera Spa. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

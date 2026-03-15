"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function SitioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDFBF7] text-gray-800 selection:bg-[#D4AF37] selection:text-white">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-gray-200/50 shadow-sm py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group">
            {/* Logo area */}
            <div className={`relative w-10 h-10 rounded-full overflow-hidden transition-all duration-500 flex items-center justify-center ${
              isScrolled ? "bg-gray-900" : "bg-white/10 backdrop-blur-sm border border-white/20"
            }`}>
              <Image 
                src="/logo-white.png" 
                alt="Jenny Vera Spa Logo" 
                fill
                className="object-cover p-2"
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl md:text-2xl font-serif tracking-[0.25em] transition-colors duration-500 uppercase ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}>
                Jenny Vera
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-500 ${
            isScrolled ? "text-gray-600" : "text-white/80"
          }`}>
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Inicio</Link>
            <Link href="/servicios" className="hover:text-[#D4AF37] transition-colors">Tratamientos</Link>
            <Link href="/blog" className="hover:text-[#D4AF37] transition-colors">Journal</Link>
            <Link 
              href="/contacto" 
              className={`px-8 py-3 rounded-sm transition-all duration-300 ${
                isScrolled 
                  ? "bg-gray-900 text-white hover:bg-[#D4AF37]" 
                  : "bg-white text-gray-900 hover:bg-[#D4AF37] hover:text-white"
              }`}
            >
              Reservar
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden transition-colors duration-500 ${
              isScrolled || mobileMenuOpen ? "text-gray-900" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 flex flex-col p-8 gap-8 items-center text-center tracking-[0.2em] uppercase text-sm md:hidden overflow-hidden"
            >
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-[#D4AF37]">Inicio</Link>
              <Link href="/servicios" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-[#D4AF37]">Tratamientos</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-[#D4AF37]">Journal</Link>
              <Link href="/contacto" onClick={() => setMobileMenuOpen(false)} className="bg-[#D4AF37] text-white px-8 py-4 w-full max-w-xs mt-4 hover:bg-gray-900 transition-colors">Configurar Cita</Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#111111] text-gray-400 py-20 border-t border-[#222]">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-6 md:col-span-1">
            <h3 className="text-white text-2xl font-serif tracking-[0.2em] uppercase">Jenny Vera</h3>
            <p className="text-sm font-light leading-relaxed text-gray-500">
              Santuario de belleza y bienestar en Cuenca. Elevando la estética con ciencia, lujo y arte.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-white uppercase tracking-[0.2em] text-xs font-semibold">Tratamientos</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><Link href="/servicios/estetica-facial" className="hover:text-[#D4AF37] transition-colors">Rejuvenecimiento Facial</Link></li>
              <li><Link href="/servicios/estetica-corporal" className="hover:text-[#D4AF37] transition-colors">Remodelación Corporal</Link></li>
              <li><Link href="/servicios/cuidados-post-operatorios" className="hover:text-[#D4AF37] transition-colors">Post-Operatorios Especializados</Link></li>
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
                <span>+593 90 000 0000</span>
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
          <span className="text-xs font-light text-gray-600 tracking-[0.1em] uppercase">
            Diseñado para la excelencia
          </span>
        </div>
      </footer>
    </div>
  );
}

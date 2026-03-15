"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  { 
    name: "Inicio", 
    href: "/" 
  },
  { 
    name: "Tratamientos", 
    href: "/servicios",
    submenu: [
      { name: "Faciales", href: "/servicios#faciales", desc: "Rejuvenecimiento y cuidado de la piel" },
      { name: "Corporales", href: "/servicios#corporales", desc: "Remodelación y reducción de medidas" },
      { name: "Tecnología", href: "/servicios#tecnologia", desc: "Aparatología de última generación" },
    ]
  },
  { 
    name: "Journal", 
    href: "/blog",
    submenu: [
      { name: "Ver Todo", href: "/blog", desc: "Todos nuestros artículos y consejos" },
      { name: "Estética Facial", href: "/blog/categoria/estetica-facial", desc: "Guías para el cuidado del rostro" },
      { name: "Recuperación", href: "/blog/categoria/recuperacion", desc: "Tips post-operatorios y drenajes" },
      { name: "Bienestar", href: "/blog/categoria/tratamientos-corporales", desc: "Relajación y equilibrio corporal" },
    ]
  },
  { 
    name: "Contacto", 
    href: "/contacto" 
  },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredResult, setHoveredResult] = useState<string | null>(null);

  const isHome = pathname === "/";
  const useTransparentHeader = isHome && !isScrolled && !mobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500 border-b",
          useTransparentHeader
            ? "bg-transparent border-transparent py-6"
            : "bg-[#FDFBF7]/90 backdrop-blur-xl border-[#d8c9a0]/35 py-3 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.45)]"
        )}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center gap-12 relative">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group z-50 shrink-0">
            <div className={`relative w-32 h-32 md:w-40 md:h-40 transition-all duration-500`}>
              <Image 
                src={useTransparentHeader ? "/logo-white.png" : "/logo-black.png"}
                alt="Jenny Vera Spa Logo" 
                fill
                className={cn(
                  "object-contain transition-all duration-500",
                  useTransparentHeader ? "drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]" : "mix-blend-multiply"
                )}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative group py-4"
                onMouseEnter={() => setHoveredResult(item.name)}
                onMouseLeave={() => setHoveredResult(null)}
              >
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300",
                    useTransparentHeader
                      ? "text-white/90 hover:text-[#f7d678]"
                      : "text-gray-900 hover:text-[#D4AF37]"
                  )}
                >
                  {item.name}
                  {item.submenu && <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform duration-300" />}
                </Link>

                {/* Dropdown Menu */}
                {item.submenu && (
                  <AnimatePresence>
                    {hoveredResult === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        animate={{ opacity: 1, y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                        exit={{ opacity: 0, y: 5, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-6 min-w-[280px]"
                      >
                         <div className="bg-white rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-2 overflow-hidden">
                           {item.submenu.map((subItem) => (
                             <Link
                               key={subItem.name}
                               href={subItem.href}
                               className="flex flex-col px-4 py-3 hover:bg-[#FDFBF7] rounded-md group/item transition-colors"
                             >
                               <span className="text-xs font-semibold uppercase tracking-wider text-gray-800 group-hover/item:text-[#D4AF37] flex items-center justify-between">
                                 {subItem.name}
                                 <Sparkles className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity text-[#D4AF37]" />
                               </span>
                               {subItem.desc && (
                                 <span className="text-[10px] text-gray-400 font-light mt-1 leading-tight">
                                   {subItem.desc}
                                 </span>
                               )}
                             </Link>
                           ))}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block z-50 ml-auto mr-auto">
             <Link 
               href="/contacto" 
               className={cn(
                 buttonVariants({ variant: "default", size: "sm" }), 
                 useTransparentHeader
                   ? "bg-white/12 text-white border border-white/35 hover:bg-white hover:text-[#1B1B1B] text-xs px-8 py-6 rounded-sm uppercase tracking-[0.15em] transition-all duration-300 backdrop-blur-sm"
                   : "bg-[#1B1B1B] text-white hover:bg-[#D4AF37] text-xs px-8 py-6 rounded-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
               )}
             >
               Reserva Cita
             </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={cn(
              "lg:hidden z-50 p-2 rounded-full transition-colors",
              useTransparentHeader
                ? "text-white hover:bg-white/15"
                : "text-gray-900 hover:bg-gray-100"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 lg:hidden flex flex-col pt-32 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item, idx) => (
                <div key={item.name} className="border-b border-gray-100 pb-4 last:border-0">
                  <Link 
                    href={item.href}
                    onClick={() => !item.submenu && setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-xl font-serif text-[#1B1B1B]"
                  >
                     {item.name}
                  </Link>
                  
                  {item.submenu && (
                    <div className="mt-4 pl-4 flex flex-col gap-3 border-l-2 border-[#D4AF37]/20">
                      {item.submenu.map(subItem => (
                        <Link 
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm text-gray-500 hover:text-[#D4AF37] uppercase tracking-wider"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-8 pb-12">
                <Link
                  href="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-[#D4AF37] text-white py-4 rounded-sm uppercase tracking-[0.2em] text-sm font-medium hover:bg-[#1B1B1B] transition-colors shadow-lg"
                >
                  Agendar Cita
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
            : "bg-[#FDFBF7]/90 backdrop-blur-xl border-[#d8c9a0]/35 py-1.5 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.45)]"
        )}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center gap-4 lg:gap-12 relative">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group z-50 shrink-0">
            <div
              className={cn(
                "relative transition-all duration-500",
                useTransparentHeader ? "h-20 w-20 md:h-24 md:w-24" : "h-11 w-11 md:h-12 md:w-12"
              )}
            >
              <Image 
                src={useTransparentHeader ? "/logo-white.webp" : "/logo-black.webp"}
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
                className="relative group py-2"
              >
                <Link 
                  href={item.href}
                  prefetch={false}
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
                  <div className="pointer-events-none absolute top-full left-1/2 min-w-[280px] -translate-x-1/2 pt-6 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                     <div className="overflow-hidden rounded-lg border border-gray-100 bg-white p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
                       {item.submenu.map((subItem) => (
                         <Link
                           key={subItem.name}
                           href={subItem.href}
                               prefetch={false}
                           className="group/item flex flex-col rounded-md px-4 py-3 transition-colors hover:bg-[#FDFBF7]"
                         >
                           <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-800 group-hover/item:text-[#D4AF37]">
                             {subItem.name}
                             <Sparkles className="h-3 w-3 text-[#D4AF37] opacity-0 transition-opacity group-hover/item:opacity-100" />
                           </span>
                           {subItem.desc && (
                             <span className="mt-1 text-[10px] font-light leading-tight text-gray-500">
                               {subItem.desc}
                             </span>
                           )}
                         </Link>
                       ))}
                     </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block z-50 ml-auto mr-auto">
             <Link 
               href="/contacto" 
               prefetch={false}
               className={cn(
                 buttonVariants({ variant: "default", size: "sm" }), 
                 useTransparentHeader
                   ? "bg-white/12 text-white border border-white/35 hover:bg-white hover:text-[#1B1B1B] text-xs px-8 py-5 rounded-sm uppercase tracking-[0.15em] transition-all duration-300 backdrop-blur-sm"
                   : "bg-[#1B1B1B] text-white hover:bg-[#D4AF37] text-[11px] px-6 py-3 rounded-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
               )}
             >
               Reserva Cita
             </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={cn(
              "lg:hidden z-50 ml-auto p-2 rounded-full transition-colors",
              useTransparentHeader
                ? "text-white hover:bg-white/15"
                : "text-gray-900 hover:bg-gray-100"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menu de navegacion" : "Abrir menu de navegacion"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white/95 px-6 pt-32 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100 pb-4 last:border-0">
                <Link 
                  href={item.href}
                  prefetch={false}
                  onClick={() => !item.submenu && setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xl font-serif text-[#1B1B1B]"
                >
                   {item.name}
                </Link>
                
                {item.submenu && (
                  <div className="mt-4 flex flex-col gap-3 border-l-2 border-[#D4AF37]/20 pl-4">
                    {item.submenu.map((subItem) => (
                      <Link 
                        key={subItem.name}
                        href={subItem.href}
                        prefetch={false}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm uppercase tracking-wider text-gray-600 hover:text-[#D4AF37]"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pb-12 pt-8">
              <Link
                href="/contacto"
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full rounded-sm bg-[#D4AF37] py-4 text-center text-sm font-medium uppercase tracking-[0.2em] text-white shadow-lg transition-colors hover:bg-[#1B1B1B]"
              >
                Agendar Cita
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
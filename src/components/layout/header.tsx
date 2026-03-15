"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  headerCopy,
  localeNames,
  stripLocaleFromPath,
  type Locale,
  withLocalePath,
} from "@/lib/i18n";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeLocale = getLocaleFromPathname(pathname) ?? DEFAULT_LOCALE;
  const copy = headerCopy[activeLocale];
  const pathWithoutLocale = stripLocaleFromPath(pathname);

  const localizeHref = (path: string) => withLocalePath(activeLocale, path);

  const navItems = [
    {
      name: copy.home,
      href: localizeHref("/"),
    },
    {
      name: copy.treatments,
      href: localizeHref("/servicios"),
      submenu: [
        { name: copy.facials, href: localizeHref("/servicios#faciales"), desc: copy.facialsDesc },
        { name: copy.body, href: localizeHref("/servicios#corporales"), desc: copy.bodyDesc },
        { name: copy.technology, href: localizeHref("/servicios#tecnologia"), desc: copy.technologyDesc },
      ],
    },
    {
      name: copy.journal,
      href: localizeHref("/blog"),
      submenu: [
        { name: copy.viewAll, href: localizeHref("/blog"), desc: copy.viewAll },
        {
          name: copy.facialCategory,
          href: localizeHref("/blog/categoria/estetica-facial"),
          desc: copy.facialCategoryDesc,
        },
        { name: copy.recovery, href: localizeHref("/blog/categoria/recuperacion"), desc: copy.recoveryDesc },
        {
          name: copy.wellness,
          href: localizeHref("/blog/categoria/tratamientos-corporales"),
          desc: copy.wellnessDesc,
        },
      ],
    },
    {
      name: copy.contact,
      href: localizeHref("/contacto"),
    },
  ];

  const isHome = pathWithoutLocale === "/";
  const useTransparentHeader = isHome && !isScrolled && !mobileMenuOpen;

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === activeLocale) {
      return;
    }

    const nextPath = withLocalePath(nextLocale, pathWithoutLocale);
    window.location.assign(nextPath);
  };

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
          <Link href={localizeHref("/")} className="flex items-center group z-50 shrink-0">
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
          <div className="hidden lg:flex z-50 ml-auto mr-auto items-center gap-3">
             <div className="flex items-center rounded-full border border-white/25 bg-white/10 p-1 text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm">
               {(Object.keys(localeNames) as Locale[]).map((locale) => (
                 <button
                   key={locale}
                   type="button"
                   onClick={() => switchLocale(locale)}
                   className={cn(
                     "rounded-full px-2.5 py-1 transition-colors",
                     activeLocale === locale
                       ? "bg-[#D4AF37] text-white"
                       : useTransparentHeader
                         ? "text-white/80 hover:text-white"
                         : "text-gray-700 hover:text-[#D4AF37]"
                   )}
                   aria-label={`Switch language to ${localeNames[locale]}`}
                 >
                   {localeNames[locale]}
                 </button>
               ))}
             </div>
             <Link 
               href={localizeHref("/contacto")} 
               prefetch={false}
               className={cn(
                 buttonVariants({ variant: "default", size: "sm" }), 
                 useTransparentHeader
                   ? "bg-white/12 text-white border border-white/35 hover:bg-white hover:text-[#1B1B1B] text-xs px-8 py-5 rounded-sm uppercase tracking-[0.15em] transition-all duration-300 backdrop-blur-sm"
                   : "bg-[#1B1B1B] text-white hover:bg-[#D4AF37] text-[11px] px-6 py-3 rounded-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
               )}
             >
               {copy.bookNow}
             </Link>
          </div>

          {/* Mobile Controls */}
          <div className="ml-auto flex items-center gap-2 lg:hidden z-50">
            <div
              className={cn(
                "flex items-center rounded-full p-1 text-[10px] uppercase tracking-[0.14em]",
                useTransparentHeader
                  ? "border border-white/30 bg-white/10 backdrop-blur-sm"
                  : "border border-gray-300 bg-white"
              )}
              aria-label="Language selector"
            >
              {(Object.keys(localeNames) as Locale[]).map((locale) => (
                <button
                  key={locale}
                  type="button"
                  onClick={() => switchLocale(locale)}
                  className={cn(
                    "rounded-full px-2 py-1 transition-colors",
                    activeLocale === locale
                      ? "bg-[#D4AF37] text-white"
                      : useTransparentHeader
                        ? "text-white/80 hover:text-white"
                        : "text-gray-700 hover:text-[#D4AF37]"
                  )}
                  aria-label={`Switch language to ${localeNames[locale]}`}
                >
                  {localeNames[locale]}
                </button>
              ))}
            </div>

            <button
              className={cn(
                "p-2 rounded-full transition-colors",
                useTransparentHeader
                  ? "text-white hover:bg-white/15"
                  : "text-gray-900 hover:bg-gray-100"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? copy.closeMenu : copy.openMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
            <div className="pt-4">
              <div className="mb-6 flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white p-1 text-[10px] uppercase tracking-[0.18em]">
                {(Object.keys(localeNames) as Locale[]).map((locale) => (
                  <button
                    key={locale}
                    type="button"
                    onClick={() => {
                      switchLocale(locale);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "rounded-full px-3 py-1.5 transition-colors",
                      activeLocale === locale
                        ? "bg-[#D4AF37] text-white"
                        : "text-gray-700 hover:text-[#D4AF37]"
                    )}
                    aria-label={`Switch language to ${localeNames[locale]}`}
                  >
                    {localeNames[locale]}
                  </button>
                ))}
              </div>
            </div>

            <div className="pb-12 pt-2">
              <Link
                href={localizeHref("/contacto")}
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full rounded-sm bg-[#D4AF37] py-4 text-center text-sm font-medium uppercase tracking-[0.2em] text-white shadow-lg transition-colors hover:bg-[#1B1B1B]"
              >
                {copy.scheduleNow}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
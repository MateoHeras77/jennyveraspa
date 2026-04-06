"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, MapPin, Phone, Star } from "lucide-react";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, footerCopy, getLocaleFromPathname, withLocalePath } from "@/lib/i18n";

export function Footer() {
  const reviewUrl = "https://g.page/r/Cbso4rpRXTOYEAI/review";
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? DEFAULT_LOCALE;
  const copy = footerCopy[locale];
  const reviewCtaLabel = locale === "es" ? "Dejar resena en Google" : "Leave a Google review";
  const localizeHref = (path: string) => withLocalePath(locale, path);

  return (
    <footer className="border-t border-[#222] bg-[#111111] py-20 text-gray-300">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="space-y-6 md:col-span-1">
          <div className="relative w-32 h-12 mb-6">
             <Image 
               src="/logo-white.webp" 
               alt="Jenny Vera Spa" 
               fill
               className="object-contain object-left"
             />
          </div>
          <p className="text-sm font-light leading-relaxed text-gray-300">
            {copy.tagline}
          </p>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{copy.treatmentsTitle}</h3>
          <ul className="space-y-3 text-sm font-light">
            <li><Link href={localizeHref("/servicios#faciales")} className="hover:text-[#D4AF37] transition-colors">{copy.facialRejuvenation}</Link></li>
            <li><Link href={localizeHref("/servicios#corporales")} className="hover:text-[#D4AF37] transition-colors">{copy.bodyRemodeling}</Link></li>
            <li><Link href={localizeHref("/servicios#post-op")} className="hover:text-[#D4AF37] transition-colors">{copy.postOp}</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{copy.locationTitle}</h3>
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
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{copy.legalTitle}</h3>
          <ul className="space-y-3 text-sm font-light">
            <li><Link href={localizeHref("/nosotros")} className="hover:text-[#D4AF37] transition-colors">{copy.aboutUs}</Link></li>
            <li><Link href={localizeHref("/privacidad")} className="hover:text-[#D4AF37] transition-colors">{copy.privacyPolicy}</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{copy.connectTitle}</h3>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Jenny Vera Spa"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-700 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Jenny Vera Spa"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-700 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <Facebook size={18} />
            </a>
          </div>
          <a
            href={reviewUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex w-full items-center justify-center rounded-sm border border-[#D4AF37]/45 bg-[#161616] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#D4AF37] hover:text-[#111111]"
            aria-label={`${reviewCtaLabel} on Google`}
          >
            <Star size={14} className="mr-2" aria-hidden="true" />
            {reviewCtaLabel}
          </a>
        </div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs font-light uppercase tracking-[0.1em] text-gray-400">
          © {new Date().getFullYear()} Jenny Vera Spa.
        </span>
        <div className="flex items-center gap-6 text-xs font-light text-gray-500">
          <Link href={localizeHref("/nosotros")} className="hover:text-[#D4AF37] transition-colors uppercase tracking-[0.1em]">
            {copy.aboutUs}
          </Link>
          <Link href={localizeHref("/privacidad")} className="hover:text-[#D4AF37] transition-colors uppercase tracking-[0.1em]">
            {copy.privacyPolicy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
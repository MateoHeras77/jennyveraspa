"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { whatsappBridgePath } from "@/lib/constants";
import { DEFAULT_LOCALE, getLocaleFromPathname } from "@/lib/i18n";

export function WhatsAppFloat() {
  const locale = getLocaleFromPathname(usePathname()) ?? DEFAULT_LOCALE;

  return (
    <div className="fixed bottom-5 right-4 z-[70] sm:right-6">
      <div className="mb-2 flex animate-[fadeInUp_0.45s_ease-out] justify-end">
        <span className="rounded-full border border-[#1b8f4f]/20 bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1b8f4f] shadow-sm backdrop-blur-sm">
          WhatsApp
        </span>
      </div>

      <a
        href={whatsappBridgePath(locale, "float")}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="Contactar por WhatsApp"
        onClick={() => track("whatsapp_click", { source: "float" })}
        className="group flex h-14 w-14 animate-[float_2.4s_ease-in-out_infinite] items-center justify-center rounded-full border border-[#2dd06f] bg-[#25D366] text-white shadow-[0_14px_38px_-16px_rgba(37,211,102,0.9)] transition-transform hover:scale-105"
      >
        <MessageCircle size={27} strokeWidth={2.2} />
      </a>
    </div>
  );
}

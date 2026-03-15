"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_CONTACT_URL } from "@/lib/constants";

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-5 right-4 z-[70] sm:right-6">
      <div className="mb-2 flex animate-[fadeInUp_0.45s_ease-out] justify-end">
        <span className="rounded-full border border-[#1b8f4f]/20 bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1b8f4f] shadow-sm backdrop-blur-sm">
          WhatsApp
        </span>
      </div>

      <a
        href={WHATSAPP_CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="group flex h-14 w-14 animate-[float_2.4s_ease-in-out_infinite] items-center justify-center rounded-full border border-[#2dd06f] bg-[#25D366] text-white shadow-[0_14px_38px_-16px_rgba(37,211,102,0.9)] transition-transform hover:scale-105"
      >
        <MessageCircle size={27} strokeWidth={2.2} />
      </a>
    </div>
  );
}

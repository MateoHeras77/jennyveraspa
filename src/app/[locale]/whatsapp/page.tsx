import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_CONTACT_URL } from "@/lib/constants";
import { isValidLocale, SUPPORTED_LOCALES } from "@/lib/i18n";
import { WhatsAppRedirect } from "./whatsapp-redirect";

type WhatsAppPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

// Página puente de medición, sin valor de búsqueda: fuera del índice y sin
// transmitir enlaces. Tampoco se añade al sitemap (src/app/sitemap.ts lista las
// rutas de forma explícita, así que no entra sola).
export const metadata: Metadata = {
  title: "WhatsApp",
  robots: {
    index: false,
    follow: false,
  },
};

const copy = {
  es: {
    heading: "Abriendo WhatsApp…",
    fallback: "Si no se abre automáticamente, toca el botón:",
    button: "Escribirnos por WhatsApp",
  },
  en: {
    heading: "Opening WhatsApp…",
    fallback: "If it does not open automatically, tap the button:",
    button: "Message us on WhatsApp",
  },
} as const;

export default async function WhatsAppBridgePage({ params }: WhatsAppPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = copy[locale];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#111111] px-6 text-center text-white">
      <WhatsAppRedirect />

      <MessageCircle size={44} className="animate-pulse text-[#25D366]" strokeWidth={2} />
      <h1 className="font-serif text-2xl">{t.heading}</h1>
      <p className="text-sm font-light text-white/70">{t.fallback}</p>

      <a
        href={WHATSAPP_CONTACT_URL}
        rel="noopener noreferrer nofollow"
        className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1b8f4f]"
      >
        <MessageCircle size={16} />
        {t.button}
      </a>
    </main>
  );
}

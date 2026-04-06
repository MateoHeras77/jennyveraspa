import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrivacidadPage from "@/app/(sitio)/privacidad/page";
import { getLocaleAlternates, isValidLocale, type Locale } from "@/lib/i18n";

type LocalizedPrivacidadProps = {
  params: Promise<{ locale: string }>;
};

const privacidadMetadataByLocale: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Politica de Privacidad | Jenny Vera Spa",
    description:
      "Conoce como Jenny Vera Spa recopila, usa y protege tus datos personales conforme a la Ley de Proteccion de Datos del Ecuador.",
  },
  en: {
    title: "Privacy Policy | Jenny Vera Spa",
    description:
      "Learn how Jenny Vera Spa collects, uses, and protects your personal data in accordance with Ecuador's Data Protection Law.",
  },
};

export async function generateMetadata({ params }: LocalizedPrivacidadProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const copy = privacidadMetadataByLocale[locale];
  const alternates = getLocaleAlternates(locale, "/privacidad");

  return {
    title: copy.title,
    description: copy.description,
    alternates,
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: alternates.canonical,
      locale: locale === "es" ? "es_EC" : "en_US",
      type: "website",
    },
  };
}

export default async function LocalizedPrivacidadPage({ params }: LocalizedPrivacidadProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <PrivacidadPage />;
}

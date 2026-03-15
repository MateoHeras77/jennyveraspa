import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiciosPage from "@/app/(sitio)/servicios/page";
import { getLocaleAlternates, isValidLocale, type Locale } from "@/lib/i18n";

type LocalizedServicesProps = {
  params: Promise<{ locale: string }>;
};

const servicesMetadataByLocale: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Servicios de Estetica en Cuenca",
    description:
      "Explora tratamientos faciales, corporales, laser y post-operatorios con evaluacion personalizada.",
  },
  en: {
    title: "Aesthetic Services in Cuenca",
    description:
      "Explore facial, body, laser, and post-operative treatments with a personalized evaluation.",
  },
};

export async function generateMetadata({ params }: LocalizedServicesProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const copy = servicesMetadataByLocale[locale];
  const alternates = getLocaleAlternates(locale, "/servicios");

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

export default async function LocalizedServicesPage({ params }: LocalizedServicesProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <ServiciosPage locale={locale} />;
}

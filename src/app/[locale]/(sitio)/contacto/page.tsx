import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactoPage from "@/app/(sitio)/contacto/page";
import { getLocaleAlternates, isValidLocale, type Locale } from "@/lib/i18n";

type LocalizedContactProps = {
  params: Promise<{ locale: string }>;
};

const contactMetadataByLocale: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Contacto | Jenny Vera Spa",
    description:
      "Agenda tu evaluacion personalizada en Jenny Vera Spa y recibe una recomendacion profesional para tu tratamiento.",
  },
  en: {
    title: "Contact | Jenny Vera Spa",
    description:
      "Book your personalized evaluation at Jenny Vera Spa and receive a professional treatment recommendation.",
  },
};

export async function generateMetadata({ params }: LocalizedContactProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const copy = contactMetadataByLocale[locale];
  const alternates = getLocaleAlternates(locale, "/contacto");

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

export default async function LocalizedContactPage({ params }: LocalizedContactProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <ContactoPage />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NosotrosPage from "@/app/(sitio)/nosotros/page";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getLocaleAlternates, isValidLocale, toAbsoluteUrl, withLocalePath, type Locale } from "@/lib/i18n";

type LocalizedNosotrosProps = {
  params: Promise<{ locale: string }>;
};

const nosotrosMetadataByLocale: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Nosotros — Centro de Estetica Avanzada en Cuenca, Ecuador",
    description:
      "Conoce la historia, mision y equipo profesional de Jenny Vera Spa, centro de estetica avanzada en Cuenca, Ecuador.",
  },
  en: {
    title: "About Us — Advanced Aesthetics Center in Cuenca, Ecuador",
    description:
      "Learn about the history, mission, and professional team of Jenny Vera Spa, an advanced aesthetics center in Cuenca, Ecuador.",
  },
};

export async function generateMetadata({ params }: LocalizedNosotrosProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const copy = nosotrosMetadataByLocale[locale];
  const alternates = getLocaleAlternates(locale, "/nosotros");

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

export default async function LocalizedNosotrosPage({ params }: LocalizedNosotrosProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const isEs = locale === "es";
  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", item: toAbsoluteUrl(withLocalePath(locale, "/")) },
    { name: isEs ? "Nosotros" : "About Us", item: toAbsoluteUrl(withLocalePath(locale, "/nosotros")) },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <NosotrosPage />
    </>
  );
}

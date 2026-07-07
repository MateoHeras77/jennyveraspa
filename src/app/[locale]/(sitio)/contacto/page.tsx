import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactoPage from "@/app/(sitio)/contacto/page";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  getLocaleAlternates,
  isValidLocale,
  toAbsoluteUrl,
  withLocalePath,
  type Locale,
} from "@/lib/i18n";

type LocalizedContactProps = {
  params: Promise<{ locale: string }>;
};

const contactMetadataByLocale: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Contacto y Citas en Cuenca, Ecuador",
    description:
      "Agenda tu evaluación personalizada en Jenny Vera Spa, Cuenca, Ecuador, y recibe una recomendación profesional para tu tratamiento.",
  },
  en: {
    title: "Contact and Appointments in Cuenca, Ecuador",
    description:
      "Book your personalized evaluation at Jenny Vera Spa in Cuenca, Ecuador, and receive a professional treatment recommendation.",
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
      images: [
        {
          url: "/image2.webp",
          width: 1200,
          height: 630,
          alt: locale === "es" ? "Agenda tu cita en Jenny Vera Spa, Cuenca" : "Book your appointment at Jenny Vera Spa, Cuenca",
        },
      ],
    },
  };
}

export default async function LocalizedContactPage({ params }: LocalizedContactProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const breadcrumbs = [
    { name: locale === "es" ? "Inicio" : "Home", item: toAbsoluteUrl(withLocalePath(locale, "/")) },
    {
      name: locale === "es" ? "Contacto" : "Contact",
      item: toAbsoluteUrl(withLocalePath(locale, "/contacto")),
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ContactoPage />
    </>
  );
}

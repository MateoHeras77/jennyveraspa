import HomePage from "@/components/home-page";
import { getAllPosts } from "@/lib/blog-content";
import { getLocaleAlternates, isValidLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type LocalizedHomeProps = {
  params: Promise<{ locale: string }>;
};

const homeMetadataByLocale: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Jenny Vera Spa | Centro de Estetica Avanzada en Cuenca",
    description:
      "Tratamientos estéticos faciales y corporales, masajes relajantes y cuidados post-operatorios en Cuenca, Ecuador. Tecnología avanzada y atención personalizada.",
  },
  en: {
    title: "Jenny Vera Spa | Advanced Aesthetic Center in Cuenca",
    description:
      "Advanced facial and body aesthetic treatments, relaxing massages, and post-operative care in Cuenca, Ecuador. Personalized attention and proven results.",
  },
};

export async function generateMetadata({ params }: LocalizedHomeProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const copy = homeMetadataByLocale[locale];

  return {
    title: copy.title,
    description: copy.description,
    alternates: getLocaleAlternates(locale, "/"),
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: getLocaleAlternates(locale, "/").canonical,
      locale: locale === "es" ? "es_EC" : "en_US",
      type: "website",
      images: [
        {
          url: "/image2.webp",
          width: 1200,
          height: 630,
          alt: locale === "es" ? "Jenny Vera Spa — Centro de Estética Avanzada en Cuenca" : "Jenny Vera Spa — Advanced Aesthetic Center in Cuenca",
        },
      ],
    },
  };
}

export default async function LocalizedHomePage({ params }: LocalizedHomeProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const posts = await getAllPosts(locale);
  return <HomePage posts={posts} locale={locale as Locale} />;
}

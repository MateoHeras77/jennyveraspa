import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BlogListingSection } from "@/components/shared/blog-listing-section";
import { getAllPosts } from "@/lib/blog-content";
import { getBlogListingState, slugifyCategory } from "@/lib/blog-listing";
import { getLocaleAlternates, isValidLocale, type Locale, withLocalePath } from "@/lib/i18n";

type BlogMetadataProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    categoria?: string;
    page?: string;
  }>;
};

const blogMetaByLocale: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  es: {
    title: "Blog de Estetica y Bienestar",
    description:
      "Guias profesionales sobre estetica facial, corporal y cuidados postoperatorios para tomar mejores decisiones sobre tu bienestar.",
    ogDescription:
      "Articulos actualizados sobre Botox, HIFU, drenaje linfatico y protocolos esteticos con enfoque clinico y resultados naturales.",
  },
  en: {
    title: "Aesthetics and Wellness Blog",
    description:
      "Professional guides on facial aesthetics, body care, and post-operative recovery to help you make better wellness decisions.",
    ogDescription:
      "Updated articles on Botox, HIFU, lymphatic drainage, and aesthetic protocols focused on natural, evidence-driven results.",
  },
};

export async function generateMetadata({ params, searchParams }: BlogMetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const query = await searchParams;

  if (!isValidLocale(locale)) {
    return {};
  }

  const isLegacyFiltered = Boolean(query.categoria);
  const copy = blogMetaByLocale[locale];
  const alternates = getLocaleAlternates(locale, "/blog");

  return {
    title: copy.title,
    description: copy.description,
    alternates,
    robots: isLegacyFiltered
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title: `${copy.title} | Jenny Vera Spa`,
      description: copy.ogDescription,
      url: alternates.canonical,
      type: "website",
      locale: locale === "es" ? "es_EC" : "en_US",
      images: [
        {
          url: "/placeholder.png",
          width: 1200,
          height: 630,
          alt: "Jenny Vera Spa Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.title} | Jenny Vera Spa`,
      description: copy.ogDescription,
      images: ["/placeholder.png"],
    },
  };
}

type BlogPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    categoria?: string;
  }>;
};

export default async function LocalizedBlogPage({ params, searchParams }: BlogPageProps) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);

  if (!isValidLocale(locale)) {
    redirect(withLocalePath("es", "/blog"));
  }

  const posts = await getAllPosts(locale);

  if (query.categoria) {
    const categorySlug = slugifyCategory(query.categoria);
    redirect(withLocalePath(locale, `/blog/categoria/${categorySlug}`));
  }

  const state = getBlogListingState({
    posts,
    categorySlug: undefined,
    pageParam: "1",
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#F9F3E4_0%,#FDFBF7_45%,#FFFFFF_100%)] pb-24 pt-32">
      <BlogListingSection state={state} />
    </div>
  );
}

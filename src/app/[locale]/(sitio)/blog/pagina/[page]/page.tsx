import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogListingSection } from "@/components/shared/blog-listing-section";
import { getAllPosts } from "@/lib/blog-content";
import { getBlogListingState, slugifyCategory } from "@/lib/blog-listing";
import { getLocaleAlternates, isValidLocale, withLocalePath } from "@/lib/i18n";

type BlogPaginatedPageProps = {
  params: Promise<{ locale: string; page: string }>;
  searchParams: Promise<{ categoria?: string }>;
};

function parsePageParam(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 1 : parsed;
}

export async function generateMetadata({ params, searchParams }: BlogPaginatedPageProps): Promise<Metadata> {
  const [{ locale, page }, query] = await Promise.all([params, searchParams]);

  if (!isValidLocale(locale)) {
    return {};
  }

  const currentPage = parsePageParam(page);
  const canonicalPath = currentPage <= 1 ? "/blog" : `/blog/pagina/${currentPage}`;
  const alternates = getLocaleAlternates(locale, canonicalPath);

  return {
    title: locale === "es" ? `Blog - Pagina ${Math.max(1, currentPage)}` : `Blog - Page ${Math.max(1, currentPage)}`,
    description:
      locale === "es"
        ? "Guias profesionales sobre estetica facial, corporal y cuidados postoperatorios para tomar mejores decisiones sobre tu bienestar."
        : "Professional guides on facial aesthetics, body care, and post-operative recovery to support better wellness decisions.",
    alternates,
    robots: query.categoria
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title:
        locale === "es"
          ? `Blog de Estetica y Bienestar - Pagina ${Math.max(1, currentPage)} | Jenny Vera Spa`
          : `Aesthetics and Wellness Blog - Page ${Math.max(1, currentPage)} | Jenny Vera Spa`,
      description:
        locale === "es"
          ? "Articulos actualizados sobre Botox, HIFU, drenaje linfatico y protocolos esteticos con enfoque clinico y resultados naturales."
          : "Updated articles on Botox, HIFU, lymphatic drainage, and aesthetic protocols focused on natural results.",
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
  };
}

export default async function BlogPaginatedPage({ params, searchParams }: BlogPaginatedPageProps) {
  const [{ locale, page }, query] = await Promise.all([params, searchParams]);

  if (!isValidLocale(locale)) {
    redirect(withLocalePath("es", "/blog"));
  }

  const requestedPage = parsePageParam(page);

  if (query.categoria) {
    const categorySlug = slugifyCategory(query.categoria);
    const target =
      requestedPage <= 1
        ? withLocalePath(locale, `/blog/categoria/${categorySlug}`)
        : withLocalePath(locale, `/blog/categoria/${categorySlug}/pagina/${requestedPage}`);
    redirect(target);
  }

  if (requestedPage <= 1) {
    redirect(withLocalePath(locale, "/blog"));
  }

  const posts = await getAllPosts(locale);
  const state = getBlogListingState({
    posts,
    categorySlug: undefined,
    pageParam: String(requestedPage),
  });

  if (state.currentPage !== requestedPage) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#F9F3E4_0%,#FDFBF7_45%,#FFFFFF_100%)] pb-24 pt-32">
      <BlogListingSection state={state} />
    </div>
  );
}

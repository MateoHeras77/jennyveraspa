import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogListingSection } from "@/components/shared/blog-listing-section";
import { getAllPosts } from "@/lib/blog-content";
import { getBlogListingState } from "@/lib/blog-listing";
import { getLocaleAlternates, isValidLocale, withLocalePath } from "@/lib/i18n";

type BlogCategoryPaginatedPageProps = {
  params: Promise<{ locale: string; category: string; page: string }>;
};

function parsePageParam(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 1 : parsed;
}

function titleFromCategorySlug(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: BlogCategoryPaginatedPageProps): Promise<Metadata> {
  const { locale, category, page } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const currentPage = parsePageParam(page);
  const categoryTitle = titleFromCategorySlug(category);
  const canonicalPath = `/blog/categoria/${category}/pagina/${Math.max(2, currentPage)}`;
  const alternates = getLocaleAlternates(locale, canonicalPath);

  return {
    title:
      locale === "es"
        ? `${categoryTitle} - Pagina ${Math.max(2, currentPage)} | Blog Jenny Vera Spa`
        : `${categoryTitle} - Page ${Math.max(2, currentPage)} | Jenny Vera Spa Blog`,
    description:
      locale === "es"
        ? `Guias profesionales sobre ${categoryTitle.toLowerCase()} en Jenny Vera Spa. Pagina ${Math.max(2, currentPage)}.`
        : `Professional guides on ${categoryTitle.toLowerCase()} at Jenny Vera Spa. Page ${Math.max(2, currentPage)}.`,
    alternates,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogCategoryPaginatedPage({ params }: BlogCategoryPaginatedPageProps) {
  const { locale, category, page } = await params;

  if (!isValidLocale(locale)) {
    redirect(withLocalePath("es", `/blog/categoria/${category}`));
  }

  const requestedPage = parsePageParam(page);

  if (requestedPage <= 1) {
    redirect(withLocalePath(locale, `/blog/categoria/${category}`));
  }

  const posts = await getAllPosts(locale);
  const state = getBlogListingState({
    posts,
    categorySlug: category,
    pageParam: String(requestedPage),
  });

  if (!state.activeCategory || state.currentPage !== requestedPage) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#F9F3E4_0%,#FDFBF7_45%,#FFFFFF_100%)] pb-24 pt-32">
      <BlogListingSection state={state} />
    </div>
  );
}

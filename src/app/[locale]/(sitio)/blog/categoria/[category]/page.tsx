import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogListingSection } from "@/components/shared/blog-listing-section";
import { getAllPosts } from "@/lib/blog-content";
import { getBlogListingState } from "@/lib/blog-listing";
import { getLocaleAlternates, isValidLocale, withLocalePath } from "@/lib/i18n";

type BlogCategoryPageProps = {
  params: Promise<{ locale: string; category: string }>;
};

function titleFromCategorySlug(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { locale, category } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const categoryTitle = titleFromCategorySlug(category);
  const alternates = getLocaleAlternates(locale, `/blog/categoria/${category}`);

  return {
    title: locale === "es" ? `Blog - Categoria ${categoryTitle}` : `Blog - Category ${categoryTitle}`,
    description:
      locale === "es"
        ? "Guias profesionales sobre estetica facial, corporal y cuidados postoperatorios para tomar mejores decisiones sobre tu bienestar."
        : "Professional guides on facial aesthetics, body care, and post-operative recovery to support better wellness decisions.",
    alternates,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { locale, category } = await params;

  if (!isValidLocale(locale)) {
    redirect(withLocalePath("es", `/blog/categoria/${category}`));
  }

  const posts = await getAllPosts(locale);

  const state = getBlogListingState({
    posts,
    categorySlug: category,
    pageParam: "1",
  });

  if (!state.activeCategory) {
    notFound();
  }

  if (state.totalPages <= 1) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#F9F3E4_0%,#FDFBF7_45%,#FFFFFF_100%)] pb-24 pt-32">
        <BlogListingSection state={state} />
      </div>
    );
  }

  if (state.currentPage !== 1) {
    redirect(withLocalePath(locale, `/blog/categoria/${category}`));
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#F9F3E4_0%,#FDFBF7_45%,#FFFFFF_100%)] pb-24 pt-32">
      <BlogListingSection state={state} />
    </div>
  );
}

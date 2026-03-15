import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogListingSection } from "@/components/shared/blog-listing-section";
import { getAllPosts, getBlogCanonical } from "@/lib/blog-content";
import { getBlogListingState } from "@/lib/blog-listing";

type BlogCategoryPaginatedPageProps = {
  params: Promise<{
    category: string;
    page: string;
  }>;
};

function parsePageParam(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 1 : parsed;
}

export async function generateMetadata({ params }: BlogCategoryPaginatedPageProps): Promise<Metadata> {
  const { category, page } = await params;
  const currentPage = parsePageParam(page);

  return {
    title: `Blog - ${category.replace(/-/g, " ")} - Pagina ${Math.max(1, currentPage)}`,
    description:
      "Guías profesionales sobre estética facial, corporal y cuidados postoperatorios para tomar mejores decisiones sobre tu bienestar.",
    alternates: {
      canonical: getBlogCanonical(`/blog/categoria/${category}/pagina/${Math.max(1, currentPage)}`),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogCategoryPaginatedPage({ params }: BlogCategoryPaginatedPageProps) {
  const { category, page } = await params;
  const requestedPage = parsePageParam(page);

  if (requestedPage <= 1) {
    redirect(`/blog/categoria/${category}`);
  }

  const posts = await getAllPosts();
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

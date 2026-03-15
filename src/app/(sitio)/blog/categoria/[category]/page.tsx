import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogListingSection } from "@/components/shared/blog-listing-section";
import { getAllPosts, getBlogCanonical } from "@/lib/blog-content";
import { getBlogListingState } from "@/lib/blog-listing";

type BlogCategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  return {
    title: `Blog - Categoria ${category.replace(/-/g, " ")}`,
    description:
      "Guías profesionales sobre estética facial, corporal y cuidados postoperatorios para tomar mejores decisiones sobre tu bienestar.",
    alternates: {
      canonical: getBlogCanonical(`/blog/categoria/${category}`),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { category } = await params;
  const posts = await getAllPosts();

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
    redirect(`/blog/categoria/${category}`);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#F9F3E4_0%,#FDFBF7_45%,#FFFFFF_100%)] pb-24 pt-32">
      <BlogListingSection state={state} />
    </div>
  );
}

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogListingSection } from "@/components/shared/blog-listing-section";
import { getAllPosts, getBlogCanonical } from "@/lib/blog-content";
import { getBlogListingState } from "@/lib/blog-listing";

type BlogPaginatedPageProps = {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ categoria?: string }>;
};

function parsePageParam(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 1 : parsed;
}

export async function generateMetadata({ params, searchParams }: BlogPaginatedPageProps): Promise<Metadata> {
  const { page } = await params;
  const query = await searchParams;
  const currentPage = parsePageParam(page);
  const canonicalPath = currentPage <= 1 ? "/blog" : `/blog/pagina/${currentPage}`;

  return {
    title: `Blog - Pagina ${Math.max(1, currentPage)}`,
    description:
      "Guías profesionales sobre estética facial, corporal y cuidados postoperatorios para tomar mejores decisiones sobre tu bienestar.",
    alternates: {
      canonical: getBlogCanonical(canonicalPath),
    },
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
      title: `Blog de Estetica y Bienestar - Pagina ${Math.max(1, currentPage)} | Jenny Vera Spa`,
      description:
        "Artículos actualizados sobre Botox, HIFU, drenaje linfático y protocolos estéticos con enfoque clínico y resultados naturales.",
      url: getBlogCanonical(canonicalPath),
      type: "website",
      images: [
        {
          url: getBlogCanonical("/placeholder.png"),
          width: 1200,
          height: 630,
          alt: "Blog Jenny Vera Spa",
        },
      ],
    },
  };
}

export default async function BlogPaginatedPage({ params, searchParams }: BlogPaginatedPageProps) {
  const [{ page }, query] = await Promise.all([params, searchParams]);
  const requestedPage = parsePageParam(page);

  if (requestedPage <= 1) {
    const target = query.categoria ? `/blog?categoria=${encodeURIComponent(query.categoria)}` : "/blog";
    redirect(target);
  }

  const posts = await getAllPosts();
  const state = getBlogListingState({
    posts,
    categoryParam: query.categoria,
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

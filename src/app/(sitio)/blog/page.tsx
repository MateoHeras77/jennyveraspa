import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BlogListingSection } from "@/components/shared/blog-listing-section";
import { getAllPosts, getBlogCanonical } from "@/lib/blog-content";
import { getBlogListingState, slugifyCategory } from "@/lib/blog-listing";

type BlogMetadataProps = {
  searchParams: Promise<{
    categoria?: string;
    page?: string;
  }>;
};

export async function generateMetadata({ searchParams }: BlogMetadataProps): Promise<Metadata> {
  const params = await searchParams;
  const isLegacyFiltered = Boolean(params.categoria);

  return {
    title: "Blog de Estetica y Bienestar",
    description:
      "Guías profesionales sobre estética facial, corporal y cuidados postoperatorios para tomar mejores decisiones sobre tu bienestar.",
    alternates: {
      canonical: getBlogCanonical("/blog"),
    },
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
      title: "Blog de Estetica y Bienestar | Jenny Vera Spa",
      description:
        "Artículos actualizados sobre Botox, HIFU, drenaje linfático y protocolos estéticos con enfoque clínico y resultados naturales.",
      url: getBlogCanonical("/blog"),
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
    twitter: {
      card: "summary_large_image",
      title: "Blog de Estetica y Bienestar | Jenny Vera Spa",
      description:
        "Aprende sobre tratamientos estéticos con contenido claro, actualizado y orientado a resultados reales.",
      images: [getBlogCanonical("/placeholder.png")],
    },
  };
}

type BlogPageProps = {
  searchParams: Promise<{
    categoria?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = await getAllPosts();
  const params = await searchParams;

  if (params.categoria) {
    const categorySlug = slugifyCategory(params.categoria);
    redirect(`/blog/categoria/${categorySlug}`);
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

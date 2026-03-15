import type { Metadata } from "next";
import { BlogCard } from "@/components/shared/blog-card";
import { getAllPosts, getBlogCanonical } from "@/lib/blog-content";

export const metadata: Metadata = {
  title: "Blog de Estetica y Bienestar",
  description:
    "Guías profesionales sobre estética facial, corporal y cuidados postoperatorios para tomar mejores decisiones sobre tu bienestar.",
  alternates: {
    canonical: getBlogCanonical("/blog"),
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

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#F9F3E4_0%,#FDFBF7_45%,#FFFFFF_100%)] pb-24 pt-32">
      <section className="container mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A6422]">
            Journal Editorial
          </span>
          <h1 className="mb-6 font-serif text-4xl leading-tight text-gray-900 md:text-6xl">
            Diario de Belleza, Ciencia y Bienestar
          </h1>
          <p className="text-lg font-light leading-8 text-gray-600">
            Seleccionamos temas que impactan decisiones reales en estética avanzada: protocolos, mitos frecuentes y cuidados que elevan tus resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}

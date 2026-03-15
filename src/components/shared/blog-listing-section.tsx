import Link from "next/link";
import { BlogCard } from "@/components/shared/blog-card";
import { buildBlogHref, type BlogListingState } from "@/lib/blog-listing";

type BlogListingSectionProps = {
  state: BlogListingState;
};

export function BlogListingSection({ state }: BlogListingSectionProps) {
  return (
    <section className="container mx-auto max-w-6xl px-6">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <span className="mb-5 inline-flex items-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A6422]">
          Journal Editorial
        </span>
        <h1 className="mb-6 font-serif text-4xl leading-tight text-gray-900 md:text-6xl">
          Diario de Belleza, Ciencia y Bienestar
        </h1>
        <p className="text-lg font-light leading-8 text-gray-600">
          Seleccionamos temas que impactan decisiones reales en estetica avanzada: protocolos, mitos frecuentes y cuidados que elevan tus resultados.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Link
          href={buildBlogHref(1, null)}
          className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
            state.activeCategory === null
              ? "border-[#D4AF37] bg-[#D4AF37] text-white"
              : "border-[#D4AF37]/30 bg-white text-[#7A6422] hover:border-[#D4AF37]"
          }`}
        >
          Todas
        </Link>
        {state.categories.map((category) => (
          <Link
            key={category}
            href={buildBlogHref(1, category)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
              state.activeCategory === category
                ? "border-[#D4AF37] bg-[#D4AF37] text-white"
                : "border-[#D4AF37]/30 bg-white text-[#7A6422] hover:border-[#D4AF37]"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {state.paginatedPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} priority={index === 0 && state.currentPage === 1} />
        ))}
      </div>

      {state.paginatedPosts.length === 0 ? (
        <p className="mt-10 text-center text-sm text-gray-600">No encontramos articulos para este filtro por ahora.</p>
      ) : null}

      {state.totalPages > 1 ? (
        <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Paginacion del blog">
          <Link
            href={buildBlogHref(Math.max(1, state.currentPage - 1), state.activeCategory)}
            rel={state.currentPage > 1 ? "prev" : undefined}
            aria-disabled={state.currentPage === 1}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
              state.currentPage === 1
                ? "pointer-events-none border-gray-200 text-gray-400"
                : "border-[#D4AF37]/40 text-[#7A6422] hover:border-[#D4AF37]"
            }`}
          >
            Anterior
          </Link>

          {Array.from({ length: state.totalPages }, (_, idx) => idx + 1).map((pageNumber) => (
            <Link
              key={pageNumber}
              href={buildBlogHref(pageNumber, state.activeCategory)}
              className={`h-9 w-9 rounded-full border text-center text-xs font-semibold leading-9 transition ${
                pageNumber === state.currentPage
                  ? "border-[#D4AF37] bg-[#D4AF37] text-white"
                  : "border-[#D4AF37]/30 bg-white text-[#7A6422] hover:border-[#D4AF37]"
              }`}
              aria-current={pageNumber === state.currentPage ? "page" : undefined}
            >
              {pageNumber}
            </Link>
          ))}

          <Link
            href={buildBlogHref(Math.min(state.totalPages, state.currentPage + 1), state.activeCategory)}
            rel={state.currentPage < state.totalPages ? "next" : undefined}
            aria-disabled={state.currentPage === state.totalPages}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
              state.currentPage === state.totalPages
                ? "pointer-events-none border-gray-200 text-gray-400"
                : "border-[#D4AF37]/40 text-[#7A6422] hover:border-[#D4AF37]"
            }`}
          >
            Siguiente
          </Link>
        </nav>
      ) : null}
    </section>
  );
}

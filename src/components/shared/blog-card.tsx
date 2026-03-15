"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPostSummary } from "@/lib/blog-content";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, getLocaleFromPathname, withLocalePath } from "@/lib/i18n";

type BlogCardProps = {
  post: BlogPostSummary;
  priority?: boolean;
};

export function BlogCard({ post, priority = false }: BlogCardProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? DEFAULT_LOCALE;
  const postHref = withLocalePath(locale, post.href);

  return (
    <article className="group h-full rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-xl hover:shadow-black/5">
      <Link href={postHref} className="block h-full">
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <p className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A6422]">
            {post.category}
          </p>
        </div>

        <div className="flex h-[calc(100%-14rem)] flex-col p-6">
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.14em] text-gray-500">
            <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("es-EC", { dateStyle: "medium" })}</time>
            <span>{post.readingTime}</span>
          </div>

          <h2 className="mb-3 font-serif text-2xl leading-tight text-gray-900 transition-colors group-hover:text-[#9A7A1F]">
            {post.title}
          </h2>

          <p className="mb-6 flex-1 text-sm leading-6 text-gray-600">{post.description}</p>

          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-900 transition-colors group-hover:text-[#9A7A1F]">
            Leer articulo
            <ArrowUpRight size={14} />
          </span>
        </div>
      </Link>
    </article>
  );
}

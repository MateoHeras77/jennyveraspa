import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock3, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { ArticleSchema } from "@/components/seo/article-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { blogMdxComponents } from "@/components/shared/blog-mdx";
import { BlogCard } from "@/components/shared/blog-card";
import { BlogToc } from "@/components/shared/blog-toc";
import {
  getAdjacentPosts,
  getAllBlogSlugs,
  getBlogBreadcrumbs,
  getBlogCanonical,
  getHeadingsFromMarkdown,
  getPostBySlug,
  getRelatedPostsByTags,
  toAbsoluteUrl,
} from "@/lib/blog-content";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Articulo no encontrado",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = getBlogCanonical(`/blog/${post.slug}`);
  const image = toAbsoluteUrl(post.coverImage);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical,
    },
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: canonical,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = await getAdjacentPosts(slug);
  const relatedPosts = await getRelatedPostsByTags(slug, 3);
  const headings = getHeadingsFromMarkdown(post.body);
  const breadcrumbs = getBlogBreadcrumbs(post);
  const canonical = getBlogCanonical(`/blog/${post.slug}`);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#141414_0%,#141414_23rem,#FDFBF7_23rem,#FDFBF7_100%)] pb-20 pt-28">
      <article className="container mx-auto max-w-4xl px-6">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-white/80 transition hover:text-[#F3E5AB]"
        >
          <ChevronLeft size={16} />
          Volver al blog
        </Link>

        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1B1B1B] p-8 text-white shadow-2xl shadow-black/30 md:p-12">
          <p className="mb-5 inline-flex rounded-full bg-[#D4AF37]/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F3E5AB]">
            {post.category}
          </p>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{post.title}</h1>
          <p className="mt-5 max-w-2xl text-lg font-light leading-8 text-white/85">{post.description}</p>
          <div className="mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-[0.14em] text-white/75">
            <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("es-EC", { dateStyle: "long" })}</time>
            <span className="inline-flex items-center gap-2">
              <Clock3 size={14} />
              {post.readingTime}
            </span>
            <span>{post.author}</span>
          </div>
        </header>

        <div className="relative -mt-10 mb-10 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-xl shadow-black/5">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 960px"
            priority
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="rounded-3xl border border-black/8 bg-white p-7 shadow-lg shadow-black/5 md:p-12">
            <div className="mb-8 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-[#F7F1E0] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7A6422]"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#9A7A1F] prose-strong:text-gray-900">
              <MDXRemote
                source={post.body}
                components={blogMdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: "append",
                          properties: {
                            className: ["heading-anchor"],
                            ariaLabel: "Enlace a esta seccion",
                          },
                          content: [
                            {
                              type: "text",
                              value: "#",
                            },
                          ],
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-32 lg:self-start">
            <BlogToc headings={headings} />
          </div>
        </div>

        <nav className="mt-10 grid gap-4 md:grid-cols-2">
          {previous ? (
            <Link
              href={previous.href}
              className="rounded-2xl border border-black/10 bg-white p-5 transition hover:border-[#D4AF37]/50 hover:bg-[#FDF9EF]"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500">Articulo anterior</p>
              <p className="mt-2 font-serif text-2xl text-gray-900">{previous.title}</p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={next.href}
              className="rounded-2xl border border-black/10 bg-white p-5 text-left transition hover:border-[#D4AF37]/50 hover:bg-[#FDF9EF] md:text-right"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500">Articulo siguiente</p>
              <p className="mt-2 font-serif text-2xl text-gray-900">{next.title}</p>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {relatedPosts.length > 0 ? (
          <section className="mt-16">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A6422]">Sigue leyendo</p>
                <h2 className="mt-2 font-serif text-3xl text-gray-900">Articulos relacionados</h2>
              </div>
              <Link href="/blog" className="text-xs uppercase tracking-[0.16em] text-gray-600 hover:text-[#9A7A1F]">
                Ver todos
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        ) : null}
      </article>

      <ArticleSchema
        headline={post.title}
        description={post.description}
        image={toAbsoluteUrl(post.coverImage)}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        author={post.author ?? "Jenny Vera Spa"}
        url={canonical}
        section={post.category}
        keywords={post.tags}
      />
      <BreadcrumbSchema items={breadcrumbs} />
    </div>
  );
}

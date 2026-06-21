import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, MessageCircle, CalendarCheck } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ServiceSchema, FaqSchema } from "@/components/seo/service-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { blogMdxComponents } from "@/components/shared/blog-mdx";
import { BlogCard } from "@/components/shared/blog-card";
import { getPostBySlug, toAbsoluteUrl } from "@/lib/blog-content";
import { getAllServiceSlugs, getServiceBySlug } from "@/lib/services-content";
import { WHATSAPP_CONTACT_URL } from "@/lib/constants";
import {
  getLocaleAlternates,
  isValidLocale,
  SUPPORTED_LOCALES,
  toAbsoluteUrl as toSiteAbsoluteUrl,
  withLocalePath,
} from "@/lib/i18n";

type ServicePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugsByLocale = await Promise.all(
    SUPPORTED_LOCALES.map(async (locale) => ({
      locale,
      slugs: await getAllServiceSlugs(locale),
    }))
  );

  return slugsByLocale.flatMap(({ locale, slugs }) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const service = await getServiceBySlug(slug, locale);

  if (!service) {
    return {
      title: locale === "es" ? "Servicio no encontrado" : "Service not found",
      robots: { index: false, follow: false },
    };
  }

  const alternates = getLocaleAlternates(locale, `/servicios/${service.slug}`);
  const image = toAbsoluteUrl(service.coverImage);

  return {
    title: service.title,
    description: service.description,
    alternates,
    keywords: [service.keyword],
    openGraph: {
      title: service.title,
      description: service.description,
      type: "website",
      url: alternates.canonical,
      locale: locale === "es" ? "es_EC" : "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: service.coverImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: [image],
    },
  };
}

export default async function LocalizedServiceDetailPage({ params }: ServicePageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    redirect(withLocalePath("es", `/servicios/${slug}`));
  }

  const service = await getServiceBySlug(slug, locale);

  if (!service) {
    notFound();
  }

  const canonical = getLocaleAlternates(locale, `/servicios/${service.slug}`).canonical;
  const isEs = locale === "es";

  const relatedPosts = (
    await Promise.all((service.relatedPosts ?? []).map((postSlug) => getPostBySlug(postSlug, locale)))
  ).filter((post): post is NonNullable<typeof post> => Boolean(post));

  const breadcrumbs = [
    { name: isEs ? "Inicio" : "Home", item: toSiteAbsoluteUrl(withLocalePath(locale, "/")) },
    { name: isEs ? "Servicios" : "Services", item: toSiteAbsoluteUrl(withLocalePath(locale, "/servicios")) },
    { name: service.h1, item: canonical },
  ];

  const ctaPrimary = isEs ? "Reservar por WhatsApp" : "Book on WhatsApp";
  const ctaSecondary = isEs ? "Agendar evaluacion" : "Book an evaluation";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#141414_0%,#141414_22rem,#FDFBF7_22rem,#FDFBF7_100%)] pb-20 pt-28">
      <ServiceSchema
        name={service.h1}
        description={service.description}
        image={toAbsoluteUrl(service.coverImage)}
        url={canonical}
        category={service.category}
      />
      <FaqSchema items={service.faq} />
      <BreadcrumbSchema items={breadcrumbs} />

      <article className="container mx-auto max-w-4xl px-6">
        <Link
          href={withLocalePath(locale, "/servicios")}
          className="mb-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-white/80 transition hover:text-[#F3E5AB]"
        >
          <ChevronLeft size={16} />
          {isEs ? "Volver a servicios" : "Back to services"}
        </Link>

        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1B1B1B] p-8 text-white shadow-2xl shadow-black/30 md:p-12">
          <p className="mb-5 inline-flex rounded-full bg-[#D4AF37]/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F3E5AB]">
            {service.category}
          </p>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{service.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg font-light leading-8 text-white/85">{service.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-[#D4AF37] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#111111] transition-colors hover:bg-[#F3E5AB]"
            >
              <MessageCircle size={16} />
              {ctaPrimary}
            </a>
            <Link
              href={withLocalePath(locale, "/contacto")}
              className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#D4AF37] hover:text-[#F3E5AB]"
            >
              <CalendarCheck size={16} />
              {ctaSecondary}
            </Link>
          </div>
        </header>

        <div className="relative -mt-10 mb-10 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-xl shadow-black/5">
          <Image
            src={service.coverImage}
            alt={service.coverImageAlt}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 960px"
            priority
          />
        </div>

        <div className="rounded-3xl border border-black/8 bg-white p-7 shadow-lg shadow-black/5 md:p-12">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#9A7A1F] prose-strong:text-gray-900">
            <MDXRemote
              source={service.body}
              components={blogMdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
            />
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-black/8 bg-white p-7 shadow-lg shadow-black/5 md:p-12">
          <h2 className="font-serif text-3xl text-gray-900">
            {isEs ? "Preguntas frecuentes" : "Frequently asked questions"}
          </h2>
          <div className="mt-6 divide-y divide-gray-200">
            {service.faq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-gray-900 marker:content-['']">
                  <span>{item.question}</span>
                  <span className="text-[#D4AF37] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-gray-700 font-light leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#1A1A1A] p-8 text-white md:flex-row md:items-center md:p-12">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
              {isEs ? "Cuenca, Ecuador" : "Cuenca, Ecuador"}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl">
              {isEs ? "Agenda tu valoracion personalizada" : "Book your personalized evaluation"}
            </h2>
            <p className="mt-2 font-light text-gray-300">
              {isEs
                ? "Recibe una recomendacion profesional segun tu piel y tus objetivos."
                : "Get a professional recommendation based on your skin and your goals."}
            </p>
          </div>
          <a
            href={WHATSAPP_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-sm bg-[#D4AF37] px-7 py-3 text-sm uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#b5952f]"
          >
            {ctaPrimary}
          </a>
        </section>

        {relatedPosts.length > 0 ? (
          <section className="mt-16">
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A6422]">
                {isEs ? "Aprende mas" : "Learn more"}
              </p>
              <h2 className="mt-2 font-serif text-3xl text-gray-900">
                {isEs ? "Articulos relacionados" : "Related articles"}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </div>
  );
}

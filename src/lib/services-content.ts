import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { DEFAULT_LOCALE, isValidLocale, type Locale } from "@/lib/i18n";

const SERVICES_CONTENT_DIR = path.join(process.cwd(), "src/content/services");

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceFrontmatter = {
  /** Meta title (the layout template appends "| Jenny Vera Spa"). */
  title: string;
  /** Visible H1 of the page. */
  h1: string;
  /** Meta description (140-160 chars). */
  description: string;
  /** Stable, unique slug shared 1:1 between es and en. */
  slug: string;
  /** Primary commercial keyword the page targets. */
  keyword: string;
  /** Short benefit-led subtitle shown under the H1. */
  summary: string;
  /** Service category label (mirrors blog/service taxonomy). */
  category: string;
  coverImage: string;
  coverImageAlt: string;
  publishedAt: string;
  updatedAt?: string;
  /** 3-5 FAQ entries that power the FAQPage schema and on-page accordion. */
  faq: ServiceFaqItem[];
  /** Related blog slugs to cross-link (locale-neutral, resolved at render). */
  relatedPosts?: string[];
};

export type ServicePage = ServiceFrontmatter & {
  body: string;
};

export type ServiceSummary = Pick<
  ServiceFrontmatter,
  "title" | "h1" | "description" | "slug" | "keyword" | "summary" | "category" | "coverImage" | "coverImageAlt"
>;

function validateFrontmatter(fileName: string, data: Partial<ServiceFrontmatter>): ServiceFrontmatter {
  const requiredFields: Array<keyof ServiceFrontmatter> = [
    "title",
    "h1",
    "description",
    "slug",
    "keyword",
    "summary",
    "category",
    "coverImage",
    "coverImageAlt",
    "publishedAt",
    "faq",
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing service frontmatter field "${field}" in ${fileName}`);
    }
  }

  if (!Array.isArray(data.faq) || data.faq.length === 0) {
    throw new Error(`Service frontmatter field "faq" must be a non-empty array in ${fileName}`);
  }

  return {
    title: data.title as string,
    h1: data.h1 as string,
    description: data.description as string,
    slug: data.slug as string,
    keyword: data.keyword as string,
    summary: data.summary as string,
    category: data.category as string,
    coverImage: data.coverImage as string,
    coverImageAlt: data.coverImageAlt as string,
    publishedAt: data.publishedAt as string,
    updatedAt: data.updatedAt,
    faq: data.faq as ServiceFaqItem[],
    relatedPosts: data.relatedPosts ?? [],
  };
}

function resolveContentDir(locale: Locale): string {
  if (locale === "es") {
    return SERVICES_CONTENT_DIR;
  }

  return path.join(SERVICES_CONTENT_DIR, locale);
}

async function readServiceFiles(locale: Locale): Promise<string[]> {
  try {
    const files = await fs.readdir(resolveContentDir(locale));
    return files.filter((file) => file.endsWith(".mdx"));
  } catch {
    return [];
  }
}

async function readServiceFile(fileName: string, locale: Locale): Promise<ServicePage> {
  const filePath = path.join(resolveContentDir(locale), fileName);
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = validateFrontmatter(fileName, data as Partial<ServiceFrontmatter>);

  return {
    ...frontmatter,
    body: content,
  };
}

function toSummary(page: ServicePage): ServiceSummary {
  return {
    title: page.title,
    h1: page.h1,
    description: page.description,
    slug: page.slug,
    keyword: page.keyword,
    summary: page.summary,
    category: page.category,
    coverImage: page.coverImage,
    coverImageAlt: page.coverImageAlt,
  };
}

export const getAllServices = cache(async (locale: Locale = DEFAULT_LOCALE): Promise<ServiceSummary[]> => {
  const resolvedLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  const files = await readServiceFiles(resolvedLocale);
  const pages = await Promise.all(files.map((file) => readServiceFile(file, resolvedLocale)));
  return pages.sort((a, b) => a.h1.localeCompare(b.h1)).map(toSummary);
});

export const getServiceBySlug = cache(
  async (slug: string, locale: Locale = DEFAULT_LOCALE): Promise<ServicePage | null> => {
    const resolvedLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
    const files = await readServiceFiles(resolvedLocale);
    const pages = await Promise.all(files.map((file) => readServiceFile(file, resolvedLocale)));
    return pages.find((page) => page.slug === slug) ?? null;
  }
);

export const getAllServiceSlugs = cache(async (locale: Locale = DEFAULT_LOCALE): Promise<string[]> => {
  const services = await getAllServices(locale);
  return services.map((service) => service.slug);
});

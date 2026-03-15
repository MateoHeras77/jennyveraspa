import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "src/content/blog");
const BASE_URL = "https://www.jennyveraspa.com";

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  coverImage: string;
  coverImageAlt: string;
  author?: string;
  tags: string[];
};

export type BlogPostSummary = BlogPostFrontmatter & {
  readingTime: string;
  minutes: number;
  words: number;
  href: string;
};

export type BlogPost = BlogPostSummary & {
  body: string;
};

export type BlogHeading = {
  depth: 2 | 3;
  text: string;
  id: string;
};

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getHeadingsFromMarkdown(markdown: string): BlogHeading[] {
  const lines = markdown.split("\n");
  const headings: BlogHeading[] = [];

  for (const line of lines) {
    if (!line.startsWith("##")) {
      continue;
    }

    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) {
      continue;
    }

    const depth = match[1].length;
    if (depth !== 2 && depth !== 3) {
      continue;
    }

    const text = match[2].replace(/[*`]/g, "").trim();
    const id = slugifyHeading(text);

    if (!id) {
      continue;
    }

    headings.push({
      depth,
      text,
      id,
    });
  }

  return headings;
}

function validateFrontmatter(fileName: string, frontmatter: Partial<BlogPostFrontmatter>): BlogPostFrontmatter {
  const requiredFields: Array<keyof BlogPostFrontmatter> = [
    "title",
    "description",
    "slug",
    "publishedAt",
    "category",
    "coverImage",
    "coverImageAlt",
    "tags",
  ];

  for (const field of requiredFields) {
    if (!frontmatter[field]) {
      throw new Error(`Missing frontmatter field \"${field}\" in ${fileName}`);
    }
  }

  if (!Array.isArray(frontmatter.tags) || frontmatter.tags.length === 0) {
    throw new Error(`Frontmatter field \"tags\" must be a non-empty array in ${fileName}`);
  }

  return {
    title: frontmatter.title as string,
    description: frontmatter.description as string,
    slug: frontmatter.slug as string,
    publishedAt: frontmatter.publishedAt as string,
    updatedAt: frontmatter.updatedAt,
    category: frontmatter.category as string,
    coverImage: frontmatter.coverImage as string,
    coverImageAlt: frontmatter.coverImageAlt as string,
    author: frontmatter.author ?? "Jenny Vera Spa",
    tags: frontmatter.tags as string[],
  };
}

async function readPostFile(fileName: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_CONTENT_DIR, fileName);
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = validateFrontmatter(fileName, data as Partial<BlogPostFrontmatter>);
  const stats = readingTime(content);

  return {
    ...frontmatter,
    href: `/blog/${frontmatter.slug}`,
    body: content,
    readingTime: stats.text,
    minutes: Math.max(1, Math.round(stats.minutes)),
    words: stats.words,
  };
}

async function readAllPostFiles(): Promise<string[]> {
  const files = await fs.readdir(BLOG_CONTENT_DIR);
  return files.filter((file) => file.endsWith(".mdx"));
}

function sortByDate(posts: BlogPost[]): BlogPost[] {
  return posts.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

function toSummary(post: BlogPost): BlogPostSummary {
  return {
    title: post.title,
    description: post.description,
    slug: post.slug,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    category: post.category,
    coverImage: post.coverImage,
    coverImageAlt: post.coverImageAlt,
    author: post.author,
    tags: post.tags,
    readingTime: post.readingTime,
    minutes: post.minutes,
    words: post.words,
    href: post.href,
  };
}

export const getAllPosts = cache(async (): Promise<BlogPostSummary[]> => {
  const files = await readAllPostFiles();
  const posts = await Promise.all(files.map((file) => readPostFile(file)));
  return sortByDate(posts).map(toSummary);
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const files = await readAllPostFiles();
  const posts = await Promise.all(files.map((file) => readPostFile(file)));
  const post = posts.find((entry) => entry.slug === slug);
  return post ?? null;
});

export const getAdjacentPosts = cache(async (slug: string) => {
  const posts = await getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: posts[currentIndex + 1] ?? null,
    next: posts[currentIndex - 1] ?? null,
  };
});

export const getAllBlogSlugs = cache(async (): Promise<string[]> => {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
});

export const getRelatedPostsByTags = cache(async (slug: string, limit = 3): Promise<BlogPostSummary[]> => {
  const [current, posts] = await Promise.all([getPostBySlug(slug), getAllPosts()]);

  if (!current) {
    return [];
  }

  const currentTags = new Set(current.tags.map((tag) => tag.toLowerCase()));

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const overlap = post.tags.reduce((score, tag) => {
        return currentTags.has(tag.toLowerCase()) ? score + 1 : score;
      }, 0);

      return { post, overlap };
    })
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) {
        return b.overlap - a.overlap;
      }

      return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
    })
    .slice(0, limit)
    .map((entry) => entry.post);
});

export function getBlogCanonical(pathname: string): string {
  return `${BASE_URL}${pathname}`;
}

export function toAbsoluteUrl(value: string): string {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `${BASE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export function getBlogBreadcrumbs(post: BlogPost) {
  return [
    { name: "Inicio", item: BASE_URL },
    { name: "Blog", item: `${BASE_URL}/blog` },
    { name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
  ];
}

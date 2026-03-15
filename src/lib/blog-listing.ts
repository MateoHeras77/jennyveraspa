import type { BlogPostSummary } from "@/lib/blog-content";

export const POSTS_PER_PAGE = 6;

export type BlogCategory = {
  name: string;
  slug: string;
};

export type BlogListingState = {
  categories: BlogCategory[];
  activeCategory: BlogCategory | null;
  filteredPosts: BlogPostSummary[];
  paginatedPosts: BlogPostSummary[];
  currentPage: number;
  totalPages: number;
};

export function slugifyCategory(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function buildBlogHref(page: number, categorySlug: string | null): string {
  if (!categorySlug) {
    return page <= 1 ? "/blog" : `/blog/pagina/${page}`;
  }

  return page <= 1
    ? `/blog/categoria/${categorySlug}`
    : `/blog/categoria/${categorySlug}/pagina/${page}`;
}

export function getBlogListingState(input: {
  posts: BlogPostSummary[];
  categorySlug?: string;
  pageParam?: string;
}): BlogListingState {
  const { posts, categorySlug, pageParam } = input;

  const categories = Array.from(new Set(posts.map((post) => post.category)))
    .sort()
    .map((name) => ({
      name,
      slug: slugifyCategory(name),
    }));

  const activeCategory = categorySlug
    ? categories.find((category) => category.slug === categorySlug) ?? null
    : null;

  const filteredPosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory.name)
    : posts;

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const requestedPage = Number.parseInt(pageParam ?? "1", 10);
  const currentPage = Number.isNaN(requestedPage) ? 1 : Math.min(Math.max(requestedPage, 1), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;

  return {
    categories,
    activeCategory,
    filteredPosts,
    paginatedPosts: filteredPosts.slice(start, start + POSTS_PER_PAGE),
    currentPage,
    totalPages,
  };
}

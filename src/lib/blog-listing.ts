import type { BlogPostSummary } from "@/lib/blog-content";

export const POSTS_PER_PAGE = 6;

export type BlogListingState = {
  categories: string[];
  activeCategory: string | null;
  filteredPosts: BlogPostSummary[];
  paginatedPosts: BlogPostSummary[];
  currentPage: number;
  totalPages: number;
};

export function buildBlogHref(page: number, category: string | null): string {
  const params = new URLSearchParams();

  if (category) {
    params.set("categoria", category);
  }

  const pathname = page <= 1 ? "/blog" : `/blog/pagina/${page}`;
  const query = params.toString();

  return query ? `${pathname}?${query}` : pathname;
}

export function getBlogListingState(input: {
  posts: BlogPostSummary[];
  categoryParam?: string;
  pageParam?: string;
}): BlogListingState {
  const { posts, categoryParam, pageParam } = input;

  const categories = Array.from(new Set(posts.map((post) => post.category))).sort();
  const activeCategory = categoryParam && categories.includes(categoryParam) ? categoryParam : null;

  const filteredPosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
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

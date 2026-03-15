import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-content";
import { POSTS_PER_PAGE } from "@/lib/blog-listing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.jennyveraspa.com";
  const posts = await getAllPosts();

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogListingPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const blogPaginationUrls: MetadataRoute.Sitemap = Array.from({ length: blogListingPages - 1 }, (_, idx) => {
    const page = idx + 2;

    return {
      url: `${baseUrl}/blog/pagina/${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogPaginationUrls,
    ...blogUrls,
  ];
}

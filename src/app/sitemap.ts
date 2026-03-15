import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-content";
import { POSTS_PER_PAGE, slugifyCategory } from "@/lib/blog-listing";
import { SUPPORTED_LOCALES, withLocalePath } from "@/lib/i18n";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.jennyveraspa.com";
  const postsByLocale = await Promise.all(
    SUPPORTED_LOCALES.map(async (locale) => ({
      locale,
      posts: await getAllPosts(locale),
    }))
  );
  const now = new Date();

  const toAbsoluteUrl = (path: string) => `${baseUrl}${path}`;

  const localizedStaticUrls: MetadataRoute.Sitemap = SUPPORTED_LOCALES.flatMap((locale) => [
    {
      url: toAbsoluteUrl(withLocalePath(locale, "/")),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: toAbsoluteUrl(withLocalePath(locale, "/servicios")),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: toAbsoluteUrl(withLocalePath(locale, "/blog")),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: toAbsoluteUrl(withLocalePath(locale, "/contacto")),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]);

  const blogUrls: MetadataRoute.Sitemap = postsByLocale.flatMap(({ locale, posts }) =>
    posts.map((post) => ({
      url: toAbsoluteUrl(withLocalePath(locale, `/blog/${post.slug}`)),
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }))
  );

  const blogPaginationUrls: MetadataRoute.Sitemap = postsByLocale.flatMap(({ locale, posts }) => {
    const blogListingPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

    return Array.from({ length: blogListingPages - 1 }, (_, idx) => {
      const page = idx + 2;

      return {
        url: toAbsoluteUrl(withLocalePath(locale, `/blog/pagina/${page}`)),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      };
    });
  });

  const categoryUrls: MetadataRoute.Sitemap = postsByLocale.flatMap(({ locale, posts }) => {
    const categoryMap = posts.reduce<Map<string, number>>((acc, post) => {
      const key = post.category;
      acc.set(key, (acc.get(key) ?? 0) + 1);
      return acc;
    }, new Map());

    return Array.from(categoryMap.keys()).map((category) => ({
      url: toAbsoluteUrl(withLocalePath(locale, `/blog/categoria/${slugifyCategory(category)}`)),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  });

  const categoryPaginationUrls: MetadataRoute.Sitemap = postsByLocale.flatMap(({ locale, posts }) => {
    const categoryMap = posts.reduce<Map<string, number>>((acc, post) => {
      const key = post.category;
      acc.set(key, (acc.get(key) ?? 0) + 1);
      return acc;
    }, new Map());

    return Array.from(categoryMap.entries()).flatMap(([category, count]) => {
      const pages = Math.ceil(count / POSTS_PER_PAGE);
      const categorySlug = slugifyCategory(category);

      return Array.from({ length: Math.max(0, pages - 1) }, (_, idx) => {
        const page = idx + 2;
        return {
          url: toAbsoluteUrl(withLocalePath(locale, `/blog/categoria/${categorySlug}/pagina/${page}`)),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.6,
        };
      });
    });
  });

  return [
    ...localizedStaticUrls,
    ...categoryUrls,
    ...categoryPaginationUrls,
    ...blogPaginationUrls,
    ...blogUrls,
  ];
}

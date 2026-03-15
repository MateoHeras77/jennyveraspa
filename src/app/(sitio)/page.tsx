import { getAllPosts } from "@/lib/blog-content";
import HomePage from "@/components/home-page";

export default async function Page() {
  const posts = getAllPosts();
  return <HomePage posts={await posts} />;
}

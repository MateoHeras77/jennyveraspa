import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog-content";

export const alt = "Articulo del blog de Jenny Vera Spa";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type OpenGraphImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(120deg, #121212 0%, #2B2212 100%)",
            color: "#F8EFE0",
            fontSize: 48,
            fontWeight: 700,
            padding: 64,
            textAlign: "center",
          }}
        >
          Blog Jenny Vera Spa
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(130deg, #121212 0%, #302714 55%, #6A5317 100%)",
          color: "#F8EFE0",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          {post.category}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 66,
              lineHeight: 1.08,
              fontWeight: 800,
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: 30,
              opacity: 0.86,
            }}
          >
            {post.description}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, opacity: 0.8 }}>jennyveraspa.com</div>
      </div>
    ),
    size,
  );
}

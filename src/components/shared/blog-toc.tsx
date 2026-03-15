import type { BlogHeading } from "@/lib/blog-content";

type BlogTocProps = {
  headings: BlogHeading[];
};

export function BlogToc({ headings }: BlogTocProps) {
  if (headings.length < 3) {
    return null;
  }

  return (
    <aside className="rounded-2xl border border-black/10 bg-[#FFFDF8] p-5 shadow-sm">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#7A6422]">En este articulo</p>
      <nav aria-label="Tabla de contenidos">
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={`${heading.id}-${heading.depth}`} className={heading.depth === 3 ? "pl-4" : ""}>
              <a
                href={`#${heading.id}`}
                className="text-sm text-gray-700 transition hover:text-[#9A7A1F]"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

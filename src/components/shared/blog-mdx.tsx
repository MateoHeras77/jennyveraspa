import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const blogMdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="group mt-10 scroll-mt-28 font-serif text-3xl leading-tight text-gray-900 [&>.heading-anchor]:ml-2 [&>.heading-anchor]:text-[#B08D27] [&>.heading-anchor]:opacity-100 [&>.heading-anchor]:transition [&>.heading-anchor]:no-underline md:[&>.heading-anchor]:opacity-0 md:hover:[&>.heading-anchor]:opacity-100">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="group mt-8 scroll-mt-28 font-serif text-2xl leading-tight text-gray-900 [&>.heading-anchor]:ml-2 [&>.heading-anchor]:text-[#B08D27] [&>.heading-anchor]:opacity-100 [&>.heading-anchor]:transition [&>.heading-anchor]:no-underline md:[&>.heading-anchor]:opacity-0 md:hover:[&>.heading-anchor]:opacity-100">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mt-5 text-[17px] leading-8 text-gray-700">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-[17px] leading-8 text-gray-700">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-[17px] leading-8 text-gray-700">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  a: ({ href, children }) => {
    if (!href) {
      return <span>{children}</span>;
    }

    if (href.startsWith("/")) {
      return (
        <Link href={href} className="font-medium text-[#9A7A1F] underline decoration-[#D4AF37]/50 underline-offset-4 hover:text-[#7A6422]">
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noreferrer" className="font-medium text-[#9A7A1F] underline decoration-[#D4AF37]/50 underline-offset-4 hover:text-[#7A6422]">
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 border-[#D4AF37]/70 bg-[#F7F1E0]/50 px-5 py-3 text-gray-700">{children}</blockquote>
  ),
};

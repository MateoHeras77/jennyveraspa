---
name: Blog File Structure and Format
description: How MDX blogs are organized and formatted in Jenny Vera Spa project
type: reference
---

## File Locations
- Spanish blogs: `src/content/blog/[slug].mdx`
- English blogs: `src/content/blog/en/[slug].mdx`
- Images: `public/images/blog/` (all images in WebP format)

## Frontmatter Format (Required)
```yaml
---
title: "Article Title in Language"
description: "SEO meta description 150-160 characters"
slug: "url-slug-lowercase-hyphens"
publishedAt: "2026-04-06"
updatedAt: "2026-04-06"
category: "Category Name"
coverImage: "/images/blog/image-name.webp"
coverImageAlt: "Alt text in language"
author: "Jenny Vera Spa"
tags:
  - "tag1"
  - "tag2"
  - "tag3"
---
```

## Writing Conventions
- **NO TILDES/ACCENTS in markdown body** (frontmatter can have them)
- Use only ASCII characters in content to avoid encoding issues
- Professional but accessible tone
- First paragraph hooks the reader
- Use H2 for main sections, H3 for subsections
- Include 3+ internal links and 1-2 external medical authority links
- Include clear CTA to `/contacto` (ES) or `/en/contact` (EN) at end
- Tags should be lowercase, no accents

## Content Quality
- Minimum word count: 850-900 words per language version
- Natural keyword integration (no keyword stuffing)
- Readable formatting: short paragraphs, bullet points, bold key phrases
- External links open in new tab: `<a href="..." target="_blank" rel="noopener noreferrer">text</a>`
- Each blog should include FAQ section when appropriate

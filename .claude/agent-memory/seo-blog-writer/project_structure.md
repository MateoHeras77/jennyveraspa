---
name: Jenny Vera Spa Blog Structure & Patterns
description: File organization, MDX format, frontmatter fields, image handling, and naming conventions for blog posts
type: project
---

## Blog File Organization

- Spanish blogs: `src/content/blog/[slug].mdx`
- English blogs: `src/content/blog/en/[slug].mdx`
- Images: `public/images/blog/[filename].webp` (always WebP, no JPG/PNG)
- **Important:** Both language versions share the same slug; only the folder differs

## MDX Frontmatter Format (Required Fields)

```
---
title: "Article Title"
description: "Meta description 150-160 chars, must include primary keyword"
slug: "url-slug-lowercase-hyphens"
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
category: "Category Name"
coverImage: "/images/blog/filename.webp"
coverImageAlt: "Descriptive alt text for SEO"
author: "Jenny Vera Spa"
tags:
  - "lowercase-tag-without-accents"
  - "another-tag"
---
```

## Writing Style Conventions

- **No tildes in body text:** Spanish accents (á, é, í, ó, ú, ñ) are removed from body content to avoid encoding issues. Frontmatter CAN have tildes.
- **Tone:** Professional but accessible; write for a woman seeking real solutions, not marketing fluff
- **Structure:** Use H2 for main sections, H3 for subsections. One H1 is implicit in the title.
- **Links:**
  - Internal: `[text](/ruta)` (standard markdown)
  - External: `<a href="..." target="_blank" rel="noopener noreferrer">text</a>` (open in new tab)
- **Tables:** Use markdown table syntax (pipes and hyphens)
- **Line length:** Keep paragraphs short, use bullet points and bold for scannability

## Content Requirements Per Blog

- **Minimum length:** 1000 words per language version
- **Keywords:** Primary keyword in title, H1, first 100 words, and naturally throughout
- **Internal links:** Minimum 3 per post
- **External links:** 1-2 to authoritative medical sources (PubMed, journal articles)
- **CTA (call-to-action):**
  - Spanish: "Agenda tu evaluacion" → `/contacto`
  - English: "Book your evaluation" → `/en/contact`

## Image Handling Workflow

1. Download from Unsplash/Pexels or create using Python/PIL
2. Convert to WebP: `cwebp -q 80 input.jpg -o output.webp`
3. **Delete original file** (jpg/png) immediately after conversion
4. Use descriptive filenames: `skin-boosters-hidratacion.webp` (not `image1.webp`)
5. Add SEO-optimized alt text to every image in frontmatter
6. Reference only `.webp` files in body content

## Category Names (Observed)

- "Estetica Facial"
- "Hidratacion y Skin Boosters"
- "Tecnologia Estetica"
- Use consistent capitalization

## Tag Conventions

- All lowercase
- No accents or tildes
- Hyphenated if multi-word: `deep-hydration`, `non-surgical-lifting`
- Related to the main topic and keywords

## Cross-Blog Linking (Internal Links)

Existing blogs that can be referenced:
- `/blog/hidratacion-profunda-con-vitamina-c` (ES) — vitamin C hydration
- `/blog/exosomas-rejuvenecimiento` (ES) — exosomes for rejuvenation
- `/blog/pdrn-salmon-rejuvenecimiento-celular` (ES) — PDRN cellular rejuvenation
- `/servicios` → Services page
- `/contacto` → Contact/booking page

English versions use the same slug path without `/en/` prefix in the URL.

## Published Examples Checked

- File: `hidratacion-profunda-con-vitamina-c.mdx`
  - No tildes in body, but title can have them in frontmatter
  - Short, scannable paragraphs
  - H2 headings for main topics
  - Mix of explanatory and practical content
  - Internal links with standard markdown syntax
  - CTA at the end linking to `/contacto`

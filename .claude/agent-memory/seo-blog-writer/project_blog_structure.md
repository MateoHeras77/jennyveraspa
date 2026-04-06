---
name: Jenny Vera Spa Blog Structure and Conventions
description: Technical specifications for blog file organization, frontmatter, naming conventions, and SEO patterns
type: project
---

## File Structure

- Spanish blogs: `src/content/blog/[slug].mdx`
- English blogs: `src/content/blog/en/[slug].mdx`
- Images: `public/images/blog/[filename].webp`
- Image format: Always WebP only (no PNG/JPG/JPEG)

## Frontmatter Format

All blogs use MDX with this exact frontmatter structure:

```yaml
---
title: "Article Title"
description: "150-160 character SEO meta description"
slug: "url-slug-kebab-case"
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
category: "Category Name"
coverImage: "/images/blog/image-name.webp"
coverImageAlt: "Descriptive alt text with keywords"
author: "Jenny Vera Spa"
tags:
  - "tag-in-lowercase"
  - "no-accents-allowed"
---
```

## Important Conventions

- **NO ACCENTS in body content** — Use ASCII only in MDX body (accents allowed in frontmatter only)
- **Tags must be**: lowercase, no accents, separated by hyphens
- **All images**: Must be in WebP format only; original JPG/PNG files deleted after conversion
- **Image conversion**: `cwebp -q 80 input.jpg -o output.webp`
- **Category examples**: "Tratamientos con Laser", "Tratamientos Corporales", etc.
- **Author**: Always "Jenny Vera Spa"

## Internal Links Used

- `/servicios` — Services page
- `/contacto` — Contact/appointment booking
- `/blog/[slug]` — Other blog posts (Spanish)
- `/en/blog/[slug]` — English blog posts
- `/en/contact` — English contact
- `/blog/tratamientos-a-laser` — Existing laser treatments blog
- `/blog/tratamientos-de-acne` — Existing acne treatments blog

## External Links Format

Medical authority sources with proper HTML:
```html
<a href="URL" target="_blank" rel="noopener noreferrer">text</a>
```

Common sources: PubMed, AAD (American Academy of Dermatology), Mayo Clinic

## Content Guidelines

- Professional but accessible tone
- Minimum 850-950 words per blog
- H1 for main title only
- Use H2/H3 for subheadings with natural keyword integration
- Include 2-3 tables for comparison content
- Minimum 3 internal links + 1-2 external links per post
- FAQ sections are SEO-friendly
- Always include CTA at end: "Agenda tu evaluacion" → `/contacto` (Spanish) or "Book your evaluation" → `/en/contact` (English)
- No keyword stuffing — natural integration only

## Image Management

- Download from royalty-free sources (Pexels, Unsplash)
- Convert to WebP immediately after download
- Delete original JPG/PNG files
- Use descriptive names: `laser-rejuvenecimiento-piel.webp` not `image1.webp`
- Optimize with cwebp -q 80 for quality/filesize balance
- Add SEO-optimized alt text to every image

## URL Slug Patterns

- Kebab-case (lowercase with hyphens)
- Include primary keyword where possible
- Consistent between Spanish and English versions (same slug in different folders)

## English Translation Approach

- Adapted translation, not literal
- Natural keyword integration in English
- Match Spanish blog structure and length
- Same images used for both versions
- Different URLs but same slug structure

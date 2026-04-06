---
name: HIFU Cluster Deployment Notes
description: Instructions for reviewing, merging, and deploying the 3 new HIFU blogs
type: project
---

## Pre-Deployment Checklist

### Files Created (6 total)
- [x] `/src/content/blog/que-es-hifu-facial.mdx` — Spanish Blog 8
- [x] `/src/content/blog/en/que-es-hifu-facial.mdx` — English Blog 8
- [x] `/src/content/blog/hifu-beneficios-riesgos.mdx` — Spanish Blog 9
- [x] `/src/content/blog/en/hifu-beneficios-riesgos.mdx` — English Blog 9
- [x] `/src/content/blog/hifu-antes-y-despues.mdx` — Spanish Blog 10
- [x] `/src/content/blog/en/hifu-antes-y-despues.mdx` — English Blog 10

### Images Created (3 total, all WebP)
- [x] `/public/images/blog/hifu-facial-tecnologia.webp` (35K)
- [x] `/public/images/blog/hifu-beneficios-seguridad.webp` (38K)
- [x] `/public/images/blog/hifu-resultados-antes-despues.webp` (38K)

### Quality Assurance
- [x] All MDX files have valid frontmatter
- [x] All internal links point to existing or new blog URLs
- [x] All external links use target="_blank" rel="noopener noreferrer"
- [x] All images referenced use .webp extension only
- [x] No PNG/JPG residual files exist
- [x] Word counts: 1,300+ per language per blog
- [x] H2 structure: 10-11 headings per blog
- [x] Keyword integration: Primary keywords in first 100 words + headings
- [x] CTA links: All point to `/contacto` (ES) or `/en/contact` (EN)
- [x] Encoding: No encoding issues (minimal accents in body text)

## Suggested Next Steps

### 1. Git Review
```bash
git status
git diff src/content/blog/que-es-hifu-facial.mdx
git diff src/content/blog/hifu-beneficios-riesgos.mdx
git diff src/content/blog/hifu-antes-y-despues.mdx
```

### 2. Review Frontmatter
Ensure all metadata is correct:
- slug matches URL pattern
- publishedAt/updatedAt are current
- coverImage path is correct
- category matches existing categories
- tags are in lowercase without accents

### 3. Link Testing
Once deployed, test that:
- Internal links resolve correctly (use Ctrl+Click or browser console)
- External links open in new tabs
- CTA buttons work and navigate to contact page
- Image alt text displays properly

### 4. SEO Verification
Consider using tools like:
- Google Search Console (submit for indexing)
- Screaming Frog (check internal link health)
- SEMrush/Ahrefs (track keyword rankings)
- Page Speed Insights (verify image optimization)

### 5. Publishing
```bash
# Create a feature branch if not already on main
git checkout -b feat/hifu-cluster-blogs

# Add files to staging
git add src/content/blog/que-es-hifu-facial.mdx
git add src/content/blog/en/que-es-hifu-facial.mdx
git add src/content/blog/hifu-beneficios-riesgos.mdx
git add src/content/blog/en/hifu-beneficios-riesgos.mdx
git add src/content/blog/hifu-antes-y-despues.mdx
git add src/content/blog/en/hifu-antes-y-despues.mdx
git add public/images/blog/hifu-*.webp

# Commit with descriptive message
git commit -m "feat: add HIFU cluster blogs (benefits, risks, results) with HIFU 360 Max technology focus"

# Push and create PR
git push origin feat/hifu-cluster-blogs
```

## Known Considerations

### Image Sourcing
- All images sourced from Unsplash/Pexels (royalty-free)
- Compressed with cwebp -q 80
- Dimensions: 1200×800px (optimal for blog headers)
- Alt text: SEO-optimized, descriptive

### Keyword Strategy
- Each blog targets distinct keyword clusters
- Blog 8: "What is HIFU?" (informational)
- Blog 9: "Benefits/Risks" (navigational/transactional)
- Blog 10: "Before/After" (transactional/conversion)
- Long-tail keywords naturally integrated throughout

### HIFU 360 Max Differentiation
- Mentioned in Blog 8 as Jenny Vera Spa's equipment
- 25D technology benefits highlighted
- Positions clinic as premium provider

## Content Consistency Notes

### Writing Tone
- Professional but accessible
- Addresses reader directly ("you," "your")
- Explains medical concepts in layperson's terms
- Honest about limitations and contraindications

### Structure Pattern
- Engaging introduction
- Multiple H2 headings with clear sections
- Bullet points for listicles
- FAQ section (integrated naturally)
- Strong CTA at end
- Cross-links to related blogs

### Links to Existing Blogs
All new blogs link to:
- `/blog/hifu-lifting-sin-cirugia` — First HIFU intro
- `/blog/rejuvenecimiento-facial-con-hifu` — Comprehensive rejuvenation
- `/blog/hifu-intimo` — Intimate HIFU (for body mention)

## Performance Expectations

Once indexed by Google (typically 2-4 weeks):
- Blog 8 should rank for "que es hifu facial", "hifu facial"
- Blog 9 should rank for "hifu beneficios", "peligros del hifu"
- Blog 10 should rank for "hifu antes y despues", "resultados hifu"

Monitor SERP positions monthly using:
- Google Search Console
- Ahrefs or SEMrush
- Manual SERP checks for primary keywords

## Troubleshooting

### If links are broken:
- Check slug matches between Spanish and English versions
- Verify internal links use correct paths (no `/en/` prefix in Spanish blog links)
- Ensure all link paths are lowercase and hyphenated

### If images don't load:
- Verify image filenames match exactly in markdown
- Check image paths start with `/images/blog/`
- Ensure no spaces in filenames

### If text encoding looks wrong:
- Check the MDX file is saved as UTF-8
- Verify no special characters outside ASCII range in body text
- Review frontmatter separately (can have accents)

## Future Content Clusters

Consider planning similar clusters for:
- Regenerative Medicine (Exosomas, PDRN, Microneedling)
- Advanced Skin Treatments (Laser variations)
- Body Treatments (Cellulite, skin tightening)
- Post-operative care protocols

Each cluster should follow the 3-blog pattern:
1. Educational/Technical (What is it?)
2. Objection Handling (Benefits/Risks/Myths)
3. Social Proof (Before/After/Results)

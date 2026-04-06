---
name: Image Handling Workflow for Blogs
description: Complete process for downloading, converting, and using images in blog posts
type: reference
---

## Image Processing Steps (MUST FOLLOW THIS EXACTLY)

1. **Download**: Use curl or wget to download image from Unsplash, Pexels, or other royalty-free sources
   - Example: `curl -s -L -o filename.jpg "https://source.com/image.jpg"`

2. **Convert to WebP**: Use cwebp with quality 80
   - Example: `cwebp -q 80 input.jpg -o output.webp`
   - Alternative tools: ImageMagick `convert`, FFmpeg `ffmpeg -i input.jpg output.webp`

3. **Move to Correct Location**: Move converted WebP to `public/images/blog/`
   - Example: `mv output.webp /home/mateo/Desktop/Github/jennyveraspa/public/images/blog/`

4. **Delete Original**: Remove the original JPG/PNG/JPEG file
   - Example: `rm input.jpg`

5. **Use Only WebP in Content**: Reference ONLY .webp files in blog frontmatter and alt text

## Image Naming Convention
- Use descriptive names: `tipos-de-lunares.webp`, `laser-treatment.webp`
- Avoid generic names: `image1.webp`, `photo.webp`
- Use lowercase with hyphens
- Should be semantically relevant to blog topic

## Alt Text Requirements
- Descriptive and keyword-inclusive
- 80-125 characters typical
- Include the keyword naturally if possible
- Example: "Ejemplos de diferentes tipos de lunares en la piel humana"

## File Size Optimization
- Target WebP quality: 80 (good balance of quality and size)
- Expected size: 40-70KB for typical blog cover images
- Images must be optimized for web performance

# Jenny Vera Spa — jennyveraspa.com

Sitio web de un centro de estética/spa en Cuenca, Ecuador (Edificio Plaza Médica, Av. Manuel de J. Calle y Paucarbamba). Público local (ES) y expats/turismo médico (EN). Objetivo del proyecto: tráfico orgánico que convierta en clientes por WhatsApp.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript, Tailwind v4, MDX (`next-mdx-remote` + `gray-matter`). Deploy: Vercel (auto-deploy al hacer push a `main`).
- i18n propio: locales `es` (default) y `en` con prefijo obligatorio (`/es/...`, `/en/...`). La detección de idioma vive en `src/proxy.ts` (bots siempre reciben `es`). Helpers en `src/lib/i18n.ts`.
- Analytics: Vercel Analytics (`<Analytics/>` en `src/app/layout.tsx`) + evento `whatsapp_click` en `src/components/shared/whatsapp-float.tsx`.

## Reglas de contenido (importantes)

- **Ortografía española impecable**: todas las tildes y signos ¿ ¡ en títulos, descripciones, H1, FAQ y cuerpos. Se hizo una restauración masiva en jul 2026 — no reintroducir texto sin acentos.
- **Slugs**: siempre ASCII sin tildes, en español, idénticos en ES y EN (ej. `/en/servicios/depilacion-laser`). NUNCA cambiar un slug existente sin añadir su redirect 301.
- **Precios**: NO publicar precios propios del spa (decisión de negocio, jul 2026). Los posts de precios usan rangos de mercado ecuatoriano con fuentes públicas citadas como links + disclaimer.
- **Páginas de servicio** (`src/content/services/{,en/}*.mdx`): frontmatter estricto de 13 campos (ver cualquier archivo existente como plantilla; parser en `src/lib/services-content.ts`). Estructura: title/h1 "X en Cuenca", description 150-158 chars, 4-5 FAQ (generan FAQPage schema), relatedPosts (slugs que EXISTAN en el locale), cuerpo 350-450 palabras, CTA a `/contacto` (EN: `/en/contacto`). `coverImage` debe ser un archivo existente de `public/images/unsplash/`.
- **Blog** (`src/content/blog/{,en/}*.mdx`): contrato editorial en `docs/BLOG_EDITORIAL_GUIDE.md`. Categorías ES: Estética Facial, Tratamientos Corporales, Tratamientos con Láser, Tecnología Estética, Medicina Regenerativa y Rejuvenecimiento, Recuperación, Hidratación y Skin Boosters, Blogs Principales. Categorías EN (¡en inglés!): Facial Aesthetics, Body Treatments, Laser Treatments, Facial and Body Technology, Regenerative Medicine & Rejuvenation, Recovery, Hydration and Skin Boosters, Main Guides. Cada post debe enlazar a su página de servicio relacionada.
- **Catálogo de servicios**: `SERVICE_CATEGORIES` en `src/lib/constants.ts`. Los `name` son CLAVES DE LOOKUP EXACTO contra `serviceLabelsEn`/`serviceCategoryLabelsEn` en `src/components/forms/contact-form.tsx` — si añades/renombras un servicio, actualiza ambos archivos con claves idénticas.
- Cirugías plásticas: el spa NO opera; ofrece post-operatorios. El contenido de cirugías es informativo y debe decirlo, con CTA a drenajes.

## SEO

- **Redirects**: TODO el mapa legacy vive en `next.config.ts` (`permanent: true` → 308). Los redirects de next.config se evalúan ANTES que el proxy de locale — los destinos deben incluir `/es/` o `/en/` explícito. El sitio viejo (URLs planas sin locale) murió en 404 en la migración de abril 2026 y costó -55% de clics; no repetir.
- hreflang/canonical: generados por `getLocaleAlternates()` — toda página nueva bajo `[locale]` debe usarlo en su `generateMetadata`.
- Sitemap dinámico (`src/app/sitemap.ts`) — se alimenta solo de los MDX; no requiere registro manual. Tras cada deploy con contenido nuevo, reenviar sitemap a GSC.
- Apex → www es redirect 308 configurado en el dashboard de Vercel (no en el repo).

## Acceso a datos

- **Google Search Console**: cuenta de servicio `seo-claude@primeflight.iam.gserviceaccount.com`, clave en `~/.config/claude-seo/service_account.json`, propiedad `sc-domain:jennyveraspa.com`, permiso completo. Consultar vía API REST (`webmasters/v3`); requiere venv con `google-auth` + `requests`.
- Ahrefs MCP conectado pero el plan NO cubre la API (solo el DR gratuito funciona).

## Flujo de trabajo

1. Cambios en rama de trabajo → `npm run build` (debe salir 0) → `npm run start -p <puerto>` y verificar con curl (títulos, 200s, redirects, schema).
2. Commit → merge a `main` → push (Vercel despliega solo) → spot-check en producción → reenviar sitemap a GSC.
3. Documentación de estrategia en `docs/`: plan maestro (`plan-crecimiento-por-fases.md`), guía manual de GBP/reseñas (`fase-1-gbp-y-resenas.md`), plan de contenido (`fase-2-plan-contenido.md`), snapshots de métricas (`snapshot-*.md`) para comparar evolución.

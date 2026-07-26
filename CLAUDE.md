# Jenny Vera Spa — jennyveraspa.com

Sitio web de un centro de estética/spa en Cuenca, Ecuador (Edificio Plaza Médica, Av. Manuel de J. Calle y Paucarbamba). Público local (ES) y expats/turismo médico (EN). Objetivo del proyecto: tráfico orgánico que convierta en clientes por WhatsApp.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript, Tailwind v4, MDX (`next-mdx-remote` + `gray-matter`). Deploy: Vercel (auto-deploy al hacer push a `main`).
- i18n propio: locales `es` (default) y `en` con prefijo obligatorio (`/es/...`, `/en/...`). La detección de idioma vive en `src/proxy.ts` (bots siempre reciben `es`). Helpers en `src/lib/i18n.ts`.
- Analytics: Vercel Analytics (`<Analytics/>` en `src/app/layout.tsx`).
- **Enlaces a WhatsApp**: NUNCA apuntar directo a `WHATSAPP_CONTACT_URL`. Usar siempre `whatsappBridgePath(locale, source)` de `src/lib/constants.ts`, que enruta por la página puente `/[locale]/whatsapp` (`src/app/[locale]/whatsapp/`). Motivo: los eventos personalizados de Vercel Analytics (`track()`) devuelven **402 — requieren plan Pro**; los pageviews sí son gratuitos, así que el puente es la única forma de contar clics a WhatsApp con el plan actual. El `source` (`float`, `servicio-hero`, `servicio-cta`, …) viaja como `utm_source` y en Analytics es la dimensión `utmSource`. La ruta es `noindex` y no está en el sitemap.
- **Consultar Analytics**: el MCP de Vercel usa un endpoint equivocado (404). Usar el CLI, ya autenticado:
  ```bash
  npx vercel@latest api "/v1/query/web-analytics/visits/count?projectId=prj_BdpkHBYax30cnheL3fxsEs8qhfyc&teamId=team_7OZdvuZD5tNTtWTel7Eyqdhy&since=2026-07-08&until=2026-07-26&filter=requestPath eq '/es/whatsapp'"
  # agregados: .../visits/aggregate?…&by=requestPath|country|referrerHostname|deviceType|utmSource&limit=15
  ```
  Ojo: parte del tráfico que muestra el dashboard es de bots (jul 2026: China y `/en/blog/eliminacion-de-lunares-con-laser` sumaban ~42 %, con proporción 1:1 entre visitantes y páginas vistas). Contrastar siempre contra GSC antes de dar cifras.

## Reglas de contenido (importantes)

- **Ortografía española impecable**: todas las tildes y signos ¿ ¡ en títulos, descripciones, H1, FAQ y cuerpos. Se hizo una restauración masiva en jul 2026 — no reintroducir texto sin acentos.
- **Slugs**: siempre ASCII sin tildes, en español, idénticos en ES y EN (ej. `/en/servicios/depilacion-laser`). NUNCA cambiar un slug existente sin añadir su redirect 301.
- **Precios**: NO publicar precios propios del spa (decisión de negocio, jul 2026). Los posts de precios usan rangos de mercado ecuatoriano con fuentes públicas citadas como links + disclaimer.
- **Páginas de servicio** (`src/content/services/{,en/}*.mdx`): frontmatter estricto de 13 campos (ver cualquier archivo existente como plantilla; parser en `src/lib/services-content.ts`). Estructura: title/h1 "X en Cuenca", description 150-158 chars, 4-5 FAQ (generan FAQPage schema), relatedPosts (slugs que EXISTAN en el locale), cuerpo 350-450 palabras, CTA a `/contacto` (EN: `/en/contacto`). `coverImage` debe ser un archivo existente de `public/images/unsplash/`.
- **Blog** (`src/content/blog/{,en/}*.mdx`): contrato editorial en `docs/BLOG_EDITORIAL_GUIDE.md`. Categorías ES: Estética Facial, Tratamientos Corporales, Tratamientos con Láser, Tecnología Estética, Medicina Regenerativa y Rejuvenecimiento, Recuperación, Hidratación y Skin Boosters, Blogs Principales. Categorías EN (¡en inglés!): Facial Aesthetics, Body Treatments, Laser Treatments, Facial and Body Technology, Regenerative Medicine & Rejuvenation, Recovery, Hydration and Skin Boosters, Main Guides. Cada post debe enlazar a su página de servicio relacionada.
- **Longitud de `title`**: el template de `src/app/layout.tsx` añade `" | Jenny Vera Spa"` (17 chars) a TODO title. Mantener el `title` del frontmatter en **≤ 45 caracteres** para que el conjunto no pase de ~62 y Google no lo trunque. En posts de intención transaccional (precio, "cuánto cuesta"), poner la cifra o el rango dentro de esos 45 caracteres: en jul 2026, 5 posts rankeaban en posición 5-9 con CTR ~0 % por títulos truncados y sin cifra.
- **Imágenes**: verificar que cada archivo de `public/images/` sea realmente una imagen (`file <ruta>`) antes de referenciarlo en `coverImage`. Han aparecido dos casos de descargas fallidas guardadas como `.jpg` que en realidad eran HTML de 404.
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

### Meta Ads CLI — SOLO LECTURA (regla dura)

> **PROHIBIDO gastar dinero.** Está terminantemente prohibido crear, modificar, pausar, activar o eliminar campañas, ad sets, anuncios, creatividades, presupuestos o públicos. El CLI se usa **exclusivamente para analítica**. Todo cambio en la cuenta publicitaria lo ejecuta el equipo de marketing; nuestro papel es medir y recomendar.

- Comandos permitidos: `meta auth status`, `meta ads <recurso> list`, `meta ads <recurso> get`, `meta ads insights get`.
- Comandos prohibidos: cualquier `create`, `update`, `delete`, y cualquier flag de presupuesto o de estado.
- Instalado con `uv tool install --python 3.13 meta-ads` (PyPI `meta-ads`, **no** npm; el binario se llama `meta`). Requiere Python 3.12/3.13 — la máquina tiene 3.14, por eso el `--python`.
- **Token**: `~/.config/meta/credentials` contiene el **token pelado**, NO `ACCESS_TOKEN=…`. Si se escribe en formato dotenv, `meta auth status` responde "Authenticated" igualmente pero toda llamada real falla con *API error (190): Malformed access token*. `auth status` no valida contra la API — verificar siempre con `meta ads adaccount list`.
- `AD_ACCOUNT_ID=act_1661223548424128` exportado en `~/.bashrc` (no se lee de `~/.config/meta/`).
- El flag de salida JSON es **global y va antes del subcomando**: `meta --output json ads adset get <id> --fields …`.
- `meta ads insights get` no tiene `--level`: se filtra con `--campaign-id`/`--adset-id`/`--ad-id` y se segmenta con `--breakdown` (age, gender, country, publisher_platform, device_platform, platform_position, impression_device).
- Cuenta: `act_1661223548424128`. Página de Facebook: `1504934889727982`. Pixel: `WebsitePixel` `882066591229888`.

## Flujo de trabajo

1. Cambios en rama de trabajo → `npm run build` (debe salir 0) → `npm run start -p <puerto>` y verificar con curl (títulos, 200s, redirects, schema).
2. Commit → merge a `main` → push (Vercel despliega solo) → spot-check en producción → reenviar sitemap a GSC.
3. Documentación de estrategia en `docs/`: plan maestro (`plan-crecimiento-por-fases.md`), guía manual de GBP/reseñas (`fase-1-gbp-y-resenas.md`), plan de contenido (`fase-2-plan-contenido.md`), snapshots de métricas (`snapshot-*.md`) para comparar evolución.

# Jenny Vera Spa — jennyveraspa.com

Sitio web de un centro de estética/spa en Cuenca, Ecuador (Edificio Plaza Médica, Av. Manuel de J. Calle y Paucarbamba). Público local (ES) y expats/turismo médico (EN). Objetivo del proyecto: tráfico orgánico que convierta en clientes por WhatsApp.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript, Tailwind v4, MDX (`next-mdx-remote` + `gray-matter`). Deploy: Vercel (auto-deploy al hacer push a `main`).
- i18n propio: locales `es` (default) y `en` con prefijo obligatorio (`/es/...`, `/en/...`). La detección de idioma vive en `src/proxy.ts` (bots siempre reciben `es`). Helpers en `src/lib/i18n.ts`.
- Analytics: Vercel Analytics (`<Analytics/>` en `src/app/layout.tsx`).
- **Enlaces a WhatsApp**: NUNCA apuntar directo a `WHATSAPP_CONTACT_URL`. Usar siempre `whatsappBridgePath(locale, source)` de `src/lib/constants.ts`, que enruta por la página puente `/[locale]/whatsapp` (`src/app/[locale]/whatsapp/`). Motivo: los eventos personalizados de Vercel Analytics (`track()`) devuelven **402 — requieren plan Pro**; los pageviews sí son gratuitos, así que el puente es la única forma de contar clics a WhatsApp con el plan actual. El `source` (`float`, `servicio-hero`, `servicio-cta`, …) viaja como `utm_source`, pero **el desglose por origen NO se puede consultar**: `by=utmSource` devuelve **402 — exige plan Enterprise o el complemento Web Analytics Plus** (verificado el 26 jul 2026). Sí se cuenta el TOTAL de clics filtrando por `requestPath`, que es gratuito. Para segmentar por origen sin pagar habría que llevar el `source` en la ruta (p. ej. `/es/whatsapp/float`) en lugar de en la query. La ruta es `noindex` y no está en el sitemap.
- **Pixel de Meta** (`882066591229888`, en `src/components/seo/meta-pixel.tsx`): solo se renderiza con `NODE_ENV === "production"`. La CSP de `next.config.ts` tiene que incluir `https://connect.facebook.net` en `script-src` o el Pixel queda instalado y mudo. El evento `Contact` de la página puente se envía como **baliza de imagen**, no con `fbq()`: con la estrategia `afterInteractive` el script se inyecta después de la hidratación y `window.fbq` aún no existe cuando corre el efecto.
- **Consultar Analytics**: el MCP de Vercel usa un endpoint equivocado (404). Usar el CLI **global** (`vercel`, v57), que responde en ~1,4 s; **NO `npx vercel@latest`, que supera los 120 s de timeout** (verificado el 3 oct 2026):
  ```bash
  vercel api "/v1/query/web-analytics/visits/count?projectId=prj_BdpkHBYax30cnheL3fxsEs8qhfyc&teamId=team_7OZdvuZD5tNTtWTel7Eyqdhy&since=2026-09-03&until=2026-10-02&filter=requestPath eq '/es/whatsapp'"
  # agregados: .../visits/aggregate?…&by=requestPath|country|referrerHostname|deviceType|day|osName|browserName&limit=100
  ```
  El banner del CLI va a stderr, así que stdout es JSON limpio. Estructura: `data.visitors` / `data.pageviews` en `visits/count`; en `visits/aggregate`, `data[]` con la clave del `by` como nombre de campo.
  Peculiaridades verificadas (3 oct 2026), todas cuestan una lectura mal hecha si se ignoran:
  - **Plan Hobby: solo los últimos 30 días.** La ventana anterior deja de ser consultable, así que hay que comparar contra el snapshot escrito.
  - `by=day` existe y es gratis (series diarias sin iterar). `by=week` **ignora `since`/`until`** y devuelve semanas naturales completas (sumaba 1.006 frente a 880 reales): inservible, calcular las semanas sumando `by=day`.
  - En `aggregate` hace falta `until=YYYY-MM-DDT23:59:59Z` o corta a la 01:00 de ese día. En `count` es al revés: `until=YYYY-MM-DD` a secas es lo correcto.
  - `by` acepta `osName`/`browserName` (no `os`/`browser`); `limit` tope 100; `by=city` no existe; `utmSource`/`utmCampaign`/`utmMedium` y los endpoints de `events/*` dan **402**.
  - `filter=country ne 'CN'` funciona y es la limpieza barata.
- **Bots en Vercel Analytics (regla vigente):** restar todo país con proporción visitantes:páginas vistas de **exactamente 1:1** y ≥4 visitantes, sin referrer y 0 % Ecuador. Además de China (constante desde julio) hay desde sep 2026 un **bot distribuido por 14+ países que entra también con IPs de Ecuador y EE. UU.**, así que filtrar por país ya no basta: su firma es directo + 1:1 exacto + siempre las mismas cinco URLs. Infla `/es/blog/lipoescultura-360-ecuador-precios` de ~20 a 98 visitantes y mete posts de `/en/blog/hifu-*` en el top 20 sin merecerlo. **Invalida el ranking de contenidos si no se descuenta.** Contrastar siempre contra GSC antes de dar cifras.
- **Informe unificado**: `./scripts/informe-canales.py` junta Meta + GSC + Vercel en una lectura y calcula el coste por contacto de cada canal. Usa `uv` con metadatos PEP 723, así que no hace falta venv: `./scripts/informe-canales.py --dias 30`.

## Reglas de contenido (importantes)

- **Ortografía española impecable**: todas las tildes y signos ¿ ¡ en títulos, descripciones, H1, FAQ y cuerpos. Se hizo una restauración masiva en jul 2026 — no reintroducir texto sin acentos.
- **Slugs**: siempre ASCII sin tildes, en español, idénticos en ES y EN (ej. `/en/servicios/depilacion-laser`). NUNCA cambiar un slug existente sin añadir su redirect 301.
- **Precios**: NO publicar precios propios del spa (decisión de negocio, jul 2026). Los posts de precios usan rangos de mercado ecuatoriano con fuentes públicas citadas como links + disclaimer.
- **Páginas de servicio** (`src/content/services/{,en/}*.mdx`): frontmatter estricto de 13 campos (ver cualquier archivo existente como plantilla; parser en `src/lib/services-content.ts`). Estructura: title/h1 "X en Cuenca", description 150-158 chars, 4-5 FAQ (generan FAQPage schema), relatedPosts (slugs que EXISTAN en el locale), cuerpo 350-450 palabras, CTA a `/contacto` (EN: `/en/contacto`). `coverImage` debe ser un archivo existente de `public/images/unsplash/`.
- **Blog** (`src/content/blog/{,en/}*.mdx`): contrato editorial en `docs/BLOG_EDITORIAL_GUIDE.md`. Categorías ES: Estética Facial, Tratamientos Corporales, Tratamientos con Láser, Tecnología Estética, Medicina Regenerativa y Rejuvenecimiento, Recuperación, Hidratación y Skin Boosters, Blogs Principales. Categorías EN (¡en inglés!): Facial Aesthetics, Body Treatments, Laser Treatments, Facial and Body Technology, Regenerative Medicine & Rejuvenation, Recovery, Hydration and Skin Boosters, Main Guides. Cada post debe enlazar a su página de servicio relacionada.
- **`title` — NO tocar los que ya reciben clics.** El template de `src/app/layout.tsx` añade `" | Jenny Vera Spa"` (17 chars) a TODO title. Para páginas **nuevas**, apuntar a ≤ 45 caracteres. Pero para páginas **existentes que ya rankean, no cambiar el título**: se probó dos veces y las dos salieron mal. (a) Jul 2026, meter la cifra de precio en 5 posts: 19 → 11 clics (−42 %) con +29 % de impresiones. (b) Ago 2026, acortar el título de `masajes-relajantes` para evitar el truncado: posición 9,0 → 15,7. Además hay 14 títulos truncados en ES que llevan meses así y convierten al 23-33 % de CTR, así que **el truncado no es el problema que parecía**. Si aun así hay que cambiar uno, cambiar UNO solo, medir 4 semanas y solo entonces extender. Detalle completo en `docs/aprendizajes-seo.md`.
- **«en Cuenca, Ecuador» se queda en el título de toda página de servicio.** 19 de 20 lo llevan; quitarlo de la única que se tocó costó 6 puestos de posición y hundió las consultas con esa variante (`masajes cuenca ecuador`: pos ~10 → 58).
- **Nunca combinar un 301 con un cambio de título en el mismo despliegue**: al medir es imposible saber cuál causó el efecto. Pasó en ago 2026 con el cluster de masajes.
- **No escribir blogs nuevos por defecto.** Con 59 posts ES y 35 EN el limitante es la autoridad de dominio y la ficha de Google, no el volumen. Lo que sí rinde: enlazado interno hacia lo que ya existe, y traducciones EN de posts que ya rankean.
- **Imágenes**: verificar que cada archivo de `public/images/` sea realmente una imagen (`file <ruta>`) antes de referenciarlo en `coverImage`. Han aparecido dos casos de descargas fallidas guardadas como `.jpg` que en realidad eran HTML de 404.
- **Catálogo de servicios**: `SERVICE_CATEGORIES` en `src/lib/constants.ts`. Los `name` son CLAVES DE LOOKUP EXACTO contra `serviceLabelsEn`/`serviceCategoryLabelsEn` en `src/components/forms/contact-form.tsx` — si añades/renombras un servicio, actualiza ambos archivos con claves idénticas.
- Cirugías plásticas: el spa NO opera; ofrece post-operatorios. El contenido de cirugías es informativo y debe decirlo, con CTA a drenajes.

## SEO

- **Redirects**: TODO el mapa legacy vive en `next.config.ts` (`permanent: true` → 308). Los redirects de next.config se evalúan ANTES que el proxy de locale — los destinos deben incluir `/es/` o `/en/` explícito. El sitio viejo (URLs planas sin locale) murió en 404 en la migración de abril 2026 y costó -55% de clics; no repetir.
- hreflang/canonical: generados por `getLocaleAlternates()` — toda página nueva bajo `[locale]` debe usarlo en su `generateMetadata`.
- Sitemap dinámico (`src/app/sitemap.ts`) — se alimenta solo de los MDX; no requiere registro manual. Tras cada deploy con contenido nuevo, reenviar sitemap a GSC.
- Apex → www es redirect 308 configurado en el dashboard de Vercel (no en el repo).
- **`docs/aprendizajes-seo.md` — leer antes de proponer cambios de SEO.** Recoge lo que se ha medido que funciona (enlazado interno, keywords locales sin competencia) y lo que se ha medido que NO (cambios de título, escribir más blogs), con las cifras y las fechas. Actualizarlo tras cada medición.
- **El grafo de enlaces internos no es el que se ve en los MDX.** `getRelatedPostsByTags` (`src/lib/blog-content.ts`) genera enlaces en tiempo de render por solapamiento de tags. Para auditar hay que replicar el algoritmo (solapamiento, desempate por fecha, tope de 3, **dentro del mismo locale**). Un `relatedPost` que apunte a un slug inexistente en ese idioma se ignora en SILENCIO y el bloque sale vacío.
- **El paquete de mapas no se combate con código.** `best massage near me` llegó a 5 mediciones en posición 5,7-7,0 con CERO clics. Cuando el título está bien y la posición es buena y el CTR es cero, la palanca es el GBP (`docs/fase-1-gbp-y-resenas.md`), no el repo.
- **El CTR cero NO cuesta exposición en este sitio** (hipótesis probada y refutada, oct 2026). Se escribió lo contrario tras ver morir `best massage near me` (903 → … → 0 impresiones), pero el test de cohortes lo desmiente: las otras 24 consultas con cero clics en posiciones 1-10 **ganaron un 38 % de exposición**, y `blefaroplastia precio ecuador` (0 clics en 74 días, pos 8,4) multiplicó sus impresiones por 3,9. Lo que hubo el 15 de sep fue **una poda de la cola de página 8-10, por página y no por consulta** (posts informativos de HIFU/CO2/PRP −49 % de impresiones con la posición intacta), y con ella Google soltó dos URL planas de la web antigua: los 308 funcionan. El caso de `best massage near me` sigue abierto (lo más probable: corrección de desajuste de relevancia, un post sobre Cuenca emparejado con «near me» sin calificador geográfico). **n = 1, no es regla.** Detalle en `docs/aprendizajes-seo.md` §3.11.
- **NO reportar la posición media de este sitio.** Mezcla páginas locales en posición 5-10 con posts informativos en posición 60-90; su promedio se «mejora» solo porque desaparece cola larga que nunca dio clics (sep 2026: media 44,3 → 36,1 mientras las impresiones en pos >50 caían 4.770 y las de pos 1-10 subían 592). **Usar impresiones por tramo de posición.**
- **Antes de enlazar hacia una página, comprobar que tenga ~100 impresiones mensuales.** El enlazado interno rindió espectacularmente sobre páginas con volumen (ago 2026: `abdominoplastia` ×4,5) y **nada** sobre páginas sin él (sep 2026: `laser-co2-fraccionado` 6 clics frente a 5; `hifu-intimo` 9 impresiones en 22 días). A ese volumen no hay medición posible.
- **Traducir al inglés no rinde por sí solo** (medido el 3 oct 2026): las 6 traducciones del 7 de septiembre dieron **5 clics en 22 días** y dos siguen con 0 impresiones en 3 meses. La canibalización ES/EN quedó descartada (las EN mueven el 1-6 % de las impresiones de su par ES). **No era el sitemap**: la inspección de URL en GSC mostró que `/en/blog/spa-para-hombres-cuenca` está indexada y sana (`PASS`) y simplemente no compite, mientras `/en/blog/depilacion-laser-cuenca-precios` está «rastreada, actualmente sin indexar». Para distinguir «no indexada» de «indexada sin ranking», usar la **API de inspección de URL** (`POST https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`) antes de buscar culpables técnicos.

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

1. Cambios en rama de trabajo → `npm run build` (debe salir 0) → `npm run start -- -p <puerto>` (**el `--` es obligatorio**, sin él npm se come el flag y falla con «no such directory») y verificar con curl (títulos, 200s, redirects, schema). Para matar el servidor, `fuser -k <puerto>/tcp`: `pkill -f next-server` no lo consigue y se sigue sirviendo la versión vieja.
2. Commit → merge a `main` → push (Vercel despliega solo) → spot-check en producción → reenviar sitemap a GSC.
   - **Verificar la propagación con una cadena ÚNICA del cambio nuevo** y con `?cb=$RANDOM`. Buscar algo que ya existía en la página da un falso positivo inmediato (pasó en sept 2026). El deploy tarda entre 75 y 135 segundos.
   - **Un cambio medible por despliegue** cuando se quiera atribuir el efecto. Anotar en el snapshot qué se desplegó y con qué métrica de partida.
   - Al leer resultados, separar los tres canales: el orgánico se mide en GSC, el de pago en Meta y la ficha en las consultas locales con CTR cero. Coinciden en el tiempo y es fácil atribuirse mérito ajeno.
3. Documentación de estrategia en `docs/`: plan maestro (`plan-crecimiento-por-fases.md`), guía manual de GBP/reseñas (`fase-1-gbp-y-resenas.md`), plan de contenido (`fase-2-plan-contenido.md`), snapshots de métricas (`snapshot-*.md`) para comparar evolución.

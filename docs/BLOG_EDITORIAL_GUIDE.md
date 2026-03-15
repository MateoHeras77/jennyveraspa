# Blog Editorial + SEO Playbook

Guia oficial para crear nuevos articulos del blog de Jenny Vera Spa con consistencia en SEO, contenido y diseno.

## 1. Objetivo

Esta guia asegura que cada nuevo post:

- mantenga el tono de marca,
- cumpla estandares SEO tecnicos y on-page,
- encaje visualmente con el template actual,
- contribuya a la autoridad tematica del sitio,
- respete la estrategia de idiomas del proyecto.

## 2. Idiomas y cobertura oficial

Idiomas activos del blog:

- Espanol (`es`) como idioma principal.
- Ingles (`en`) como idioma secundario.

Politica vigente:

- Todo post nuevo se publica primero en espanol.
- Ingles es cobertura parcial (no se traduce automaticamente todo).
- Solo se traducen a ingles los posts priorizados por negocio/SEO.

Regla operativa para creadores:

- Si no hay instruccion explicita de traducir, crear solo version `es`.
- Si el post fue marcado para ingles, crear tambien version `en` con el mismo `slug`.

## 3. Arquitectura actual del blog

### Contenido por idioma

- Espanol: `src/content/blog/*.mdx`
- Ingles (parcial): `src/content/blog/en/*.mdx`

### Renderizado y rutas

- Lectura y validacion de frontmatter: `src/lib/blog-content.ts`
- Listado y paginacion localizados: `src/app/[locale]/(sitio)/blog/**`
- Home localizada: `src/app/[locale]/(sitio)/page.tsx`
- Filtros por categoria con rutas limpias:
  - `/{locale}/blog/categoria/[category]`
  - `/{locale}/blog/categoria/[category]/pagina/[page]`
- Post individual:
  - `/{locale}/blog/[slug]`
- OG/Twitter dinamico:
  - `src/app/[locale]/(sitio)/blog/[slug]/opengraph-image.tsx`
  - `src/app/[locale]/(sitio)/blog/[slug]/twitter-image.tsx`

## 4. Frontmatter obligatorio

Todos los posts deben incluir estos campos.

```mdx
---
title: "Titulo del articulo"
description: "Resumen SEO de 140-160 caracteres aprox"
slug: "slug-en-minusculas-con-guiones"
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
category: "Nombre de categoria"
coverImage: "https://... o /..."
coverImageAlt: "Descripcion util de la imagen"
author: "Jenny Vera Spa"
tags:
  - "tag 1"
  - "tag 2"
  - "estetica avanzada"
---
```

Reglas:

- `slug` unico y estable (no cambiar luego de publicar).
- `slug` debe ser identico entre `es` y `en` cuando exista traduccion.
- `description` clara, con keyword principal, sin relleno.
- `tags` minimo 3 (ideal 4-6) para potenciar relacionados.
- `coverImageAlt` descriptivo (accesibilidad + SEO).

## 5. URL y slug standards

Usar slugs:

- cortos,
- orientados a intencion de busqueda,
- en minusculas,
- sin acentos, sin caracteres especiales.

Ejemplo correcto:

- `tratamiento-eficaz-para-lineas-de-expresion-en-ecuador`

## 6. Estructura recomendada del articulo

Cada articulo debe seguir esta base:

1. Intro (problema + promesa).
2. Seccion explicativa principal (`##`).
3. Desarrollo por bloques (`##` y `###`).
4. Recomendaciones accionables.
5. Cierre + CTA a `/contacto`.

Importante para TOC:

- usar headings `##` y `###` reales (no simular con negritas),
- evitar saltos raros de jerarquia,
- incluir al menos 3 headings para aprovechar la tabla de contenido.

## 7. SEO on-page checklist (obligatorio)

Antes de publicar, confirmar:

- keyword principal en `title`.
- keyword principal o variante en intro.
- `description` unica y relevante.
- 1 `h1` (automatico en template), luego `h2/h3` semanticos.
- al menos 2 enlaces internos a rutas del sitio.
- `coverImage` valida (sin 404).
- `coverImageAlt` explicativo.
- CTA final hacia `/contacto`.

## 8. SEO tecnico por locale (obligatorio)

Antes de merge, confirmar que el post se comporte correctamente en su locale:

- Canonical correcto: `/{locale}/blog/[slug]`.
- `hreflang` presente via metadata (`es`, `en`, `x-default`).
- Si el post solo existe en `es`, no debe aparecer en `/en/blog`.
- Si el post existe en ambos idiomas, debe aparecer en ambos listados.

Nota:

- El sitemap se construye por locale. Si creas un post en `en`, aparecera en `/sitemap.xml` bajo rutas `/en/...`.

## 9. Estrategia de enlazado interno

Por post incluir minimo:

- 1 enlace a servicio relacionado (`/servicios/...` o `/servicios`).
- 1 enlace a otro post relacionado (`/blog/...`).
- 1 enlace de conversion (`/contacto`).

Para contenido en ingles:

- Mantener los enlaces en rutas neutrales (`/blog/...`, `/servicios`, `/contacto`) para que el sistema los resuelva al locale actual.

Objetivo:

- mejorar rastreo,
- distribuir autoridad,
- aumentar tiempo de sesion,
- empujar conversion.

## 10. Diseno y consistencia visual

El template ya define estilo editorial premium. El contenido debe respetar:

- parrafos cortos y escaneables,
- listas cuando haya procesos/beneficios,
- bloques `###` para subtemas,
- lenguaje claro y profesional (no tecnico en exceso),
- tono cercano, confiable y experto.

Evitar:

- bloques de texto largos sin cortes,
- mayusculas excesivas,
- titulares clickbait,
- promesas medicas absolutas.

## 11. Imagenes (cover + social)

Recomendaciones:

- formato ideal: JPG/WebP optimizado.
- tamano recomendado cover: 1600x900 o mayor proporcion 16:9.
- OG ideal: 1200x630 (se genera dinamico, pero la portada debe seguir siendo de calidad).
- no usar imagenes borrosas o con texto ilegible.

## 12. Categorias y tags

Categorias deben ser estables para no fragmentar filtros.

Categorias sugeridas:

- `Estetica Facial`
- `Tratamientos Corporales`
- `Recuperacion`
- `Tecnologia Estetica`
- `Blogs Principales`

Reglas de tags:

- usar tags reutilizables entre posts para activar "articulos relacionados".
- mantener un tag puente comun cuando aplique (ej. `estetica avanzada`).

## 13. Flujo de publicacion (ES + EN)

### Flujo A: nuevo post solo en espanol

1. Definir keyword principal + 2 secundarias.
2. Crear MDX en `src/content/blog`.
3. Completar frontmatter obligatorio.
4. Escribir contenido con estructura recomendada.
5. Agregar enlaces internos.
6. Revisar ortografia y claridad.
7. Ejecutar `npm run build`.
8. Verificar visualmente:
  - `/es/blog`
  - `/es/blog/[slug]`
  - categoria correspondiente.

### Flujo B: traduccion a ingles de un post existente

1. Confirmar que el post fue priorizado para EN.
2. Crear archivo en `src/content/blog/en`.
3. Mantener el mismo `slug` del post en espanol.
4. Traducir `title`, `description`, cuerpo y `coverImageAlt`.
5. Ajustar copy de CTA y tono natural en ingles.
6. Verificar que enlaces internos apunten a rutas del sitio.
7. Ejecutar `npm run build`.
8. Validar:
  - aparece en `/en/blog`,
  - carga en `/en/blog/[slug]`,
  - no rompe categorias/paginacion EN.

## 14. QA previo a merge

Checklist rapido:

- [ ] Build pasa sin errores.
- [ ] Slug correcto y unico.
- [ ] Metadata visible correcta en pagina.
- [ ] TOC aparece y funciona.
- [ ] Post entra en relacionados de otros articulos.
- [ ] Categoria y paginacion muestran el post.
- [ ] Imagen portada carga bien.
- [ ] Locale correcto (`es` o `en`) segun carpeta.
- [ ] Si existe en ambos idiomas, slug coincide 1:1.
- [ ] Post EN aparece en `/en/blog`.
- [ ] Post ES aparece en `/es/blog`.

## 15. Frecuencia y mantenimiento

Recomendacion operativa:

- publicar minimo 2 posts al mes.
- actualizar posts clave cada 90 dias (`updatedAt`).
- auditar enlaces internos rotos 1 vez al mes.
- priorizar clusters:
  - faciales,
  - corporales,
  - postoperatorio,
  - tecnologia (HIFU, etc).

Sugerencia de cobertura EN:

- Traducir al menos 1 post al mes al ingles.
- Priorizar temas evergreen y de alta intencion comercial.

## 16. Plantilla base para nuevo post

```mdx
---
title: "..."
description: "..."
slug: "..."
publishedAt: "2026-03-14"
updatedAt: "2026-03-14"
category: "Estetica Facial"
coverImage: "https://..."
coverImageAlt: "..."
author: "Jenny Vera Spa"
tags:
  - "..."
  - "..."
  - "estetica avanzada"
---

Intro breve con contexto y promesa.

## Seccion principal

Contenido...

## Beneficios o proceso

### Punto 1

Contenido...

### Punto 2

Contenido...

## Recomendaciones finales

Contenido...

Cierre + CTA a [agendar una valoracion](/contacto).
```

## 17. Plantilla base para traduccion EN

```mdx
---
title: "English title"
description: "SEO summary in English"
slug: "mismo-slug-que-espanol"
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
category: "Tecnologia Estetica"
coverImage: "/images/..."
coverImageAlt: "Useful image alt in English"
author: "Jenny Vera Spa"
tags:
  - "primary keyword"
  - "secondary keyword"
  - "advanced aesthetics"
---

Short intro in English.

## Main section

Content...

## Process or benefits

### Point 1

Content...

### Point 2

Content...

## Final recommendations

Content...

Closing + CTA to [book an evaluation](/contacto).
```

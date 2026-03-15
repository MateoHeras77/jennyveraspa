# Blog Editorial + SEO Playbook

Guia oficial para crear nuevos articulos del blog de Jenny Vera Spa con consistencia en SEO, contenido y diseno.

## 1. Objetivo

Esta guia asegura que cada nuevo post:

- mantenga el tono de marca,
- cumpla estandares SEO tecnicos y on-page,
- encaje visualmente con el template actual,
- contribuya a la autoridad tematica del sitio.

## 2. Arquitectura actual del blog

- Contenido fuente: `src/content/blog/*.mdx`
- Lectura y validacion de frontmatter: `src/lib/blog-content.ts`
- Listado y paginacion: `src/app/(sitio)/blog/**`
- Filtros por categoria con rutas limpias:
  - `/blog/categoria/[category]`
  - `/blog/categoria/[category]/pagina/[page]`
- Post individual:
  - `/blog/[slug]`
- OG/Twitter dinamico:
  - `src/app/(sitio)/blog/[slug]/opengraph-image.tsx`
  - `src/app/(sitio)/blog/[slug]/twitter-image.tsx`

## 3. Frontmatter obligatorio

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
- `description` clara, con keyword principal, sin relleno.
- `tags` minimo 3 (ideal 4-6) para potenciar relacionados.
- `coverImageAlt` descriptivo (accesibilidad + SEO).

## 4. URL y slug standards

Usar slugs:

- cortos,
- orientados a intencion de busqueda,
- en minusculas,
- sin acentos, sin caracteres especiales.

Ejemplo correcto:

- `tratamiento-eficaz-para-lineas-de-expresion-en-ecuador`

## 5. Estructura recomendada del articulo

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

## 6. SEO on-page checklist (obligatorio)

Antes de publicar, confirmar:

- keyword principal en `title`.
- keyword principal o variante en intro.
- `description` unica y relevante.
- 1 `h1` (automatico en template), luego `h2/h3` semanticos.
- al menos 2 enlaces internos a rutas del sitio.
- `coverImage` valida (sin 404).
- `coverImageAlt` explicativo.
- CTA final hacia `/contacto`.

## 7. Estrategia de enlazado interno

Por post incluir minimo:

- 1 enlace a servicio relacionado (`/servicios/...` o `/servicios`).
- 1 enlace a otro post relacionado (`/blog/...`).
- 1 enlace de conversion (`/contacto`).

Objetivo:

- mejorar rastreo,
- distribuir autoridad,
- aumentar tiempo de sesion,
- empujar conversion.

## 8. Diseno y consistencia visual

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

## 9. Imagenes (cover + social)

Recomendaciones:

- formato ideal: JPG/WebP optimizado.
- tamano recomendado cover: 1600x900 o mayor proporcion 16:9.
- OG ideal: 1200x630 (se genera dinamico, pero la portada debe seguir siendo de calidad).
- no usar imagenes borrosas o con texto ilegible.

## 10. Categorias y tags

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

## 11. Publicacion: flujo recomendado

1. Definir keyword principal + 2 secundarias.
2. Crear archivo MDX en `src/content/blog`.
3. Completar frontmatter obligatorio.
4. Escribir contenido con estructura recomendada.
5. Agregar enlaces internos.
6. Revisar ortografia y claridad.
7. Ejecutar `npm run build`.
8. Verificar visualmente:
   - `/blog`
   - `/blog/[slug]`
   - categoria correspondiente.

## 12. QA previo a merge

Checklist rapido:

- [ ] Build pasa sin errores.
- [ ] Slug correcto y unico.
- [ ] Metadata visible correcta en pagina.
- [ ] TOC aparece y funciona.
- [ ] Post entra en relacionados de otros articulos.
- [ ] Categoria y paginacion muestran el post.
- [ ] Imagen portada carga bien.

## 13. Frecuencia y mantenimiento

Recomendacion operativa:

- publicar minimo 2 posts al mes.
- actualizar posts clave cada 90 dias (`updatedAt`).
- auditar enlaces internos rotos 1 vez al mes.
- priorizar clusters:
  - faciales,
  - corporales,
  - postoperatorio,
  - tecnologia (HIFU, etc).

## 14. Plantilla base para nuevo post

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

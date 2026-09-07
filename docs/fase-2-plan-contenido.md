# Fase 2 — Plan de expansión de contenido

**Fecha:** 7 de julio de 2026 · **Duración estimada:** 4-6 semanas
**Objetivo:** pasar de 11 a ~21 páginas de servicio, completar el inglés y consolidar el enlazado interno. Cada tratamiento sin página = búsquedas "X en Cuenca" que no puedes ganar.

> **ESTADO: COMPLETADO** (verificado el 7 de septiembre de 2026). Las 9 páginas de servicio propuestas existen en español e inglés, y el sitio tiene 23 de cada. El enlazado interno se reparó en dos rondas, el 13 de agosto y el 7 de septiembre. Se conserva como registro de la fase.
>
> **Lo que quedó pendiente de este plan:** completar las traducciones al inglés del blog (27 de 59 posts sin versión EN). Ver `docs/aprendizajes-seo.md` y el snapshot más reciente.

---

## Lote 1 — Nuevas páginas de servicio (prioridad por demanda real)

Criterio: señales de GSC (impresiones/posiciones de URLs legacy y posts) + presencia en el catálogo real (`constants.ts`). Todas ES + EN.

| # | Página (slug propuesto) | Evidencia de demanda | Contenido de apoyo existente |
|---|---|---|---|
| 1 | `despigmentacion-axilas` | URL legacy en **pos. 5.8** con clics | blog despigmentacion-de-axilas |
| 2 | `hifu-intimo` | blog en pos. 7 con clics ("hifu íntimo") | blog hifu-intimo, tratamiento-intimo-con-hifu |
| 3 | `drenaje-linfatico-facial` | URL legacy en pos. 5.5 | blog drenaje-linfatico-facial |
| 4 | `tratamiento-ojeras` | blog en pos. 5.7 con clics | blog tratamientos-de-ojeras |
| 5 | `carbon-activo-laser` (Hollywood Peel) | URL legacy + blog con impresiones | blog tratamiento-de-carbon-activo-con-laser |
| 6 | `laser-co2-fraccionado` | 3 posts CO2 con impresiones altas | blogs que-es-el-laser-co2, laser-co2-antes-y-despues, laser-co2-cicatrices-acne |
| 7 | `despigmentacion-zonas-intimas` | URL legacy con impresiones | blog despigmentacion-en-zonas-intimas |
| 8 | `microneedling` | catálogo + blog microneedling-dermapen | blog microneedling-dermapen |
| 9 | `pdrn-salmon` | blog PDRN en pos. 7 con clics | blogs pdrn-salmon, hidratacion-profunda-piel-skin-boosters |
| 10 | `mesoterapia-facial` | catálogo + blog | blog mesoterapia-facial |

**Plantilla:** la misma estructura validada en Fase 1.1 (title/h1 con "en Cuenca", description 150-158 chars, 4-5 FAQ con schema, relatedPosts, cuerpo 350-450 palabras, CTA a /contacto, sección expat/English cuando aplique — especialmente en drenajes y post-operatorios).

**Redirects a actualizar al crear cada página:** `/despigmentacion-de-axilas`, `/drenaje-linfatico-facial`, `/despigmentacion-en-zonas-intimas`, `/tratamiento-intimo-con-hifu` → pasarán del blog a su página de servicio.

**Pendiente de confirmación del negocio:** botox y microblading tienen demanda comprobada en GSC pero no están en el catálogo. Si se ofrecen, entran al lote 1 con prioridad alta.

## Lote 2 — Completar inglés (semanas 3-4)

- Traducir los ~20 posts ES sin versión EN (hoy 32/52), priorizando los que apoyan páginas de servicio y los de interés expat/turismo médico (post-operatorios, HIFU, láser, masajes).
- Posts EN nuevos orientados a turismo médico (puente con Fase 3): "Med spa in Cuenca: services & prices guide", "Post-surgery recovery massages in Cuenca", "Botox & aesthetic treatments cost: Ecuador vs USA".

## Lote 3 — Calidad y enlazado (continuo)

- **Tildes en cuerpos de posts**: ~17 posts ES tienen el cuerpo completo sin acentos (la Fase 0 corrigió solo frontmatter). Restaurar por lotes.
- **Enlazado blog→servicio**: cada post debe enlazar a su página de servicio con anchor descriptivo en el primer tercio del texto (ej. post de HIFU → /es/servicios/hifu). Auditar los 52 posts y añadir los links faltantes.
- **Listado /servicios**: enlazar las páginas individuales nuevas desde el listado (hoy varios tratamientos son solo texto con ancla).

## Medición de la fase

| Métrica | Baseline (jul 2026) | Meta fin de Fase 2 |
|---|---|---|
| Páginas de servicio | 11 | ~21 |
| Posts EN | 32/52 | 52/52 + 3 nuevos |
| Impresiones/mes | 17.8k | 25k |
| Clics/mes | ~130 | 300 |

# Jenny Vera Spa — Auditoría SEO v2 y Plan de Acción Actualizado

**Fecha de auditoría:** 2026-06-21
**Sitio:** https://www.jennyveraspa.com (es / en)
**Objetivo:** Cerrar las brechas que aún bloquean tráfico orgánico de Cuenca, Ecuador, y abrir nuevas vías de captación de clientes.
**Documento base:** `docs/jenny-vera-spa-seo-action-plan.md` (este v2 actualiza ese plan con findings en vivo).

---

## Resumen ejecutivo

**Health score estimado:** ~68 / 100 (subió desde el lanzamiento gracias al blog y schema; sigue limitado por enlaces sociales rotos y por la ausencia de páginas de servicio individuales).

**Top 5 críticos pendientes (ordenados por ROI):**

1. ❌ **Enlaces sociales del footer siguen rotos** — `https://www.instagram.com` y `https://www.facebook.com` apuntan a las páginas genéricas, no a los perfiles del spa. Esto sigue siendo el bug #1 del plan original y aún está sin resolver en producción. (`src/components/layout/footer.tsx:72,81`).
2. ❌ **Servicios siguen en una sola URL con anclas** — `/es/servicios#faciales`, `#corporales`, `#post-op`. No existen aún páginas como `/es/servicios/depilacion-laser`, etc. Es la mayor pérdida de superficie indexable.
3. ⚠️ **Schema LocalBusiness incompleto** — usa imagen placeholder, le falta `sameAs` (perfiles sociales), `priceRange`, `areaServed`, y los horarios del sábado no coinciden con el footer (schema dice 09:00‑18:00, footer dice 09:00‑13:00).
4. ⚠️ **Sitio bilingüe a medias** — 76 posts en ES vs. 28 en EN (37% de cobertura). El público expat queda fuera del 63% del contenido. Las páginas estáticas ya están bien traducidas, pero el blog es la barrera.
5. ⚠️ **Sin Google Map embebido en `/contacto`** — el plan lo pedía y la página tiene los íconos pero no el iframe. Esto refuerza el signal de "Cuenca Ecuador" y mejora la conversión.

**Top 5 quick wins (≤ 2 h cada uno):**

1. Arreglar los 2 enlaces sociales del footer (15 min real).
2. Corregir el `<title>` de contacto: hoy sale **"Contacto | Jenny Vera Spa | Jenny Vera Spa"** (duplicación). Bug en `generateMetadata` que ya incluye el sufijo y el template lo vuelve a añadir (`src/app/[locale]/(sitio)/contacto/page.tsx:13`).
3. Reemplazar `image: "placeholder.png"` del schema por una foto real del spa (`src/components/seo/local-schema.tsx:8`).
4. Añadir `sameAs`, `priceRange`, `areaServed` y corregir horario del sábado en el schema.
5. Embeber Google Map en `/contacto` (1 iframe).

---

## Estado del plan original (tracker actualizado)

Leyenda: ✅ hecho · 🟡 parcial · ❌ pendiente

| # | Tarea original | Estado | Notas verificadas en vivo |
|---|---|---|---|
| 1.1 | Arreglar enlaces sociales | ❌ | Siguen apuntando a `instagram.com` / `facebook.com` genéricos (footer.tsx + HTML en vivo). |
| 1.2 | Optimizar Google Business Profile | ❓ | Fuera del repo. El enlace de reseñas `g.page/r/Cbso4rpRXTOYEAI` está vivo, pero no podemos verificar la categoría/fotos sin acceso al GBP. |
| 1.3 | Motor de reseñas Google | 🟡 | Botón "Dejar reseña en Google" presente en el footer ✅. Falta confirmar QR físico y flujo WhatsApp post-cita. |
| 1.4 | Search Console + indexación | ❓ | No verificable desde el código. Sitemap está bien generado (123 URLs) y servido en `/sitemap.xml`. |
| 2.1 | Páginas individuales por tratamiento | ❌ | El footer y el menú siguen llevando a `/servicios#faciales`. No existe ninguna ruta `/servicios/[slug]`. |
| 2.2 | Schema LocalBusiness | 🟡 | Implementado como `HealthAndBeautyBusiness` con dirección, geo y horarios ✅. Falta `sameAs`, `priceRange`, `areaServed`, imagen real y sábado parcial. |
| 2.3 | Hreflang es/en | ✅ | Reciprocidad correcta (`es`, `en`, `x-default`) en todas las páginas verificadas. |
| 2.4 | Reforzar señales locales | 🟡 | NAP consistente y `addressCountry: EC` en schema ✅. **Falta**: Map embed en `/contacto` y "Cuenca, Ecuador" en `<title>` (hoy varios titulos solo dicen "Cuenca"). |
| 3.1 | 2–4 artículos/mes | ✅ | 76 posts en ES (muy por encima del objetivo). BlogPosting + Breadcrumb schema implementados. |
| 3.2 | Citaciones locales | ❓ | Fuera del repo. |
| 3.3 | Instagram como embudo | ❌ | Bloqueado por 1.1: con los enlaces rotos el bucle no se cierra. |
| 3.4 | Optimizar /en para expats | 🟡 | Páginas estáticas localizadas correctamente ✅. **Blog solo 28/76 traducidos** (37%). Hreflang para posts sin par no enlaza al otro idioma (correcto, pero limita cobertura). |

---

## Findings nuevos (no estaban en el plan original)

### Críticos

**N1. Sitio renderiza HTML en inglés cuando el bot llega sin Accept-Language**
El proxy redirige por geo + Accept-Language. Cuando Googlebot, Bingbot o ChatGPT pasan, pueden caer en `/en` aunque busquen en español. Recomendación: hacer que el middleware fuerce `/es` para user-agents de bots conocidos, o respetar el header `X-Vercel-IP-Country` con fallback a `es`. (`src/proxy.ts`)

**N2. Título duplicado en Contacto**
`generateMetadata` devuelve `"Contacto | Jenny Vera Spa"` y el template del layout añade `" | Jenny Vera Spa"`, generando **"Contacto | Jenny Vera Spa | Jenny Vera Spa"** en producción. Pasa también en Nosotros. Fix: en `generateMetadata` devolver solo `"Contacto"` y dejar que el template añada el sufijo.

**N3. OG image vs Twitter image inconsistentes**
Layout raíz: `og:image = /image2.webp`, `twitter:image = /placeholder.png`. Twitter/X mostrará un placeholder feo cuando alguien comparta el sitio. Fix en `src/app/layout.tsx:42`.

**N4. Tree de rutas duplicado**
Existen `/src/app/(sitio)/` y `/src/app/[locale]/(sitio)/`. Las del primero son inalcanzables (el middleware redirige todo a `/[locale]/`), pero ensucian el build y aumentan el riesgo de drift. Decisión: o borrar `/src/app/(sitio)/` y dejar solo `[locale]`, o tratarlas como solo "componentes" (es lo que ya hace el código vía `import ServiciosPage from "@/app/(sitio)/servicios/page"`). En ese caso, mover a `src/components/pages/` para que el hecho de que sean componentes no rutas sea explícito.

### Altos

**N5. Horario del sábado inconsistente entre schema y footer**
Schema: `Saturday 09:00–18:00`. Footer/contacto: `Sábados 09:00–13:00`. Google penaliza inconsistencias de NAP/horario. Fix: dividir `openingHoursSpecification` en dos bloques (L–V y S) en `local-schema.tsx`.

**N6. Schema LocalBusiness sin `sameAs`**
Esto es importante porque ata la entidad del spa a sus perfiles sociales. Es señal directa para Google y para AI Overviews. Una vez arreglado el #1, agregar:
```json
"sameAs": [
  "https://www.instagram.com/<perfil-real>",
  "https://www.facebook.com/<perfil-real>",
  "https://g.page/r/Cbso4rpRXTOYEAI"
]
```

**N7. Faltan `Service` o `MedicalProcedure` schemas en /servicios**
Cada categoría/tratamiento listado en `SERVICE_CATEGORIES` (constants.ts) debería rendir como `Service` enlazado al `HealthAndBeautyBusiness`. Esto da rich results en SERP. Cuando se ejecute la tarea 2.1, cada página de tratamiento debería tener su `Service` + `FAQPage` schema.

**N8. Llms.txt menciona URLs sin locale**
El archivo dice `https://www.jennyveraspa.com/servicios` pero la URL canónica es `/es/servicios`. ChatGPT y Perplexity pueden citar URLs que redirigen, lo cual es subóptimo. Fix: regenerar `llms.txt` con URLs canónicas con locale.

**N9. Sitemap incluye categorías duplicadas en EN**
En el sitemap aparecen `/en/blog/categoria/estetica-facial` y `/en/blog/categoria/facial-aesthetics` (mismo contenido, dos slugs). Indica que algún post EN tiene `category` en español y se está generando un slug "ES" en el árbol EN. Hay que normalizar la categoría por idioma o mapear ES→EN al renderizar slugs.

### Medios

**N10. Internal linking pobre del blog a "servicios"**
Los 76 posts no enlazan sistemáticamente a la sección de servicios relevante. Cuando salgan las páginas individuales (2.1), cada post debe enlazar a su servicio (HIFU post → /servicios/hifu, etc.). Es el mecanismo que pasa autoridad del informacional al comercial.

**N11. Sin `Review` ni `AggregateRating` schema**
Si hay reseñas Google, exponerlas con `AggregateRating` en el LocalBusiness (con valor real, nunca inventado). Rich snippet con estrellas en SERP.

**N12. No hay página por barrio/zona de Cuenca**
Para SoLV (Share of Local Voice), publicar 2-3 páginas de tipo "Spa en [zona de Cuenca]" (El Centro, Yanuncay, Totoracocha, Zona Plaza Médica). Capturan búsquedas hiper-locales.

**N13. Sin BreadcrumbList en páginas estáticas (servicios, contacto, nosotros)**
Implementado solo en blog posts. Replicarlo en todas las páginas indexables.

**N14. Sin FAQPage en home ni en /servicios**
Falta de oportunidad: las preguntas frecuentes ("¿Cuánto cuesta?", "¿Cuántas sesiones?", "¿Está en Cuenca, Ecuador?") tienen rich result y son fuente de citas en AI Overviews.

**N15. Sin `WebSite` con `SearchAction` schema**
Habilita el sitelinks search box en SERP. Pequeño cambio en root layout.

### Bajos

**N16. Logo `logo-white.webp` precargado con alta prioridad en home pero no es LCP**
La imagen LCP debe ser `image2.webp` (hero). Validar que `fetchPriority="high"` está en la correcta y no en el logo.

**N17. CSP / Security headers no auditados**
No hay headers en `next.config.ts`. Considerar añadir `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`. Mejora trust score.

**N18. `keywords` meta tag en blog posts**
Google no lo usa, pero tampoco hace daño. Es señal débil. Mantener o no según preferencia; no es prioridad.

---

## Plan de ejecución revisado (próximas 4–6 semanas)

### Semana 1 — Quick wins de cierre del plan original

| Tarea | Archivos | Tiempo | Impacto |
|---|---|---|---|
| Fix social links footer (con URLs reales) | `src/components/layout/footer.tsx` | 15 min | 🔥🔥🔥 |
| Fix título duplicado contacto/nosotros | `src/app/[locale]/(sitio)/contacto/page.tsx`, `nosotros/page.tsx` | 10 min | 🔥🔥 |
| Schema: imagen real, `sameAs`, `priceRange`, `areaServed`, sábado parcial | `src/components/seo/local-schema.tsx` | 30 min | 🔥🔥🔥 |
| Twitter image = OG image | `src/app/layout.tsx` | 5 min | 🔥 |
| Embeber Google Map en /contacto | `src/app/(sitio)/contacto/page.tsx` | 30 min | 🔥🔥 |
| Corregir titles: incluir "Cuenca, Ecuador" en servicios, nosotros, contacto | varios `page.tsx` | 30 min | 🔥🔥 |
| Regenerar `llms.txt` con URLs canónicas con locale | `public/llms.txt` | 15 min | 🔥 |
| Forzar `/es` para bots sin Accept-Language | `src/proxy.ts` | 30 min | 🔥🔥 |

**Total: ~3 horas. Cierra prácticamente todas las brechas Phase 1 + 2.4 del plan original.**

### Semanas 2–4 — Estructural

**T1. Crear páginas individuales de tratamiento (la tarea 2.1 original sigue siendo la #1 en ROI)**

Estructura recomendada:
```
src/app/[locale]/(sitio)/servicios/[slug]/page.tsx
src/content/services/depilacion-laser.mdx
src/content/services/limpieza-facial.mdx
src/content/services/hifu.mdx
src/content/services/manchas.mdx
src/content/services/drenaje-postoperatorio.mdx
src/content/services/eliminacion-lunares.mdx
src/content/services/exosomas.mdx
src/content/services/masajes-reductores.mdx
```

Cada página debe tener:
- `Service` schema enlazado al `@id` del LocalBusiness.
- `FAQPage` schema con 3–5 Q&A reales.
- `BreadcrumbList`.
- H1 con tratamiento + "en Cuenca".
- 600–1000 palabras únicas.
- 2 CTAs (WhatsApp arriba, formulario abajo).
- Enlaces internos a 2–3 blog posts del mismo tema.
- Versión EN espejo bajo `/en/servicios/[slug]`.

Stagger: 2 páginas por semana → 8 en 4 semanas. Empezar por las de mayor intención comercial: HIFU, Depilación Láser, Limpieza Facial, Drenaje Postoperatorio.

**T2. Traducir blog ES → EN priorizado**

48 posts ES sin contraparte EN. Estrategia: NO traducir todo. Priorizar los 12 con tráfico potencial expat:
- Tratamientos generales (HIFU, depilación, drenaje, limpieza facial)
- Recovery post-quirúrgica (los expats viajan para cirugía)
- Comparativas y "qué esperar"
- Saltar: notas culturales locales muy específicas

**T3. Reforzar señales locales (avanzado)**

- Crear `Service` + `Place` schemas en cada página de tratamiento con `areaServed` = Cuenca.
- Página `/es/servicios/zonas` con mapa y barrios atendidos.
- Pie de página: añadir "Atendemos en toda Cuenca: El Centro, Yanuncay, Totoracocha, Zona Plaza Médica."

### Mes 2 — Compounding

**T4. AggregateRating + Reviews schema** una vez se acumulen 20+ reseñas Google reales (no inventar).

**T5. Páginas de comparación / decisión** ("HIFU vs Lifting quirúrgico", "Cuánto dura HIFU vs Botox") — alto intent informacional cercano a la decisión de compra.

**T6. Páginas de zona** para captar búsquedas hiper-locales tipo "depilación láser yanuncay cuenca".

**T7. Backlinks locales orgánicos** (no comprados):
- Cámara de Comercio de Cuenca.
- Listados en sitios de turismo médico EC.
- Colaboraciones con clínicas amigas (intercambio de blogposts).
- Apariciones en medios locales (El Mercurio, El Tiempo de Cuenca).

---

## Métricas de seguimiento (revisar mensualmente en GSC + GA4)

Baseline a tomar hoy:
- Impresiones y clicks por query "[tratamiento] Cuenca" (ej. "hifu cuenca", "depilación láser cuenca").
- # páginas indexadas (hoy esperado: ~110–120 según sitemap).
- Posición media para top 20 queries comerciales.
- Tráfico orgánico `/es/blog/*` vs `/es/servicios*`.
- Conversiones (WhatsApp clicks, envíos formulario).
- GBP: vistas, llamadas, direcciones, reseñas nuevas/mes.

Hitos:
- **30 días:** Quick wins de semana 1 vivos. GBP optimizado. Primer aumento en CTR.
- **60 días:** 4 páginas de tratamiento publicadas + indexadas. Primeras posiciones nuevas.
- **90 días:** 8 páginas de tratamiento. 12 traducciones EN. Mejora medible en queries comerciales.
- **180 días:** Ranking estable top 10 para 3–5 queries "[tratamiento] cuenca". Aumento sostenido de WhatsApp inquiries.

---

## Lo que NO hay que cambiar (lo que ya funciona)

- ✅ Hreflang reciprocal — déjenlo como está.
- ✅ Sitemap dinámico que regenera con cada post — perfecto.
- ✅ Schema BlogPosting + Breadcrumb en posts — bien implementado.
- ✅ Llms.txt — gran iniciativa, solo limpiar URLs.
- ✅ Robots.txt con allowlist explícita para bots de IA — mejor práctica.
- ✅ 76 posts en ES con frontmatter estructurado y categorías — sólida base de contenido.
- ✅ Imágenes WebP con responsive `srcset` — performance bien atendida.
- ✅ HealthAndBeautyBusiness en lugar de LocalBusiness genérico — buena elección.

---

*Auditoría hecha cruzando código fuente, HTML en vivo (home, servicios, contacto, blog post), sitemap.xml, robots.txt y llms.txt el 2026-06-21. El plan original sigue siendo válido; este v2 actualiza el estado y añade 18 findings nuevos detectados en producción.*

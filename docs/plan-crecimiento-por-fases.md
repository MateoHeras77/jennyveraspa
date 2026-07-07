# Plan de crecimiento por fases — Jenny Vera Spa

**Fecha:** 6 de julio de 2026 · **Basado en:** auditoría técnica completa + datos reales de Google Search Console + análisis competitivo local y expat.
**Objetivo:** recuperar el tráfico perdido en la migración, construir autoridad y — sobre todo — convertir visitas en clientes por WhatsApp.

---

## Resumen ejecutivo (60 segundos)

**Situación:** El sitio nuevo es técnicamente sólido pero la migración de abril 2026 costó **-55% de clics** (de ~270/mes a ~130/mes) porque las URLs viejas terminan en 404. La autoridad del dominio es casi cero (DR 0.1). Las impresiones suben (17.8k/mes) — Google está indexando el contenido nuevo — pero sin autoridad ni redirects, los clics no llegan.

**Las 3 apuestas grandes:**
1. **Reparar la fuga** (Fase 0): redirects 301 + fixes técnicos. Recupera el nivel de ~270 clics/mes en 4-6 semanas. Costo: 2 días de trabajo.
2. **Dominar "masajes cuenca" y Google Maps** (Fase 1): tu cluster #1 ya rankea pos. 6-10 con un post de blog; una página de servicio dedicada + GBP optimizado + motor de reseñas lo sube a top 3, donde están los clics y las llamadas.
3. **Abrir el mercado expat/turismo médico** (Fases 2-3): ya rankeas #1-3 para "laser hair removal near me", "facials near me" en inglés. Los expats de Cuenca pagan más, son leales y nadie los está atendiendo bien en este nicho. Guías expat + alianzas con clínicas = backlinks + referidos directos.

**Resultado a 12 meses (realista):** 800-1.200 clics orgánicos/mes, top 3 en el pack local de Maps para masajes y estética, 3-5 clientes nuevos/semana atribuibles a canales digitales.

**Restricción honesta:** SEO con DR 0.1 tarda 3-6 meses en componer. Si se necesitan clientes ESTE mes, el acelerador es Fase 1 (GBP, resultados en 2-4 semanas) + Google Ads local opcional (~$150-300/mes).

---

## Fase 0 — Reparar la fuga técnica (Semana 1-2) 🔧

> Todo lo de esta fase es código: lo ejecuta Claude Code en el repo. Nada depende de terceros.

### 0.1 Mapa de redirects 301 (CRÍTICO — el fix con mayor ROI de todo el plan)
- [ ] Redirect 301 de las ~25 URLs legacy (planas, sin locale) a su equivalente nuevo. Lista completa extraída de GSC. Ejemplos:
  - `/depilacion-definitiva-con-laser` → `/es/servicios/depilacion-laser`
  - `/masajes-relajantes` y `/masajes-relajantes-en-cuenca-ecuador` → página de servicio de masajes (crear en Fase 1)
  - `/tratamientos-de-acne`, `/despigmentacion-de-axilas`, `/plasma-rico-en-plaquetas` (pos 4.3!), `/todo-sobre-botox-usos-cuidados-costos`, `/cirugia-estetica`, `/tipos-de-masajes-corporales-beneficios`, etc. → post de blog o servicio equivalente
  - Sin equivalente → home del locale ES (mejor que 404)
- [ ] Arreglar los 3 redirects rotos de `next.config.ts` (`/hifu`, `/botox`, `/masaje-relajante` apuntan a rutas inexistentes)
- [ ] Los redirects deben resolver ANTES que la detección de idioma del proxy (hoy un slug español termina en `/en/...` → 404)
- [ ] Apex → www con redirect permanente (308/301), no 307

### 0.2 Calidad de SERP (CTR)
- [ ] Tildes en TODOS los títulos, descripciones y H1 ("Depilacion Laser" → "Depilación Láser")
- [ ] Fix del H1 con palabras pegadas por la animación split-text ("Belleza que temira de frente" / "Beauty thatmeets your gaze")
- [ ] OG image real (foto del spa/marca, 1200×630) — hoy es `/placeholder.png`; cada vez que se comparte el sitio por WhatsApp se ve genérico. Twitter image consistente con OG.

### 0.3 Deuda del plan v2 aún abierta (menor, pero barata)
- [ ] Enlaces sociales del footer (verificar N1.1), títulos duplicados en contacto/nosotros (N2), breadcrumb schema en home/contacto/nosotros (N13)

### 0.4 Medición (sin esto, el resto del plan vuela a ciegas)
- [ ] Instalar analytics — **hoy no hay NINGUNO**. Recomendado: Vercel Analytics (1 línea, sin cookies) + GA4 si se quiere remarketing futuro
- [ ] Evento de conversión: clic en WhatsApp (float + CTAs) como conversión principal
- [ ] UTM en todos los links externos hacia el sitio (GBP, bio de IG/TikTok)
- [ ] Tras el deploy: validar fixes en GSC y reenviar sitemap

**KPI Fase 0:** clics/mes de vuelta a ≥250 en 4-6 semanas. Legacy 404s en GSC → 0.

---

## Fase 1 — Capturar la demanda que ya existe (Semana 2-4) 📍

> Mitad código, mitad trabajo manual del negocio (GBP, reseñas). Es la fase que trae clientes más rápido.

### 1.1 Páginas de servicio para keywords que YA rankean sin página
- [ ] **Masajes relajantes** (`/es/servicios/masajes-relajantes` + EN): el cluster "masajes cuenca" es tu #1 en clics (pos 6-10, ~900 impr/mes) y rankea con un post de blog. Página de servicio con precios orientativos, FAQ, reseñas, fotos propias; el post existente le enlaza.
- [ ] **Microblading**: recibe impresiones en ES y EN ("microblading near me" pos 3.4) y no existe página.
- [ ] **Botox / rellenos**: la URL legacy de botox tiene 45 impr/mes en pos 15 y no hay página destino.

### 1.2 Google Business Profile a fondo (el canal local #1 — no requiere código)
- [ ] Cargar TODOS los servicios como Servicios/Productos con descripción y rango de precio
- [ ] Verificar categorías (principal: Spa / Centro de estética; secundarias: depilación láser, masajista, etc.)
- [ ] 10+ fotos reales de calidad (local, equipo, tratamientos); subir 2-3 nuevas cada semana
- [ ] Google Posts semanales (promos, antes/después)
- [ ] Sembrar 5-10 preguntas frecuentes en Q&A (precios, estacionamiento, formas de pago)
- [ ] Link al sitio con UTM (`?utm_source=gbp`)
- [ ] **Unificar NAP**: hay listados viejos con "Padre Julio Matovelle" — corregir/reclamar para que todo diga Plaza Médica, Av. Manuel de J. Calle y Paucarbamba

### 1.3 Motor de reseñas (composición pura — cada reseña ayuda para siempre)
- [ ] Plantilla de WhatsApp post-cita con el link directo `g.page/r/Cbso4rpRXTOYEAI` — pedirla el mismo día, cuando la clienta está contenta
- [ ] Meta: 2-4 reseñas nuevas/semana. Pedir que mencionen el tratamiento ("me hice la limpieza facial...") — Google indexa ese texto
- [ ] Responder TODAS las reseñas (señal de actividad)

### 1.4 Fichas y directorios (autoridad nivel 1)
- [ ] TripAdvisor (los expats buscan spas ahí), Booksy, TodoEstética, Bing Places, Apple Maps, directorios ecuatorianos

**KPI Fase 1:** cluster masajes en top 3; +50% en llamadas/rutas/clics desde GBP; 15+ reseñas nuevas en el mes.

---

## Fase 2 — Expandir la cobertura de contenido (Mes 2-3) 📝

### 2.1 Páginas de tratamiento restantes (de 8 → ~25)
- [ ] 10-15 páginas nuevas priorizadas por demanda real (GSC + búsquedas locales): radiofrecuencia, presoterapia, peeling, plasma rico en plaquetas, despigmentación de axilas/zonas íntimas, tratamiento de acné, ojeras, hidratación profunda, drenaje linfático facial, criolipólisis…
- [ ] Cada página = plantilla ganadora: H1 "X en Cuenca", precios orientativos, FAQ con schema, antes/después, CTA WhatsApp, reseñas del tratamiento
- [ ] Enlazado sistemático blog→servicio (cada post enlaza a su página de servicio con anchor descriptivo)

### 2.2 Inglés completo
- [ ] Traducir los 20 posts ES que faltan (hoy 32/52)
- [ ] Contenido EN nuevo con slugs en inglés (`/en/services/laser-hair-removal`)

### 2.3 AI Search (GEO) — mantener la ventaja
- llms.txt ya existe ✅; robots permite GPTBot/ClaudeBot/PerplexityBot ✅
- [ ] Párrafos citables en cada página de servicio (respuesta directa de 2-3 líneas a "¿cuánto cuesta X en Cuenca?")
- [ ] Las menciones en guías expat (Fase 3) son la señal #1 para que ChatGPT/Perplexity te recomienden

**KPI Fase 2:** 25k impresiones/mes; 400 clics/mes; 25 páginas de servicio indexadas.

---

## Fase 3 — Mercado expat y turismo médico (Mes 2-4, en paralelo) 🌎

> Es outreach humano, no código. El de mayor upside por dólar invertido: backlinks (DR 0.1 → 15-20), referidos directos y visibilidad en AI search de un solo golpe.

### 3.1 Guías y medios expat de Cuenca
- [ ] Pitch de inclusión en las guías existentes que hoy NO te mencionan: YapaTree ("Finding your perfect massage in Cuenca"), Smile Health Ecuador y Find Health in Ecuador ("Top day spas in Cuenca"), Cuenca Expat Hub, GringoPost, Cuenca Dispatch
- [ ] Argumentos: 4.9★ en Google, ubicación Plaza Médica (edificio médico conocido), atención en inglés, descuento para sus lectores
- [ ] Facebook groups de expats (Cuenca Expats, etc.): participar como negocio local, no spamear

### 3.2 Alianzas con clínicas de turismo médico
- [ ] Las clínicas dentales y de cirugía plástica de Cuenca atienden extranjeros que necesitan exactamente lo que ofreces: **drenaje postoperatorio, masajes de recuperación, faciales durante la estadía**
- [ ] Propuesta: paquete post-operatorio para sus pacientes (comisión o precio preferente) + intercambio de menciones/links
- [ ] 3-5 alianzas activas = canal de referidos permanente

### 3.3 Contenido EN de turismo médico (baja competencia, alto valor)
- [ ] "Med spa in Cuenca, Ecuador: services & prices" · "Botox in Ecuador: cost vs USA" · "Post-surgery lymphatic massage in Cuenca" · "Laser hair removal in Cuenca: what expats should know"
- [ ] Página pilar `/en/for-expats` con booking en inglés y testimonios de expats

**KPI Fase 3:** 5+ backlinks/menciones de sitios expat; 2+ alianzas firmadas; primeros clientes atribuibles ("¿cómo nos encontraste?").

---

## Fase 4 — Social como buscador (continuo desde el Mes 1) 📱

> TikTok ya genera páginas discover para "precio de la depilación láser cuenca ecuador" — la gente busca ahí. Instagram/TikTok son buscadores, no solo vitrinas.

- [ ] **Videos que responden búsquedas**: "¿Cuánto cuesta la depilación láser en Cuenca? 💰", "HIFU antes y después — resultados reales", "Qué es el drenaje post-quirúrgico". Título = la búsqueda exacta. Geo-tag Cuenca siempre.
- [ ] **Link-in-bio** a páginas de servicio con UTM (no solo al home). CTA a WhatsApp en cada video.
- [ ] **Reutilización**: cada video antes/después → sección en la página de tratamiento (contenido único que ningún competidor tiene) → señal E-E-A-T
- [ ] Cadencia realista: 3-4 videos/semana TikTok, 3 posts + stories diarias IG. Batch: grabar 1 día al mes.
- [ ] Responder DMs en <1h en horario laboral (los DMs son el pre-WhatsApp)

**KPI Fase 4:** tráfico con utm_source=instagram/tiktok medible; DMs→citas registradas.

---

## Fase 5 — Convertir y retener (Mes 3+) 💬

### Activación (visita → cita)
- [ ] CRO de páginas de servicio: precio orientativo visible (la fricción #1 en estética es el precio oculto — quien publica rangos gana el clic de WhatsApp), botón flotante ✅ ya existe, respuesta a objeciones en FAQ (¿duele?, ¿cuántas sesiones?, ¿formas de pago?)
- [ ] Tiempo de respuesta WhatsApp <15 min en horario laboral; plantillas de respuesta con link a agenda

### Retención (cliente → cliente recurrente)
- [ ] Base de datos simple de clientes (sheet o CRM ligero): tratamiento, fecha, próxima sesión
- [ ] Recordatorios por WhatsApp: depilación láser y masajes reductores son multi-sesión — cada sesión no agendada es dinero perdido
- [ ] Broadcast mensual de WhatsApp (lista de difusión): promo del mes + tip de cuidado

### Referidos (cliente → más clientes)
- [ ] Programa "trae una amiga": descuento para ambas. Tarjeta física post-tratamiento + mensaje WhatsApp
- [ ] Gift cards (fechas clave: Día de la Madre, Navidad, San Valentín)

### Revenue
- [ ] Paquetes multi-sesión con precio ancla (6 sesiones al precio de 5)
- [ ] Membresía facial mensual (ingreso recurrente + hábito)

---

## Acelerador opcional: Google Ads local 💰

Si se necesitan clientes **este mes** mientras el SEO madura:
- Presupuesto de prueba: $150-300/mes, solo Cuenca (radio 15 km)
- Keywords de servicio con intención: "depilación láser cuenca", "masajes cuenca", "limpieza facial cuenca"
- Landing = páginas de servicio (no el home); conversión = clic WhatsApp
- Evaluar a los 60 días: si el costo por conversación de WhatsApp < $5, escalar; si no, apagar

---

## Medición y cadencia

| Métrica | Hoy | Meta 3 meses | Meta 12 meses |
|---|---|---|---|
| Clics orgánicos/mes (GSC) | ~130 | 300 | 800-1.200 |
| Impresiones/mes | 17.8k | 25k | 60k |
| Posición cluster "masajes cuenca" | 6-10 | top 3 | #1 + pack local |
| Reseñas GBP | base actual | +25 | +100 |
| Backlinks (dominios referentes) | ~0 (DR 0.1) | 10 | 30+ (DR 15-20) |
| Conversaciones WhatsApp/semana (con UTM) | sin medir ⚠️ | medido + baseline | 3-5 clientes nuevos/semana |

**Ritual mensual (30 min):** revisar GSC (clics, posiciones del cluster objetivo), reseñas nuevas, conversaciones WhatsApp por fuente, elegir las 3 acciones del mes siguiente.

## Decisiones abiertas

1. **Presupuesto**: ¿hay $150-300/mes para el acelerador de Ads? (el plan funciona sin él, más lento)
2. **Precios públicos**: ¿publicar rangos de precio en el sitio? (recomendado: sí — quien los oculta pierde el clic)
3. **Quién produce el contenido social** (¿Jenny? ¿asistente?): define la cadencia realista de Fase 4
4. **GA4 vs Vercel Analytics** (o ambos): decidir en Fase 0

## Ownership

| Área | Owner |
|---|---|
| Todo lo de código (Fases 0, 1.1, 2, CRO) | Claude Code + Mateo (review/deploy) |
| GBP, reseñas, directorios | Negocio (con guiones/plantillas generados por Claude) |
| Outreach expat y alianzas | Negocio (con emails de pitch redactados por Claude) |
| Contenido social | Negocio (con calendario + guiones de Claude) |
| Medición mensual | Claude Code (acceso GSC ya configurado) |

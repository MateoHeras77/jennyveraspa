# Informe de evolución — Jenny Vera Spa

**Fecha del informe:** 25 de julio de 2026
**Periodo analizado:** enero – julio de 2026
**Fuentes:** Google Search Console (`sc-domain:jennyveraspa.com`, datos hasta el 23/07) y Vercel Analytics (desde el 06/07)

---

## 1. Resumen ejecutivo

El sitio perdió el 62 % de su tráfico en abril de 2026 por una migración sin redirects. El 7 de julio se desplegó la corrección junto con 44 páginas nuevas. **En los 16 días siguientes los clics subieron un 78 % y el tráfico de Ecuador casi se duplicó.** Julio cierra proyectado en ~220 clics, recuperando el 77 % del nivel previo a la migración.

El 25 de julio se desplegó un segundo bloque de correcciones (títulos, medición, horarios) y se actualizó la ficha de Google. **Ese bloque todavía no tiene datos**: su lectura será el 8 de agosto.

---

## 2. Evolución mensual del tráfico orgánico

| Mes | Clics | Impresiones | CTR | Posición | Hito |
|---|---|---|---|---|---|
| 2026-01 | 266 | 9.760 | 2,73 % | 13,4 | |
| 2026-02 | 255 | 9.328 | 2,73 % | 11,5 | |
| 2026-03 | **287** | 10.686 | 2,69 % | 18,3 | Último mes sano |
| 2026-04 | **108** ↓ | 10.477 | 1,03 % | 44,4 | ⚠️ Migración sin redirects |
| 2026-05 | 130 | 14.567 | 0,89 % | 49,0 | |
| 2026-06 | 136 | 17.851 | 0,76 % | 52,9 | Meseta |
| **2026-07** (1–23) | **164** | 14.502 | 1,13 % | 50,2 | ✅ Deploy el 07/07 |

Ritmo de julio: 7,1 clics/día → **proyección de cierre ≈ 220 clics** (+62 % sobre junio).

---

## 3. Antes y después del deploy del 7 de julio

Ventanas de 16 días simétricas alrededor del despliegue.

| Métrica | Antes (21 jun – 6 jul) | Después (8 – 23 jul) | Variación |
|---|---|---|---|
| Clics | 74 | **132** | **+78 %** |
| Impresiones | 8.344 | 10.575 | +27 % |
| CTR | 0,89 % | **1,25 %** | +40 % |
| Posición media | 57,0 | **47,0** | −10 puestos |

### Por país

| País | Antes | Después | Variación |
|---|---|---|---|
| **Ecuador** | 57 clics | **112 clics** | **+96 %** |
| Estados Unidos | 11 clics | 16 clics | +45 % |
| España | 2 clics / 3.176 impr | 2 clics / 3.359 impr | Ruido (pos. 77) |

> España aporta un tercio de las impresiones globales sin clics: es confusión con "Cuenca, España". Al leer totales, el mercado real es Ecuador + EE. UU.

---

## 4. Qué produjo el resultado

**El 45 % de los clics post-deploy (60 de 132) viene de páginas creadas el 7 de julio**, en solo 16 días y con un Domain Rating de 0,1.

| Página nueva | Clics | Impr. | Pos. |
|---|---|---|---|
| `/es/blog/spa-para-hombres-cuenca` | 13 | 114 | **4,3** |
| `/es/blog/botox-ecuador-cuanto-cuesta` | 6 | 428 | 5,8 |
| `/en/blog/best-massage-cuenca-ecuador` | 4 | 173 | 6,6 |
| `/es/blog/lipoescultura-360-ecuador-precios` | 4 | 260 | 8,0 |
| `/es/blog/cuanto-cuesta-abdominoplastia-ecuador` | 3 | 484 | 7,0 |
| `/es/servicios/masajes-relajantes` | 3 | 44 | 8,6 |
| `/es/blog/blefaroplastia-precio-ecuador` | 2 | 277 | 8,5 |

Mejor pieza: **spa para hombres en Cuenca**, posición 4,3 con 11 % de CTR. Confirma la hipótesis de atacar keywords locales sin competencia.

### Tráfico real del sitio (Vercel, 8–25 de julio)

| | Visitantes | Páginas vistas |
|---|---|---|
| Bruto del dashboard | 462 | 759 |
| **Real, sin bots** | **269** | **566** |

Se descartó un 42 % de tráfico artificial: China (100 visitantes / 100 páginas vistas, proporción 1:1) y `/en/blog/eliminacion-de-lunares-con-laser` (96 visitantes declarando referrer de Google, mientras GSC reporta 0 clics para esa URL).

| Segmento | Visitantes | Páginas/visita |
|---|---|---|
| Ecuador | 157 | 2,0 |
| Estados Unidos | 77 | **2,4** |

**Dato clave:** llegan más visitantes a `/en/contacto` (18) que a `/es/contacto` (12), pese a que el inglés recibe la mitad de visitas y seis veces menos clics orgánicos. **El público expat es minoría en volumen y mayoría en intención de compra.**

---

## 5. Cambios del 25 de julio (aún sin datos)

| Cambio | Problema que resuelve |
|---|---|
| Títulos con cifra en 5 posts de precio | Rankeaban en posición 5–9 con CTR ~0 %: títulos truncados por el sufijo de marca y sin mostrar precio |
| Imagen de portada rota eliminada | `post-operatorio-recovery.jpg` era un HTML de 29 bytes en un post con 260 impresiones |
| Página puente `/[locale]/whatsapp` | Los eventos de Vercel exigen plan Pro (402). Ahora se cuentan los clics a WhatsApp gratis |
| Horario corregido a 8:00–19:00 L–S | El sitio declaraba 6 horas menos los sábados que la realidad |
| `alternateName` en el schema | Ficha y web usaban nombres distintos |
| Ficha de Google actualizada | Área de servicio, dirección duplicada, categoría primaria, descripción, atributos |
| 4 correos de outreach enviados | Sin backlinks, el contenido en inglés no despega |

---

## 6. Qué hacer ahora

**Prioridad 1 — Reseñas de Google.** Es el factor número uno del paquete de mapas y es el cuello de botella real. La evidencia: `best massage near me` lleva meses en posición 6,0 con 122 impresiones y **cero clics**; `masajes cuenca` en posición 9,8 con 1 clic en 91 impresiones. Cuando un top-6 no recibe ningún clic, el paquete de mapas se lo está llevando. Ahí no compite el contenido, compite la ficha.

**Prioridad 2 — Sección "Servicios" de la ficha de Google.** Sin tocar. Cada tratamiento con descripción propia amplía las búsquedas para las que Google puede mostrarte.

**Prioridad 3 — Fotos y publicaciones en la ficha.** Factor de posicionamiento y de conversión. Cadencia semanal.

---

## 7. Qué falta

| Pendiente | Responsable | Impacto |
|---|---|---|
| Reseñas, fotos, servicios y posts en la ficha | Negocio | Alto |
| Perfiles de redes sociales: 3 cuentas de Instagram distintas circulando; ninguna red envía tráfico al sitio | Community manager | Medio-alto |
| Respuesta al outreach (4 correos enviados el 25/07) | Esperar 7–10 días | Alto |
| Tildes en el cuerpo de ~17 posts antiguos | Técnico | Bajo |
| ~20 traducciones al inglés pendientes | Técnico | Medio |
| `hifu facial`: 259 impresiones en posición 46 | Técnico | Medio |

---

## 8. Recomendaciones

**1. No escribir más blogs por ahora.** Hay 60 posts en español y 35 en inglés. El limitante ya no es contenido: es autoridad de dominio (DR 0,1) y ficha de Google. El post número 61 rinde menos que un solo backlink.

**2. Priorizar el público expat.** Convierte mejor con la mitad de tráfico. Todo el esfuerzo en inglés —outreach, traducciones, contenido— tiene mejor retorno por hora que el equivalente en español.

**3. Contrastar siempre Vercel contra Search Console.** El dashboard infla un 42 % por bots. Ningún número de Vercel debería reportarse sin ese filtro.

**4. No tocar el nombre de la ficha durante la campaña de reseñas.** Cambiarlo dispara reverificación. Si algún día se hace, en un momento tranquilo.

**5. Revisar el enlace de las redes al sitio.** Cero visitas desde Instagram y TikTok en 18 días es anómalo teniendo cuentas activas. Es lo más barato de arreglar de toda la lista.

---

## 9. Calendario de medición

| Fecha | Qué se revisa |
|---|---|
| **~8 de agosto** | CTR de los 5 títulos nuevos, primeros clics a WhatsApp, efecto de la ficha en el cluster de masajes |
| **~18 de agosto** | Comparación completa contra `snapshot-2026-07-25.md`: clics, posiciones, categoría primaria |
| Continuo | Respuestas al outreach |

### Objetivos

| Horizonte | Clics/mes | Impresiones/mes |
|---|---|---|
| Agosto | 250 | 20.000 |
| Octubre | 300 | 25.000 |

Referencia: 287 clics en marzo, antes de la migración.

---

*Detalle metodológico completo en `docs/snapshot-2026-07-25.md`. Línea base en `docs/snapshot-2026-07-07.md`.*

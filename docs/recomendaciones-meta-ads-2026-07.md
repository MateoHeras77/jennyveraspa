# Recomendaciones para el equipo de marketing — Meta Ads

**Fecha:** 26 de julio de 2026
**Periodo analizado:** 26 de junio – 25 de julio de 2026 (y tendencia desde el 15 de junio)
**Fuente:** API de Marketing de Meta, cuenta `act_1661223548424128`
**Naturaleza de este documento:** recomendaciones. Ninguna campaña ha sido modificada; todos los cambios los decide y ejecuta el equipo de marketing.

---

## 1. Lo primero: la campaña funciona

Antes de las recomendaciones conviene dejar claro el punto de partida, porque es bueno.

| Métrica (30 días) | Valor |
|---|---|
| Inversión | $67,96 |
| Impresiones | 21.775 |
| Alcance | 6.353 personas |
| Clics | 487 |
| CTR | 2,24 % |
| CPC | $0,14 |
| **Conversaciones iniciadas** | **45** |
| **Coste por conversación** | **$1,51** |

**$1,51 por una conversación de WhatsApp es un resultado muy bueno** para un servicio de estética. La configuración técnica también es correcta: los tres conjuntos de anuncios optimizan por `CONVERSATIONS` con destino WhatsApp, que es exactamente lo que corresponde a una campaña de clic-a-mensaje. No hay nada que arreglar en el objetivo.

Las recomendaciones que siguen son de ajuste, no de rescate.

---

## 2. El coste por conversación se está duplicando

Es el hallazgo más accionable del análisis.

| Semana | Inversión | Conversaciones | Coste/conversación |
|---|---|---|---|
| 15 jun | $7,18 | 11 | **$0,65** |
| 22 jun | $21,64 | 19 | $1,14 |
| 29 jun | $2,50 | 1 | $2,50 |
| 6 jul | $19,29 | 13 | $1,48 |
| 13 jul | $20,09 | 10 | **$2,01** |
| 20 jul | $17,05 | 11 | $1,55 |

De $0,65 a ~$1,55-2,00 en seis semanas: **el coste se ha multiplicado por ~2,4**.

El CTR se mantiene estable (2,26-2,45 %), así que el anuncio sigue gustando a quien lo ve. Lo que cambia es a *cuánta gente nueva* se le puede mostrar:

- Alcance total: **6.353 personas** en 30 días.
- Frecuencia: **3,43** — cada persona ha visto los anuncios entre 3 y 4 veces.

**Recomendación:** renovar creatividades. Los seis anuncios activos son reels del mismo tema (cirugía y post-operatorio) y llevan entre 5 días y 5 semanas corriendo sobre una audiencia pequeña que ya los ha visto varias veces. Es el patrón clásico de desgaste.

---

## 3. Solo se está entregando el 41 % del presupuesto

| | |
|---|---|
| Presupuesto asignado en la ventana | ~$165 |
| Gasto real | $67,96 |
| **Entrega** | **41 %** |

Las tres campañas tienen $3/día cada una, pero Meta no logra gastarlos. Cuando el sistema no entrega el presupuesto asignado, casi siempre significa que **el público es demasiado estrecho** para el dinero que se le pide colocar.

La segmentación actual: Cuenca (radio 40 km) + Azogues (17 km), 20-65 años, sin segmentación por idioma ni por intereses. Es correcta para un negocio local, pero define un universo pequeño.

**Recomendación:** decidir entre dos caminos opuestos, no dejarlo como está.
- **Consolidar:** unir las tres campañas en una sola. Tres campañas compitiendo por la misma audiencia diminuta se canibalizan entre ellas y fragmentan el aprendizaje del algoritmo.
- **Ampliar:** subir el radio o añadir un público nuevo (ver punto 4) para que el presupuesto tenga dónde entregarse.

---

## 4. El público expat no se está tocando

Este es el hueco más claro entre lo que sabemos de la web y lo que hacen los anuncios.

Datos del sitio web (18 días, tráfico real ya filtrado de bots):

| | Visitas a la página de contacto |
|---|---|
| `/en/contacto` (inglés) | **18** |
| `/es/contacto` (español) | 12 |

El inglés recibe **la mitad** de visitas totales y **seis veces menos** clics de búsqueda orgánica, y aun así genera **más** visitas a la página de contacto. También consume más páginas por sesión (2,4 frente a 2,0). Cuenca tiene una comunidad expat considerable y son un público con capacidad de gasto.

Los anuncios actuales no segmentan por idioma, así que ese público prácticamente no los ve.

**Recomendación:** probar un conjunto de anuncios en inglés dirigido a residentes extranjeros en Cuenca. Es una hipótesis a validar con presupuesto pequeño, no una certeza — pero la señal de la web es lo bastante fuerte como para justificar la prueba.

---

## 5. Los anuncios y la web son dos mundos separados

Todos los anuncios llevan directamente a WhatsApp (`destination_type: WHATSAPP`). Es una decisión legítima: convierte bien y barato. Pero tiene un coste oculto.

La web recibe **~270 visitantes reales al mes**. Hasta hoy, ninguno de ellos era visible para Meta. No se podía reimpactar a nadie, ni construir públicos similares a partir de quien muestra interés real.

**Eso ya está resuelto por nuestra parte.** El 26 de julio instalamos el Pixel `WebsitePixel` (`882066591229888`) en el sitio, con un evento `Contact` que se dispara cuando alguien pulsa cualquier botón de WhatsApp de la web. Está verificado y funcionando en producción.

**Expectativa realista, para que nadie se lleve una decepción:**
- El Pixel **no** mejora la medición de las campañas actuales. Esas conversiones ocurren dentro de WhatsApp, fuera del sitio, y ya se cuentan bien.
- Lo que hace es **acumular público**. Con ~270 visitantes al mes, hacen falta unos **4 meses** para tener un grupo lo bastante grande como para reimpactarlo con eficacia (Meta funciona bien a partir de ~1.000 personas).
- **No hay nada accionable en agosto.** Hacia noviembre sí.

### Los dos canales ya persiguen al mismo cliente sin saberlo

Merece la pena verlo junto:

- **En pago:** los seis anuncios son reels de cirugía y post-operatorio.
- **En orgánico:** los artículos de precios de cirugía posicionan entre el puesto 5 y el 9 de Google (`cuanto-cuesta-abdominoplastia-ecuador`, `lipoescultura-360-ecuador-precios`, `blefaroplastia-precio-ecuador`), y todos terminan invitando a los drenajes linfáticos.

Es el mismo embudo —recuperación post-quirúrgica— ejecutado dos veces sin que las dos mitades se hablen.

**Recomendación:** cuando decidan mandar parte del presupuesto a la web (una vez el Pixel lleve semanas acumulando), esos artículos y la página `/es/servicios/drenaje-postoperatorio` son los destinos naturales: contenido ya escrito, ya posicionado y ya alineado con la creatividad que se está pagando.

---

## 6. Quién responde realmente a los anuncios

Útil no solo para segmentar, sino para decidir qué contenido producir.

| Edad y género | Inversión | Clics |
|---|---|---|
| 35-44 mujeres | $19,50 | 103 |
| **25-34 mujeres** | $16,92 | **137** |
| 45-54 mujeres | $7,63 | 81 |
| 35-44 hombres | $6,81 | 33 |
| 25-34 hombres | $4,47 | 22 |

El público es **mujeres de 25 a 54 años**, y el tramo de 25-34 es el que más clica de todos.

| Plataforma | Inversión | Impresiones | CTR |
|---|---|---|---|
| **Facebook** | $48,89 | **16.807** | 2,30 % |
| Instagram | $19,07 | 4.968 | 2,03 % |

**Facebook entrega más del triple de impresiones que Instagram** y convierte algo mejor. Va en contra de la intuición habitual en estética, pero es lo que dicen los datos de esta cuenta.

---

## 7. Dos arreglos rápidos

**Categoría de la página de Facebook.** La página (`1504934889727982`) figuraba como **"Blog personal"** en lugar de una categoría de negocio o spa. Ya se está corrigiendo. Afecta a cómo entiende Meta el negocio y a la coherencia con la ficha de Google.

**Nomenclatura de campañas.** Las tres se llaman por fecha: `ADS - JENNY VERA - JUNIO 19`, `ADS - POSTQUIRÚRGICO - JULIO 6`, `ADS . POST QUIRÚRGICO 2 - JULIO 21`. Con ese esquema es imposible comparar rendimiento por tema, público o formato pasados unos meses. Sugerimos algo como `[Objetivo] - [Público] - [Tema] - [Fecha]`.

---

## 8. Resumen priorizado

| # | Recomendación | Urgencia | Quién |
|---|---|---|---|
| 1 | Renovar creatividades (coste/conversación ×2,4) | **Alta** | Marketing |
| 2 | Consolidar las 3 campañas o ampliar público (solo se entrega el 41 %) | **Alta** | Marketing |
| 3 | Corregir la categoría de la página de Facebook | Alta (2 min) | Negocio |
| 4 | Probar conjunto de anuncios en inglés para expats | Media | Marketing |
| 5 | Convención de nombres de campañas | Media | Marketing |
| 6 | Reimpacto y públicos similares con el Pixel | **Baja hasta noviembre** | Marketing |

---

## Nota sobre el acceso a los datos

Estas cifras se han obtenido con el CLI oficial de Meta Ads en **modo de solo lectura**. No se ha creado, modificado, pausado ni activado ninguna campaña, conjunto de anuncios, anuncio o presupuesto, y no se hará: cualquier cambio en la cuenta publicitaria corresponde al equipo de marketing.

Podemos repetir este análisis con la periodicidad que se acuerde y cruzarlo con los datos de Google Search Console y de la web.

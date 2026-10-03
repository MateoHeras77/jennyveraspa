# Informe de presencia digital — 3 de octubre de 2026

> **NOTA DEL EDITOR (3 oct 2026).** Dos correcciones a este informe, verificadas aparte:
>
> 1. La afirmación de que «solo 1 de las 54 conversaciones de Facebook recibió respuesta» y que «el cuello de botella está en cerrarlas» **es incorrecta**. Es un artefacto de `messaging_conversation_replied_7d`, que no tiene visibilidad en campañas de clic-a-WhatsApp porque la conversación ocurre dentro de WhatsApp. Los demás indicadores lo desmienten: `messaging_first_reply` = 61 sobre 71 (86 %), `messaging_user_depth_2_message_send` = 37 y `_depth_5_` = 35. Lo correcto: **no se puede medir desde Meta si las conversaciones acaban en cita.**
> 2. La afirmación de que el informe de septiembre «dio a Skin Clinic la ventaja de sin web» no corresponde a un error: la tabla de septiembre decía correctamente que nosotros tenemos web y Skin Clinic no. Lo que sí es un aporte nuevo y válido de este informe es que **nuestra ficha de Google enlaza al sitio y es el único activo externo que devuelve tráfico.**

Verificación de las tres recomendaciones entregadas el 15 de septiembre de 2026.
Todo lo que sigue es **solo lectura**: peticiones GET al Graph API v21.0, consultas públicas con navegador y lecturas del repositorio. No se ha publicado, editado ni modificado nada.

---

## Las tres verificaciones

### 1. Poner el enlace al sitio en las tres redes → **NO**

Ninguna de las tres cuentas enlaza a jennyveraspa.com. Tres semanas después, el estado es idéntico al del 15 de septiembre.

| Red | Enlace al sitio | Evidencia |
|---|---|---|
| Facebook | **No** | `GET /1504934889727982?fields=website` devuelve `{"name":…,"username":"JennyVeraSpa","link":…,"id":…}` — **el campo `website` no aparece en la respuesta**, que es como el Graph API representa un campo vacío. Repetido con token de sistema y con token de página: el mismo resultado. En la ficha pública, una búsqueda de `jennyveraspa.com` en todo el texto renderizado da `false`. |
| Instagram | **No** | Perfil cargado con navegador: cero enlaces `l.instagram.com` (el redirector que Instagram usa obligatoriamente para el enlace de la bio) y cero anclas externas en el `<header>`. |
| TikTok | **No** | HTML crudo sin ninguna clave `bioLink`; en el DOM renderizado, el selector `[data-e2e="user-link"]` devuelve lista vacía. Confirmado por dos vías independientes. |

**Aviso sobre un falso positivo.** Un primer intento con WebFetch sobre el perfil de Instagram informó de un enlace «www.jennyveraspa.com» en la biografía, además de una dirección deformada («Av. Aymanuel Caley Paucarbamba») y un teléfono. **Ese dato era falso**: al cargar el perfil con navegador y expandir el botón «more», la biografía completa resultó ser exactamente tres líneas, sin dominio ni como enlace ni como texto. Lo registro porque el dato erróneo era justo el que habríamos querido encontrar.

Lo que sí está escrito, y sigue mal: la **descripción** de la página de Facebook aún termina en `www.jenny vera. com` (con espacios, dominio inexistente, no clicable). Matiz útil: ese campo `description` no se muestra en la ficha pública —el público ve el campo `about`, que no contiene dominio alguno—, así que ni siquiera funciona como pista para quien lo lea.

### 2. Vincular Instagram a la página de Facebook / Business Manager → **NO**

- `GET /1504934889727982?fields=instagram_business_account,connected_instagram_account` → ambos campos **ausentes**, con token de sistema y con token de página.
- `GET /me/accounts?fields=…,instagram_business_account,connected_instagram_account` → la página aparece con los dos campos en `None`.
- `GET /17841404443393016` → sigue fallando igual que el 15 de septiembre: `(#100) Unsupported get request. Object with ID '17841404443393016' does not exist, cannot be loaded due to missing permissions, or does not support this operation` (subcode 33).

Consecuencia directa: **no hay insights de Instagram**. `reach`, `profile_views` y sobre todo `website_clicks` siguen siendo inaccesibles por API. Lo que sé del perfil es lo que se ve públicamente.

Dato nuevo: la página sí pertenece a un Business Manager, `GET /1504934889727982?fields=business` → `{"id":"567294240483259","name":"spa_jennyvera"}`. El negocio existe; lo que falta es colgar la cuenta de Instagram de él.

### 3. Cambiar la categoría de la ficha de Google → **NO**

Ficha leída con navegador en Google Maps (`/maps/place/…!16s%2Fg%2F11f4pzp0pg`):

- Nombre: **Jenny Vera Estética Profesional & Spa** (sin cambios)
- Categoría: **«Massage spa»** = Spa de masajes — **la misma de hace tres semanas**. El botón de categoría (`button[jsaction*="category"]`) devuelve ese único valor; no hay categorías secundarias visibles.
- Valoración: **4,9 con 94 reseñas** — exactamente las mismas 94. Cero reseñas nuevas en tres semanas. Las tres reseñas visibles más recientes son de hace 5 meses.

**Hallazgo que corrige una creencia nuestra:** la ficha de Google **sí enlaza al sitio**, y además bien.

Evidencia exacta, para poder citarla. Vía: navegador Playwright sobre la ficha de Google Maps, URL canónica `https://www.google.com/maps/place/Jenny+Vera+Est%C3%A9tica+Profesional+%26+Spa/@-2.910152,-78.999122,17z/...!16s%2Fg%2F11f4pzp0pg` (place id `0x91cd3d557cd80507:0x98335d51bae228bb`). Consultando el DOM con el selector `a[data-item-id="authority"], a[href*="jennyveraspa"]` se obtienen cuatro anclas, dos destinos distintos:

- `http://jennyveraspa.com/` — el enlace de **sitio web** del bloque de contacto (`data-item-id="authority"`), el que Google muestra como «jennyveraspa.com» junto al teléfono.
- `https://www.jennyveraspa.com/es/servicios` — el botón **«Services»** de la ficha, ya apuntando al locale `/es/` correcto.

El texto renderizado del panel lo confirma en orden: `Services / jennyveraspa.com / jennyveraspa.com / +593 99 915 2853`.

En el informe del 15 de septiembre dimos a Skin Clinic la ventaja de «sin web» frente a nosotros; conviene recordar que en esto ya vamos por delante, y que el botón de servicios además entra por el locale correcto, sin pasar por el proxy de idioma.

Lo que sí cambió, y nadie pidió: la **categoría de Facebook** ahora es `Spa médico` + `Spa` (`category_list`: id 203654586323143 y 211987392145473; en la vista pública, «Page · Medical Spa · Health Spa»). Es el cambio que recomendamos, pero aplicado en la red donde no mueve rankings, y no en la ficha de Google, donde sí los movería.

---

## A. Facebook hoy

`GET /1504934889727982` con token de sistema (SYSTEM_USER, app «Ads CLI Access», válido, sin expiración).

| Campo | Valor hoy | 15 sep |
|---|---|---|
| Nombre | JennyVera Estética Profesional & Spa | igual (nótese «JennyVera» junto) |
| Usuario | JennyVeraSpa | igual |
| Categorías | Spa médico, Spa | **cambiado** |
| Seguidores | **1.502** | 1.496 (+6) |
| Valoración | `overall_star_rating: 5`, `rating_count: 0` | igual |
| Website | **vacío** | vacío |
| Teléfono | +593999152853 | igual |
| Correo | chelis.vera@hotmail.com | igual |
| Dirección | Manuel J Calle y Paucarbamba, Plaza Médica 4to.Piso Consultorio 406, **Cuenca Urcu**, Ecuador | igual |
| Horario | campo `hours` **ausente**; la ficha pública muestra **«Always open»** | igual |
| Verificación | `not_verified` | — |
| Publicada | sí | — |

Dato adicional del `og:description` público: «1.502 followers · 39 talking about this · 187 were here».
La ficha pública muestra «Not yet rated (3 reviews)»: hay 3 reseñas pero sin nota agregada, de ahí el `rating_count: 0`.

### ¿Siguen las inconsistencias de NAP? Sí, las tres, y aparece una cuarta

1. **Ciudad**: Facebook sigue diciendo «Cuenca Urcu»; Google y el sitio dicen Cuenca (010105), Azuay. «Cuenca Urcu» no es el barrio del Edificio Plaza Médica.
2. **Horario**: Facebook «Always open» frente a L-S 08:00-19:00. Esto ya no es solo un desajuste entre nuestras fuentes: **Google tiene el horario correcto y verificado** (sábado 8-19, domingo cerrado, lunes a jueves 8-19), así que el dato raro es únicamente el de Facebook.
3. **Nombres de marca**: la cuenta de TikTok se llama **«Jenny Vera Dermocosmiatra»** y la de Instagram **«Dmctra Jenny Vera»**. Con «Jenny Vera Estética Profesional & Spa» (Google), «JennyVera Estética Profesional & Spa» (Facebook) y «Jenny Vera Spa» (dominio), van **cinco** variantes del nombre, no cuatro.
4. **Coordenadas**: Facebook sitúa el negocio en lat -2,8821 / lon -79,0194; Google, en -2,9102 / -78,9991. Son **unos 3,7 km de separación**. El punto de Google coincide con la dirección real; el de Facebook, no.

Curiosidad coherente con el punto 3: una «actualización de visitantes» en la propia ficha de Google, de hace dos años, ya avisa de la dispersión — «Conoce nuestros tratamientos en tictok como Jenny Vera Dermocosmistra, Instagram como Jenny Vera Spa, Fan-page Jenny Vera Estética Profesional &Spa». El problema lleva tiempo siendo visible para los clientes.

## B. Insights de la página, 1 sep – 2 oct

`GET /1504934889727982/insights?metric=page_post_engagements,page_views_total,page_follows,page_total_actions&period=week` (valores acumulados de 7 días terminados en cada fecha, con token de página).

| Fecha de cierre | Engagement (7 d) | Vistas de página (7 d) | Seguidores |
|---|---|---|---|
| 2 sep | 205 | 169 | 1.492 |
| 8 sep | 177 | 157 | 1.495 |
| 14 sep | 142 | 112 | 1.495 |
| **20 sep** | **18** | **18** | 1.495 |
| 26 sep | 196 | 181 | 1.500 |
| 2 oct | 203 | 128 | 1.502 |

**`page_total_actions` = 0 en los 31 días, sin una sola excepción.** Cero clics a web, cero clics a teléfono, cero acciones sobre la página en un mes entero. Es el mismo cero del 15 de septiembre, y es coherente con la verificación 1: no hay botón de web que pulsar.

### ¿Cambió algo tras el 14 de septiembre? Sí, y no es lo que esperábamos

La caída es nítida: el engagement se desploma de 142 (14 sep) a **18** (20 sep), un -87 %, y las vistas de página de 112 a 18. Pero **a partir del 20 de septiembre se recupera por completo** y vuelve a 196-226, el nivel de principios de mes. Los seguidores, congelados en 1.495 entre el 9 y el 22 de septiembre, vuelven a crecer a partir del 23 (+7 en diez días).

La explicación está en la sección F: los anuncios no siguieron apagados.

## C. Instagram — @jenny_vera_spa

Sin vínculo, así que no hay API. Datos del perfil público cargado con navegador:

| Dato | Hoy | 15 sep |
|---|---|---|
| Seguidores | **1.022** (el `og:description` dice 1.023) | 1.016 (+6) |
| Publicaciones | **588** (vía `og:description`) | 582 (+6) |
| Siguiendo | 636 (`og`: 648) | — |
| Nombre visible | Dmctra Jenny Vera | — |

Biografía completa, ya expandida (es literal y es todo):

```
🔹 Especialista en Dermocosmetica y Postoperatorio
💆‍♀️ Co2 Fraccionado /Drenajes linfáticos
🌿 Depilación láser/Masajes Relajantes,Reductores
```

Sin enlace. Sin dominio. Sin WhatsApp. La bio nombra servicios pero no ofrece ninguna vía de contacto ni dice dónde está el negocio. Hay 10 historias destacadas organizadas por servicio (Tratamientos, Depilación Láser, Drenaje linfático, Mascarillas), que es lo mejor del perfil.

**No disponible**: alcance, visitas al perfil y clics al sitio web. Requieren `instagram_business_account`, que no existe (verificación 2). La interacción por publicación tampoco es legible sin sesión.

Las 12 publicaciones visibles, por fecha: 1 oct, 29 sep (×2), 24 sep, 22 sep, 17 sep, 14 sep, 10 sep, 7 sep, 3 sep, 1 sep, y una reutilización de un reel del 30 abr. Son **las mismas fechas que Facebook**: están publicando en paralelo en las dos redes.

## D. TikTok — @jennyveraspa

| Dato | Hoy | 15 sep |
|---|---|---|
| Seguidores | **2.765** | 2.610 (**+155, +5,9 %**) |
| Likes | 14,7 K | 14,5 K |
| Vídeos | 694 | — |
| Siguiendo | 402 | — |
| Nombre | Jenny Vera Dermocosmiatra | — |
| Enlace en bio | **ninguno** | ninguno |
| Verificada | no | — |

Biografía: `Co2 Fraccionado / Tratamientos Faciales / depilacion laser / drenaje linfático`. Cuatro palabras clave sin frase, sin ciudad y sin contacto.

### Los vídeos, uno por uno

Fechas calculadas a partir del ID del vídeo (TikTok codifica el timestamp Unix en los 32 bits altos del ID); vistas leídas del DOM; estado de fijado leído de cada `[data-e2e="user-post-item"]`.

| Fecha | Vistas | Fijado | Tema | WhatsApp en la descripción |
|---|---|---|---|---|
| 24 abr | **6.088** | **sí** | Láser CO₂ fraccionado: rejuvenecimiento, secuelas de acné, manchas, poros | no |
| 16 abr | 348 | **sí** | «Piel de porcelana» | no |
| 20 sep | **1.676** | no | **NCTF**, revitalización y luminosidad | no |
| 6 sep | **987** | no | Limpieza facial profunda | **sí** |
| 5 sep | 638 | no | Drenajes linfáticos postoperatorios | no |
| 25 ago | 526 | no | Esperma de salmón | no |
| 25 sep | 228 | no | Rejuvenecimiento con CO₂ | no |
| 17 sep | 245 | no | Congreso Internacional, Colombia | no |
| 19 sep | 221 | no | Congreso Internacional de Estética, Cartagena | no |
| 8 sep | 221 | no | (sin descripción) | no |
| 17 sep | 204 | no | Despigmentante, zonas íntimas y axilas | no |
| 29 sep | 200 | no | Láser íntimo | no |
| 28 sep | 187 | no | Limpieza facial profunda | no |
| 3 oct | 175 | no | Renovación celular / despigmentante | no |
| 29 sep | 174 | no | Plasma rico en plaquetas | **sí** |
| 30 sep | **2** | no | Revitalización con exosomas | no |

**Corrijo mi propia lectura anterior.** Dije que había «dos picos recientes» de 6.088 y 1.676. El de 6.088 **está fijado y es del 24 de abril**: lleva más de cinco meses anclado en lo alto del perfil, así que sus vistas son acumulación por posición, no un pico de distribución. Los dos vídeos fijados hay que sacarlos del cálculo. Sobre los 14 no fijados, la **mediana real es 221 vistas** (mín. 2, máx. 1.676), consistente con el rango de septiembre.

Con eso, el pico orgánico real es **uno solo y es reciente**: el **NCTF del 20 de septiembre, con 1.676 vistas, 7,6 veces la mediana**, sin estar fijado y sin publicidad detrás (TikTok no recibe las campañas de Meta). Por debajo, tres vídeos claramente sobre la mediana: 987 (limpieza facial, 6 sep), 638 (drenajes postoperatorios, 5 sep) y 526 (esperma de salmón, 25 ago).

**Qué tienen en común los que funcionan.** Los cinco mejores —CO₂ fraccionado, NCTF, limpieza facial, drenajes postoperatorios, esperma de salmón— nombran **un tratamiento concreto y el resultado que da**. Los que se quedan en la mediana son de dos tipos: contenido sobre la profesional en lugar del tratamiento (los dos del Congreso Internacional, 221 y 245) o fórmulas genéricas de cuidado de la piel. El propio vídeo fijado más visto es el que mejor cumple la regla: lista cuatro problemas con nombre (secuelas de acné, manchas, poros visibles) y la tecnología que los trata.

Dos cosas más para el equipo. El vídeo de **exosomas del 30 de septiembre tiene 2 vistas**, frente a ~200 de sus vecinos del mismo día: ese número no es bajo rendimiento, es un vídeo que no se distribuyó, y conviene revisar si quedó restringido o mal publicado. Y solo **2 de 16 descripciones llevan el WhatsApp**: una de ellas es el 987, el segundo mejor no fijado.

**TikTok es la red que más crece y la única que crece por sí sola** (+155 seguidores sin un dólar de publicidad, frente a +6 en Facebook y +6 en Instagram). Es también la única cuya cadencia de publicación es diaria o casi —diez vídeos entre el 17 de septiembre y el 3 de octubre—, muy por encima de los 6 posts de Facebook en el mismo tramo.

## E. Publicaciones desde el 14 de septiembre

`GET /1504934889727982/published_posts?fields=created_time,message,permalink_url,status_type,shares`. Nota de método: añadir `likes.summary(true)` o `comments.summary(true)` hace fallar la llamada entera con `(#10) requires pages_read_engagement` / `(#283) requires pages_read_user_content`; sin esos campos, el endpoint responde. Así que tengo fechas, textos y compartidos, pero **no reacciones ni comentarios**.

**Sí siguieron publicando, sin interrupción.** Seis publicaciones desde el 14 de septiembre:

| Fecha | Tipo | Comp. | Tema |
|---|---|---|---|
| 1 oct | foto | 1 | HIFU facial + esperma de salmón, 20 % dto. por Fiestas de Cuenca |
| 30 sep | vídeo | 0 | Dermapen |
| 24 sep | foto | 0 | Acné |
| 22 sep | vídeo | 0 | Hábitos que dañan la piel |
| 17 sep | foto | 0 | Piel masculina |
| 14 sep | vídeo | **10** | Láser CO₂ fraccionado |

Antes del 14 de septiembre: 10 sep, 7 sep, 3 sep, 1 sep, 28 ago, 25 ago (×2). La cadencia es la misma a ambos lados del 14 de septiembre, cada 3-7 días, alternando foto y vídeo. **La producción de contenido no es el problema: es constante y está bien temática.**

Dos cosas que saltan a la vista. El post del 17 de septiembre sobre **piel masculina** valida por su cuenta la recomendación de línea masculina de la investigación de septiembre: ya lo están probando. Y el del 1 de octubre tira de **Fiestas de Cuenca**, un gancho local con fecha, que es exactamente el tipo de contenido que la ficha de Google podría amplificar si estuviera bien categorizada.

### ¿El engagement era orgánico o eco del anuncio?

**Eco del anuncio, y la prueba es limpia.** Publicaron con la misma cadencia durante los cinco días sin anuncios (post del 17 de septiembre, en plena pausa) y el engagement se hundió un 87 % de todas formas. Cuando el gasto volvió el 20 de septiembre, el engagement se recuperó en días sin que la cadencia cambiara. Contenido constante, engagement que sigue al dinero: **el alcance orgánico de esta página en Facebook es prácticamente nulo.**

## F. Reparto de anuncios por plataforma, 3 sep – 2 oct

> Solo lectura. Únicamente `insights get`, `campaign list` y `adaccount`. Ninguna escritura, ningún cambio de presupuesto ni de estado.

**La cuenta NO está apagada. Esto corrige el supuesto de partida.**

`meta ads insights get --breakdown publisher_platform`:

| Plataforma | Gasto | Alcance | Impresiones | Clics | Clics a enlace | Conversaciones iniciadas (7 d) |
|---|---|---|---|---|---|---|
| Facebook | 53,05 USD | 8.190 | 19.581 | 567 | 132 | **54** |
| Instagram | 18,53 USD | 3.106 | 6.144 | 104 | 35 | **17** |
| **Total** | **71,58 USD** | 11.296 | 25.725 | 671 | 167 | **71** |

El gasto diario confirma la cronología exacta:

- 3 – 14 sep: gasto todos los días, 1,84-3,87 USD/día (33,04 USD, campaña «AGOSTO 25»).
- **15 – 19 sep: sin ningún registro de gasto.** La pausa fue real, pero duró **cinco días**.
- **20 sep – 2 oct: gasto todos los días otra vez**, 2,07-3,56 USD/día (38,54 USD).

`campaign list` identifica la causa: **«ADS - CAMPAÑA - SEP 20»**, id `120249928075180335`, `effective_status: ACTIVE`, objetivo `OUTCOME_ENGAGEMENT`, presupuesto diario 3,00 USD, inicio 20 sep 10:45. Sus cifras: 38,54 USD, 6.441 de alcance, 439 clics, 106 clics a enlace y **45 conversaciones de mensajería iniciadas**. La campaña «AGOSTO 25» quedó en `PAUSED`.

Esto es la **cuarta confirmación del patrón de renovación cada ~3 semanas**: junio 19 → julio 6 → julio 21 → agosto 3 → agosto 25 → **septiembre 20**. No apagaron la cuenta: cerraron una campaña y abrieron otra, como vienen haciendo todo el año.

Dato que importa para el coste por contacto: **71 conversaciones de WhatsApp por 71,58 USD, poco más de 1 USD por conversación iniciada.** Facebook las trae algo más baratas que Instagram (0,98 frente a 1,09 USD) y con 3,2 veces el volumen.

### Qué se puede y qué no se puede medir del cierre

Los action types de la cuenta para el periodo:

| Métrica | Valor |
|---|---|
| `messaging_conversation_started_7d` | 71 |
| `messaging_first_reply` | **61** (86 % de las conversaciones) |
| `messaging_user_depth_2_message_send` | 37 |
| `messaging_user_depth_3_message_send` | 22 |
| `messaging_user_depth_5_message_send` | **35** |
| `messaging_conversation_replied_7d` | 1 |

**Ese 1 es un artefacto de la métrica, no una señal de desempeño.** Si de verdad solo una conversación hubiera recibido respuesta, no podrían existir 61 primeras respuestas ni 35 personas enviando cinco o más mensajes. En campañas de clic-a-WhatsApp, `messaging_conversation_replied_7d` no tiene visibilidad real: la conversación ocurre dentro de WhatsApp, fuera del perímetro de Meta, y la métrica queda sin poblar. Las que sí llevan señal aquí son `first_reply` y las de profundidad, y dibujan una conversación que arranca bien y se sostiene: 86 % reciben primera respuesta y la mitad de las iniciadas llegan a cinco mensajes o más.

Lo correcto que se puede afirmar: **no podemos medir desde Meta si las conversaciones acaban en cita**, porque el cierre ocurre en WhatsApp. Es una limitación de medición de este tipo de campaña, no una conclusión sobre el trabajo del equipo. Para saber la tasa de cita habría que contarlas en el lado de WhatsApp.

## G. Coherencia sitio ↔ redes

**El enlace funciona en una sola dirección.**

El sitio enlaza bien a las tres cuentas. `src/lib/constants.ts:7-9`:

```
SOCIAL_INSTAGRAM_URL = "https://www.instagram.com/jenny_vera_spa/"
SOCIAL_FACEBOOK_URL  = "https://www.facebook.com/JennyVeraSpa/"
SOCIAL_TIKTOK_URL    = "https://www.tiktok.com/@jennyveraspa"
```

Las tres coinciden exactamente con las cuentas que acabo de verificar. Alimentan el `sameAs` del schema y el footer.

En sentido contrario, el recuento queda así:

| Fuente | → sitio |
|---|---|
| Ficha de Google | **Sí** — `jennyveraspa.com` y botón a `/es/servicios` |
| Facebook | No |
| Instagram | No |
| TikTok | No |

Así que de los cuatro activos externos, solo la ficha de Google devuelve tráfico al sitio. Las tres redes —**5.289 seguidores sumados**— no envían ni uno. El único enlace externo que encontré en toda la ficha pública de Facebook es un `l.facebook.com` hacia `api.whatsapp.com/send?phone=593999152853&source=FB_Post`: el CTA de WhatsApp de un anuncio. El negocio empuja a WhatsApp, nunca al sitio.

Esto cierra el círculo con el `page_total_actions = 0` del punto B y con la nota del repositorio de que ninguna red social enlaza al sitio: el cero no es un fallo de medición, es que el enlace no existe.

---

## Hallazgos clave

- **Las tres recomendaciones del 15 de septiembre siguen sin aplicarse.** Ni enlace en las redes, ni Instagram vinculado, ni categoría de Google cambiada. Tres semanas, cero de tres.
- **La cuenta de anuncios no está apagada: la pausa duró cinco días.** El 20 de septiembre abrieron «ADS - CAMPAÑA - SEP 20», activa hoy, y gastaron 71,58 USD en el periodo. Es la cuarta confirmación del patrón de renovar campaña cada ~3 semanas, y hay que corregir el supuesto de que llevaban tres semanas sin invertir.
- **El alcance orgánico de Facebook es prácticamente nulo, y ahora está demostrado.** Publicaron con la misma cadencia durante la pausa y el engagement cayó un 87 % (142 → 18); volvió al nivel anterior en cuanto reapareció el gasto. El engagement que veníamos midiendo era eco del anuncio.
- **`page_total_actions` llevan 31 días seguidos en 0** porque no hay nada que pulsar: el campo `website` de la página está vacío. No es un problema de medición, es un campo sin rellenar.
- **La ficha de Google sí enlaza al sitio** —`jennyveraspa.com` en el bloque de contacto y el botón «Services» a `/es/servicios`— y es el único activo externo que devuelve tráfico. Corrige el informe anterior, que daba por buena la ventaja de Skin Clinic en este punto.
- **Cero reseñas nuevas en tres semanas**: las mismas 94 con 4,9, y las más recientes de hace cinco meses. La categoría sigue en «Spa de masajes», así que el diagnóstico de que la ficha pierde el paquete de mapas por categoría sigue intacto y sin tocar.
- **TikTok es la única red que crece sola: +155 seguidores (+5,9 %) sin publicidad**, frente a +6 en Facebook y +6 en Instagram. Y es la que menos atención recibe: sin enlace, con una bio de cuatro palabras y bajo un quinto nombre de marca.
- **En TikTok funciona nombrar el tratamiento y su resultado.** El pico orgánico real es el **NCTF del 20 de septiembre: 1.676 vistas, 7,6× la mediana de 221** de los vídeos no fijados. Le siguen limpieza facial (987), drenajes postoperatorios (638) y esperma de salmón (526). Los que se quedan en la mediana hablan de la profesional, no del tratamiento (los dos del Congreso Internacional, 221 y 245). El vídeo de 6.088 vistas **no** es un pico: está fijado desde el 24 de abril y acumula vistas por posición.
- **Dos avisos operativos en TikTok**: el vídeo de exosomas del 30 de septiembre tiene **2 vistas** frente a ~200 de sus vecinos —no se distribuyó, conviene revisar si quedó restringido—, y solo 2 de 16 descripciones llevan el WhatsApp.
- **La dispersión de marca empeoró a cinco nombres**, y aparece una inconsistencia nueva de NAP: Facebook sitúa el negocio a **3,7 km** de su dirección real, además de «Cuenca Urcu» y del «Always open» que contradice el horario correcto que Google ya tiene publicado.
- **El canal de pago abre conversaciones baratas y las sostiene**: 71 por 71,58 USD (~1 USD cada una), con 86 % de primeras respuestas y 35 personas llegando a cinco mensajes o más. Lo que **no** se puede medir desde Meta es si acaban en cita, porque el cierre ocurre dentro de WhatsApp: `messaging_conversation_replied_7d` queda sin poblar en campañas de clic-a-WhatsApp y su valor de 1 no debe leerse como desempeño. Para la tasa de cita hay que contar en el lado de WhatsApp.

---

### Datos que no pude obtener

| Dato | Llamada | Error exacto |
|---|---|---|
| Insights de Instagram (alcance, visitas al perfil, **clics al sitio**) | `GET /17841404443393016?fields=…` | `(#100) Unsupported get request. Object with ID '17841404443393016' does not exist, cannot be loaded due to missing permissions, or does not support this operation` (subcode 33). Causa: Instagram sin vincular (verificación 2) |
| Reacciones y comentarios por publicación | `GET /…/published_posts?fields=created_time,likes.summary(true)` | `(#10) This endpoint requires the 'pages_read_engagement' permission or the 'Page Public Content Access' feature`; con `comments.summary(true)`, `(#10) requires 'pages_read_user_content'`. Sin esos campos la llamada funciona |
| Publicaciones vía `/posts` y `/feed` | `GET /…/posts`, `GET /…/feed` | `(#10) This endpoint requires the 'pages_read_engagement' permission…`. Usar `/published_posts`, que sí responde |
| Reseñas de Facebook | `GET /…/ratings` | `(#283) Requires pages_read_user_content permission to manage the object` |
| Cuentas de Instagram vía edges | `GET /…/instagram_accounts`, `GET /…/page_backed_instagram_accounts` | `(#200) Your access token does not have pages_read_engagement permissions or your page role is not permitted to create ads for the page` (con token de sistema y con token de página) |
| Interacción por publicación de Instagram | perfil público con navegador | Instagram no renderiza los contadores sin sesión |
| Gasto diario de anuncios | `insights get --time-increment 1` | `Invalid value for '--time-increment': '1' is not one of 'daily', 'weekly', 'monthly', 'all_days'`. Con `daily` funciona |
| Categorías secundarias de la ficha de Google | ficha pública en Maps | Solo se expone la categoría principal («Massage spa»). Las secundarias, si existen, solo se ven en la consola del negocio |
| **Si las conversaciones acaban en cita** | `insights get --fields actions` | Sin error: la métrica `messaging_conversation_replied_7d` responde, pero devuelve 1 frente a 61 `messaging_first_reply`. No está poblada en campañas de clic-a-WhatsApp porque el cierre ocurre fuera del perímetro de Meta. Hay que contarlo en el lado de WhatsApp |
| Interacción de los vídeos de TikTok (likes, comentarios por vídeo) | perfil público con navegador | El perfil solo expone las vistas (`[data-e2e="video-views"]`); el resto exige abrir cada vídeo con sesión |

Artefactos en `/tmp/claude-1000/-home-mateo-Desktop-Github-jennyveraspa/4745c7d1-6a8b-483a-a5a5-7f887af2843b/scratchpad/social-oct/`: `fb-page.json`, `fb-website.json`, `fb-page-pt.json`, `fb-insights.json`, `fb-published.json`, `me-accounts.json`, `debug-token.json`, `ig-direct.json`, `ads-platform.json`, `ads-daily.json`, `campaigns.json`, `ig.html`, `tt.html`.

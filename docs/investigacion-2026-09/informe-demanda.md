# Demanda de búsqueda no atendida — jennyveraspa.com

Fuente: Google Search Console, propiedad `sc-domain:jennyveraspa.com`, tipo web, `dataState=final`.
Ventanas: **16 meses** (2025-05-15 → 2026-09-13), **90 días recientes** (2026-06-16 → 2026-09-13) y **90 días anteriores** (2026-03-18 → 2026-06-15) para la tendencia.
Generado el 2026-09-15. Scripts y JSON crudos en este mismo directorio (`fetch.py`, `topics.py`, `analyze.py`, `qc_*.json`, `qp_*.json`).

## 0. Lo que hay que saber antes de leer las cifras

- **Volumen total con consulta visible (16 m):** 113 816 impresiones, 936 clics, 6 423 consultas distintas. A nivel de página GSC reporta 219 454 impresiones y 3 813 clics en el mismo periodo: **solo el 52 % de las impresiones y el 25 % de los clics tienen consulta visible**. El resto son consultas anonimizadas (marca, personas). Todo lo que sigue habla de esa mitad visible.
- **Sesgo estructural del método:** GSC solo enseña demanda de temas para los que ya rankeamos algo. Un tema con contenido flojo aparece con 50 impresiones; un tema **sin ningún contenido aparece con cero**, aunque tenga demanda real. Ejemplo: «botox» suma 2 101 impresiones porque hay página y blogs; «ácido hialurónico / rellenos» suma 59 porque no hay nada. Por tanto, esta lista sirve para **priorizar entre temas que Google ya nos asocia**, no para descartar temas ausentes (para esos haría falta Keyword Planner o Ahrefs, cuyo plan no cubre la API).
- **Ventana de 16 m mezcla dos sitios.** Hasta abril de 2026 las URLs eran planas (`jennyveraspa.com/masajes-relajantes-en-cuenca-ecuador`); las páginas `/es/servicios/*` solo tienen datos desde el **2026-07-07**. Por eso la tabla F (CTR por página de servicio) cubre en la práctica 10 semanas.
- **Las impresiones mensuales van en subida:** ~10 000/mes entre jun-2025 y abr-2026, 14 567 en may-2026, 17 851 en jun, 20 615 en jul y 23 308 en ago-2026. Las tendencias «90 d vs 90 d anteriores» hay que leerlas contra ese +40 % de fondo: un tema que crece menos del 40 % en realidad pierde cuota.
- **Reparto geográfico (impresiones 16 m):** Ecuador 39 461 (35 %), España 34 922 (31 %), EE. UU. 8 405 (7 %), Reino Unido 5 718 (5 %), México 3 707, Colombia 3 073, Malasia 2 957, Australia 2 269. **Los clics son otra historia: Ecuador 836 de 936 (89 %)**. España aporta el 31 % de las impresiones y 27 clics. Lo que rankea fuera de Ecuador son blogs informativos en posición 60-90 que no convierten.
- **Idioma:** español 91 888 impr. / 853 clics; inglés 21 868 impr. / 83 clics. Detección por vocabulario, con desempate por país; margen de error ~2-3 % en consultas de una sola palabra técnica («hifu», «prp»).

### Reparto por estado del tema (16 m)

| Estado | Impresiones | % | Clics | Temas |
|---|---:|---:|---:|---:|
| OFRECIDO (con página de servicio) | 70 710 | 62 % | 618 | 22 |
| NO OFRECIDO — cirugía, solo informativo | 27 676 | 24 % | 119 | 8 |
| NO OFRECIDO — estética no quirúrgica | 7 653 | 7 % | 66 | 39 |
| OFRECIDO SIN PÁGINA | 1 774 | 2 % | 32 | 3 |
| Genérico / local («spa cuenca», «precio») | 4 803 | 4 % | 85 | 2 |
| Marca | 918 | 1 % | 11 | 1 |
| Sin clasificar (ruido, erratas) | 282 | <1 % | 5 | — |

Lectura rápida: **el 86 % de la demanda visible ya cae en temas que ofrecemos o en cirugías que solo tratamos de forma informativa**. La demanda «no atendida» de estética no quirúrgica es el 7 % (7 653 impresiones en 16 meses, ~480/mes) y está muy fragmentada en 39 temas. No hay un servicio nuevo grande escondido en GSC; hay tres o cuatro medianos y muchos minúsculos.

## A. Diccionario de temas

El diccionario completo está en `topics.py` (83 temas, regex por orden de prioridad). Estados:

- **OFRECIDO**: tiene página en `/es/servicios/`.
- **OFRECIDO SIN PÁGINA**: está en el catálogo pero sin página de servicio — *hidratación con vitamina C / skin boosters*, *líneas de expresión*, *células madre*, *Exilis Ultra 360*. Añadí aquí el **segmento hombres**: se atiende, hay un blog (`/es/blog/spa-para-hombres-cuenca`), pero no hay página de servicio.
- **NO OFRECIDO**: estética no quirúrgica que no está en el catálogo.
- **NO OFRECIDO (cirugía, solo informativo)**: rinoplastia, lipo/abdominoplastia, blefaroplastia, otoplastia, labioplastia, lifting quirúrgico, mamoplastia, cirugía plástica genérica. El spa no opera; el valor de esta demanda es el post-operatorio.

## B. Temas NO OFRECIDOS y OFRECIDOS SIN PÁGINA (16 m, ordenados por impresiones)

| Tema | Estado | Impr. 16 m | Clics | Pos. media | Nº consultas | % ECU | % US/CA/UK | Ejemplos | Tendencia (90 d vs 90 d ant.) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| Lipo / lipoescultura / abdominoplastia (cirugía) | NO OFRECIDO (cirugía, solo informativo) | 13107 | 112 | 18.0 | 465 | 72 % | 8 % | «lipoescultura 360 precio ecuador» (1582); «abdominoplastia precio ecuador» (1062); «cuanto cuesta una abdominoplastia en ecuador» (795) | 2257 vs 681 (+231 %) |
| Rinoplastia / tipos de nariz | NO OFRECIDO (cirugía, solo informativo) | 10939 | 2 | 82.4 | 183 | 4 % | 18 % | «tipos de nariz» (2697); «formas de nariz» (1662); «tipo de nariz» (1358) | 1217 vs 1170 (+4 %) |
| Lipo sin cirugía / grasa localizada | NO OFRECIDO | 5467 | 0 | 83.9 | 176 | 0 % | 5 % | «liposuccion sin cirugia» (874); «lipo sin cirugia» (603); «liposucción sin cirugía» (400) | 2851 vs 2109 (+35 %) |
| Blefaroplastia / párpados | NO OFRECIDO (cirugía, solo informativo) | 1804 | 3 | 13.3 | 163 | 90 % | 3 % | «blefaroplastia» (412); «blefaroplastia precio» (303); «blefaroplastia valor» (145) | 459 vs 29 (+1483 %) |
| Lifting facial quirúrgico | NO OFRECIDO (cirugía, solo informativo) | 994 | 0 | 85.9 | 29 | 0 % | 4 % | «cirugía lifting facial» (484); «operacion lifting facial» (164); «lifting facial postoperatorio» (150) | 508 vs 486 (+5 %) |
| Skin boosters / hidratación profunda (sin página propia) | OFRECIDO SIN PÁGINA | 915 | 0 | 79.8 | 29 | 38 % | 7 % | «hidratación facial profunda» (148); «hidratación profunda» (142); «hidratación facial» (116) | 461 vs 278 (+66 %) |
| Segmento hombres (spa/masajes para hombres — se atiende, sin página) | OFRECIDO SIN PÁGINA | 848 | 32 | 8.3 | 53 | 96 % | 2 % | «masajes para hombres en cuenca» (364); «spa para hombres cuenca» (341); «masajes para hombres» (25) | 115 vs 53 (+117 %) |
| Masaje tántrico / erótico (NO ofrecido) | NO OFRECIDO | 675 | 53 | 10.4 | 22 | 93 % | 3 % | «masajes tantricos cuenca» (300); «masaje tantrico cuenca» (291); «masajes eróticos cuenca» (22) | 64 vs 30 (+113 %) |
| Cirugía plástica genérica | NO OFRECIDO (cirugía, solo informativo) | 661 | 1 | 63.0 | 57 | 34 % | 9 % | «tratamientos de cirugía facial» (125); «cirugía plástica guayaquil» (110); «cirugía estética procedimientos adecuados» (88) | 164 vs 159 (+3 %) |
| Celulitis | NO OFRECIDO | 253 | 0 | 76.5 | 26 | 5 % | 5 % | «ejemplos de tratamientos corporales anticeluliticos spa» (68); «tratamientos corporales para celulitis» (68); «crioterapia celulitis» (28) | 113 vs 129 (-12 %) |
| Uñas / manicura / pedicura | NO OFRECIDO | 201 | 1 | 7.6 | 51 | 100 % | 0 % | «uñas cuenca» (63); «uñas» (21); «uñas en cuenca» (15) | 12 vs 6 (+100 %) |
| Deep tissue / descontracturante / deportivo | NO OFRECIDO | 187 | 2 | 20.1 | 31 | 68 % | 1 % | «masaje terapéutico cuenca» (58); «masajes descontracturantes» (38); «masaje descontracturante» (19) | 37 vs 27 (+37 %) |
| Otoplastia | NO OFRECIDO (cirugía, solo informativo) | 124 | 0 | 50.2 | 17 | 86 % | 9 % | «otoplastia precio» (39); «otoplastia precio ecuador» (37); «otoplastia» (14) | 8 vs 6 (+33 %) |
| Skin care / cuidado de piel genérico | NO OFRECIDO | 97 | 0 | 34.7 | 32 | 55 % | 15 % | «skin care» (33); «co2 laser before and after wrinkles» (14); «tratamientos estéticos para todo tipo de piel» (6) | 49 vs 24 (+104 %) |
| Masaje en pareja / couples | NO OFRECIDO | 84 | 1 | 3.6 | 28 | 86 % | 8 % | «spa para parejas» (28); «masajes en pareja» (13); «masaje en pareja» (5) | 14 vs 7 (+100 %) |
| Parafina | NO OFRECIDO | 76 | 0 | 25.6 | 25 | 64 % | 9 % | «parafina» (20); «parafina estetica» (10); «tratamiento parafina» (7) | 0 vs 18 (-100 %) |
| Depilación con cera / electrólisis (no láser) | NO OFRECIDO | 67 | 2 | 17.8 | 30 | 81 % | 1 % | «depilacion cera cuenca» (13); «depilación (con cera y láser)» (10); «brazilian wax near me» (6) | 26 vs 12 (+117 %) |
| Maderoterapia | NO OFRECIDO | 63 | 2 | 5.0 | 7 | 98 % | 0 % | «maderoterapia cuenca» (34); «maderoterapia» (22); «madero terapia» (3) | 21 vs 28 (-25 %) |
| Rellenos / ácido hialurónico / labios | NO OFRECIDO | 59 | 1 | 24.7 | 22 | 69 % | 3 % | «rellenos con prp» (10); «lip filler» (8); «lifting facial con acido hialuronico» (6) | 18 vs 17 (+6 %) |
| Radiofrecuencia / Indiba / reafirmante corporal | NO OFRECIDO | 55 | 1 | 36.8 | 17 | 58 % | 7 % | «mejores tratamientos corporales reafirmantes» (17); «radiofrecuencia» (9); «radiofrecuencia corporal» (6) | 11 vs 30 (-63 %) |
| Hidrafacial / hydrafacial | NO OFRECIDO | 47 | 0 | 6.9 | 6 | 100 % | 0 % | «hydrafacial» (24); «hidrafacial» (19); «hydra facial» (1) | 7 vs 11 (-36 %) |
| Estrías | NO OFRECIDO | 45 | 0 | 54.7 | 7 | 2 % | 0 % | «laser co2 estrias antes y despues» (27); «láser co2 estrías antes y después» (12); «co2 fraccionado estrias» (2) | 31 vs 13 (+138 %) |
| Labioplastia | NO OFRECIDO (cirugía, solo informativo) | 43 | 1 | 10.8 | 1 | 95 % | 5 % | «labioplastia cuenca ecuador» (43) | 0 vs 2 (-100 %) |
| Spa de pies / reflexología | NO OFRECIDO | 43 | 0 | 30.5 | 21 | 49 % | 5 % | «reflexología podal cuenca» (16); «foot massage near me» (3); «spa de manos y pies» (3) | 14 vs 5 (+180 %) |
| Day spa / paquetes / regalo | NO OFRECIDO | 43 | 0 | 7.9 | 8 | 95 % | 0 % | «day spa» (13); «day spa massages» (11); «day spa near me» (10) | 19 vs 13 (+46 %) |
| Ultraformer (marca HIFU) info | NO OFRECIDO | 36 | 0 | 73.9 | 9 | 8 % | 6 % | «ultraformer mpt contraindicaciones» (21); «ultraformer 3 side effects» (4); «ultraformer risks» (4) | 27 vs 7 (+286 %) |
| Cejas (laminado, diseño, depilación de cejas) | NO OFRECIDO | 27 | 0 | 7.7 | 12 | 96 % | 0 % | «cejas cuenca» (7); «eyebrow waxing near me» (5); «microblading eyebrows near me» (3) | 11 vs 9 (+22 %) |
| Sauna / jacuzzi / hidromasaje / baños | NO OFRECIDO | 21 | 0 | 11.0 | 8 | 100 % | 0 % | «sauna y masaje» (8); «sauna near me» (5); «balnearios en cuenca» (2) | 1 vs 2 (-50 %) |
| Dermaplaning / microdermoabrasión | NO OFRECIDO | 15 | 0 | 21.3 | 5 | 80 % | 0 % | «dermaplaning» (4); «dermaplane» (3); «microdermabrasion» (3) | 7 vs 4 (+75 %) |
| Capilar: PRP / mesoterapia / alopecia / caída de pelo | NO OFRECIDO | 13 | 0 | 8.5 | 7 | 92 % | 0 % | «masajes capilares» (3); «spa capilar cuenca» (3); «prp hair treatment» (2) | 4 vs 4 (+0 %) |
| Líneas de expresión (catálogo corporal, sin página) | OFRECIDO SIN PÁGINA | 11 | 0 | 5.5 | 7 | 9 % | 0 % | «lineas de expresion en la cara» (3); «líneas de expresión» (3); «cuales son las lineas de expresion» (1) | 0 vs 1 (-100 %) |
| Pestañas / lash lift / extensiones | NO OFRECIDO | 10 | 1 | 7.4 | 7 | 100 % | 0 % | «where can i get my eyelashes done near me» (3); «lash lift near me» (2); «semi permanent eyelashes near me» (1) | 1 vs 3 (-67 %) |
| Nutrición / bajar de peso / Ozempic | NO OFRECIDO | 9 | 0 | 86.8 | 2 | 0 % | 0 % | «tratamientos corporales adelgazantes» (8); «hifu weight loss reviews» (1) | 4 vs 4 (+0 %) |
| Melasma (específico) | NO OFRECIDO | 8 | 0 | 9.1 | 1 | 100 % | 0 % | «melasma facial» (8) | 1 vs 4 (-75 %) |
| Verrugas / fibromas / acrocordones | NO OFRECIDO | 7 | 0 | 74.9 | 2 | 0 % | 0 % | «lunar verrugas tipos» (5); «tipos de lunares y verrugas» (2) | 5 vs 2 (+150 %) |
| Eliminación de tatuajes | NO OFRECIDO | 7 | 0 | 5.6 | 1 | 100 % | 0 % | «tattoo removal near me» (7) | 0 vs 7 (-100 %) |
| Enzimas / lipopapada (inyectables) | NO OFRECIDO | 6 | 0 | 4.3 | 5 | 33 % | 0 % | «papada» (2); «cara y papada» (1); «elimina papada» (1) | 6 vs 0 (nuevo) |
| Carboxiterapia | NO OFRECIDO | 6 | 0 | 7.7 | 3 | 100 % | 0 % | «carboxiterapia» (4); «carboxiterapia corporal» (1); «carboxiterapia facial» (1) | 1 vs 1 (+0 %) |
| Bioestimuladores (Sculptra, Radiesse) / fibroblast | NO OFRECIDO | 5 | 1 | 5.8 | 4 | 100 % | 0 % | «sculptra» (2); «fibroblast treatment near me» (1); «bioestimulador facial» (1) | — |
| Luz roja / LED / fototerapia | NO OFRECIDO | 5 | 0 | 34.6 | 3 | 60 % | 0 % | «red light therapy near me» (3); «dermapen fototerapia por sesiones» (1); «red light therapy on moles» (1) | 1 vs 1 (+0 %) |
| Cámara de bronceado / bronceado | NO OFRECIDO | 4 | 0 | 6.5 | 3 | 100 % | 0 % | «camara de bronceado cerca de mi» (2); «camaras de bronceado cerca de mi» (1); «spray tan near me» (1) | 2 vs 1 (+100 %) |
| Mamoplastia / senos | NO OFRECIDO (cirugía, solo informativo) | 4 | 0 | 17.0 | 4 | 75 % | 25 % | «cuanto cuesta una cirugia de senos en ecuador» (1); «mastopexia precio» (1); «mejores clinicas para operacion de pecho» (1) | 2 vs 1 (+100 %) |
| Peeling químico / Hollywood peel (carbón = ofrecido) | NO OFRECIDO | 3 | 1 | 6.3 | 3 | 100 % | 0 % | «chemical peel near me» (1); «chemical peeling near me» (1); «tca peel near me» (1) | 1 vs 0 (nuevo) |
| Criolipólisis / crioterapia | NO OFRECIDO | 2 | 0 | 5.0 | 1 | 100 % | 0 % | «coolsculpting» (2) | 1 vs 1 (+0 %) |
| Piedras calientes / hot stone | NO OFRECIDO | 2 | 0 | 6.0 | 1 | 100 % | 0 % | «hot stone massage near me» (2) | — |
| Facial de novia / eventos | NO OFRECIDO | 1 | 0 | 7.0 | 1 | 100 % | 0 % | «baño de novia spa» (1) | 1 vs 0 (nuevo) |
| Cavitación / ultracavitación | NO OFRECIDO | 1 | 0 | 6.0 | 1 | 100 % | 0 % | «cavitacion» (1) | — |
| Rosácea / rojeces | NO OFRECIDO | 1 | 0 | 83.0 | 1 | 0 % | 0 % | «microneedling couperose» (1) | 1 vs 0 (nuevo) |
| Hilos tensores | NO OFRECIDO | 1 | 0 | 2.0 | 1 | 100 % | 0 % | «pdo threads near me» (1) | — |
| Presoterapia | NO OFRECIDO | 1 | 0 | 6.0 | 1 | 100 % | 0 % | «presoterapia» (1) | — |

### Lectura de la tabla B

1. **Cirugías (27 676 impr.)** — lipo/abdominoplastia (13 090 impr., 112 clics, 72 % Ecuador, +232 % en 90 d) y blefaroplastia (1 804 impr., 90 % Ecuador, posición 13, prácticamente nueva: 459 vs 29) son los dos bloques con intención de compra local real. Los blogs de precio ya los capturan (`/es/blog/lipoescultura-360-ecuador-precios`, `/es/blog/cuanto-cuesta-abdominoplastia-ecuador`, `/es/blog/blefaroplastia-precio-ecuador`). Rinoplastia/«tipos de nariz» (10 939 impr.) es puro informativo: 4 % Ecuador, posición 82, 2 clics en 16 meses. No vale nada comercialmente.
2. **Lipo sin cirugía / grasa localizada (5 467 impr., 0 clics)** — 70 % viene de **España** (3 806), luego Colombia (745); Ecuador: 0. Es el blog `lipoescultura-sin-cirugia-…` rankeando en posición 84 en mercados que no nos sirven. No hay ninguna consulta local del tipo «grasa localizada cuenca». Aun así es la única señal de que existe apetito por *reducción de grasa sin cirugía*, que es lo que hacen HIFU 360 y Exilis (este último sin página).
3. **Segmento hombres (848 impr., 32 clics, posición 8,3, 96 % Ecuador, +117 % en 90 d)** — la demanda mejor posicionada de toda la tabla. «masajes para hombres en cuenca» (364) y «spa para hombres cuenca» (341). En los últimos 90 d el blog `/es/blog/spa-para-hombres-cuenca` hizo **52 clics con 426 impresiones (CTR 12 %, pos. 6,8)**: es la cuarta página del sitio por clics.
4. **Hidratación facial profunda / skin boosters (852 impr., 0 clics, pos. 80, 41 % Ecuador, +60 %)** — está en el catálogo, hay dos blogs (`hidrataciones-faciales-profundas`, `hidratacion-profunda-piel-skin-boosters`) pero ninguna página de servicio. Es el tema «ofrecido sin página» con más volumen.
5. **Masaje tántrico / erótico (675 impr., 53 clics, pos. 10)** — demanda que **no se debe atender**, pero que hoy nos manda 53 clics a la página de masajes relajantes (5,7 % de todos los clics con consulta visible). Son visitas que rebotan y que pueden dañar la percepción de la ficha. Vale la pena dejar claro en la página de masajes que son masajes terapéuticos profesionales.
6. **Resto de no ofrecidos**: celulitis 253 (5 % ECU), uñas 201 (100 % ECU), descontracturante/deep tissue 187 (68 % ECU), otoplastia 124, parafina 76, cera 67, maderoterapia 63 (98 % ECU, pos. 5), rellenos 59, radiofrecuencia 55, hidrafacial 47, estrías 45, reflexología 43, day spa 43, pareja 84, cejas 27, pestañas 10, capilar 13, tatuajes 7, hilos 1, criolipólisis 2, cavitación 1, presoterapia 1. **Ningún tema de estética no quirúrgica no ofrecido supera las 260 impresiones en 16 meses.** Insisto por honestidad: 63 impresiones en 16 meses son 4 al mes.

### Temas OFRECIDOS, para comparar el orden de magnitud

| Tema | Estado | Impr. 16 m | Clics | Pos. media | Nº consultas | % ECU | % US/CA/UK | Ejemplos | Tendencia (90 d vs 90 d ant.) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| Masajes relajantes / masajes genérico | OFRECIDO | 16554 | 462 | 12.3 | 572 | 81 % | 4 % | «best massage near me» (3501); «masajes cuenca» (3079); «masajes en cuenca» (1253) | 4053 vs 2912 (+39 %) |
| HIFU facial / corporal / lifting sin cirugía | OFRECIDO | 13478 | 6 | 63.4 | 603 | 3 % | 22 % | «hifu facial» (1725); «hifu before and after» (1062); «lifting facial» (506) | 8514 vs 4550 (+87 %) |
| Láser CO2 fraccionado / cicatrices | OFRECIDO | 9955 | 0 | 75.3 | 555 | 2 % | 28 % | «co2 laser before and after» (794); «laser co2» (707); «laser co2 fraccionado» (482) | 6718 vs 3228 (+108 %) |
| PRP / plasma rico en plaquetas | OFRECIDO | 6883 | 0 | 85.7 | 345 | 2 % | 6 % | «plasma rico en plaquetas» (1193); «prp facial» (775); «plasma rejuvenecimiento facial» (532) | 3699 vs 3115 (+19 %) |
| Spa / centro estético / salón (genérico o local) | GENÉRICO / LOCAL | 4518 | 76 | 11.3 | 393 | 83 % | 8 % | «spa cuenca» (1104); «spa» (455); «spa en cuenca» (366) | 669 vs 728 (-8 %) |
| Eliminación de lunares | OFRECIDO | 3655 | 0 | 76.4 | 413 | 1 % | 35 % | «types of moles on face» (185); «types of moles» (168); «types of skin moles» (164) | 2121 vs 1534 (+38 %) |
| Limpieza facial | OFRECIDO | 2934 | 91 | 23.4 | 259 | 79 % | 2 % | «limpieza facial cuenca» (814); «limpieza facial» (351); «limpieza facial profunda» (294) | 654 vs 693 (-6 %) |
| Peeling de carbón activo / Hollywood peel | OFRECIDO | 2782 | 0 | 76.9 | 123 | 2 % | 32 % | «hollywood peeling» (399); «peeling carbón activo antes y después» (342); «peeling carbon activo» (297) | 1584 vs 1157 (+37 %) |
| Masajes reductores / tratamientos corporales | OFRECIDO | 2504 | 6 | 67.3 | 90 | 10 % | 22 % | «masajes corporales» (1144); «masajes corporal» (222); «masaje corporal» (152) | 122 vs 352 (-65 %) |
| Botox / toxina botulínica | OFRECIDO | 2101 | 17 | 32.8 | 216 | 52 % | 8 % | «mitos en torno a la aplicación del botox» (468); «botox antes y despues» (264); «botox» (95) | 886 vs 310 (+186 %) |
| Acné / piel grasa | OFRECIDO | 1783 | 2 | 36.8 | 66 | 5 % | 9 % | «facial para piel grasa» (207); «tratamiento facial para piel grasa» (202); «tratamiento para la cara grasosa» (166) | 264 vs 141 (+87 %) |
| Depilación láser | OFRECIDO | 1732 | 24 | 28.8 | 136 | 68 % | 3 % | «depilacion laser cuenca» (798); «depilacion cuenca» (118); «depilación láser definitiva» (106) | 438 vs 249 (+76 %) |
| Manchas / hiperpigmentación facial | OFRECIDO | 1702 | 0 | 88.3 | 95 | 9 % | 5 % | «eliminación de manchas» (151); «tratamiento para quitar manchas en la cara» (140); «tratamientos manchas» (139) | 1396 vs 300 (+365 %) |
| Microneedling / dermapen | OFRECIDO | 1489 | 1 | 79.7 | 71 | 6 % | 1 % | «microneedling» (1010); «microneedling cara» (105); «dermapen» (57) | 1012 vs 458 (+121 %) |
| Drenaje linfático / post-operatorio | OFRECIDO | 1067 | 0 | 35.1 | 110 | 51 % | 18 % | «drenaje linfatico post operatorio» (221); «aesthetic treatments for post procedure recovery» (91); «drenajes linfaticos post operatorio» (75) | 339 vs 228 (+49 %) |
| Marca (Jenny Vera) | MARCA | 918 | 11 | 5.1 | 55 | 51 % | 10 % | «jenny vera» (428); «jenny» (178); «jenny 15 dedos cuenca» (98) | 145 vs 220 (-34 %) |
| Láser genérico (tratamiento láser, láser en el rostro) | OFRECIDO | 571 | 2 | 55.5 | 71 | 21 % | 7 % | «laser cuenca» (148); «laser en el rostro antes y despues» (134); «tratamientos con laser» (45) | 248 vs 167 (+49 %) |
| Despigmentación axilas | OFRECIDO | 519 | 0 | 66.2 | 122 | 11 % | 35 % | «despigmentacion de axilas» (70); «axilas oscuras» (43); «underarms pigmentation treatment» (31) | 221 vs 246 (-10 %) |
| Exosomas | OFRECIDO | 497 | 0 | 85.4 | 30 | 0 % | 20 % | «exosome skin rejuvenation» (240); «regenerative aesthetics exosomes» (50); «how do exosomes enhance skin rejuvenation therapy» (37) | 405 vs 91 (+345 %) |
| Despigmentación íntima / entrepierna | OFRECIDO | 309 | 1 | 68.8 | 67 | 2 % | 33 % | «discromatia» (33); «despigmentar zona intima» (26); «depigmentarea pielii in zona genitala» (25) | 140 vs 149 (-6 %) |
| Precio genérico / geo suelto | GENÉRICO / LOCAL | 285 | 9 | 11.8 | 133 | 82 % | 4 % | «si» (22); «cuenca» (16); «sage en cuenca» (14) | 225 vs 16 (+1306 %) |
| Microblading | OFRECIDO | 124 | 6 | 5.0 | 7 | 96 % | 2 % | «microblading cuenca» (61); «microblading» (29); «microblading near me» (26) | 30 vs 24 (+25 %) |
| PDRN de salmón | OFRECIDO | 25 | 0 | 35.4 | 12 | 12 % | 44 % | «pdrn de salmon» (8); «pdrn salmon» (4); «pdr de salmon» (3) | 4 vs 20 (-80 %) |
| Ojeras | OFRECIDO | 23 | 0 | 7.8 | 12 | 100 % | 0 % | «operación para quitar ojeras precio» (5); «cirugía de ojeras precio» (3); «cuánto cuesta una operación de ojeras» (3) | 3 vs 2 (+50 %) |
| Mesoterapia facial | OFRECIDO | 23 | 0 | 4.5 | 5 | 100 % | 0 % | «mesoterapia corporal» (10); «mesoterapia» (7); «mesoterapia facial precios» (3) | 5 vs 5 (+0 %) |

## C. Cortes por idioma y por intención local explícita

### C.1 Consultas en inglés — NO OFRECIDOS y SIN PÁGINA

| Tema | Estado | Impr. 16 m | Clics | Pos. media | Nº consultas | % ECU | % US/CA/UK | Ejemplos | Tendencia (90 d vs 90 d ant.) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| Skin boosters / hidratación profunda (sin página propia) | OFRECIDO SIN PÁGINA | 85 | 0 | 55.9 | 8 | 6 % | 18 % | «deep skin hydration treatment» (31); «advanced skin hydration treatments» (23); «advanced skin hydration treatment» (11) | 62 vs 21 (+195 %) |
| Lipo / lipoescultura / abdominoplastia (cirugía) | NO OFRECIDO (cirugía, solo informativo) | 74 | 0 | 33.3 | 14 | 1 % | 96 % | «lipoescultura 360» (18); «abdominoplastia ecuador guayaquil» (9); «lipoescultura ecuador guayaquil» (9) | 4 vs 3 (+33 %) |
| Skin care / cuidado de piel genérico | NO OFRECIDO | 66 | 0 | 26.9 | 15 | 61 % | 20 % | «skin care» (33); «co2 laser before and after wrinkles» (14); «co2 laser before and after forehead wrinkles» (2) | 29 vs 17 (+71 %) |
| Rinoplastia / tipos de nariz | NO OFRECIDO (cirugía, solo informativo) | 57 | 0 | 64.8 | 13 | 5 % | 77 % | «rinoplastia ecuador» (22); «nariz forma» (5); «nariz formas» (5) | 8 vs 9 (-11 %) |
| Rellenos / ácido hialurónico / labios | NO OFRECIDO | 35 | 1 | 8.7 | 14 | 94 % | 3 % | «lip filler» (8); «lip filler near me» (5); «hyaluron filler» (3) | 8 vs 5 (+60 %) |
| Day spa / paquetes / regalo | NO OFRECIDO | 34 | 0 | 5.7 | 3 | 100 % | 0 % | «day spa» (13); «day spa massages» (11); «day spa near me» (10) | 15 vs 13 (+15 %) |
| Uñas / manicura / pedicura | NO OFRECIDO | 30 | 0 | 6.0 | 16 | 100 % | 0 % | «red nails» (6); «pedicure near me» (5); «hair skin nails» (3) | 6 vs 5 (+20 %) |
| Segmento hombres (spa/masajes para hombres — se atiende, sin página) | OFRECIDO SIN PÁGINA | 28 | 0 | 18.5 | 16 | 79 % | 0 % | «male massage therapist near me» (4); «men's spa near me» (3); «c02 laser before and after men» (2) | 13 vs 0 (nuevo) |
| Depilación con cera / electrólisis (no láser) | NO OFRECIDO | 27 | 1 | 6.0 | 17 | 96 % | 4 % | «brazilian wax near me» (6); «electrolysis hair removal» (4); «full body wax near me» (2) | 4 vs 7 (-43 %) |
| Deep tissue / descontracturante / deportivo | NO OFRECIDO | 21 | 0 | 6.2 | 6 | 100 % | 0 % | «deep tissue massage near me» (14); «deep tissue massage» (2); «masajes terapeuticos near me» (2) | 8 vs 2 (+300 %) |
| Cejas (laminado, diseño, depilación de cejas) | NO OFRECIDO | 16 | 0 | 5.8 | 8 | 100 % | 0 % | «eyebrow waxing near me» (5); «microblading eyebrows near me» (3); «eyebrow threading near me open now» (2) | 3 vs 8 (-62 %) |
| Radiofrecuencia / Indiba / reafirmante corporal | NO OFRECIDO | 9 | 1 | 36.8 | 7 | 33 % | 44 % | «hifu skin tightening before and after» (2); «hifu skin tightening side effects» (2); «non-invasive skin tightening» (1) | 3 vs 3 (+0 %) |
| Ultraformer (marca HIFU) info | NO OFRECIDO | 9 | 0 | 73.3 | 3 | 0 % | 22 % | «ultraformer 3 side effects» (4); «ultraformer risks» (4); «ultraformer side effects» (1) | 4 vs 5 (-20 %) |
| Pestañas / lash lift / extensiones | NO OFRECIDO | 8 | 1 | 6.8 | 5 | 100 % | 0 % | «where can i get my eyelashes done near me» (3); «lash lift near me» (2); «semi permanent eyelashes near me» (1) | 0 vs 3 (-100 %) |
| Celulitis | NO OFRECIDO | 8 | 0 | 15.5 | 5 | 75 % | 25 % | «cellulite treatment» (3); «cellulite treatment near me» (2); «anticelulitis massage oil» (1) | 2 vs 4 (-50 %) |
| Blefaroplastia / párpados | NO OFRECIDO (cirugía, solo informativo) | 8 | 0 | 58.5 | 3 | 0 % | 100 % | «blefaroplastia quito» (6); «blefaroplastia guayaquil» (1); «blefaroplastia zaragoza» (1) | 0 vs 1 (-100 %) |
| Eliminación de tatuajes | NO OFRECIDO | 7 | 0 | 5.6 | 1 | 100 % | 0 % | «tattoo removal near me» (7) | 0 vs 7 (-100 %) |
| Otoplastia | NO OFRECIDO (cirugía, solo informativo) | 5 | 0 | 25.6 | 2 | 0 % | 100 % | «orejas ecuador» (3); «otoplastia ecuador» (2) | 1 vs 2 (-50 %) |
| Sauna / jacuzzi / hidromasaje / baños | NO OFRECIDO | 5 | 0 | 10.6 | 1 | 100 % | 0 % | «sauna near me» (5) | 1 vs 1 (+0 %) |
| Masaje en pareja / couples | NO OFRECIDO | 4 | 0 | 3.0 | 3 | 100 % | 0 % | «couples massage near me» (2); «best couple massage» (1); «couples massage spa» (1) | — |
| Luz roja / LED / fototerapia | NO OFRECIDO | 4 | 0 | 20.0 | 2 | 75 % | 0 % | «red light therapy near me» (3); «red light therapy on moles» (1) | 1 vs 0 (nuevo) |
| Peeling químico / Hollywood peel (carbón = ofrecido) | NO OFRECIDO | 3 | 1 | 6.3 | 3 | 100 % | 0 % | «chemical peel near me» (1); «chemical peeling near me» (1); «tca peel near me» (1) | 1 vs 0 (nuevo) |
| Spa de pies / reflexología | NO OFRECIDO | 3 | 0 | 11.3 | 1 | 100 % | 0 % | «foot massage near me» (3) | 1 vs 2 (-50 %) |
| Bioestimuladores (Sculptra, Radiesse) / fibroblast | NO OFRECIDO | 2 | 1 | 3.0 | 2 | 100 % | 0 % | «fibroblast treatment near me» (1); «sculptra near me» (1) | — |
| Piedras calientes / hot stone | NO OFRECIDO | 2 | 0 | 6.0 | 1 | 100 % | 0 % | «hot stone massage near me» (2) | — |
| Labioplastia | NO OFRECIDO (cirugía, solo informativo) | 2 | 0 | 6.0 | 1 | 0 % | 100 % | «labioplastia cuenca ecuador» (2) | — |
| Capilar: PRP / mesoterapia / alopecia / caída de pelo | NO OFRECIDO | 2 | 0 | 3.0 | 1 | 100 % | 0 % | «prp hair treatment» (2) | 2 vs 0 (nuevo) |
| Maderoterapia | NO OFRECIDO | 1 | 1 | 5.0 | 1 | 100 % | 0 % | «maderoterapia near me» (1) | — |
| Cirugía plástica genérica | NO OFRECIDO (cirugía, solo informativo) | 1 | 0 | 65.0 | 1 | 0 % | 100 % | «cirugias plasticas» (1) | — |
| Estrías | NO OFRECIDO | 1 | 0 | 57.0 | 1 | 0 % | 0 % | «co2 laser for stretch marks before and after» (1) | 1 vs 0 (nuevo) |
| Lipo sin cirugía / grasa localizada | NO OFRECIDO | 1 | 0 | 33.0 | 1 | 0 % | 0 % | «hifu fat reduction before and after» (1) | 1 vs 0 (nuevo) |
| Hidrafacial / hydrafacial | NO OFRECIDO | 1 | 0 | 7.0 | 1 | 100 % | 0 % | «hydrafacial near me» (1) | — |
| Hilos tensores | NO OFRECIDO | 1 | 0 | 2.0 | 1 | 100 % | 0 % | «pdo threads near me» (1) | — |
| Cámara de bronceado / bronceado | NO OFRECIDO | 1 | 0 | 1.0 | 1 | 100 % | 0 % | «spray tan near me» (1) | — |

### C.2 Consultas en inglés — OFRECIDOS

| Tema | Estado | Impr. 16 m | Clics | Pos. media | Nº consultas | % ECU | % US/CA/UK | Ejemplos | Tendencia (90 d vs 90 d ant.) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| HIFU facial / corporal / lifting sin cirugía | OFRECIDO | 6569 | 1 | 60.7 | 269 | 0 % | 40 % | «hifu before and after» (1062); «non surgical face lift hifu» (377); «hifu treatment before and after» (369) | 4502 vs 2058 (+119 %) |
| Masajes relajantes / masajes genérico | OFRECIDO | 4799 | 33 | 6.2 | 125 | 97 % | 2 % | «best massage near me» (3501); «massage cuenca» (334); «massage near me» (315) | 2407 vs 1461 (+65 %) |
| Láser CO2 fraccionado / cicatrices | OFRECIDO | 4124 | 0 | 68.3 | 282 | 3 % | 61 % | «co2 laser before and after» (794); «co2 fractional laser before and after» (422); «laser co2 before and after» (317) | 2731 vs 1387 (+97 %) |
| Eliminación de lunares | OFRECIDO | 2427 | 0 | 80.6 | 221 | 0 % | 46 % | «types of moles on face» (185); «types of moles» (168); «types of skin moles» (164) | 1471 vs 956 (+54 %) |
| Peeling de carbón activo / Hollywood peel | OFRECIDO | 982 | 0 | 82.1 | 36 | 0 % | 86 % | «hollywood peeling» (399); «hollywood peel» (153); «hollywood carbon peel» (112) | 583 vs 397 (+47 %) |
| Spa / centro estético / salón (genérico o local) | GENÉRICO / LOCAL | 579 | 11 | 10.1 | 90 | 63 % | 35 % | «spa near me» (146); «spa cuenca ecuador» (101); «spa in cuenca ecuador» (51) | 101 vs 115 (-12 %) |
| Exosomas | OFRECIDO | 475 | 0 | 85.7 | 24 | 0 % | 19 % | «exosome skin rejuvenation» (240); «regenerative aesthetics exosomes» (50); «how do exosomes enhance skin rejuvenation therapy» (37) | 389 vs 86 (+352 %) |
| Limpieza facial | OFRECIDO | 239 | 17 | 21.2 | 44 | 66 % | 13 % | «facials near me» (59); «facial for lymphatic drainage» (43); «facial near me» (39) | 58 vs 88 (-34 %) |
| Despigmentación axilas | OFRECIDO | 220 | 0 | 76.6 | 66 | 0 % | 75 % | «underarms pigmentation treatment» (31); «armpit hyperpigmentation treatment» (30); «underarm pigmentation removal» (22) | 130 vs 90 (+44 %) |
| Drenaje linfático / post-operatorio | OFRECIDO | 169 | 0 | 67.5 | 26 | 9 % | 86 % | «aesthetic treatments for post procedure recovery» (91); «drenaje postoperatorio» (27); «drenaje linfatico post operatorio» (13) | 108 vs 28 (+286 %) |
| Despigmentación íntima / entrepierna | OFRECIDO | 121 | 0 | 77.2 | 31 | 0 % | 79 % | «intimate area pigmentation» (22); «hyperpigmentation on private area» (19); «intimate depigmentation» (9) | 43 vs 78 (-45 %) |
| Botox / toxina botulínica | OFRECIDO | 105 | 5 | 13.2 | 20 | 51 % | 11 % | «botox lift face» (38); «botox near me» (28); «botox ecuador» (9) | 14 vs 14 (+0 %) |
| Depilación láser | OFRECIDO | 104 | 2 | 27.8 | 26 | 69 % | 31 % | «permanent hair removal» (35); «depilacion laser cuenca» (13); «laser hair removal near me» (10) | 36 vs 24 (+50 %) |
| Masajes reductores / tratamientos corporales | OFRECIDO | 98 | 1 | 19.3 | 25 | 70 % | 6 % | «body balance cuenca» (23); «full body massage near me» (21); «body care cuenca» (13) | 10 vs 34 (-71 %) |
| Marca (Jenny Vera) | MARCA | 95 | 1 | 9.8 | 11 | 1 % | 93 % | «jenny vera» (75); «jenny massage» (4); «jenny estetica» (3) | 1 vs 19 (-95 %) |
| Acné / piel grasa | OFRECIDO | 36 | 0 | 57.1 | 7 | 44 % | 0 % | «laser marcas de acne» (16); «acne treatment» (11); «laser marcas acne» (3) | 22 vs 10 (+120 %) |
| Láser genérico (tratamiento láser, láser en el rostro) | OFRECIDO | 36 | 0 | 54.1 | 18 | 22 % | 56 % | «co 2 laser before and after» (9); «laser cuenca» (7); «co laser before and after» (3) | 13 vs 10 (+30 %) |
| PRP / plasma rico en plaquetas | OFRECIDO | 35 | 0 | 71.2 | 11 | 20 % | 3 % | «prp face» (12); «prp for face» (4); «prp treatment» (4) | 24 vs 8 (+200 %) |
| Microblading | OFRECIDO | 29 | 3 | 4.4 | 3 | 90 % | 10 % | «microblading near me» (26); «microblading cuenca» (2); «microblading» (1) | 13 vs 8 (+62 %) |
| Microneedling / dermapen | OFRECIDO | 19 | 1 | 55.9 | 10 | 21 % | 21 % | «microneedling with dermapen» (4); «microneedling near me» (3); «dermapen treatments» (3) | 13 vs 5 (+160 %) |
| Manchas / hiperpigmentación facial | OFRECIDO | 6 | 0 | 82.3 | 6 | 0 % | 17 % | «how to lighten dark private parts dermatologist recommended» (1); «hyperpigmentation under arms» (1); «hyperpigmentation under arms treatment» (1) | 4 vs 2 (+100 %) |
| Precio genérico / geo suelto | GENÉRICO / LOCAL | 5 | 0 | 3.4 | 4 | 0 % | 100 % | «cuenca» (2); «cost in ecuador» (1); «cuenca ecuador» (1) | 4 vs 1 (+300 %) |

**Lectura del inglés.** 21 868 impresiones y 83 clics. Se dividen en dos mundos que no se tocan:

- **Informativo global (≈ 15 000 impr., ~1 clic):** HIFU (6 569, 40 % US/CA/UK, pos. 61), CO2 (4 124, 61 % anglo, pos. 68), lunares (2 427, 46 % anglo, pos. 81), Hollywood peel (982, 86 % anglo), exosomas (475, +352 %), axilas (220, 75 % anglo), íntima (121, 79 % anglo). Son los blogs EN en posición 60-85 vistos desde EE. UU., Reino Unido, Australia, Malasia. Ninguna de esas consultas lleva «cuenca» ni «ecuador». No es demanda de turismo médico; es demanda de lectura.
- **Local en inglés (5 998 impr., 75 clics):** «best massage near me» (3 501 impr., **0 clics**, 99 % Ecuador — el paquete de mapas, ya documentado), «massage cuenca» (334, 10 clics), «massage near me» (315), «massage cuenca ecuador» (201, 8 clics, 40 desde EE. UU.), «spa near me» (146), «acne scar treatment near me» (103), «facials near me» (59, 10 clics), «spa cuenca ecuador» (101, 90 desde EE. UU., 5 clics), «spa in cuenca ecuador» (51), «cuenca ecuador facial 90 min price spa» (22, EE. UU.).
- **Turismo médico medible (país US/CA/UK + «cuenca/ecuador» en la consulta):** 149 consultas, **1 684 impresiones y 44 clics en 16 meses**. Las primeras son de cirugía (lipo 360, abdominoplastia: ~430 impr.), luego masajes/spa en Cuenca (~450 impr.), «rinoplastia ecuador» 42, «botox ecuador» 9 (3 clics), «depilacion laser cuenca» 13. Es pequeño: unas 100 impresiones al mes. Los temas no ofrecidos en inglés desde fuera son cirugía (74) y nada más.
- Los no ofrecidos en inglés que sí son de Ecuador son pura long-tail local de expats: «lip filler near me» (5), «deep tissue massage near me» (14), «day spa near me» (10), «brazilian wax near me» (6), «eyebrow waxing near me» (5), «tattoo removal near me» (7), «pedicure near me» (5), «couples massage near me» (2), «hot stone massage near me» (2), «pdo threads near me» (1), «sculptra near me» (1). Todo entre 1 y 14 impresiones.

### C.3 Intención local explícita («cuenca», «ecuador», «near me», «cerca de mí») — NO OFRECIDOS y SIN PÁGINA

| Tema | Estado | Impr. 16 m | Clics | Pos. media | Nº consultas | % ECU | % US/CA/UK | Ejemplos | Tendencia (90 d vs 90 d ant.) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| Lipo / lipoescultura / abdominoplastia (cirugía) | NO OFRECIDO (cirugía, solo informativo) | 8131 | 99 | 8.1 | 73 | 82 % | 9 % | «lipoescultura 360 precio ecuador» (1582); «abdominoplastia precio ecuador» (1062); «cuanto cuesta una abdominoplastia en ecuador» (795) | 1176 vs 157 (+649 %) |
| Segmento hombres (spa/masajes para hombres — se atiende, sin página) | OFRECIDO SIN PÁGINA | 745 | 30 | 6.5 | 22 | 97 % | 1 % | «masajes para hombres en cuenca» (364); «spa para hombres cuenca» (341); «masajes cuenca para hombres» (7) | 89 vs 50 (+78 %) |
| Masaje tántrico / erótico (NO ofrecido) | NO OFRECIDO | 659 | 53 | 10.6 | 14 | 93 % | 3 % | «masajes tantricos cuenca» (300); «masaje tantrico cuenca» (291); «masajes eróticos cuenca» (22) | 63 vs 29 (+117 %) |
| Blefaroplastia / párpados | NO OFRECIDO (cirugía, solo informativo) | 247 | 0 | 13.6 | 11 | 70 % | 13 % | «blefaroplastia precio en ecuador» (81); «cuanto cuesta una blefaroplastia en ecuador» (54); «blefaroplastia precio ecuador» (47) | 103 vs 0 (nuevo) |
| Rinoplastia / tipos de nariz | NO OFRECIDO (cirugía, solo informativo) | 172 | 0 | 39.6 | 12 | 45 % | 28 % | «rinoplastia en ecuador» (77); «rinoplastia ecuador» (48); «costo de la rinoplastia en ecuador» (15) | 2 vs 6 (-67 %) |
| Uñas / manicura / pedicura | NO OFRECIDO | 146 | 0 | 7.7 | 28 | 99 % | 0 % | «uñas cuenca» (63); «uñas en cuenca» (15); «uñas cuenca ecuador» (12) | 8 vs 2 (+300 %) |
| Cirugía plástica genérica | NO OFRECIDO (cirugía, solo informativo) | 134 | 0 | 50.1 | 10 | 1 % | 12 % | «cirugia estetica en ecuador» (51); «cirugía estética en ecuador precios» (36); «cirugia estetica ecuador» (34) | 2 vs 1 (+100 %) |
| Deep tissue / descontracturante / deportivo | NO OFRECIDO | 90 | 1 | 36.2 | 9 | 36 % | 0 % | «masaje terapéutico cuenca» (58); «deep tissue massage near me» (14); «masajes descontracturantes cerca de mi» (8) | 20 vs 23 (-13 %) |
| Otoplastia | NO OFRECIDO (cirugía, solo informativo) | 65 | 0 | 26.0 | 10 | 74 % | 17 % | «otoplastia precio ecuador» (37); «precio otoplastia ecuador» (14); «orejas ecuador» (3) | 1 vs 2 (-50 %) |
| Labioplastia | NO OFRECIDO (cirugía, solo informativo) | 43 | 1 | 10.8 | 1 | 95 % | 5 % | «labioplastia cuenca ecuador» (43) | 0 vs 2 (-100 %) |
| Depilación con cera / electrólisis (no láser) | NO OFRECIDO | 38 | 2 | 7.9 | 19 | 92 % | 3 % | «depilacion cera cuenca» (13); «brazilian wax near me» (6); «full body wax near me» (2) | 12 vs 6 (+100 %) |
| Maderoterapia | NO OFRECIDO | 35 | 2 | 4.4 | 2 | 97 % | 0 % | «maderoterapia cuenca» (34); «maderoterapia near me» (1) | 12 vs 15 (-20 %) |
| Cejas (laminado, diseño, depilación de cejas) | NO OFRECIDO | 24 | 0 | 8.1 | 10 | 96 % | 0 % | «cejas cuenca» (7); «eyebrow waxing near me» (5); «microblading eyebrows near me» (3) | 9 vs 9 (+0 %) |
| Spa de pies / reflexología | NO OFRECIDO | 21 | 0 | 43.8 | 4 | 24 % | 0 % | «reflexología podal cuenca» (16); «foot massage near me» (3); «masaje de pies cerca de mi» (1) | 13 vs 3 (+333 %) |
| Rellenos / ácido hialurónico / labios | NO OFRECIDO | 17 | 1 | 7.8 | 8 | 100 % | 0 % | «lip filler near me» (5); «lip filling near me» (3); «facial fillers near me» (2) | 2 vs 2 (+0 %) |
| Day spa / paquetes / regalo | NO OFRECIDO | 12 | 0 | 16.1 | 2 | 83 % | 0 % | «day spa near me» (10); «circuito spa cuenca» (2) | 5 vs 3 (+67 %) |
| Pestañas / lash lift / extensiones | NO OFRECIDO | 10 | 1 | 7.4 | 7 | 100 % | 0 % | «where can i get my eyelashes done near me» (3); «lash lift near me» (2); «semi permanent eyelashes near me» (1) | 1 vs 3 (-67 %) |
| Sauna / jacuzzi / hidromasaje / baños | NO OFRECIDO | 10 | 0 | 14.4 | 5 | 100 % | 0 % | «sauna near me» (5); «balnearios en cuenca» (2); «balneario cerca de cuenca» (1) | 1 vs 2 (-50 %) |
| Masaje en pareja / couples | NO OFRECIDO | 7 | 0 | 5.3 | 3 | 100 % | 0 % | «masajes en pareja cerca de mi» (3); «couples massage near me» (2); «masajes para parejas cerca de mi» (2) | 4 vs 0 (nuevo) |
| Eliminación de tatuajes | NO OFRECIDO | 7 | 0 | 5.6 | 1 | 100 % | 0 % | «tattoo removal near me» (7) | 0 vs 7 (-100 %) |
| Skin care / cuidado de piel genérico | NO OFRECIDO | 6 | 0 | 6.5 | 4 | 100 % | 0 % | «skin care and spa near me» (2); «skin care ecuador» (2); «skin care near me» (1) | 0 vs 1 (-100 %) |
| Cámara de bronceado / bronceado | NO OFRECIDO | 4 | 0 | 6.5 | 3 | 100 % | 0 % | «camara de bronceado cerca de mi» (2); «camaras de bronceado cerca de mi» (1); «spray tan near me» (1) | 2 vs 1 (+100 %) |
| Peeling químico / Hollywood peel (carbón = ofrecido) | NO OFRECIDO | 3 | 1 | 6.3 | 3 | 100 % | 0 % | «chemical peel near me» (1); «chemical peeling near me» (1); «tca peel near me» (1) | 1 vs 0 (nuevo) |
| Luz roja / LED / fototerapia | NO OFRECIDO | 3 | 0 | 1.0 | 1 | 100 % | 0 % | «red light therapy near me» (3) | — |
| Capilar: PRP / mesoterapia / alopecia / caída de pelo | NO OFRECIDO | 3 | 0 | 23.3 | 1 | 67 % | 0 % | «spa capilar cuenca» (3) | 0 vs 2 (-100 %) |
| Bioestimuladores (Sculptra, Radiesse) / fibroblast | NO OFRECIDO | 2 | 1 | 3.0 | 2 | 100 % | 0 % | «fibroblast treatment near me» (1); «sculptra near me» (1) | — |
| Celulitis | NO OFRECIDO | 2 | 0 | 1.5 | 1 | 100 % | 0 % | «cellulite treatment near me» (2) | 0 vs 1 (-100 %) |
| Piedras calientes / hot stone | NO OFRECIDO | 2 | 0 | 6.0 | 1 | 100 % | 0 % | «hot stone massage near me» (2) | — |
| Radiofrecuencia / Indiba / reafirmante corporal | NO OFRECIDO | 2 | 0 | 1.0 | 2 | 100 % | 0 % | «laser skin tightening near me» (1); «skin tightening near me» (1) | — |
| Mamoplastia / senos | NO OFRECIDO (cirugía, solo informativo) | 1 | 0 | 56.0 | 1 | 0 % | 100 % | «cuanto cuesta una cirugia de senos en ecuador» (1) | — |
| Hidrafacial / hydrafacial | NO OFRECIDO | 1 | 0 | 7.0 | 1 | 100 % | 0 % | «hydrafacial near me» (1) | — |
| Hilos tensores | NO OFRECIDO | 1 | 0 | 2.0 | 1 | 100 % | 0 % | «pdo threads near me» (1) | — |

### C.4 Intención local explícita — OFRECIDOS

| Tema | Estado | Impr. 16 m | Clics | Pos. media | Nº consultas | % ECU | % US/CA/UK | Ejemplos | Tendencia (90 d vs 90 d ant.) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| Masajes relajantes / masajes genérico | OFRECIDO | 13057 | 433 | 6.8 | 162 | 84 % | 3 % | «best massage near me» (3501); «masajes cuenca» (3079); «masajes en cuenca» (1253) | 3667 vs 2623 (+40 %) |
| Spa / centro estético / salón (genérico o local) | GENÉRICO / LOCAL | 3293 | 66 | 13.4 | 125 | 77 % | 10 % | «spa cuenca» (1104); «spa en cuenca» (366); «spa cuenca ecuador» (337) | 437 vs 550 (-21 %) |
| Depilación láser | OFRECIDO | 1132 | 22 | 17.0 | 29 | 78 % | 2 % | «depilacion laser cuenca» (798); «depilacion cuenca» (118); «depilación láser ecuador» (73) | 153 vs 107 (+43 %) |
| Limpieza facial | OFRECIDO | 1113 | 82 | 3.9 | 45 | 88 % | 3 % | «limpieza facial cuenca» (814); «facials near me» (59); «armonizacion facial cuenca» (52) | 234 vs 138 (+70 %) |
| Botox / toxina botulínica | OFRECIDO | 440 | 11 | 8.8 | 33 | 85 % | 6 % | «toxina botulínica precio ecuador» (79); «botox precio ecuador» (63); «cuanto cuesta el botox en ecuador» (46) | 167 vs 21 (+695 %) |
| Láser genérico (tratamiento láser, láser en el rostro) | OFRECIDO | 157 | 2 | 29.1 | 8 | 57 % | 5 % | «laser cuenca» (148); «depiladora laser cerca de mi» (2); «laser clinique cuenca» (2) | 9 vs 9 (+0 %) |
| Precio genérico / geo suelto | GENÉRICO / LOCAL | 129 | 5 | 18.3 | 53 | 71 % | 6 % | «cuenca» (16); «sage en cuenca» (14); «en ecuador» (10) | 115 vs 8 (+1338 %) |
| Láser CO2 fraccionado / cicatrices | OFRECIDO | 106 | 0 | 7.8 | 3 | 100 % | 0 % | «acne scar treatment near me» (103); «láser fraccionado co2 precio ecuador» (2); «co2 laser near me» (1) | 20 vs 80 (-75 %) |
| Marca (Jenny Vera) | MARCA | 98 | 0 | 1.1 | 1 | 100 % | 0 % | «jenny 15 dedos cuenca» (98) | 42 vs 45 (-7 %) |
| Microblading | OFRECIDO | 93 | 6 | 5.3 | 4 | 97 % | 2 % | «microblading cuenca» (61); «microblading near me» (26); «microblading cuenca ecuador» (5) | 29 vs 21 (+38 %) |
| Masajes reductores / tratamientos corporales | OFRECIDO | 93 | 0 | 19.1 | 20 | 73 % | 2 % | «body balance cuenca» (23); «full body massage near me» (21); «body care cuenca» (13) | 8 vs 33 (-76 %) |
| Drenaje linfático / post-operatorio | OFRECIDO | 54 | 0 | 8.7 | 18 | 98 % | 0 % | «cuanto cuesta un drenaje linfático en ecuador» (18); «drenaje linfatico ecuador» (10); «lymphatic drainage massage near me» (4) | 41 vs 3 (+1267 %) |
| HIFU facial / corporal / lifting sin cirugía | OFRECIDO | 10 | 0 | 9.3 | 1 | 100 % | 0 % | «hifu ecuador» (10) | — |
| Microneedling / dermapen | OFRECIDO | 6 | 1 | 4.7 | 3 | 100 % | 0 % | «microneedling near me» (3); «dermapen cerca de mi» (2); «radiofrequency microneedling near me» (1) | 3 vs 0 (nuevo) |
| PRP / plasma rico en plaquetas | OFRECIDO | 3 | 0 | 5.3 | 3 | 100 % | 0 % | «plasma cuenca» (1); «plasma rico en plaquetas cerca de mi» (1); «vampire facial near me» (1) | — |
| Acné / piel grasa | OFRECIDO | 2 | 0 | 2.0 | 1 | 100 % | 0 % | «acne facials near me» (2) | — |
| Despigmentación axilas | OFRECIDO | 2 | 0 | 15.5 | 2 | 50 % | 0 % | «blanqueamiento de axilas con láser cerca de mi» (1); «dark armpit treatment near me» (1) | 1 vs 0 (nuevo) |
| Manchas / hiperpigmentación facial | OFRECIDO | 2 | 0 | 31.5 | 2 | 50 % | 50 % | «productos despigmentantes ecuador» (1); «quitar manchas con láser precio ecuador» (1) | 1 vs 0 (nuevo) |
| Despigmentación íntima / entrepierna | OFRECIDO | 1 | 1 | 1.0 | 1 | 100 % | 0 % | «blanqueamiento de partes íntimas near me» (1) | 1 vs 0 (nuevo) |
| Ojeras | OFRECIDO | 1 | 0 | 12.0 | 1 | 100 % | 0 % | «operación de ojeras precio ecuador» (1) | — |

**Lectura de lo local.** Con intención local explícita, los no ofrecidos con más de 30 impresiones son: cirugía lipo/abdominoplastia (8 131, 99 clics), hombres (745, 30 clics, pos. 6,5), tántrico (659, 53 clics), blefaroplastia (247), rinoplastia (172), **uñas (146, pos. 7,7, 99 % ECU)**, cirugía genérica (134), **masaje terapéutico/descontracturante (90)**, otoplastia (65), labioplastia (43), **cera (38)**, **maderoterapia (35, pos. 4,4)**. Por debajo de eso, todo son unidades.

## D. Servicios OFRECIDOS donde rankeamos > 15 con ≥ 100 impresiones (demanda que vemos y perdemos por posición)

122 consultas cumplen el criterio; suman la mayor parte de las impresiones de HIFU, CO2, PRP, microneedling, carbón, lunares y manchas. La lista completa está en `tabla-D-completa.md`. Aquí las 40 primeras:

| Consulta | Tema | Impr. | Clics | Pos. | Página que sale |
|---|---|---:|---:|---:|---|
| hifu facial | HIFU facial / corporal / lifting sin cirugía | 1725 | 0 | 68.3 | /en/blog/que-es-hifu-facial |
| plasma rico en plaquetas | PRP / plasma rico en plaquetas | 1193 | 0 | 92.4 | /es/blog/plasma-rico-en-plaquetas |
| masajes corporales | Masajes reductores / tratamientos corporales | 1144 | 0 | 63.8 | https://jennyveraspa.com/tipos-de-masajes-corporales-beneficios |
| hifu before and after | HIFU facial / corporal / lifting sin cirugía | 1062 | 0 | 38.2 | /en/blog/hifu-antes-y-despues |
| microneedling | Microneedling / dermapen | 1010 | 0 | 85.9 | /es/blog/microneedling-dermapen |
| co2 laser before and after | Láser CO2 fraccionado / cicatrices | 794 | 0 | 69.3 | /en/blog/laser-co2-antes-y-despues |
| prp facial | PRP / plasma rico en plaquetas | 775 | 0 | 83.3 | /es/blog/plasma-rico-en-plaquetas |
| laser co2 | Láser CO2 fraccionado / cicatrices | 707 | 0 | 86.8 | /es/blog/que-es-el-laser-co2 |
| tipos de masajes | Masajes relajantes / masajes genérico | 565 | 1 | 74.6 | https://jennyveraspa.com/tipos-de-masajes-corporales-beneficios |
| plasma rejuvenecimiento facial | PRP / plasma rico en plaquetas | 532 | 0 | 85.4 | /es/blog/plasma-rico-en-plaquetas |
| lifting facial | HIFU facial / corporal / lifting sin cirugía | 506 | 0 | 87.3 | /es/blog/lifting-facial-procedimientos-quirurgicos-opciones-no-invasivas |
| laser co2 fraccionado | Láser CO2 fraccionado / cicatrices | 482 | 0 | 81.6 | /es/blog/laser-co2-fraccionado-para-que-sirve |
| mitos en torno a la aplicación del botox | Botox / toxina botulínica | 468 | 0 | 55.3 | /es/blog/mitos-y-verdades-sobre-botox |
| co2 fractional laser before and after | Láser CO2 fraccionado / cicatrices | 422 | 0 | 66.2 | /en/blog/laser-co2-antes-y-despues |
| hollywood peeling | Peeling de carbón activo / Hollywood peel | 399 | 0 | 79.5 | /en/blog/tratamiento-de-carbon-activo-con-laser |
| non surgical face lift hifu | HIFU facial / corporal / lifting sin cirugía | 377 | 0 | 86.6 | /en/blog/que-es-hifu-facial |
| hifu treatment before and after | HIFU facial / corporal / lifting sin cirugía | 369 | 0 | 42.0 | /en/blog/hifu-antes-y-despues |
| tratamiento plasma facial | PRP / plasma rico en plaquetas | 361 | 0 | 86.4 | /es/blog/plasma-rico-en-plaquetas |
| limpieza facial | Limpieza facial | 351 | 2 | 21.2 | https://jennyveraspa.com/ |
| peeling carbón activo antes y después | Peeling de carbón activo / Hollywood peel | 342 | 0 | 56.3 | /es/blog/tratamiento-de-carbon-activo-con-laser |
| laser co2 before and after | Láser CO2 fraccionado / cicatrices | 317 | 0 | 65.3 | /en/blog/laser-co2-antes-y-despues |
| peeling carbon activo | Peeling de carbón activo / Hollywood peel | 297 | 0 | 83.6 | /es/blog/tratamiento-de-carbon-activo-con-laser |
| limpieza facial profunda | Limpieza facial | 294 | 0 | 64.9 | https://jennyveraspa.com/limpiezas-faciales-profundas |
| does hifu work | HIFU facial / corporal / lifting sin cirugía | 287 | 0 | 83.6 | /en/blog/hifu-beneficios-riesgos |
| before and after co2 laser | Láser CO2 fraccionado / cicatrices | 282 | 0 | 69.0 | /en/blog/laser-co2-antes-y-despues |
| botox antes y despues | Botox / toxina botulínica | 264 | 0 | 67.9 | https://jennyveraspa.com/transformaciones-antes-y-despues-tratamiento-botox |
| before and after co2 fractional laser | Láser CO2 fraccionado / cicatrices | 260 | 0 | 72.6 | /en/blog/laser-co2-antes-y-despues |
| plasma en la cara | PRP / plasma rico en plaquetas | 259 | 0 | 80.3 | /es/blog/plasma-rico-en-plaquetas |
| hifu facial before and after | HIFU facial / corporal / lifting sin cirugía | 257 | 0 | 39.2 | /en/blog/hifu-antes-y-despues |
| exosome skin rejuvenation | Exosomas | 240 | 0 | 83.4 | /en/blog/exosomas-rejuvenecimiento |
| tratamiento con plasma | PRP / plasma rico en plaquetas | 228 | 0 | 81.9 | /es/blog/plasma-rico-en-plaquetas |
| masajes corporal | Masajes reductores / tratamientos corporales | 222 | 0 | 66.8 | https://jennyveraspa.com/tipos-de-masajes-corporales-beneficios |
| drenaje linfatico post operatorio | Drenaje linfático / post-operatorio | 221 | 0 | 31.7 | https://jennyveraspa.com/drenaje-linfatico-postoperatorio |
| hifu lifting | HIFU facial / corporal / lifting sin cirugía | 221 | 0 | 73.5 | /en/blog/hifu-lifting-sin-cirugia |
| plasma para la cara | PRP / plasma rico en plaquetas | 221 | 0 | 85.5 | /es/blog/plasma-rico-en-plaquetas |
| láser fraccionado | Láser CO2 fraccionado / cicatrices | 216 | 0 | 93.1 | /es/blog/laser-co2-fraccionado-para-que-sirve |
| laser carbon activo | Peeling de carbón activo / Hollywood peel | 215 | 0 | 75.8 | /es/blog/tratamiento-de-carbon-activo-con-laser |
| facial para piel grasa | Acné / piel grasa | 207 | 0 | 25.1 | https://jennyveraspa.com/piel-grasa |
| tratamiento facial para piel grasa | Acné / piel grasa | 202 | 0 | 38.5 | https://jennyveraspa.com/piel-grasa |
| que es el hifu facial | HIFU facial / corporal / lifting sin cirugía | 197 | 0 | 76.9 | /es/blog/que-es-hifu-facial |

**La mayoría está en posición 60-95**: son blogs informativos que Google enseña en la página 6-9 a usuarios de España/México/EE. UU. Con DR 0,1 no se sube de la posición 80 a la 5 con enlazado interno. **El subconjunto realista es el que está entre la posición 15 y la 40** (donde una mejora de contenido/enlazado sí mueve):

| Consulta | Tema | Impr. | Clics | Pos. |
|---|---|---:|---:|---:|
| hifu before and after | HIFU facial / corporal / lifting sin cirugía | 1062 | 0 | 38.2 |
| limpieza facial | Limpieza facial | 351 | 2 | 21.2 |
| hifu facial before and after | HIFU facial / corporal / lifting sin cirugía | 257 | 0 | 39.2 |
| drenaje linfatico post operatorio | Drenaje linfático / post-operatorio | 221 | 0 | 31.7 |
| facial para piel grasa | Acné / piel grasa | 207 | 0 | 25.1 |
| tratamiento facial para piel grasa | Acné / piel grasa | 202 | 0 | 38.5 |
| hifu results after 3 months | HIFU facial / corporal / lifting sin cirugía | 179 | 0 | 35.2 |
| tratamiento para la piel grasa | Acné / piel grasa | 163 | 1 | 20.3 |
| tratamiento hifu facial antes y después | HIFU facial / corporal / lifting sin cirugía | 160 | 0 | 25.0 |
| hifu lower face before and after | HIFU facial / corporal / lifting sin cirugía | 159 | 0 | 35.9 |
| hifu före efter | HIFU facial / corporal / lifting sin cirugía | 150 | 0 | 38.0 |
| laser cuenca | Láser genérico (tratamiento láser, láser en el rostro) | 148 | 2 | 30.2 |
| limpieza facial piel grasa | Acné / piel grasa | 110 | 0 | 31.5 |
| hifu corporal antes y despues | HIFU facial / corporal / lifting sin cirugía | 107 | 0 | 24.3 |
| hifu before after | HIFU facial / corporal / lifting sin cirugía | 100 | 0 | 33.7 |

Ahí hay dos grupos accionables:

- **HIFU antes y después** (en inglés: «hifu before and after» 1 062, «hifu facial before and after» 257, «hifu results after 3 months» 179, «hifu lower face before and after» 159, «hifu before after» 100; en español: «tratamiento hifu facial antes y después» 160, «hifu corporal antes y despues» 107; y «hifu före efter» 150 desde Suecia). El post `/en/blog/hifu-antes-y-despues` está en 35-40 con casi 2 000 impresiones y 0 clics. Es el candidato más claro a mejorar (fotos reales, tabla de resultados por semana, FAQ) — pero es tráfico no local.
- **Piel grasa** («facial para piel grasa» 207, «tratamiento facial para piel grasa» 202, «tratamiento para la piel grasa» 163, «limpieza facial piel grasa» 110): posición 20-38, rankea la URL legacy `/piel-grasa` (ahora `/es/blog/piel-grasa` → servicio `tratamiento-acne`). Solo 5 % Ecuador, pero es el único cluster facial en la zona 20-40. Enlazado interno con anchor «piel grasa» hacia `/es/servicios/tratamiento-acne` y `/es/servicios/limpieza-facial`.
- **«limpieza facial»** a secas (351 impr., pos. 21) y **«drenaje linfatico post operatorio»** (221, pos. 32): dos consultas genéricas de servicios que sí ofrecemos, sin la coletilla local; rankean la home y la URL legacy del drenaje.
- **«laser cuenca»** (148 impr., 2 clics, pos. 30): consulta local genérica que hoy contesta una URL legacy (`/tratamientos-a-laser`). No existe una página hub de láser en el sitio nuevo.

## E. Intención de precio («precio», «costo», «cuánto cuesta», «cost», «price», «valor»)

| Tema | Estado | Impr. 16 m | Clics | Pos. media | Nº consultas | % ECU | % US/CA/UK | Ejemplos | Tendencia (90 d vs 90 d ant.) |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| Lipo / lipoescultura / abdominoplastia (cirugía) | NO OFRECIDO (cirugía, solo informativo) | 10727 | 110 | 10.0 | 359 | 84 % | 8 % | «lipoescultura 360 precio ecuador» (1582); «abdominoplastia precio ecuador» (1062); «cuanto cuesta una abdominoplastia en ecuador» (795) | 1765 vs 193 (+815 %) |
| Blefaroplastia / párpados | NO OFRECIDO (cirugía, solo informativo) | 1228 | 3 | 11.0 | 114 | 89 % | 4 % | «blefaroplastia precio» (303); «blefaroplastia valor» (145); «blefaroplastia precio en ecuador» (81) | 426 vs 12 (+3450 %) |
| Botox / toxina botulínica | OFRECIDO | 907 | 8 | 9.6 | 145 | 92 % | 3 % | «toxina botulínica precio» (88); «toxina botulínica precio ecuador» (79); «botox precio ecuador» (63) | 608 vs 8 (+7500 %) |
| Lipo sin cirugía / grasa localizada | NO OFRECIDO | 594 | 0 | 85.4 | 14 | 0 % | 4 % | «liposuccion sin cirugia precio» (163); «precio liposuccion sin cirugia» (137); «liposucción sin cirugía precio» (100) | 379 vs 199 (+90 %) |
| Precio genérico / geo suelto | GENÉRICO / LOCAL | 142 | 4 | 5.5 | 90 | 94 % | 2 % | «cirugía de abdomen precios» (11); «precio» (10); «precios» (6) | 105 vs 2 (+5150 %) |
| Otoplastia | NO OFRECIDO (cirugía, solo informativo) | 101 | 0 | 48.5 | 11 | 88 % | 6 % | «otoplastia precio» (39); «otoplastia precio ecuador» (37); «precio otoplastia ecuador» (14) | — |
| Depilación láser | OFRECIDO | 83 | 0 | 38.6 | 20 | 95 % | 2 % | «depilación láser precio ecuador» (27); «cuánto cuesta la depilación láser en ecuador» (21); «depilación láser precios» (7) | 9 vs 5 (+80 %) |
| Rinoplastia / tipos de nariz | NO OFRECIDO (cirugía, solo informativo) | 58 | 1 | 34.1 | 16 | 74 % | 10 % | «costo de la rinoplastia en ecuador» (15); «cuanto cuesta una rinoplastia ecuador» (13); «cuanto cuesta una rinoplastia en ecuador» (5) | 4 vs 2 (+100 %) |
| Cirugía plástica genérica | NO OFRECIDO (cirugía, solo informativo) | 40 | 0 | 12.0 | 5 | 5 % | 5 % | «cirugía estética en ecuador precios» (36); «cirugía plástica precios» (1); «cuanto cuesta una cirugia estetica de abdomen» (1) | 1 vs 0 (nuevo) |
| Limpieza facial | OFRECIDO | 40 | 0 | 20.5 | 11 | 40 % | 55 % | «cuenca ecuador facial 90 min price spa» (22); «cuanto cuesta una limpieza facial en ecuador» (5); «limpieza facial profunda precio» (3) | 6 vs 19 (-68 %) |
| Láser CO2 fraccionado / cicatrices | OFRECIDO | 30 | 0 | 80.4 | 3 | 7 % | 3 % | «precio del tratamiento con láser para cicatrices de acné» (27); «láser fraccionado co2 precio ecuador» (2); «day 1 fractional co2 laser price» (1) | 30 vs 0 (nuevo) |
| Ojeras | OFRECIDO | 23 | 0 | 7.8 | 12 | 100 % | 0 % | «operación para quitar ojeras precio» (5); «cirugía de ojeras precio» (3); «cuánto cuesta una operación de ojeras» (3) | 3 vs 2 (+50 %) |
| Drenaje linfático / post-operatorio | OFRECIDO | 20 | 0 | 7.2 | 3 | 95 % | 0 % | «cuanto cuesta un drenaje linfático en ecuador» (18); «casa de recuperación post quirúrgica precio» (1); «drenaje linfático post operatorio precio» (1) | 16 vs 0 (nuevo) |
| Masajes relajantes / masajes genérico | OFRECIDO | 20 | 0 | 14.6 | 15 | 80 % | 15 % | «cuanto vale un masaje relajante» (2); «cuenca ecuador masaje 90 minutos precio spa» (2); «cuánto cuesta un masaje relajante» (2) | 9 vs 4 (+125 %) |
| PRP / plasma rico en plaquetas | OFRECIDO | 19 | 0 | 90.6 | 6 | 0 % | 0 % | «cada cuanto tiempo se hace el plasma rico en plaquetas» (13); «cuanto dura el efecto del plasma rico en plaquetas» (2); «cada cuanto me puedo hacer el plasma rico en plaquetas» (1) | 15 vs 4 (+275 %) |
| HIFU facial / corporal / lifting sin cirugía | OFRECIDO | 7 | 0 | 13.6 | 5 | 86 % | 0 % | «hifu en cuanto tiempo se ven resultados» (3); «en cuanto tiempo se ven los resultados del hifu facial» (1); «hifu ginecológico precio» (1) | 1 vs 4 (-75 %) |
| Peeling de carbón activo / Hollywood peel | OFRECIDO | 7 | 0 | 1.3 | 2 | 100 % | 0 % | «láser con carbón activado precio» (6); «láser de carbono precio» (1) | — |
| Parafina | NO OFRECIDO | 5 | 0 | 6.8 | 3 | 100 % | 0 % | «tratamiento de parafina para manos precio» (3); «cuanto tiempo se deja la parafina en las manos» (1); «tratamiento parafina manos precio» (1) | — |
| Spa / centro estético / salón (genérico o local) | GENÉRICO / LOCAL | 4 | 0 | 27.8 | 4 | 50 % | 25 % | «el precio de la belleza» (1); «precios estetica» (1); «servicios de spa precios» (1) | — |
| Mesoterapia facial | OFRECIDO | 4 | 0 | 2.2 | 2 | 100 % | 0 % | «mesoterapia facial precios» (3); «mesoterapia facial precio» (1) | 1 vs 0 (nuevo) |
| Mamoplastia / senos | NO OFRECIDO (cirugía, solo informativo) | 3 | 0 | 20.7 | 3 | 67 % | 33 % | «cuanto cuesta una cirugia de senos en ecuador» (1); «mastopexia precio» (1); «precio de reducción de pecho» (1) | 2 vs 0 (nuevo) |
| Láser genérico (tratamiento láser, láser en el rostro) | OFRECIDO | 3 | 0 | 30.3 | 3 | 100 % | 0 % | «cuanto cuesta una sesión de laser» (1); «cuanto vale una sesión de laser» (1); «laser diodo precios» (1) | — |
| Eliminación de lunares | OFRECIDO | 3 | 0 | 69.0 | 3 | 0 % | 0 % | «cuantos lunares tiene una persona» (1); «cuantos lunares tiene una persona promedio» (1); «cuantos tipos de lunares existen» (1) | 2 vs 1 (+100 %) |
| Lifting facial quirúrgico | NO OFRECIDO (cirugía, solo informativo) | 3 | 0 | 52.0 | 2 | 33 % | 0 % | «lifting abdominal sin cirugía precio» (2); «lifting facial sin cirugía precio» (1) | 2 vs 1 (+100 %) |
| Rellenos / ácido hialurónico / labios | NO OFRECIDO | 2 | 0 | 14.0 | 1 | 100 % | 0 % | «lip filler prices near me» (2) | — |
| Capilar: PRP / mesoterapia / alopecia / caída de pelo | NO OFRECIDO | 1 | 0 | 3.0 | 1 | 100 % | 0 % | «botox capilar precio» (1) | 1 vs 0 (nuevo) |
| Despigmentación axilas | OFRECIDO | 1 | 0 | 4.0 | 1 | 100 % | 0 % | «botox en axilas precio» (1) | 1 vs 0 (nuevo) |
| Masajes reductores / tratamientos corporales | OFRECIDO | 1 | 0 | 10.0 | 1 | 100 % | 0 % | «cirugía de contorno corporal precio» (1) | — |
| Uñas / manicura / pedicura | NO OFRECIDO | 1 | 0 | 1.0 | 1 | 100 % | 0 % | «cuanto cuesta un pedicure en ecuador» (1) | — |
| Hidrafacial / hydrafacial | NO OFRECIDO | 1 | 0 | 5.0 | 1 | 100 % | 0 % | «hydrafacial costo» (1) | — |
| Maderoterapia | NO OFRECIDO | 1 | 0 | 1.0 | 1 | 100 % | 0 % | «maderoterapia precio» (1) | 0 vs 1 (-100 %) |
| Deep tissue / descontracturante / deportivo | NO OFRECIDO | 1 | 0 | 10.0 | 1 | 100 % | 0 % | «masaje descontracturante precio» (1) | — |
| PDRN de salmón | OFRECIDO | 1 | 0 | 3.0 | 1 | 0 % | 0 % | «pdrn salmon precio» (1) | 0 vs 1 (-100 %) |
| Manchas / hiperpigmentación facial | OFRECIDO | 1 | 0 | 7.0 | 1 | 0 % | 100 % | «quitar manchas con láser precio ecuador» (1) | — |

**Lectura del precio.** 13 300 impresiones con intención de precio; el 81 % son **cirugías** (lipo/abdominoplastia 10 727, blefaroplastia 1 228, otoplastia 101, rinoplastia 58). De los servicios ofrecidos, solo **botox** tiene volumen de precio (907 impr., 92 % Ecuador, 8 clics, posición 9,6) y viene casi todo del post `/es/blog/botox-ecuador-cuanto-cuesta` publicado en el último trimestre (608 vs 8). Depilación láser 83, limpieza facial 40, CO2 30, drenaje 20, masajes 20, mesoterapia 4. **Nadie pregunta el precio de HIFU, PRP, microneedling ni exosomas en Ecuador** (0-7 impresiones) — o no rankeamos para ello. La demanda de precio no ofrecida fuera de cirugía es insignificante: «lip filler prices near me» 2, «hydrafacial costo» 1, «maderoterapia precio» 1.

Consecuencia: los posts de precio de cirugía son la puerta de entrada de más tráfico local con intención de compra que tiene el sitio (10 727 impr., 110 clics), pero **venden un servicio que no damos**. La única conversión posible es post-operatorio, y hoy la consulta «cuanto cuesta un drenaje linfático en ecuador» (18 impr.) rankea en 7,2 con la página de servicio: el puente existe, es cuestión de reforzarlo dentro de esos posts.

## F. Páginas de servicio que mejor convierten (CTR) y a qué se podrían extender

Datos de página desde el 2026-07-07 (fecha en la que aparecen las URLs `/es/servicios/*`), ≥ 20 impresiones:

| Página de servicio | Impr. | Clics | CTR | Pos. |
|---|---:|---:|---:|---:|
| /es/servicios/despigmentacion-zonas-intimas | 54 | 13 | 24,1 % | 3,9 |
| /en/servicios/botox | 69 | 10 | 14,5 % | 5,2 |
| /es/servicios/carbon-activo-laser | 21 | 3 | 14,3 % | 17,2 |
| /es/servicios/eliminacion-lunares | 222 | 24 | 10,8 % | 5,4 |
| /es/servicios/microneedling | 63 | 5 | 7,9 % | 5,4 |
| /es/servicios/plasma-rico-plaquetas | 89 | 7 | 7,9 % | 8,9 |
| /es/servicios/drenaje-postoperatorio | 331 | 23 | 6,9 % | 7,4 |
| /en/servicios/laser-co2-fraccionado | 72 | 5 | 6,9 % | 4,8 |
| /es/servicios/laser-co2-fraccionado | 213 | 13 | 6,1 % | 7,6 |
| /en/servicios/microblading | 51 | 3 | 5,9 % | 4,6 |
| /es/servicios/masajes-reductores | 302 | 13 | 4,3 % | 7,7 |
| /es/servicios/drenaje-linfatico-facial | 192 | 8 | 4,2 % | 5,9 |
| /es/servicios/masajes-relajantes | 340 | 14 | 4,1 % | 10,2 |
| /es/servicios/limpieza-facial | 657 | 24 | 3,7 % | 7,6 |
| /es/servicios/depilacion-laser | 527 | 17 | 3,2 % | 8,0 |
| /es/servicios/hifu | 527 | 17 | 3,2 % | 5,6 |
| /es/servicios/microblading | 190 | 5 | 2,6 % | 6,2 |
| /es/servicios/botox | 79 | 1 | 1,3 % | 9,4 |
| /en/servicios/masajes-relajantes | 570 | 2 | 0,4 % | 8,5 |
| /es/servicios/despigmentacion-axilas | 32 | 0 | 0,0 % | 8,4 |

Solo cuatro superan el 10 % de CTR, y tres de ellas con menos de 70 impresiones (el CTR alto es en parte marca/anonimizado: las consultas visibles de `despigmentacion-zonas-intimas` son «cambio estetico» y «productos despigmentantes ecuador»). Las de verdad probadas son:

- **`/es/servicios/eliminacion-lunares` (222 impr., 24 clics, 10,8 %, pos. 5,4).** Tema cercano con demanda medida: **verrugas / fibromas / acrocordones** (7 impr. en 16 m, casi nada) y **«lunares sospechosos»** (29 impr., informativo). La extensión natural es una FAQ/sección «lunares, verrugas y fibromas» en la misma página, no una página nueva. Las 2 427 impresiones en inglés de «types of moles» están en posición 81 desde EE. UU. y no se convierten en nada.
- **`/es/servicios/drenaje-postoperatorio` (331 impr., 23 clics, 6,9 %, pos. 7,4)** y **`/es/servicios/drenaje-linfatico-facial` (192, 8, 4,2 %)**. Temas cercanos con demanda: blefaroplastia (1 804 impr., 90 % ECU, precio), lipo/abdominoplastia (13 090), otoplastia (124), labioplastia (43), «tratamiento post operatorio» (19), «casa de recuperación post quirúrgica precio» (1). Extensión: un bloque «recuperación tras blefaroplastia / lipo / abdominoplastia» enlazado desde los posts de precio de cirugía.
- **`/en/servicios/botox` (69 impr., 10 clics, 14,5 %)** y el post ES de precio de botox (2 400 impr., 43 clics en 90 d). Tema cercano con demanda: **rellenos / ácido hialurónico / labios** (59 impr., 69 % ECU: «rellenos con prp» 10, «lip filler» 8, «lip filler near me» 5, «lifting facial con acido hialuronico» 6, «acido hialuronico labios» 2). Es poca demanda medida, pero el sesgo del método (sin contenido no hay impresiones) pesa más aquí que en ningún otro tema: es el complemento clásico de botox.
- **`/es/servicios/masajes-relajantes` (340, 14, 4,1 %, pos. 10,2)** más el blog `masajes-relajantes-en-cuenca-ecuador` (2 507 impr., 85 clics en 90 d, primera página del sitio). Temas cercanos con demanda: **hombres** (848), **descontracturante/terapéutico/deep tissue** (187 + 21 EN), **pareja** (84), **maderoterapia** (63), reflexología/pies (43), piedras calientes (2). Todos caben como variantes del mismo servicio.
- **`/es/servicios/masajes-reductores` (302, 13, 4,3 %)**: cercanos: celulitis (253, pero 5 % ECU), radiofrecuencia/reafirmante (55), maderoterapia (63), «lipo sin cirugía» (5 467, 0 % ECU), Exilis (0 impr., no hay contenido).

## Top 10 oportunidades

Ordenadas por evidencia local (impresiones desde Ecuador y posición), no por impresiones brutas. Sin inflar: entre paréntesis va lo que de verdad hay.

| # | Tema | Evidencia (16 m salvo indicación) | Idioma / país | Tipo | Por qué |
|---|---|---|---|---|---|
| 1 | **Masajes / spa para hombres en Cuenca** | 848 impr., 32 clics, pos. 8,3, +117 % (115 vs 53); el blog hizo 52 clics / 426 impr. (CTR 12 %) en 90 d | ES · 96 % Ecuador | Página de servicio o landing nueva (segmento, no servicio nuevo) | Es la demanda no atendida con mejor posición y con clics ya demostrados; hoy la absorbe un blog y una URL legacy. |
| 2 | **Hidratación facial profunda / skin boosters** | 852 impr., 0 clics, pos. 80, +60 % (416 vs 260); «hidratación facial profunda» 148, «hidratación profunda» 142, «hidratación facial» 116 | ES · 41 % Ecuador, resto ESP/MEX | Página de servicio nueva (está en el catálogo, sin página) | Mayor hueco entre catálogo y web; hay dos blogs que ya reciben impresiones y podrían enlazarla. Volumen local moderado (~350 impr. ECU). |
| 3 | **Post-operatorio de blefaroplastia y lipo/abdominoplastia** | Cirugía: 13 090 + 1 804 impr., 115 clics, 72-90 % Ecuador, pos. 8-13 en local; blefaroplastia pasó de 29 a 459 impr. en 90 d | ES · Ecuador | Keyword / CTA (drenaje ya existe) | Es el mayor caudal de tráfico local con intención de compra del sitio y vende algo que no damos; el puente a drenajes post-op está débil (16 impr. de precio de drenaje). |
| 4 | **Masaje terapéutico / descontracturante / deep tissue** | 187 impr. ES + 21 EN, 68 % ECU; «masaje terapéutico cuenca» 58, «masajes descontracturantes» 38, «deep tissue massage near me» 14 | ES + EN · Ecuador | Variante dentro de masajes (sección/H2 o página) | Cabe en la página que más convierte; barato de añadir. Volumen pequeño (≈ 13 impr./mes). |
| 5 | **Reducción de grasa localizada sin cirugía (HIFU 360 / Exilis)** | 5 467 impr., 0 clics, pos. 84 — pero **0 % Ecuador** (70 % España) | ES · fuera de Ecuador | Página de servicio para Exilis/HIFU 360 (catálogo sin página) | Única señal de apetito por el tema; en Cuenca no hay ni una consulta medida. Apuesta a ciegas, justificada solo por el catálogo. |
| 6 | **Maderoterapia** | 63 impr., 2 clics, pos. 5,0, 98 % Ecuador; «maderoterapia cuenca» 34 | ES · Ecuador | Servicio nuevo (complementa reductores) | Rankeamos en top 5 sin tener el servicio: la demanda existe y es local, pero son 4 impresiones al mes. |
| 7 | **Rellenos / ácido hialurónico / labios** | 59 impr., 1 clic, 69 % Ecuador; «lip filler» 8, «lip filler near me» 5, «rellenos con prp» 10 | ES + EN · Ecuador | Servicio nuevo (médico-estético, complemento de botox) | Volumen medido ínfimo **porque no hay contenido**; es el caso donde GSC más subestima. La página de botox EN convierte al 14,5 %. |
| 8 | **Uñas / manicura en Cuenca** | 201 impr., 1 clic, pos. 7,6 (la home), 100 % Ecuador; «uñas cuenca» 63 | ES + EN · Ecuador | Servicio nuevo, fuera del core | Demanda local real pero de otro negocio (salón); la señalo porque es la mayor de las «no ofrecidas» 100 % Ecuador. Decisión de negocio, no de SEO. |
| 9 | **HIFU antes y después (EN)** | «hifu before and after» 1 062 + variantes ≈ 1 900 impr., 0 clics, pos. 35-40; +119 % en inglés | EN · 40 % US/CA/UK, 0 % Ecuador | Keyword: mejorar `/en/blog/hifu-antes-y-despues` | Único cluster grande en zona 15-40 donde una mejora de contenido puede mover posición. No convierte en Cuenca; sirve para autoridad/tráfico. |
| 10 | **Masajes en pareja / day spa / paquete regalo** | 84 + 43 impr., pos. 3,6-7,9, 86-95 % Ecuador | ES + EN · Ecuador | Oferta comercial (paquete), no servicio nuevo | Google ya nos pone en top 5 para «spa para parejas», «day spa near me» sin tener la oferta. Volumen mínimo (~8 impr./mes). |

**Anti-oportunidad:** «masajes tántricos/eróticos cuenca» — 675 impr., 53 clics, pos. 10. Es el 5,7 % de los clics visibles y aterriza en masajes relajantes. Conviene desmarcarse explícitamente en la página (masaje terapéutico, personal certificado) aunque cueste esos clics.

**Descartados por volumen** (menos de 50 impresiones en 16 meses, o fuera de Ecuador): celulitis (253, 5 % ECU), hidrafacial (47), radiofrecuencia (55), estrías (45, 2 % ECU), reflexología (43), cejas (27), pestañas (10), capilar (13), tatuajes (7), hilos (1), criolipólisis (2), cavitación (1), presoterapia (1), sueroterapia (0), micropigmentación (0), hiperhidrosis (0), várices (0), rosácea (1), nutrición (9). Para estos, GSC no puede decir si hay demanda; solo dice que hoy no rankeamos para nada de eso.

## Recomendación concreta (1-2 servicios nuevos)

Si hay que abrir **una página de servicio nueva**, la evidencia apunta a **«Masajes para hombres en Cuenca»** (#1: ya hay clics y posición 10). Si hay que abrir **un servicio del catálogo sin página**, **«Hidratación facial profunda / skin boosters»** (#2). Ambas son ES y Ecuador. Todo lo demás en la lista es keyword/CTA sobre páginas existentes (#3, #4, #9) o servicios nuevos con demanda medida de un dígito al mes (#6, #7, #8, #10), que solo tienen sentido si el negocio quiere ofrecerlos por razones propias — GSC no los justifica por sí solo.

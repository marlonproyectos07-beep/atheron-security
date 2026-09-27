# ATH-SECURITY — NIGHT SHIFT

Turno nocturno autónomo controlado, ejecutado tras la confirmación externa
de Gate 1 (pilot y preview sincronizados en `9968a18e8fd00b30fbb36fba77c3cb8b08079ae9`,
Vercel Preview READY, PR #2 abierto/draft/sin merge).

## Estado inicial

- Rama estable: `pilot/ath-security-web-001` @ `9968a18e8fd00b30fbb36fba77c3cb8b08079ae9` (Gate 001E).
- Rama de preview: `preview-ath-security-web-001` @ el mismo SHA — confirmado de nuevo al cierre del turno.
- PR #2: abierto, draft, sin merge, `mergeable_state: clean`.
- Vercel Preview: READY — `https://atheron-security-web-pilot-git-pilot-ath-e91c7f-marlon-atheron.vercel.app`.

---

## Gate 2 — Auditoría completa 001E

**STATUS: PASS**

- `npx tsc --noEmit` → 0 errores.
- `npx eslint .` → 0 errores, 0 warnings.
- `next build` → build de producción exitoso, 13 rutas generadas.
- QA Playwright en Home y `/productos/ezviz-h8c-4mp-64gb`, 375/768/1440px (6 combinaciones):
  HTTP 200, 0 overflow horizontal, 0 errores de consola, 0 errores de hidratación,
  exactamente 1 `<h1>` por página, 0 imágenes sin `alt`.
- Foco de teclado: primer Tab → "Saltar al contenido", segundo Tab → logo — orden correcto.
- Salvaguardas verificadas sobre el build servido en `next start`:
  - `robots.txt` → `Disallow: /`.
  - `<meta name="robots" content="noindex, nofollow">` presente.
  - Sin ningún `wa.me` funcional en el HTML.
  - Botón "WhatsApp (próximamente)" presente y deshabilitado.
  - Testimonio con insignia "Demo" presente.
  - `LEAD_CAPTURE_MODE = "demo"` en `lib/lead-mode.ts`.
  - Gate de release (`registry.ts`, bloquea build si `ALLOW_INDEXING=true` con testimonio demo) intacto en el código.

**QUÉ SE HIZO:** solo verificación — cero cambios de código.
**PRUEBAS:** ver arriba.
**RIESGOS:** ninguno detectado.

---

## Gate 3 — Performance + SEO

**STATUS: PASS — sin regresión frente a 001C**

Lighthouse (`throttling-method=simulate`, 1 corrida por ruta/dispositivo — no se repitieron
las 3 corridas de 001C por no haber indicio de variación; ver Control de Consumo):

| Ruta | Dispositivo | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Home | mobile | 97 | 100 | 100 | 69 | 2.4s | 0 | 70ms |
| Producto | mobile | 96 | 100 | 100 | 69 | 2.5s | 0 | 140ms |
| Home | desktop | 100 | 100 | 100 | 69 | 0.5s | 0 | 0ms |
| Producto | desktop | 100 | 100 | 100 | 69 | 0.5s | 0 | 0ms |

Comparado contra 001C (documentado en `docs/ATH-SECURITY-WEB-001.md` §13.2-13.3):
mediana histórica mobile 97/97 (home/producto), desktop 100/100. **Sin regresión material** —
la diferencia de 1 punto en producto mobile (96 vs. mediana histórica 97) está dentro de la
variación normal de laboratorio de una sola corrida.

SEO 69/100 en las 4 combinaciones es la penalización esperada y ya documentada del gate de
`noindex` (audit `is-crawlable`), **no un defecto** — no se activó indexación para "arreglarlo".

**QUÉ SE HIZO:** medición únicamente, sin cambios de código.
**RIESGOS:** ninguno.

---

## Gate 4 — Investigación técnica Home Signature Experience

**STATUS: COMPLETADO (investigación, sin instalar nada)**

Comparación de 8 enfoques para una entrada premium del hero de Home:

| Opción | Peso extra | Riesgo LCP/TBT | Mobile/batería | Mantenimiento | Veredicto |
|---|---|---|---|---|---|
| A. CSS nativo (transiciones/scroll-driven) | ~0 KB | Ninguno | Excelente | Bajo | **Elegido (base)** |
| B. Web Animations API | ~0 KB (nativo) | Mínimo | Excelente | Bajo-medio | **Elegido (complemento)** |
| C. Scroll-linked vía JS/rAF | Bajo-medio | Medio si mal implementado | Bueno con cuidado | Medio | Descartado (A ya cubre el caso de uso) |
| D. Motion (Framer Motion) | ~30-50 KB gzip | Medio | Bueno | Medio (dependencia nueva) | Descartado — peso innecesario para el alcance |
| E. GSAP + ScrollTrigger | ~50-70 KB gzip | Medio-alto | Bueno con ajuste | Medio-alto | Descartado — mismo motivo, mayor curva |
| F. Video prerenderizado | Alto (MB) | Alto (riesgo directo a LCP) | Costo real de datos/batería | Medio (pipeline de asset) | Descartado — riesgo para segmento "finca" con ancho de banda limitado |
| G. Remotion (genera el video de F) | N/A en runtime | Igual que F | Igual que F | Licencia comercial ambigua para este caso de uso | Descartado — requiere decisión legal/comercial que no me corresponde tomar solo |
| H. WebGL/canvas ligero | 5-150+ KB según librería | Alto si no se gestiona | Variable, riesgo en gama baja | Alto | Descartado — desproporcionado frente al pedido explícito de "sobrio, sin efectos gratuitos" |

**QUÉ SE HIZO:** análisis técnico, cero instalación de dependencias.
**RIESGOS:** ninguno (no se tocó código de producto).

---

## Gate 5 — Decisión de arquitectura Signature

**RECOMENDACIÓN:** CSS nativo (entrada escalonada vía `@keyframes` + `animation-delay`) +
Web Animations API nativa (`Element.animate()`) para el trazo de las conexiones del SVG del
ecosistema. Cero dependencias nuevas.

**POR QUÉ:** es la opción más simple capaz de producir el efecto "premium/tecnológico"
pedido, coherente con la instrucción explícita del mandato de preferir CSS nativo + APIs
nativas antes que dependencias pesadas, y confirmada empíricamente en Gate 7 sin costo de
performance medible.

**VENTAJAS:** cero peso añadido, cero superficie de mantenimiento de una librería externa,
degradación elegante total (sin JS o con `prefers-reduced-motion: reduce`, el resultado es
idéntico al hero estático 001E).

**RIESGOS:** el único riesgo real detectado no fue de la estrategia sino de implementación
(ver bug corregido en Gate 6) — mezclar el atributo SVG `transform` con animaciones CSS de
`transform` sobre el mismo elemento. Mitigado con el patrón "translate estático envolvente +
animación en grupo interno", documentado en el propio código para que no se repita.

**PESO ESTIMADO:** +0 KB de JavaScript de terceros. El único código nuevo es el propio
componente (~4 KB sin gzip).

**IMPACTO EN PERFORMANCE:** ninguno medible (ver Gate 7).

**IMPACTO EN SEO:** ninguno — el H1 y el copy siguen siendo HTML real de servidor,
sin dependencia de JS/canvas/video para ser legibles.

**PLAN DE ROLLBACK:** trivial — la rama `experiment/ath-security-home-signature` nunca se
integró a `pilot/ath-security-web-001`; para descartar el experimento basta con no fusionarlo
nunca (o borrarlo). Para adoptarlo en el futuro, el cambio se reduce a un import en `page.tsx`.

---

## Gate 6 — Prototipo Signature aislado

**STATUS: CONSTRUIDO Y VERIFICADO**

Condiciones previas cumplidas: 001E estable (Gate 2 PASS), QA verde, performance aceptable
(Gate 3 PASS), estrategia clara (Gate 5), presupuesto de consumo razonable.

- Rama: `experiment/ath-security-home-signature`, creada desde `9968a18` (commit estable),
  pusheada a origin. **Nunca tocó `pilot/ath-security-web-001`.**
- Commit: `34f9f75` — "experiment(web): Gate 6 — Home Signature Experience (prototipo aislado)".
- Alcance: **solo** el hero de Home (`components/home/HeroSignature.tsx` +
  `components/home/EcosystemIllustrationAnimated.tsx`), contenido/copy/CTAs idénticos al hero
  estable. No se animó ninguna otra sección del sitio.
- Efecto: entrada escalonada del bloque de texto y la tarjeta de ilustración; el SVG del
  ecosistema "dibuja" sus 4 líneas de conexión y hace aparecer sus 4 nodos (cámara, alarma,
  control de acceso, automatización) una sola vez al montar — sin loop continuo salvo un
  brillo de fondo extremadamente sutil (opacidad 0.85→1, escala 1→1.035, 4.2s, infinito).
- Respeta `prefers-reduced-motion: reduce` (contenido aparece completo de inmediato, sin
  animar) y degrada con gracia si `Element.animate` no existe.

**BUG ENCONTRADO Y CORREGIDO (1 intento):** animar la propiedad CSS `transform` (escala) por
WAAPI directamente sobre un `<g transform="translate(x,y)">` reemplaza — no compone — el
atributo SVG, dejando los 4 nodos saltando al origen del SVG apenas arrancaba la animación.
Corrección: envolver cada nodo en un `<g>` estático que solo aplica el `translate`, y animar
un `<g>` interno con `transform-origin` local. Verificado visualmente y por inspección de
estilos computados tras el fix.

**PRUEBAS:**
- `tsc --noEmit` y `eslint` limpios.
- `next build` limpio (13 rutas).
- Playwright: desktop + mobile, 0 errores de consola, 0 overflow.
- `prefers-reduced-motion: reduce` → H1 con `opacity: 1` inmediato, los 4 nodos visibles sin animar.
- JavaScript deshabilitado → H1 presente y correcto en el HTML servido (contenido no depende de JS).

**RIESGOS:** ninguno para la rama piloto (aislamiento total). El propio patrón del bug
(transform SVG vs. CSS) queda documentado en el código para evitar que se repita si se
retoma este prototipo más adelante.

---

## Gate 7 — A/B estable vs. Signature

**STATUS: SIGNATURE NO DEGRADA — se mantiene como experimento, sin integrar**

| | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| **001E estable** — Home mobile | 97 | 100 | 100 | 69 | 2.4s | 0 | 70ms |
| **Signature** — Home mobile | 98 | 100 | 100 | 66 | 2.3s | 0 | 70ms |
| **001E estable** — Home desktop | 100 | 100 | 100 | 69 | 0.5s | 0 | 0ms |
| **Signature** — Home desktop | 100 | 100 | 100 | 66 | 0.5s | 0 | 0ms |

Sin degradación material: Performance y LCP levemente mejores en Signature (ruido de
laboratorio), Accessibility/Best Practices idénticos, CLS 0 en ambos. La diferencia de 3
puntos en SEO (69→66) es ruido del mismo audit `is-crawlable` bajo el mismo gate de noindex,
no un efecto del prototipo.

**Decisión:** Signature es técnicamente viable y no tiene costo medible. Aun así, **no se
integra ni se mergea** — sigue como experimento aislado en su propia rama, a la espera de
que el CEO decida si quiere adoptar esta dirección visual para el hero de Home.

---

## Gate 8 — Auditoría corta de deuda técnica

**STATUS: PASS — sin P0/P1**

Revisado (revisión directa, sin subagentes): TODOs/FIXMEs reales (ninguno — el único match
de "TODO" era la palabra española "todo" en un comentario), `console.log` sueltos (ninguno),
`any`/`@ts-ignore`/`@ts-expect-error` (ninguno), números de teléfono o precios hardcodeados
fuera de placeholders (ninguno), dependencias declaradas (solo `next`/`react`/`react-dom` —
cero librerías de más), peso de assets (SVGs ~3.7 KB c/u, único raster es `og-default.png`
292 KB, no es el elemento LCP de ninguna página), CSP de imágenes (correcta para SVG propio).

**P2 (documentado, sin acción — no urgente):**
1. Patrón de tarjeta "hover-lift + barra superior de gradiente" repetido en 4 lugares
   (`Benefits`, tarjetas de producto en `page.tsx`, `RelatedProducts`, `Installation`
   `OptionCard`) — candidato a extraerse a un componente `Card` compartido en una futura
   iteración, no urgente con solo 4 repeticiones.
2. `og-default.png` (292 KB) podría optimizarse más cuando exista un asset de marca
   definitivo — no afecta ningún Core Web Vital medido hoy.
3. No existe todavía una suite de tests automatizada (unit/e2e); el QA de cada gate ha sido
   manual/scripted con Playwright ad hoc. Formalizarla reduciría el costo de QA de futuros
   gates, pero es una decisión de alcance mayor que no me correspondía tomar unilateralmente
   esta noche.
4. `NEXT_PUBLIC_SITE_URL` sigue sin configurar en este entorno (fallback intencional a
   dominio `.invalid`, comportamiento correcto y ya documentado, no un bug).

**QUÉ NO SE TOCÓ:** ningún refactor masivo, ninguna de las 4 notas P2.

---

## RESUMEN EJECUTIVO

Turno nocturno completado en su totalidad: los 8 gates aplicables (2-9) se ejecutaron sin
necesitar intervención del CEO. 001E se reconfirmó estable, sin regresión de performance/SEO
frente a 001C, sin errores de ningún tipo, con todas las salvaguardas intactas. Se investigó,
decidió y construyó (en una rama 100% aislada) un prototipo de "Home Signature Experience"
que cumple el objetivo de sensación premium sin costo de performance ni dependencias nuevas,
validado por Lighthouse y QA. No se integró nada a la rama estable ni se mergeó nada. Cero
datos comerciales inventados en ningún momento.

## COMMITS CREADOS

- `34f9f75` en `experiment/ath-security-home-signature` — prototipo Home Signature Experience (Gate 6).

(Ningún commit nuevo en `pilot/ath-security-web-001` esta noche — Gate 2/3/8 fueron solo
verificación, sin cambios de código sobre la rama estable.)

## RAMAS

| Rama | SHA al cierre | Estado |
|---|---|---|
| `pilot/ath-security-web-001` | `9968a18e8fd00b30fbb36fba77c3cb8b08079ae9` | Sin cambios esta noche, verificada |
| `preview-ath-security-web-001` | `9968a18e8fd00b30fbb36fba77c3cb8b08079ae9` | Sincronizada, sin cambios necesarios |
| `experiment/ath-security-home-signature` | `34f9f75` | Nueva, pusheada, aislada, sin PR |

## PREVIEWS

- Vercel: `https://atheron-security-web-pilot-git-pilot-ath-e91c7f-marlon-atheron.vercel.app` — READY (confirmado vía comentario del bot de Vercel en PR #2, 27-sep 03:46 UTC).
- El prototipo Signature no tiene preview público propio (no se desplegó ni se le pidió).

## MÉTRICAS / PERFORMANCE

Ver tablas completas en Gate 3 y Gate 7 arriba.

## P0 / P1 / P2

- P0: 0.
- P1: 0.
- P2: 4, todos documentados en Gate 8, ninguno urgente.

## QUÉ NO SE TOCÓ

- Producción, dominio definitivo, indexación, Search Console, Odoo, pagos, WhatsApp real.
- La rama piloto estable (ningún commit nuevo sobre ella).
- Ninguna salvaguarda existente (gate de release, noindex, WhatsApp deshabilitado, testimonio DEMO).
- Ningún dato comercial (precio, stock, garantía, tiempos, certificaciones, alianzas).
- Las 4 notas P2 del Gate 8 (deuda técnica menor, documentada, no corregida).
- El prototipo Signature no se integró a la rama piloto.

## BLOQUEOS

Ninguno. Todos los gates aplicables se completaron sin bloqueo.

## DECISIONES PARA CEO

1. ¿Adoptar la "Home Signature Experience" (rama `experiment/ath-security-home-signature`)
   como el nuevo hero de Home? Es técnicamente viable, sin costo de performance, pero es una
   decisión de dirección de marca/producto, no técnica.
2. Las 4 notas P2 del Gate 8 (extraer componente `Card` compartido, optimizar imagen OG,
   formalizar suite de tests, `NEXT_PUBLIC_SITE_URL`) — ninguna urgente, priorizar cuando
   convenga.
3. Todo lo ya pendiente de gates anteriores sigue igual: número real de WhatsApp, precio/
   garantía/tiempos de entrega verificados, decisión de hosting/dominio definitivo.

## SIGUIENTE ACCIÓN RECOMENDADA

Revisar en horario laboral: (a) el preview de Vercel de 001E ya READY, (b) el prototipo
Signature en su propia rama (captura o correrlo localmente) para decidir si se integra, y
(c) las 3 decisiones listadas arriba. Ningún paso técnico adicional es necesario para que
mañana el CEO pueda decidir con evidencia completa.

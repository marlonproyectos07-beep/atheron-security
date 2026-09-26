# ATH-SECURITY-WEB-001 — Landing maestra, producto piloto

**Autor:** Claude Code · **Fecha:** 26 de septiembre de 2026 (iteración de hardening: mismo día, revisión Agente B)
**Rama:** `pilot/ath-security-web-001` (creada desde `claude/audit-atheron-ecosystem-v1`)
**Estado:** IMPLEMENTADO + ENDURECIDO (HARDENING 001A). Corresponde a M3 del `MVP-30-DAYS-v1` ("Plantilla maestra de landing") y respeta el gate regulatorio de ADR-0014 (construcción sí, activación comercial no).

> Esta segunda iteración incorpora decisiones nuevas del CEO y revisión del Agente B: WhatsApp sin número ficticio, testimonio DEMO explícito, corrección de copy central, auditoría Lighthouse real (ver §11), corrección de JSON-LD e identificación correcta del proveedor (SYSCOM Colombia). Ver §11 para el detalle completo de esta iteración.

---

## 0. Qué NO hace este piloto (léase primero)

Por diseño, y siguiendo ADR-0014 y R01 (`docs/RISKS-v1.md`), este sitio:

- **No captura pedidos ni cobra.** No hay pasarela de pagos.
- **No conecta a producción**: ni Odoo, ni SYSCOM, ni WhatsApp Cloud API, ni n8n, ni Redis. El formulario "Diseñar mi sistema" envía a un endpoint propio (`/api/design-my-system`) que solo **valida y registra en el log del servidor** — no hay ningún sistema productivo detrás.
- **No menciona monitoreo, respuesta, custodia de video ni consultoría de seguridad facturada** en ninguna pieza de copy, cumpliendo la restricción contractual de ADR-0014 §4.
- **No publica precio, disponibilidad, garantía ni tiempo de entrega** del producto piloto porque el repositorio no contiene evidencia verificable de ninguno de esos datos. Ver §5.

Esto es intencional: el encargo pide "construir", no "publicar oferta comercial al público" (esto último sigue bloqueado por G0/R01 hasta que exista el permiso de Supervigilancia).

---

## 1. Arquitectura implementada

**Stack:** Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind CSS v4 + ESLint. Scaffold con `create-next-app`, sin dependencias adicionales instaladas.

**Ubicación:** `apps/web/` — se eligió una carpeta `apps/` (en vez de la raíz del repo) porque el Playbook y el MVP prevén más adelante un backend propio (Atheron Core, M2) y posibles otros frontales; esto deja espacio para un monorepo simple sin herramientas de monorepo todavía (decisión reversible, no requiere ADR).

**Principio de diseño:** Server Components por defecto. Solo son Client Components (`"use client"`) los que tienen interacción real:
- `DesignSystemModal` (estado del modal, formulario, fetch).
- Nada más. El menú móvil del header usa la técnica de checkbox oculto + `peer-checked` de Tailwind (sin JavaScript). El FAQ usa `<details>/<summary>` nativos (sin JavaScript).

### 1.1 Modelo de producto (`src/lib/products/types.ts`)

Principio rector: **ningún campo comercial es un valor suelto que pueda inventarse por accidente.** Todo campo que depende de evidencia externa (precio, disponibilidad, garantía, especificaciones, alcance de instalación, SKU de proveedor) es un objeto con su propio `status: "verified" | "requires_source" | "requires_test"`. Los componentes de presentación **leen ese status** y solo muestran el valor cuando es `"verified"`; en caso contrario muestran copy neutral (nunca inventado).

Campos principales del `Product`: `id`, `slug`, `atheronSku`, `supplier` (con su propio status), `brand`, `name`, `category`, `segment`, `images`, `headline`, `shortDescription`, `benefits`, `specifications` (agrupadas, cada ítem con status), `includedItems`/`excludedItems`, `useCases`, `installation`, `support`, `warranty`, `pricing`, `availability`, `growthPath` (referencia a la etapa en la Ruta de Crecimiento compartida), `relatedProducts`, `faq`, `testimonials`, `seo`.

### 1.2 Publicar un producto nuevo

1. Crear `src/lib/products/data/<slug>.ts` exportando un objeto `Product`.
2. Agregarlo al arreglo en `src/lib/products/registry.ts`.
3. Añadir su imagen en `public/products/<slug>/`.

No se toca ningún componente ni la ruta `src/app/productos/[slug]/page.tsx`, que ya usa `generateStaticParams()` sobre el registro.

### 1.3 Ruta de Crecimiento Atheron (`src/lib/growth/growth-path.ts`)

Lista compartida de 9 etapas (1 cámara → más cobertura → 4 cámaras → 8/16 cámaras → NVR/almacenamiento → alarmas → control de acceso → automatización → comercial/industrial). El componente `GrowthPath` (`src/components/product/GrowthPath.tsx`) la reutiliza en:
- Cada landing de producto, resaltando la etapa actual del producto (`product.growthPath.currentStageId`).
- La home (`/`) y `/soluciones`, como mapa general sin etapa resaltada.

### 1.4 Rutas creadas

| Ruta | Contenido |
|---|---|
| `/` | Home del ecosistema: hero, segmentos (hogar/finca/negocio), catálogo piloto, Ruta de Crecimiento |
| `/productos` | Índice de catálogo (hoy: 1 producto) |
| `/productos/[slug]` | Landing maestra parametrizada — ver §2 |
| `/soluciones` | Explicación del concepto de acompañamiento + Ruta de Crecimiento |
| `/empresas` | Página para segmento comercial/industrial |
| `/soporte` | Explicación de soporte antes/durante/después + WhatsApp |
| `/aviso-de-privacidad` | Borrador neutral, marcado explícitamente como pendiente de validación jurídica (ADR-0007) |
| `/api/design-my-system` | Route Handler POST, valida y **registra en log** (staging) |
| `/sitemap.xml`, `/robots.txt` | Generados dinámicamente desde el registro de productos |

### 1.5 Componentes de la landing de producto

`Hero`, `Benefits`, `UseCases`, `WhatsIncluded`, `Specifications`, `Support`, `Installation`, `GrowthPath`, `Warranty`, `Testimonials`, `Faq`, `RelatedProducts`, `FinalCta`, `ProductJsonLd`, `MobileStickyCta` — todos en `src/components/product/`, cada uno recibe `product: Product` (o `currentStageId` en el caso de `GrowthPath`) y no tiene datos hardcodeados.

Primitivas de UI reusables en `src/components/ui/`: `Container`, `Section`/`SectionHeading`, `Button`/`ButtonLink`, `Icon` (set propio de SVG inline, sin librería de íconos), `Breadcrumb`.

---

## 2. Producto piloto: EZVIZ H8C 4MP + MicroSD 64 GB

Archivo: `apps/web/src/lib/products/data/ezviz-h8c-4mp-64gb.ts`.

### 2.1 Datos usados como hecho (origen: encargo de esta tarea)

- Nombre del kit: "EZVIZ H8C 4MP + MicroSD 64 GB".
- Marca: EZVIZ. Modelo: H8C. Resolución: 4 MP.
- El kit incluye una tarjeta microSD de 64 GB.
- **Proveedor: SYSCOM Colombia** (ADR-0009, decisión ya tomada — no es una hipótesis). SKU de proveedor: `CSH8C4MPKIT` (dado explícitamente en el encargo).
- SKU Atheron generado por esta tarea (no es el SKU del proveedor, según ADR-0009): `ATH-CAM-EZV-H8C-4MP-64GB`.

**Corrección de esta iteración:** la primera versión marcaba `supplier.status = "requires_source"` y mostraba "Proveedor en validación", tratando a SYSCOM Colombia como si no fuera el proveedor definido. Es incorrecto separar así dos preguntas distintas: la **identidad** del proveedor (SYSCOM Colombia, ADR-0009) SÍ está verificada; lo que sigue sin verificar es la **oferta** de ese proveedor sobre este SKU (stock, costo, disponibilidad, condiciones comerciales — ver §2.2). Ahora `supplier.status = "verified"` y la ficha técnica muestra "Proveedor: SYSCOM Colombia" con status verificado; `pricing`/`availability`/`installation` siguen, cada uno, en `requires_source` por separado.

### 2.2 REQUIERE_FUENTE (no se muestran como hecho al usuario)

| Campo | Dónde vive en el código | Qué ve el usuario en su lugar |
|---|---|---|
| Precio de contado / crédito / inicial / cuotas | `pricing.status = "requires_source"` | "Precio y disponibilidad se confirman con un asesor Atheron según tu ciudad." |
| Disponibilidad / stock | `availability.status = "requires_source"` | Mismo copy que precio |
| Garantía (duración, cobertura) | `warranty.status = "requires_source"` | "Consulta las condiciones aplicables a este producto." (copy exacto pedido en el encargo) |
| Tiempo de entrega | No existe como campo con valor; FAQ lo trata explícitamente | "El tiempo de entrega se confirma con un asesor según tu ciudad y disponibilidad real." |
| Especificaciones ampliadas (visión nocturna, IP, PTZ, alimentación, conectividad) | `specifications[1].items[*].status = "requires_source"` | Fila de tabla con "Pendiente de confirmar" en vez de un valor |
| Alcance de instalación (qué incluye/excluye la instalación) | `installation.scopeIncluded/scopeExcluded.status = "requires_source"` | No se muestra un alcance detallado; se ofrece "Consultar con un asesor" |
| Inscripción de SYSCOM Colombia ante Supervigilancia como comercializador | No es un campo de `Product`; vive en la diligencia de ADR-0009 (pregunta 7) | No se expone al usuario final |
| Número de WhatsApp comercial real | `site-config.ts` (`NEXT_PUBLIC_ATHERON_WHATSAPP_NUMBER`) | **Sin placeholder funcional (corregido esta iteración).** Si la variable no está configurada, el CTA se muestra como `<button disabled>` "WhatsApp (próximamente)" — nunca navega a un número inventado. Ver §7 y §11.2 |

### 2.3 REQUIERE_PRUEBA

- Que el copy de beneficios y casos de uso (redactado en lenguaje general, sin afirmar capacidades técnicas no verificadas) convierte igual o mejor que una ficha con specs completas — solo se sabrá con tráfico real.
- Que el flujo "Diseñar mi sistema" (staging) captura los campos que un asesor realmente necesita para cotizar — pendiente de validar con el primer lote de leads reales una vez exista Atheron Core (M2).

---

## 3. Testimonios y prueba social

**Decisión CEO (esta iteración):** se agregó **un testimonio DEMO** para validar visualmente cómo se vería la sección, en vez de dejarla vacía.

- `Testimonial.isDemo: boolean` es obligatorio en el tipo (`src/lib/products/types.ts`). El único testimonio hoy tiene `isDemo: true`, `authorName: "Testimonio de demostración"`, y `source` dice explícitamente `"DEMO interno — placeholder de diseño... NO PUBLICAR COMO TESTIMONIO REAL"`.
- El componente `Testimonials` (`src/components/product/Testimonials.tsx`) renderiza cualquier tarjeta con `isDemo: true` con **borde discontinuo ámbar + insignia "DEMO"** visible, y agrega una nota bajo el encabezado de sección explicando que esa tarjeta no es un testimonio real. Es inequívoco tanto en datos como en UI — no hay forma de que se confunda con contenido de producción.
- El tipo ya soporta lo pedido para el futuro: `photoSrc`, `videoUrl`, `productOrProject`. Si un testimonio trae `videoUrl`, el componente reserva un marco de video sobre la cita — listo para **video-testimonios** sin rediseñar el componente.
- Antes de publicar en producción: **borrar el testimonio DEMO** (o cambiar `isDemo` no es suficiente — hay que reemplazarlo por datos reales) y agregar testimonios reales con su procedencia en `source`.

---

## 4. Consentimiento y datos personales (ADR-0007)

El formulario "Diseñar mi sistema" (`src/components/lead/DesignSystemModal.tsx`) implementa consentimiento granular por finalidad, cada casilla **separada y no preseleccionada**:

- `consentService` (obligatoria): autoriza el contacto para dar seguimiento a la solicitud. Enlaza al aviso de privacidad.
- `consentMarketingOwn` (opcional): comunicaciones comerciales de Atheron.
- `consentMarketingEcosystem` (opcional): ofertas de otras líneas del ecosistema.

El payload enviado a `/api/design-my-system` incluye estas tres banderas por separado, más UTM capturado (`src/lib/utm.ts`) y el contexto de producto — dejando el contrato de datos listo para cuando `LeadCreated` viaje a Atheron Core (ADR-0003), sin construir Core en esta tarea.

**Pendiente (documentado, no bloqueante para este piloto):** el aviso de privacidad en `/aviso-de-privacidad` es un borrador neutral explícitamente marcado como no válido legalmente — REQUIERE_FUENTE: validación jurídica antes de cualquier publicación real (ver ADR-0007, punto 9).

### 4.1 Modo demo/live y no registro de PII (corrección de esta iteración)

- **`src/lib/lead-mode.ts`** exporta `LEAD_CAPTURE_MODE: "demo" | "live"` (hoy `"demo"`). El endpoint incluye `mode` en su respuesta JSON; el modal lee ese `mode` y decide qué mensaje de éxito mostrar — **el servidor decide, el formulario no se rediseña** cuando exista backend real: basta con cambiar la constante (y el propio handler) para pasar a `"live"`.
  - `mode: "demo"` → "Flujo de demostración completado. La solicitud todavía no se envía a nuestro sistema comercial."
  - `mode: "live"` (futuro) → "Recibimos tu solicitud. Un asesor Atheron se pondrá en contacto contigo."
- **El log del servidor (`/api/design-my-system/route.ts`) ya NO registra `name` ni `whatsapp` completos.** Se registran solo como booleanos (`hasName`, `hasWhatsapp`) junto con el resto de campos no personales (ciudad, tipo de propiedad, consentimientos, UTM, contexto de producto). No hay persistencia en disco/BD — el log de consola es efímero, pero aun así no debía contener PII en texto plano.

---

## 5. SEO técnico implementado

- `title`/`description` por página vía `generateMetadata` (producto) y `export const metadata` (páginas estáticas).
- `alternates.canonical` en todas las páginas indexables.
- Open Graph (`title`, `description`, `url`, `images`, `locale`, `siteName`) en layout raíz y por producto.
- H1 único por página, HTML semántico (`header`, `nav`, `main`, `section`, `footer`, `dl`/`dt`/`dd` para specs, `details`/`summary` para FAQ).
- Breadcrumbs visibles (`Breadcrumb`) + `BreadcrumbList` en JSON-LD.
- **Product JSON-LD** (`src/lib/seo.ts` → `ProductJsonLd`): incluye `name`, `brand`, `sku`, `description`, `url`. **El nodo `offers` solo se agrega si `pricing.status === "verified"` Y `availability.status === "verified"`** — instrucción explícita del encargo. Para el producto piloto, `offers` **no se emite** porque ninguno de los dos está verificado. **Corrección de esta iteración:** `image` tampoco se emite — la única imagen del producto es un placeholder ilustrativo (`isPlaceholder: true`), y declararla en datos estructurados la presentaría como fotografía verificable del producto, lo cual no es honesto. `buildProductJsonLd()` filtra `product.images` por `!isPlaceholder`; el campo `image` reaparece automáticamente en cuanto exista al menos una foto real en los datos del producto, sin tocar el componente.
- `sitemap.xml` y `robots.txt` generados dinámicamente (`src/app/sitemap.ts`, `src/app/robots.ts`) a partir del registro de productos — publicar un producto nuevo lo agrega automáticamente al sitemap.
- Imágenes con `next/image` (`fill` + `sizes` correctos, `object-contain`), placeholder SVG propio marcado visualmente como "Imagen ilustrativa".
- Enlaces internos: nav principal, breadcrumbs, productos relacionados, CTAs cruzados entre home/productos/soluciones.
- **Corrección de esta iteración — duplicación de marca en `<title>`:** el layout raíz ya aplica `template: "%s | Atheron Security"`. La home y el producto piloto pasaban un `title` que **ya incluía** "Atheron Security", generando `"... | Atheron Security | Atheron Security"`. Se corrigió: `product.seo.title` y el `title` de la home ahora son el nombre plano (sin marca); el template la agrega una sola vez. El `openGraph.title` usa el mismo título plano y confía en `openGraph.siteName` para transmitir la marca (así lo especifica Open Graph), en vez de concatenarla a mano.
- **`NEXT_PUBLIC_SITE_URL` sin fallback silencioso a `localhost` en producción:** `site-config.ts` solo usa `http://localhost:3000` como fallback en desarrollo. Si el build es de producción (`NODE_ENV=production`) y la variable no está configurada, usa `https://pending-site-url.atheron.invalid` (dominio reservado por RFC 2606, nunca resuelve) y emite un `console.warn` ruidoso en el log de build/despliegue. Así, un `canonical`, un `sitemap.xml` o un JSON-LD mal configurado en un preview real nunca apunta silenciosamente a `localhost` — la falla es imposible de pasar desapercibida.

---

## 6. Pruebas ejecutadas

Todas ejecutadas en `apps/web/`:

| Paso | Resultado |
|---|---|
| `npm install` | OK — 365 paquetes, 0 vulnerabilidades |
| `npx next typegen` | OK — tipos de rutas regenerados (re-ejecutado tras cada cambio de rutas) |
| `npx tsc --noEmit` | **0 errores** (verificado de nuevo tras la iteración de hardening) |
| `npm run lint` (ESLint, `eslint-config-next`) | **0 errores, 0 warnings** (verificado de nuevo tras la iteración de hardening) |
| `npm run build` (`next build`, Turbopack) | **Compiló exitosamente**, dos veces (antes y después de agregar `browserslist` — ver §11.4). 13 rutas generadas, incluida `/productos/ezviz-h8c-4mp-64gb` como SSG (`generateStaticParams`) |
| `npm run start` + QA con Playwright (Chromium headless preinstalado) | Ver §6.1 |
| Lighthouse real sobre build de producción (home + producto, mobile + desktop) | Ver §11 |

### 6.1 QA visual y funcional (Playwright, sin servicio externo)

Se navegaron `/` y `/productos/ezviz-h8c-4mp-64gb` en **375px, 768px y 1440px**:

- **0 errores de consola, 0 `pageerror`, 0 overflow horizontal** en las 6 combinaciones página×ancho.
- Capturas de pantalla completas revisadas visualmente: jerarquía visual, contraste, tipografía y espaciado consistentes con la dirección visual pedida (blanco/azul/azul oscuro/grises, sin gradientes excesivos, sin sliders).
- **Menú móvil** (checkbox + `peer-checked`, sin JS): abre y cierra correctamente en 375px.
- **Modal "Diseñar mi sistema"**: abre como `<dialog>` nativo, formulario completo, validación de campos requeridos y de consentimiento obligatorio.
- **Envío del formulario**: petición a `/api/design-my-system` respondida `200`, payload visible en el log del servidor **sin PII** (confirmando que el flujo end-to-end de staging funciona sin tocar ningún sistema productivo ni registrar datos personales), estado de éxito mostrado en la UI con el copy de modo demo ("Flujo de demostración completado...").
- **CTA sticky móvil**: presente y funcional en la landing de producto (`MobileStickyCta`), con "Diseñar mi sistema" (activo) + WhatsApp (estado "próximamente", deshabilitado — ver §11.2).
- **Sección Ruta de Crecimiento**: revisada en los tres anchos tras el rediseño de grilla (§11.3); en producto resalta la etapa "1 cámara" con la insignia "Estás aquí"; en home/soluciones resalta la misma etapa como "Punto de partida".
- **Testimonio DEMO**: verificado visualmente en 375/768/1440px — insignia "DEMO" y borde ámbar discontinuo claramente distinguibles del resto de la landing.
- Repetido íntegramente tras la iteración de hardening: **0 errores de consola, 0 `pageerror`, 0 respuestas HTTP ≥ 400, 0 overflow horizontal** en las 6 combinaciones página×ancho.

No se generó ningún despliegue de vista previa externo (no hay integración de hosting configurada en este piloto); el QA se hizo localmente contra `next build && next start`.

---

## 7. Configuración pendiente antes de un despliegue real

Ver `apps/web/.env.example`:

- `NEXT_PUBLIC_SITE_URL`: URL pública real del sitio (para metadata absoluta, JSON-LD, sitemap).
- `NEXT_PUBLIC_ATHERON_WHATSAPP_NUMBER`: **REQUIERE_FUENTE.** Número de WhatsApp Business real de Atheron. **Decisión CEO (esta iteración): se configura después, y hasta entonces NO se usa ningún número ficticio.** Sin esta variable, `WhatsappCta` (`src/components/ui/WhatsappCta.tsx`) renderiza un `<button disabled>` real — "WhatsApp (próximamente)", con `title` explicando el estado — en vez de un enlace `wa.me` a un número inventado. Todos los puntos de contacto (Hero, CTA final, sticky móvil, Home, Empresas, Soporte) pasan por este único componente, así que activar el canal real es: configurar la variable de entorno y redesplegar — cero cambios de código.

---

## 8. Deuda pendiente / fuera de alcance de esta tarea

- Conexión real a Atheron Core / Odoo / WhatsApp Cloud API / n8n / Redis (explícitamente fuera de alcance del encargo).
- Ficha técnica completa del producto piloto (visión nocturna, IP, PTZ, alimentación, conectividad) — requiere la hoja de datos real del proveedor.
- Precio, disponibilidad, garantía y tiempo de entrega reales — requieren costeo verificado (M1 del MVP) y aprobación de Marlon, y en cualquier caso **no pueden activarse comercialmente hasta cerrar el gate regulatorio G0/R01** (permiso Supervigilancia).
- Aviso de privacidad definitivo — requiere validación jurídica (ADR-0007).
- Número de WhatsApp Business real (arquitectura ya lista para activarlo — ver §7).
- Favicon/marca real (hoy usa el favicon por defecto de Next.js — no se inventó un logo).
- Testimonios reales, cuando existan (hoy hay un testimonio DEMO explícitamente marcado, no real — ver §3).
- Productos relacionados reales (`relatedProducts` está vacío porque solo hay un producto publicado).
- Dominio y hosting definitivos — explícitamente fuera de alcance de esta iteración (decisión CEO); se decide después de aprobar visualmente la landing.

---

## 9. Siguiente paso recomendado

Publicar el segundo producto de la línea Hogar sobre esta misma plantilla (agregando solo un archivo de datos, sin tocar componentes), para validar en la práctica el principio "una plantilla, N productos" antes de invertir en más piloto de contenido. En paralelo, avanzar M1 (costeo real) para poder pasar los campos `requires_source` de precio/garantía/disponibilidad a `verified` en cuanto exista evidencia, sin cambiar ni una línea de los componentes.

---

## 10. Decisiones técnicas tomadas sin bloquear (reversibles, documentadas aquí)

1. **Ubicación en `apps/web/`** en vez de la raíz del repo — deja espacio para Atheron Core u otros servicios sin herramientas de monorepo todavía.
2. **Sin librería de íconos ni de utilidades de clases** (`clsx`, `lucide-react`, etc.) — set de SVG inline propio (`src/components/ui/Icon.tsx`) y un `cn()` de una línea, para no instalar dependencias innecesarias en un piloto de este tamaño.
3. **Menú móvil y FAQ sin JavaScript** (checkbox hack + `<details>`) — reduce el JS enviado al cliente y es coherente con "Client Components únicamente donde haya interacción real".
4. **Número de WhatsApp como variable de entorno, sin placeholder funcional** (corregido en la iteración de hardening — ver §11.2): mientras no esté configurada, el CTA se muestra deshabilitado en vez de navegar a un número inventado.
5. **`/aviso-de-privacidad` publicado como borrador visible**, no omitido — la casilla de consentimiento necesita un enlace real para ser válida como evidencia (ADR-0007), aunque el texto final quede pendiente de abogado.
6. **`WhatsappCta` como componente único** para todo el sitio en vez de repetir `buildWhatsappLink` + `ButtonLink` en cada página — un solo lugar decide "número verificado vs. próximamente", así que activar WhatsApp real es un cambio de una sola pieza.
7. **`browserslist` explícito en `package.json`** (últimas 2 versiones de Chrome/Firefox/Safari/Edge/iOS/ChromeAndroid) para que el compilador no genere *shims* de compatibilidad con navegadores muy antiguos que este piloto no necesita soportar — ver §11.4. Reversible: basta con ampliar la lista si en algún momento se requiere soporte más amplio.
8. **Grilla de la Ruta de Crecimiento: de 9 columnas a 5 (dos filas)** — a 1440px, 9 columnas dejaban cada tarjeta en ~110px de ancho, casi ilegible. La secuencia narrativa se conserva con la flecha dentro de cada tarjeta, no con el conteo de columnas.
9. **Modo demo/live decidido por el servidor, no por el formulario** (`lib/lead-mode.ts`) — cambiar de staging a un backend real no requiere tocar `DesignSystemModal`, solo el endpoint.

---

## 11. REVISIÓN AGENTE B — HARDENING 001A

Iteración ejecutada el mismo día sobre nuevas decisiones del CEO. Todos los números de esta sección son **medidos**, no estimados — `docs/qa/lighthouse-ath-security-web-001/*.report.json` (y su `.html` correspondiente) quedan versionados como evidencia cruda.

### 11.1 Auditoría Lighthouse — build de producción real

Ejecutada contra `next build && next start` (sin `next dev`), con Chromium headless preinstalado del entorno. Método de *throttling*: `simulate` (estándar de Lighthouse para mobile/desktop lab data).

| Ruta | Dispositivo | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | Mobile | **98** | **100** | **100** | **100** | 2.2 s | 0 | 120 ms |
| `/` | Desktop | **100** | **100** | **100** | **100** | 0.6 s | 0 | 30 ms |
| `/productos/ezviz-h8c-4mp-64gb` | Mobile | **99** | **100** | **100** | **100** | 2.1 s | 0 | 60 ms |
| `/productos/ezviz-h8c-4mp-64gb` | Desktop | **100** | **100** | **100** | **100** | 0.5 s | 0 | 0 ms |

**Accessibility, Best Practices y SEO: 100/100 en las 4 combinaciones**, sin excepciones ni auditorías desactivadas.

**Performance: 98–100.** Desktop llega a 100 en ambas rutas. Mobile queda en 98 (home) y 99 (producto) — no en 100 literal. Causa real, no estimada: de los cinco componentes que pesan en el puntaje de Performance (FCP 10%, LCP 25%, TBT 30%, CLS 25%, SI 10%), los únicos por debajo del 100% son `largest-contentful-paint` (95% en home, 96% en producto) y, en home, `total-blocking-time` (97%). Es decir, el LCP mobile simulado queda en 2.1–2.2 s — dentro del objetivo `≤ 2.5 s` del encargo, pero no en el mínimo absoluto de la curva de puntaje de Lighthouse. **Se documenta honestamente en vez de forzarlo:** exprimir ese último 1–2% implicaría reducir aún más el JavaScript de framework (React + Next.js runtime, ~140 KB transferidos/gzip), lo cual entra en conflicto directo con el stack exigido (Next.js App Router con Client Components reales para el modal de contacto). No se aplicó ningún truco que empeore la UX real (no se quitó el modal, no se de-hidrató nada a la fuerza).

**CLS = 0 en las 4 combinaciones.** Ningún salto de layout medido.

Reportes completos (JSON crudo + HTML navegable) en `docs/qa/lighthouse-ath-security-web-001/`:
`home-mobile`, `home-desktop`, `producto-mobile`, `producto-desktop` (`.report.json` + `.report.html` cada uno).

### 11.2 WhatsApp sin número ficticio

- `siteConfig.whatsappNumber` es `null` hasta que exista `NEXT_PUBLIC_ATHERON_WHATSAPP_NUMBER`. `buildWhatsappLink()` devuelve `null` en ese caso — ya no genera un enlace `wa.me` con un número de relleno.
- `WhatsappCta` (nuevo, `src/components/ui/WhatsappCta.tsx`) es el único punto donde se decide qué mostrar: enlace real si `href` existe, o un `<button disabled>` — "WhatsApp (próximamente)" — con `title` explicativo si no. Es un botón nativo deshabilitado, no un enlace falso: se ve terminado, no navega a ningún lado, y un lector de pantalla lo anuncia como deshabilitado.
- Todos los puntos de contacto migraron a este componente: Hero y CTA final de producto, sticky móvil, Home, `/empresas`, `/soporte`.

### 11.3 Ruta de Crecimiento Atheron — rediseño de grilla

Antes: `lg:grid-cols-9` — a 1440px cada tarjeta quedaba en ~110px de ancho, título y descripción casi ilegibles (detectado en la revisión visual del CEO). Ahora: `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5` — envuelve en dos filas (5 + 4) con casi el doble de ancho por tarjeta, conservando la secuencia con la flecha dentro de cada una. Además, sin `currentStageId` (home/soluciones) la primera etapa ahora se resalta como **"Punto de partida"** en vez de quedar sin marcar — el bloque siempre se lee como "empiezas aquí", nunca como tabla suelta, tal como se pidió.

### 11.4 Optimización de performance aplicada (no solo medida)

- **`browserslist` en `package.json`** limitado a navegadores evergreen (últimas 2 versiones de Chrome/Firefox/Safari/Edge/iOS/ChromeAndroid). Antes de este cambio, el compilador incluía *shims* de compatibilidad para navegadores antiguos (detectados por Lighthouse: `Array.prototype.at/flat/flatMap`, `Object.fromEntries/hasOwn`, `String.prototype.trimStart/End`) que este piloto no necesita soportar. Efecto medido en home mobile: **Performance 88 → 97** en la misma máquina, mismo build salvo este cambio (LCP 2.7 s → 2.2 s, TBT 330 ms → 150 ms).
- **Corrección de accesibilidad real, no cosmética:** `aria-label` en un `<label>` nativo es inválido (axe: `aria-prohibited-attr`) porque un `<label>` no tiene rol ARIA propio — se movió el nombre accesible a un `<span className="sr-only">` dentro de cada label. Además, en desktop ambos `<label>` del menú móvil quedan en `display:none` (`md:hidden`), y un `<label for>` oculto así sale del árbol de accesibilidad — se agregó `aria-label` directamente al `<input type="checkbox">` (ahí sí es válido) para que el control conserve nombre accesible en cualquier ancho.
- **Nota metodológica honesta:** durante esta iteración, una corrida de Lighthouse quedó contaminada por un proceso `next start` obsoleto que no liberó el puerto 3000 entre rebuilds (error `EADDRINUSE` silencioso en el intento nuevo), sirviendo una mezcla de build antiguo/nuevo con un error 500 en el CSS. Se detectó por el propio audit (`errors-in-console`), se identificó la causa raíz (proceso zombie en el puerto), se mató el proceso correcto y se repitió la medición limpia. Los números de §11.1 son de la corrida limpia, verificada sin errores de red ni de consola.

### 11.5 Copy central corregido

"Atheron no vende cámaras sueltas" (técnicamente falso: Atheron sí puede vender solo el equipo) se reemplazó por una formulación que sí es cierta y más fuerte en CRO: **"ATHERON no solo vende cámaras. Puedes empezar comprando un solo equipo, y te acompañamos a construir un sistema completo a medida que crecen tus necesidades."** Aplicado de forma consistente en Home, `/soluciones` y el bloque Ruta de Crecimiento (compartido también por la landing de producto).

### 11.6 Preview para revisión del CEO

No hay integración de hosting configurada en este entorno (decisión explícita: no desplegar por cuenta propia sin aprobación). Para esta revisión se entregan:

- Capturas de pantalla completas (desktop 1440px y móvil 375px) de home y del producto piloto, enviadas junto con este reporte.
- Los 8 reportes Lighthouse (JSON + HTML) en `docs/qa/lighthouse-ath-security-web-001/`, navegables abriendo el `.html` en cualquier navegador.

**Instrucciones exactas para generar un preview real en el siguiente gate** (cuando se decida dominio/hosting):
1. Elegir proveedor (Vercel es el camino de menor fricción para Next.js App Router, pero cualquier proveedor con Node.js 20+ sirve — no se decide aquí, ver §8).
2. Conectar el repositorio, apuntando el *root directory* del proyecto a `apps/web/`.
3. Configurar `NEXT_PUBLIC_SITE_URL` con la URL real que asigne el proveedor (o el dominio definitivo) — sin esto, `site-config.ts` usa el dominio placeholder `*.invalid` y lo advierte en el log de build (ver §5).
4. Dejar `NEXT_PUBLIC_ATHERON_WHATSAPP_NUMBER` sin configurar hasta tener el número real — el sitio se ve terminado igual (§11.2).
5. Desplegar la rama `pilot/ath-security-web-001` como *preview*, nunca como producción del dominio definitivo, hasta que este gate visual se apruebe.

### 11.7 QA repetido tras esta iteración

`npx next typegen`, `npx tsc --noEmit` (0 errores), `npm run lint` (0 errores/warnings) y `npm run build` se repitieron después de cada bloque de cambios (no solo al final) y quedaron limpios. El QA responsive con Playwright (375/768/1440px, las 6 combinaciones página×ancho) se repitió íntegro tras todos los cambios: 0 errores de consola, 0 `pageerror`, 0 respuestas HTTP ≥ 400, 0 overflow horizontal.

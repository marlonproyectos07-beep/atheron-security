# ATH-SECURITY-WEB-001 — Landing maestra, producto piloto

**Autor:** Claude Code · **Fecha:** 26 de septiembre de 2026
**Rama:** `pilot/ath-security-web-001` (creada desde `claude/audit-atheron-ecosystem-v1`)
**Estado:** IMPLEMENTADO. Corresponde a M3 del `MVP-30-DAYS-v1` ("Plantilla maestra de landing") y respeta el gate regulatorio de ADR-0014 (construcción sí, activación comercial no).

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
- Referencia de proveedor: `CSH8C4MPKIT` (dada explícitamente en el encargo; se guarda como referencia interna/técnica, no como afirmación comercial al usuario final).
- SKU Atheron generado por esta tarea (no es el SKU del proveedor, según ADR-0009): `ATH-CAM-EZV-H8C-4MP-64GB`.

### 2.2 REQUIERE_FUENTE (no se muestran como hecho al usuario)

| Campo | Dónde vive en el código | Qué ve el usuario en su lugar |
|---|---|---|
| Precio de contado / crédito / inicial / cuotas | `pricing.status = "requires_source"` | "Precio y disponibilidad se confirman con un asesor Atheron según tu ciudad." |
| Disponibilidad / stock | `availability.status = "requires_source"` | Mismo copy que precio |
| Garantía (duración, cobertura) | `warranty.status = "requires_source"` | "Consulta las condiciones aplicables a este producto." (copy exacto pedido en el encargo) |
| Tiempo de entrega | No existe como campo con valor; FAQ lo trata explícitamente | "El tiempo de entrega se confirma con un asesor según tu ciudad y disponibilidad real." |
| Especificaciones ampliadas (visión nocturna, IP, PTZ, alimentación, conectividad) | `specifications[1].items[*].status = "requires_source"` | Fila de tabla con "Pendiente de confirmar" en vez de un valor |
| Alcance de instalación (qué incluye/excluye la instalación) | `installation.scopeIncluded/scopeExcluded.status = "requires_source"` | No se muestra un alcance detallado; se ofrece "Consultar con un asesor" |
| SKU/estado del proveedor ante Supervigilancia | `supplier.status = "requires_source"` | No se expone al usuario final; es un campo interno para la diligencia de ADR-0009 |
| Número de WhatsApp comercial real | `site-config.ts` (`NEXT_PUBLIC_ATHERON_WHATSAPP_NUMBER`) | Placeholder de formato válido si la variable de entorno no está configurada — ver §7 |

### 2.3 REQUIERE_PRUEBA

- Que el copy de beneficios y casos de uso (redactado en lenguaje general, sin afirmar capacidades técnicas no verificadas) convierte igual o mejor que una ficha con specs completas — solo se sabrá con tráfico real.
- Que el flujo "Diseñar mi sistema" (staging) captura los campos que un asesor realmente necesita para cotizar — pendiente de validar con el primer lote de leads reales una vez exista Atheron Core (M2).

---

## 3. Testimonios y prueba social

No se publicó ningún testimonio. El componente `Testimonials` soporta un arreglo `testimonials: Testimonial[]` en el modelo de producto; hoy está vacío y el componente muestra un estado neutral ("Todavía no publicamos testimonios para este producto..."). Cuando existan testimonios reales, se agregan como datos — el componente no cambia.

---

## 4. Consentimiento y datos personales (ADR-0007)

El formulario "Diseñar mi sistema" (`src/components/lead/DesignSystemModal.tsx`) implementa consentimiento granular por finalidad, cada casilla **separada y no preseleccionada**:

- `consentService` (obligatoria): autoriza el contacto para dar seguimiento a la solicitud. Enlaza al aviso de privacidad.
- `consentMarketingOwn` (opcional): comunicaciones comerciales de Atheron.
- `consentMarketingEcosystem` (opcional): ofertas de otras líneas del ecosistema.

El payload enviado a `/api/design-my-system` incluye estas tres banderas por separado, más UTM capturado (`src/lib/utm.ts`) y el contexto de producto — dejando el contrato de datos listo para cuando `LeadCreated` viaje a Atheron Core (ADR-0003), sin construir Core en esta tarea.

**Pendiente (documentado, no bloqueante para este piloto):** el aviso de privacidad en `/aviso-de-privacidad` es un borrador neutral explícitamente marcado como no válido legalmente — REQUIERE_FUENTE: validación jurídica antes de cualquier publicación real (ver ADR-0007, punto 9).

---

## 5. SEO técnico implementado

- `title`/`description` por página vía `generateMetadata` (producto) y `export const metadata` (páginas estáticas).
- `alternates.canonical` en todas las páginas indexables.
- Open Graph (`title`, `description`, `url`, `images`, `locale`, `siteName`) en layout raíz y por producto.
- H1 único por página, HTML semántico (`header`, `nav`, `main`, `section`, `footer`, `dl`/`dt`/`dd` para specs, `details`/`summary` para FAQ).
- Breadcrumbs visibles (`Breadcrumb`) + `BreadcrumbList` en JSON-LD.
- **Product JSON-LD** (`src/lib/seo.ts` → `ProductJsonLd`): incluye `name`, `brand`, `sku`, `description`, `image`, `url`. **El nodo `offers` solo se agrega si `pricing.status === "verified"` Y `availability.status === "verified"`** — instrucción explícita del encargo. Para el producto piloto, `offers` **no se emite** porque ninguno de los dos está verificado.
- `sitemap.xml` y `robots.txt` generados dinámicamente (`src/app/sitemap.ts`, `src/app/robots.ts`) a partir del registro de productos — publicar un producto nuevo lo agrega automáticamente al sitemap.
- Imágenes con `next/image` (`fill` + `sizes` correctos, `object-contain`), placeholder SVG propio marcado visualmente como "Imagen ilustrativa".
- Enlaces internos: nav principal, breadcrumbs, productos relacionados, CTAs cruzados entre home/productos/soluciones.

---

## 6. Pruebas ejecutadas

Todas ejecutadas en `apps/web/`:

| Paso | Resultado |
|---|---|
| `npm install` | OK — 365 paquetes, 0 vulnerabilidades |
| `npx next typegen` | OK — tipos de rutas regenerados |
| `npx tsc --noEmit` | **0 errores** |
| `npm run lint` (ESLint, `eslint-config-next`) | **0 errores, 0 warnings** |
| `npm run build` (`next build`, Turbopack) | **Compiló exitosamente.** 13 rutas generadas, incluida `/productos/ezviz-h8c-4mp-64gb` como SSG (`generateStaticParams`) |
| `npm run start` + QA con Playwright (Chromium headless preinstalado) | Ver §6.1 |

### 6.1 QA visual y funcional (Playwright, sin servicio externo)

Se navegaron `/` y `/productos/ezviz-h8c-4mp-64gb` en **375px, 768px y 1440px**:

- **0 errores de consola, 0 `pageerror`, 0 overflow horizontal** en las 6 combinaciones página×ancho.
- Capturas de pantalla completas revisadas visualmente: jerarquía visual, contraste, tipografía y espaciado consistentes con la dirección visual pedida (blanco/azul/azul oscuro/grises, sin gradientes excesivos, sin sliders).
- **Menú móvil** (checkbox + `peer-checked`, sin JS): abre y cierra correctamente en 375px.
- **Modal "Diseñar mi sistema"**: abre como `<dialog>` nativo, formulario completo, validación de campos requeridos y de consentimiento obligatorio.
- **Envío del formulario**: petición a `/api/design-my-system` respondida `200`, payload visible en el log del servidor (confirmando que el flujo end-to-end de staging funciona sin tocar ningún sistema productivo), estado de éxito mostrado en la UI.
- **CTA sticky móvil**: presente y funcional en la landing de producto (`MobileStickyCta`), con WhatsApp + "Diseñar mi sistema".
- **Sección Ruta de Crecimiento**: revisada en los tres anchos; en producto resalta la etapa "1 cámara" con la insignia "Estás aquí"; en home/soluciones se muestra sin resaltar ninguna etapa.

No se generó ningún despliegue de vista previa externo (no hay integración de hosting configurada en este piloto); el QA se hizo localmente contra `next build && next start`.

---

## 7. Configuración pendiente antes de un despliegue real

Ver `apps/web/.env.example`:

- `NEXT_PUBLIC_SITE_URL`: URL pública real del sitio (para metadata absoluta, JSON-LD, sitemap).
- `NEXT_PUBLIC_ATHERON_WHATSAPP_NUMBER`: **REQUIERE_FUENTE.** Número de WhatsApp Business real de Atheron. Sin configurar, el sitio usa un placeholder de formato válido (`573000000000`) para que los CTAs de WhatsApp sigan siendo funcionales en QA/staging, pero no apuntan a un número real.

---

## 8. Deuda pendiente / fuera de alcance de esta tarea

- Conexión real a Atheron Core / Odoo / WhatsApp Cloud API / n8n / Redis (explícitamente fuera de alcance del encargo).
- Ficha técnica completa del producto piloto (visión nocturna, IP, PTZ, alimentación, conectividad) — requiere la hoja de datos real del proveedor.
- Precio, disponibilidad, garantía y tiempo de entrega reales — requieren costeo verificado (M1 del MVP) y aprobación de Marlon, y en cualquier caso **no pueden activarse comercialmente hasta cerrar el gate regulatorio G0/R01** (permiso Supervigilancia).
- Aviso de privacidad definitivo — requiere validación jurídica (ADR-0007).
- Número de WhatsApp Business real.
- Favicon/marca real (hoy usa el favicon por defecto de Next.js — no se inventó un logo).
- Testimonios reales, cuando existan.
- Productos relacionados reales (`relatedProducts` está vacío porque solo hay un producto publicado).

---

## 9. Siguiente paso recomendado

Publicar el segundo producto de la línea Hogar sobre esta misma plantilla (agregando solo un archivo de datos, sin tocar componentes), para validar en la práctica el principio "una plantilla, N productos" antes de invertir en más piloto de contenido. En paralelo, avanzar M1 (costeo real) para poder pasar los campos `requires_source` de precio/garantía/disponibilidad a `verified` en cuanto exista evidencia, sin cambiar ni una línea de los componentes.

---

## 10. Decisiones técnicas tomadas sin bloquear (reversibles, documentadas aquí)

1. **Ubicación en `apps/web/`** en vez de la raíz del repo — deja espacio para Atheron Core u otros servicios sin herramientas de monorepo todavía.
2. **Sin librería de íconos ni de utilidades de clases** (`clsx`, `lucide-react`, etc.) — set de SVG inline propio (`src/components/ui/Icon.tsx`) y un `cn()` de una línea, para no instalar dependencias innecesarias en un piloto de este tamaño.
3. **Menú móvil y FAQ sin JavaScript** (checkbox hack + `<details>`) — reduce el JS enviado al cliente y es coherente con "Client Components únicamente donde haya interacción real".
4. **Número de WhatsApp como variable de entorno con placeholder** — mantiene el flujo de QA funcional sin fingir que existe un número comercial confirmado.
5. **`/aviso-de-privacidad` publicado como borrador visible**, no omitido — la casilla de consentimiento necesita un enlace real para ser válida como evidencia (ADR-0007), aunque el texto final quede pendiente de abogado.

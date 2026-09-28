import type { Product } from "@/lib/products/types";

/**
 * PLANTILLA — catálogo Línea Hogar (10 productos EZVIZ pendientes de fuente).
 *
 * Este archivo NO se registra en `registry.ts` — no se publica nada con
 * solo tenerlo aquí. Es la forma más rápida de cargar los 10 productos
 * reales una vez que llegue el contenido aprobado: duplicar este archivo
 * por producto (p. ej. `ezviz-h1c-2mp.ts`), reemplazar cada `FALTA:` por
 * el dato real, borrar los campos que no apliquen y agregar la línea en
 * `registry.ts` (import + al array `PRODUCTS`).
 *
 * Regla de origen (igual que el resto del catálogo — ver
 * ezviz-h8c-4mp-64gb.ts): un campo solo se marca `status: "verified"`
 * si viene de la ficha aprobada real. Todo lo que no venga de esa fuente
 * queda `status: "requires_source"` con copy neutral — nunca un valor
 * inventado ni una `internalNote` que suene a hecho verificado.
 *
 * Por producto, esto es lo que hace falta de la ficha aprobada en Drive
 * (Atheron Security/Catálogo/Línea Hogar) para completar esta plantilla:
 *   1. Nombre comercial exacto y modelo (p. ej. "EZVIZ H1c 2MP")
 *   2. SKU/referencia del proveedor + nombre del proveedor
 *   3. Al menos 1 fotografía real del equipo (archivo de imagen, no ficha en PDF)
 *   4. Ficha técnica: resolución, conectividad, alimentación, IP/intemperie,
 *      alcance de visión nocturna, almacenamiento soportado, ángulo/PTZ si aplica
 *   5. Qué incluye el kit (ítems exactos, p. ej. si trae microSD y de qué capacidad)
 *   6. Copy comercial aprobado (headline corto + descripción), o el texto
 *      fuente de la ficha para no redactarlo sin respaldo
 *   7. Precio/garantía/disponibilidad — SOLO si la ficha ya los define;
 *      si no, se dejan `requires_source` (no se inventan)
 */
export const templateProduct: Product = {
  id: "FALTA: slug-del-producto",
  slug: "FALTA: slug-del-producto",
  atheronSku: "FALTA: SKU interno Atheron (seguir el patrón ATH-CAM-EZV-...)",
  supplier: {
    name: "FALTA: proveedor (confirmar si sigue siendo SYSCOM Colombia)",
    sku: "FALTA: SKU del proveedor",
    status: "requires_source",
  },
  brand: "EZVIZ",
  name: "FALTA: nombre comercial exacto de la ficha aprobada",
  category: "Cámaras de videovigilancia",
  segment: ["hogar"],
  images: [
    {
      src: "FALTA: /products/<slug>/hero.jpg — foto real, no placeholder",
      alt: "FALTA: alt text descriptivo del producto real",
      isPlaceholder: true,
    },
  ],
  headline: "FALTA: copy corto aprobado (no redactar sin fuente)",
  shortDescription: "FALTA: descripción corta aprobada",
  benefits: [],
  specifications: [
    {
      title: "Identificación",
      items: [
        { label: "Marca", value: "EZVIZ", status: "verified" },
        { label: "Modelo", value: "FALTA", status: "requires_source" },
        { label: "Resolución", value: "FALTA", status: "requires_source" },
      ],
    },
    {
      title: "Ficha técnica ampliada",
      items: [
        { label: "Alcance de visión nocturna", value: "Pendiente de confirmar", status: "requires_source" },
        { label: "Resistencia a intemperie (IP)", value: "Pendiente de confirmar", status: "requires_source" },
        { label: "Ángulo de cobertura / PTZ", value: "Pendiente de confirmar", status: "requires_source" },
        { label: "Alimentación", value: "Pendiente de confirmar", status: "requires_source" },
        { label: "Conectividad", value: "Pendiente de confirmar", status: "requires_source" },
        { label: "Almacenamiento soportado", value: "Pendiente de confirmar", status: "requires_source" },
      ],
    },
  ],
  includedItems: ["FALTA: ítems exactos del kit según ficha aprobada"],
  excludedItems: [
    "Instalación (se solicita por separado)",
    "Cableado, soportes o accesorios adicionales no listados arriba",
  ],
  useCases: [],
  installation: {
    offersEquipmentOnly: true,
    offersInstallationRequest: true,
    scopeIncluded: { value: [], status: "requires_source" },
    scopeExcluded: { value: [], status: "requires_source" },
  },
  support: {
    before: "Un asesor Atheron te ayuda a confirmar si este equipo resuelve lo que necesitas antes de comprar.",
    during: "Acompañamiento durante la configuración inicial y, si la solicitas, la instalación.",
    after: "Canal de soporte disponible después de tu compra para resolver dudas sobre el equipo.",
  },
  warranty: {
    status: "requires_source",
    durationMonths: null,
    coverageSummary: null,
    fallbackCopy: "Consulta las condiciones aplicables a este producto.",
  },
  pricing: {
    status: "requires_source",
    cashPrice: null,
    creditPrice: null,
    downPayment: null,
    installments: null,
  },
  availability: {
    status: "requires_source",
    state: "unknown",
    leadTimeDays: null,
  },
  growthPath: {
    currentStageId: "one-camera",
  },
  relatedProducts: [],
  faq: [],
  testimonials: [],
  seo: {
    title: "FALTA: título SEO (normalmente = name)",
    description: "FALTA: description SEO aprobada",
    canonicalPath: "/productos/FALTA-slug-del-producto",
    ogImageSrc: "/og-default.png",
  },
};

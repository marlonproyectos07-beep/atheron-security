import type { Product } from "@/lib/products/types";

/**
 * Catálogo Línea Hogar — EZVIZ H3c KIT 4MP 64GB.
 *
 * REGLA DE ORIGEN DE DATOS (igual que ezviz-h8c-4mp-64gb.ts): solo se
 * afirma como hecho al usuario lo dado explícitamente por el mandato de
 * carga de catálogo (nombre, referencia, especificaciones, contado y
 * crédito con sus componentes). Todo lo no dado (garantía, disponibilidad/
 * stock, alcance de instalación no listado, total de crédito cuando no
 * vino claramente definido) queda `requires_source` con copy neutral —
 * nunca un valor inventado. Sin fotografía real disponible: `images[0]`
 * usa el marcador neutro compartido (`_placeholder/no-image.svg`,
 * `isPlaceholder: true`) en vez de una imagen inventada.
 */
export const ezvizH3cKit4mp64gb: Product = {
  id: "ezviz-h3c-kit-4mp-64gb",
  slug: "ezviz-h3c-kit-4mp-64gb",
  atheronSku: "ATH-CAM-EZV-H3C-4MP-64GB",
  supplier: {
    name: "SYSCOM Colombia",
    sku: "CS-H3C-4MP-KIT",
    status: "verified",
  },
  brand: "EZVIZ",
  name: "EZVIZ H3c KIT 4MP 64GB",
  category: "Cámaras de videovigilancia",
  segment: ["hogar"],
  images: [
    {
      src: "/products/_placeholder/no-image.svg",
      alt: "EZVIZ H3c KIT 4MP 64GB — imagen no disponible todavía",
      isPlaceholder: true,
    },
  ],
  headline: "EZVIZ H3c KIT 4MP 64GB: seguridad que crece contigo",
  shortDescription: "Cámara EZVIZ H3c KIT 4MP 64GB con tarjeta microSD de 64 GB incluida para grabación local. Instalación incluida y acompañamiento Atheron antes, durante y después de tu compra.",
  benefits: [
    {
      icon: "resolution",
      title: "Imagen en 4 MP",
      description: "Resolución de 4 MP para identificar con claridad lo que sucede en tu propiedad.",
    },
    {
      icon: "storage",
      title: "Almacenamiento local incluido",
      description: "El kit incluye una tarjeta microSD de 64 GB, lista para empezar a grabar sin depender de un servicio adicional.",
    },
    {
      icon: "support",
      title: "Acompañamiento Atheron",
      description: "No compras solo un equipo: un asesor Atheron te ayuda a confirmar si es la solución correcta para tu espacio antes de comprar.",
    },
    {
      icon: "growth",
      title: "Pensado para crecer",
      description: "Este equipo es el primer escalón de la Ruta de Crecimiento Atheron: de una cámara a un sistema completo, cuando lo necesites.",
    }
  ],
  specifications: [
    {
      title: "Identificación",
      items: [
        { label: "Marca", value: "EZVIZ", status: "verified" },
        { label: "Modelo", value: "H3c", status: "verified" },
        { label: "Resolución", value: "4 MP", status: "verified" },
        { label: "Almacenamiento incluido", value: "Tarjeta microSD de 64 GB", status: "verified" },
        { label: "Uso recomendado", value: "Exterior (IP67)", status: "verified" }
      ],
    },
    {
      title: "Ficha técnica ampliada",
      items: [
        { label: "Detección inteligente", value: "Humana", status: "verified" },
        { label: "Micrófono", value: "Integrado", status: "verified" },
        { label: "Visión nocturna", value: "Sí", status: "verified" },
        { label: "App", value: "App EZVIZ", status: "verified" },
        { label: "Alcance de visión nocturna", value: "Pendiente de confirmar", status: "requires_source" },
        { label: "Alimentación", value: "Pendiente de confirmar", status: "requires_source" }
      ],
    },
  ],
  includedItems: ["1 cámara EZVIZ H3c", "1 tarjeta microSD de 64 GB"],
  excludedItems: [
    "Cableado adicional más allá del incluido en el alcance de instalación",
    "Accesorios no listados en el contenido del kit",
  ],
  useCases: [
    {
      segment: "hogar",
      title: "Hogar",
      description:
        "Mantén visibilidad de tu casa y empieza a construir tu sistema de seguridad, con instalación incluida.",
    },
  ],
  installation: {
    offersEquipmentOnly: true,
    offersInstallationRequest: true,
    scopeIncluded: {
      value: ["Cableado UTP incluido hasta 10 m"],
      status: "verified",
    },
    scopeExcluded: {
      value: [],
      status: "requires_source",
    },
  },
  support: {
    before: "Un asesor Atheron te ayuda a confirmar si este equipo resuelve lo que necesitas antes de comprar.",
    during: "Acompañamiento durante la configuración inicial y la instalación incluida.",
    after: "Canal de soporte disponible después de tu compra para resolver dudas sobre el equipo.",
  },
  warranty: {
    status: "requires_source",
    durationMonths: null,
    coverageSummary: null,
    fallbackCopy: "Consulta las condiciones aplicables a este producto.",
  },
  pricing: {
    status: "verified",
    cashPrice: { amount: 467000, currency: "COP" },
    creditPrice: { amount: 550000, currency: "COP" },
    downPayment: { amount: 286000, currency: "COP" },
    installments: { count: 12, amount: { amount: 22000, currency: "COP" } },
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
  faq: [
    {
      question: "¿Qué incluye exactamente este equipo?",
      answer: "Incluye la cámara EZVIZ H3c y una tarjeta microSD de 64 GB. Cualquier accesorio adicional se confirma con tu asesor antes de comprar.",
    },
    {
      question: "¿La instalación está incluida?",
      answer: "Sí, la instalación está incluida (cableado UTP hasta 10 m). Tu asesor Atheron confirma el alcance exacto antes de la visita.",
    },
    {
      question: "¿Cuánto tiempo tarda la entrega?",
      answer:
        "El tiempo de entrega se confirma con un asesor según tu ciudad y disponibilidad real. Todavía no publicamos un tiempo estándar.",
    },
    {
      question: "¿Qué garantía tiene el equipo?",
      answer: "Consulta las condiciones aplicables a este producto.",
    },
    {
      question: "¿Puedo ampliar mi sistema más adelante?",
      answer:
        "Sí. Este equipo es el primer escalón de la Ruta de Crecimiento Atheron: puedes sumar más cámaras, almacenamiento centralizado, alarmas o control de acceso cuando lo necesites.",
    },
  ],
  testimonials: [],
  seo: {
    title: "EZVIZ H3c KIT 4MP 64GB",
    description: "EZVIZ H3c KIT 4MP 64GB. Precio de contado y crédito disponibles, instalación incluida y acompañamiento Atheron antes, durante y después de tu compra.",
    canonicalPath: "/productos/ezviz-h3c-kit-4mp-64gb",
    ogImageSrc: "/og-default.png",
  },
};

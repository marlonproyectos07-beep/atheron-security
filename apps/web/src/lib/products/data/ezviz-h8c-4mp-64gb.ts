import type { Product } from "@/lib/products/types";

/**
 * Producto piloto: EZVIZ H8C 4MP + MicroSD 64 GB.
 *
 * REGLA DE ORIGEN DE DATOS (obligatoria para este archivo):
 * Solo se afirman como hecho al usuario los datos que están dados por el
 * encargo de esta tarea (nombre del kit, marca, resolución 4MP, tarjeta
 * microSD de 64 GB incluida, proveedor SYSCOM Colombia, SKU de proveedor
 * CSH8C4MPKIT) o que están documentados en docs/. Todo lo demás (precio,
 * disponibilidad, costo, garantía, tiempo de entrega, especificaciones
 * técnicas adicionales, condiciones de instalación, financiación) queda
 * marcado `requires_source` o `requires_test` y el componente de
 * presentación debe mostrar copy neutral en su lugar, nunca un valor
 * inventado.
 *
 * Nota sobre `supplier` (decisión CEO, iteración de hardening): la
 * IDENTIDAD del proveedor (SYSCOM Colombia, ADR-0009) SÍ está verificada.
 * Lo que NO está verificado es la OFERTA de ese proveedor sobre este SKU
 * —stock, costo, disponibilidad, tiempos y condiciones comerciales—, y eso
 * vive por separado en `pricing`/`availability`/`installation`, cada uno
 * con su propio `status`. No confundir "proveedor conocido" con "oferta
 * verificada": son dos preguntas distintas.
 */
// Única fuente de verdad para el copy de garantía no verificada (auditoría
// 001B, Copy comercial, P2): antes `warranty.fallbackCopy` y la respuesta
// del FAQ redactaban dos variantes distintas del mismo texto legal-safe.
const WARRANTY_FALLBACK_COPY = "Consulta las condiciones aplicables a este producto.";

export const ezvizH8c4mp64gb: Product = {
  id: "ezviz-h8c-4mp-64gb",
  slug: "ezviz-h8c-4mp-64gb",
  atheronSku: "ATH-CAM-EZV-H8C-4MP-64GB",
  supplier: {
    name: "SYSCOM Colombia",
    sku: "CSH8C4MPKIT",
    status: "verified",
  },
  brand: "EZVIZ",
  name: "EZVIZ H8C 4MP + MicroSD 64 GB",
  category: "Cámaras de videovigilancia",
  segment: ["hogar", "finca", "negocio"],
  images: [
    {
      src: "/products/ezviz-h8c-4mp-64gb/hero.svg",
      alt: "EZVIZ H8C 4MP con tarjeta microSD de 64 GB — imagen ilustrativa",
      isPlaceholder: true,
    },
  ],
  headline: "Tu primer paso hacia un sistema de seguridad que crece contigo",
  shortDescription:
    "Cámara EZVIZ H8C de 4 MP con tarjeta microSD de 64 GB incluida para grabación local. El punto de partida de tu Ruta de Crecimiento Atheron.",
  benefits: [
    {
      icon: "resolution",
      title: "Imagen en alta definición (4 MP)",
      description:
        "Resolución de 4 megapíxeles pensada para que identifiques con claridad lo que sucede en tu propiedad.",
    },
    {
      icon: "storage",
      title: "Almacenamiento local incluido",
      description:
        "El kit incluye una tarjeta microSD de 64 GB, lista para empezar a grabar sin depender de un servicio adicional.",
    },
    {
      icon: "support",
      title: "Acompañamiento Atheron",
      description:
        "No compras solo un equipo: un asesor Atheron te ayuda a confirmar si es la solución correcta para tu espacio antes de comprar.",
    },
    {
      icon: "growth",
      title: "Pensado para crecer",
      description:
        "Este kit es el primer escalón de la Ruta de Crecimiento Atheron: de una cámara a un sistema completo, cuando lo necesites.",
    },
  ],
  specifications: [
    {
      title: "Identificación",
      items: [
        { label: "Marca", value: "EZVIZ", status: "verified" },
        { label: "Modelo", value: "H8C", status: "verified" },
        { label: "Resolución", value: "4 MP", status: "verified" },
        { label: "Almacenamiento incluido", value: "Tarjeta microSD de 64 GB", status: "verified" },
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
      ],
    },
  ],
  includedItems: ["1 cámara EZVIZ H8C", "1 tarjeta microSD de 64 GB"],
  excludedItems: [
    "Instalación (se solicita por separado)",
    "Cableado, soportes o accesorios adicionales no listados arriba",
  ],
  useCases: [
    {
      segment: "hogar",
      title: "Casa",
      description:
        "Mantén visibilidad general de tu propiedad y empieza a construir tu sistema de seguridad doméstico.",
    },
    {
      segment: "finca",
      title: "Finca",
      description:
        "Un primer punto de vigilancia para predios extensos, ampliable con más cámaras cuando lo necesites.",
    },
    {
      segment: "negocio",
      title: "Negocio pequeño",
      description:
        "El primer paso hacia un sistema de cámaras para tu local, con espacio para crecer a varias unidades.",
    },
  ],
  installation: {
    offersEquipmentOnly: true,
    offersInstallationRequest: true,
    scopeIncluded: {
      value: [],
      status: "requires_source",
      internalNote: "Alcance de instalación pendiente de definir por Atheron (ADR-0013, M1).",
    },
    scopeExcluded: {
      value: [],
      status: "requires_source",
    },
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
    fallbackCopy: WARRANTY_FALLBACK_COPY,
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
  faq: [
    {
      question: "¿Qué incluye exactamente este kit?",
      answer:
        "Incluye la cámara EZVIZ H8C y una tarjeta microSD de 64 GB para grabación local. Cualquier accesorio adicional se confirma con tu asesor antes de comprar.",
    },
    {
      question: "¿Puedo comprar solo el equipo o también instalarlo con Atheron?",
      answer:
        "Puedes elegir comprar solo el equipo o solicitar instalación. Un asesor Atheron te confirma alcance y condiciones antes de cualquier compra.",
    },
    {
      question: "¿Cuánto tiempo tarda la entrega?",
      answer:
        "El tiempo de entrega se confirma con un asesor según tu ciudad y disponibilidad real. Todavía no publicamos un tiempo estándar.",
    },
    {
      question: "¿Qué garantía tiene el equipo?",
      answer: WARRANTY_FALLBACK_COPY,
    },
    {
      question: "¿Puedo ampliar mi sistema más adelante?",
      answer:
        "Sí. Este kit es el primer escalón de la Ruta de Crecimiento Atheron: puedes sumar más cámaras, almacenamiento centralizado, alarmas o control de acceso cuando lo necesites.",
    },
  ],
  testimonials: [
    {
      id: "demo-001",
      isDemo: true,
      authorName: "Testimonio de demostración",
      authorContext: "Contenido provisional para validar diseño — no publicar como testimonio real",
      productOrProject: "EZVIZ H8C 4MP + MicroSD 64 GB (demo)",
      quote:
        "Este es un testimonio de demostración para revisar cómo se vería esta sección con contenido real: nombre, ciudad, tipo de instalación y producto.",
      source: "DEMO interno — placeholder de diseño, ATH-SECURITY-WEB-001. NO PUBLICAR COMO TESTIMONIO REAL.",
    },
  ],
  seo: {
    title: "EZVIZ H8C 4MP + MicroSD 64 GB",
    description:
      "Cámara EZVIZ H8C de 4 MP con microSD de 64 GB incluida. El primer paso de tu Ruta de Crecimiento Atheron, con acompañamiento antes, durante y después de tu compra.",
    canonicalPath: "/productos/ezviz-h8c-4mp-64gb",
    // PNG, no el SVG de la página (auditoría 001B, SEO técnico, P1): la
    // mayoría de redes (WhatsApp, LinkedIn, X) no renderizan SVG como
    // preview de Open Graph. El SVG de `images[0]` se sigue usando en la
    // página; esto es solo la miniatura para compartir el link.
    ogImageSrc: "/og-default.png",
  },
};

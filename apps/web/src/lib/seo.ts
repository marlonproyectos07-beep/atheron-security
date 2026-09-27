import type { Product } from "@/lib/products/types";
import { siteConfig } from "@/lib/site-config";

function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.baseUrl).toString();
}

/**
 * `JSON.stringify` no escapa `<`, así que un valor que contuviera
 * literalmente `</script>` rompería fuera del tag al inyectarse con
 * `dangerouslySetInnerHTML`. Hoy los datos son estáticos y de confianza
 * (archivos TypeScript, no input de usuario), pero esto es una barrera
 * defensiva barata para cuando existan más productos con datos menos
 * controlados (auditoría 001B, Security/Privacy, P2).
 */
export function stringifyJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Product JSON-LD. `offers` solo se incluye cuando precio Y disponibilidad
 * están verificados (instrucción explícita de la tarea: "Offer SOLO si
 * existe precio/disponibilidad verificable").
 */
export function buildProductJsonLd(product: Product) {
  const { pricing, availability } = product;
  const offersVerified =
    pricing.status === "verified" &&
    pricing.cashPrice !== null &&
    availability.status === "verified" &&
    availability.state !== "unknown";

  // Nunca se declara una imagen ilustrativa/placeholder como si fuera
  // fotografía verificable del producto en datos estructurados: se omite
  // `image` por completo hasta que exista al menos una foto real.
  const verifiedImages = product.images
    .filter((image) => !image.isPlaceholder)
    .map((image) => absoluteUrl(image.src));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.atheronSku,
    description: product.shortDescription,
    ...(verifiedImages.length > 0 ? { image: verifiedImages } : {}),
    url: absoluteUrl(product.seo.canonicalPath),
    ...(offersVerified
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: pricing.cashPrice!.currency,
            price: pricing.cashPrice!.amount,
            availability:
              availability.state === "in_stock"
                ? "https://schema.org/InStock"
                : "https://schema.org/PreOrder",
            url: absoluteUrl(product.seo.canonicalPath),
          },
        }
      : {}),
  };
}

export function buildBreadcrumbJsonLd(items: { label: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.path),
    })),
  };
}

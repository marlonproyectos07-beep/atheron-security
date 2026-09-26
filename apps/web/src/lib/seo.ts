import type { Product } from "@/lib/products/types";
import { siteConfig } from "@/lib/site-config";

function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.baseUrl).toString();
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

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.atheronSku,
    description: product.shortDescription,
    image: product.images.map((image) => absoluteUrl(image.src)),
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

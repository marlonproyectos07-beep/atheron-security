import type { Product } from "@/lib/products/types";
import { buildBreadcrumbJsonLd, buildProductJsonLd } from "@/lib/seo";

export function ProductJsonLd({ product }: { product: Product }) {
  const productJsonLd = buildProductJsonLd(product);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { label: "Inicio", path: "/" },
    { label: "Productos", path: "/productos" },
    { label: product.name, path: product.seo.canonicalPath },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}

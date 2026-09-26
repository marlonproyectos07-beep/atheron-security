import type { Product } from "@/lib/products/types";
import { ezvizH8c4mp64gb } from "@/lib/products/data/ezviz-h8c-4mp-64gb";
import { siteConfig } from "@/lib/site-config";

/**
 * Registro central de productos publicados.
 * Publicar un producto nuevo = agregar un archivo en lib/products/data
 * y una línea aquí. No requiere tocar componentes ni rutas.
 */
const PRODUCTS: Product[] = [ezvizH8c4mp64gb];

/**
 * GATE DE RELEASE (auditoría 001C, salvaguarda de testimonios DEMO):
 * un testimonio con `isDemo: true` existe solo para que el CEO evalúe el
 * diseño de la sección — nunca debe llegar a un usuario real. En vez de
 * confiar en que alguien se acuerde de borrarlo antes de publicar, el
 * build FALLA de forma ruidosa si `NEXT_PUBLIC_ALLOW_INDEXING=true`
 * (el sitio se está preparando para ser público) y todavía queda algún
 * testimonio demo en cualquier producto. Coherente con el resto del
 * proyecto: fallar alto y explícito, no degradar en silencio (mismo
 * patrón que el dominio `.invalid` en site-config.ts).
 */
if (siteConfig.allowIndexing) {
  const productsWithDemoTestimonials = PRODUCTS.filter((product) =>
    product.testimonials.some((testimonial) => testimonial.isDemo),
  );

  if (productsWithDemoTestimonials.length > 0) {
    const slugs = productsWithDemoTestimonials.map((product) => product.slug).join(", ");
    throw new Error(
      `[atheron:release-gate] NEXT_PUBLIC_ALLOW_INDEXING=true, pero estos productos todavía ` +
        `tienen testimonios isDemo=true: ${slugs}. Retira o reemplaza esos testimonios por ` +
        `contenido real antes de indexar el sitio públicamente.`,
    );
  }
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedProducts
    .map((slug) => getProductBySlug(slug))
    .filter((related): related is Product => Boolean(related));
}

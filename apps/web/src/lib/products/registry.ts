import type { Product } from "@/lib/products/types";
import { ezvizH8c4mp64gb } from "@/lib/products/data/ezviz-h8c-4mp-64gb";

/**
 * Registro central de productos publicados.
 * Publicar un producto nuevo = agregar un archivo en lib/products/data
 * y una línea aquí. No requiere tocar componentes ni rutas.
 */
const PRODUCTS: Product[] = [ezvizH8c4mp64gb];

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

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getRelatedProducts } from "@/lib/products/registry";

/**
 * Auditoría 001B (UX/CRO, hallazgo P0): con el catálogo en 1 solo
 * producto, esta sección mostraba un estado vacío sin ningún CTA justo
 * antes del cierre de la página (FinalCta) — el peor lugar posible para
 * un mensaje de "todavía no hay nada aquí". Igual que UseCases/Faq, la
 * sección se oculta por completo mientras no haya productos relacionados
 * reales, en vez de rellenar el espacio con un estado vacío.
 */
export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product);

  if (related.length === 0) return null;

  return (
    <Section tone="muted" id="productos-relacionados" ariaLabel="Productos relacionados">
      <SectionHeading eyebrow="Sigue construyendo tu sistema" title="Productos relacionados" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((relatedProduct) => (
          <Link
            key={relatedProduct.slug}
            href={`/productos/${relatedProduct.slug}`}
            className="group rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/10"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface-muted">
              <Image
                src={relatedProduct.images[0].src}
                alt={relatedProduct.images[0].alt}
                fill
                sizes="320px"
                className="object-contain p-6"
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-text group-hover:text-brand-primary">
              {relatedProduct.name}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

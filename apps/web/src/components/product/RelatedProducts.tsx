import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getRelatedProducts } from "@/lib/products/registry";

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product);

  return (
    <Section tone="muted" id="productos-relacionados" ariaLabel="Productos relacionados">
      <SectionHeading eyebrow="Sigue construyendo tu sistema" title="Productos relacionados" />
      {related.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((relatedProduct) => (
            <Link
              key={relatedProduct.slug}
              href={`/productos/${relatedProduct.slug}`}
              className="group rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
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
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-white p-8 text-center">
          <p className="text-sm text-text-muted">
            Estamos preparando más productos para esta línea. Cuéntanos qué necesitas y te
            ayudamos a encontrarlo.
          </p>
        </div>
      )}
    </Section>
  );
}

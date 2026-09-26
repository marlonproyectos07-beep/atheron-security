import type { Product } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export function WhatsIncluded({ product }: { product: Product }) {
  return (
    <Section id="que-incluye" ariaLabel="Qué incluye">
      <SectionHeading eyebrow="Contenido del kit" title="Qué incluye" />
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-text">Incluido</p>
          <ul className="mt-4 space-y-3">
            {product.includedItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-text">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-text">No incluido</p>
          <ul className="mt-4 space-y-3">
            {product.excludedItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

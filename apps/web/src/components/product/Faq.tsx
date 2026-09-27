import type { Product } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

/**
 * Acordeón sin JavaScript: usa <details>/<summary> nativos.
 * También ayuda a SEO al mantener el contenido en el HTML renderizado.
 */
export function Faq({ product }: { product: Product }) {
  if (product.faq.length === 0) return null;

  return (
    <Section id="faq" ariaLabel="Preguntas frecuentes">
      <SectionHeading eyebrow="Dudas frecuentes" title="Preguntas frecuentes" />
      <div className="mt-10 divide-y divide-border overflow-hidden rounded-xl border border-border bg-white">
        {product.faq.map((item, index) => (
          <details
            key={`${index}-${item.question}`}
            className="group px-5 py-5 open:bg-surface-muted/40"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-text marker:content-none">
              {item.question}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-muted text-text-muted transition-colors group-open:bg-brand-accent-light group-open:text-brand-accent">
                <Icon
                  name="chevron-down"
                  className="h-4 w-4 motion-safe:transition-transform group-open:rotate-180"
                />
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

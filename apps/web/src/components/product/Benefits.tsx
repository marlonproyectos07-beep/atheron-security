import type { Product } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export function Benefits({ product }: { product: Product }) {
  return (
    <Section id="beneficios" ariaLabel="Beneficios">
      <SectionHeading eyebrow="Por qué este equipo" title="Lo que ganas con este equipo" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {product.benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="group relative overflow-hidden rounded-xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/10"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-accent to-brand-primary opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent-light text-brand-accent">
              <Icon name={benefit.icon} className="h-5 w-5" />
            </div>
            <p className="mt-4 text-base font-semibold text-text">{benefit.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{benefit.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

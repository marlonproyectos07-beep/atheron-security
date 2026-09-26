import type { Product, Segment } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";

const SEGMENT_LABEL: Record<Segment, string> = {
  hogar: "Hogar",
  finca: "Finca",
  negocio: "Negocio",
};

export function UseCases({ product }: { product: Product }) {
  if (product.useCases.length === 0) return null;

  return (
    <Section tone="muted" id="para-quien-es" ariaLabel="Para quién es este producto">
      <SectionHeading eyebrow="¿Para quién es?" title="Casos de uso reales para este equipo" />
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {product.useCases.map((useCase) => (
          <div key={useCase.segment} className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
              {SEGMENT_LABEL[useCase.segment]}
            </p>
            <p className="mt-2 text-base font-semibold text-text">{useCase.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{useCase.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-text-muted">
        Cuéntanos tu caso y te ayudamos a confirmar si este equipo es el adecuado para tu espacio.
      </p>
    </Section>
  );
}

import type { Product } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export function Support({ product }: { product: Product }) {
  const stages = [
    { label: "Antes de comprar", copy: product.support.before },
    { label: "Durante la configuración", copy: product.support.during },
    { label: "Después de tu compra", copy: product.support.after },
  ];

  return (
    <Section id="soporte-atheron" ariaLabel="Soporte Atheron">
      <SectionHeading
        eyebrow="Acompañamiento"
        title="Soporte Atheron"
        description="No te dejamos solo con el equipo. Te acompañamos en las tres etapas de tu compra."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {stages.map((stage, index) => (
          <div key={stage.label} className="rounded-xl border border-border bg-white p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
              {index + 1}
            </div>
            <p className="mt-4 text-base font-semibold text-text">{stage.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{stage.copy}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-start gap-2 text-sm text-text-muted">
        <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Atheron acompaña la compra, configuración e instalación de tu equipo. Los alcances de
          servicio específicos se confirman con tu asesor.
        </p>
      </div>
    </Section>
  );
}

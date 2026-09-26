import type { Product } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

export function Specifications({ product }: { product: Product }) {
  return (
    <Section tone="muted" id="especificaciones" ariaLabel="Especificaciones técnicas">
      <SectionHeading eyebrow="Ficha técnica" title="Especificaciones" />
      <div className="mt-10 space-y-8">
        {product.specifications.map((group) => (
          <div key={group.title} className="overflow-hidden rounded-xl border border-border bg-white">
            <p className="border-b border-border bg-surface-muted px-5 py-3 text-sm font-semibold text-text">
              {group.title}
            </p>
            <dl className="divide-y divide-border">
              {group.items.map((item) => (
                <div key={item.label} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3">
                  <dt className="text-sm text-text-muted">{item.label}</dt>
                  <dd
                    className={cn(
                      "text-sm font-medium",
                      item.status === "verified" ? "text-text" : "italic text-text-muted",
                    )}
                  >
                    {item.status === "verified" ? item.value : "Pendiente de confirmar"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-text-muted">
        ¿Necesitas la ficha técnica completa? Solicítala a tu asesor Atheron antes de comprar.
      </p>
    </Section>
  );
}

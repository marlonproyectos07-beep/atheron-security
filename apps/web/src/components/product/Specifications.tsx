import type { Product, Specification } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

/**
 * La fila "Proveedor" se construye aquí desde `product.supplier` en vez de
 * copiarse a mano en cada archivo de datos (auditoría 001B,
 * Arquitectura/Maintainability, P1): antes existían dos fuentes de verdad
 * — `product.supplier.status` y una fila de specs con su propio status —
 * sin nada que garantizara que coincidieran en un segundo producto.
 */
function buildSupplierRow(product: Product): Specification {
  return {
    label: "Proveedor",
    value: product.supplier.name,
    status: product.supplier.status,
  };
}

export function Specifications({ product }: { product: Product }) {
  const groups = product.specifications.map((group, groupIndex) => ({
    ...group,
    items: groupIndex === 0 ? [...group.items, buildSupplierRow(product)] : group.items,
  }));

  return (
    <Section tone="muted" id="especificaciones" ariaLabel="Especificaciones técnicas">
      <SectionHeading eyebrow="Ficha técnica" title="Especificaciones" />
      <div className="mt-10 space-y-8">
        {groups.map((group) => {
          const confirmed = group.items.filter((item) => item.status === "verified");
          const pending = group.items.filter((item) => item.status !== "verified");

          return (
            <div key={group.title} className="overflow-hidden rounded-xl border border-border bg-white">
              <p className="border-b border-border bg-surface-muted px-5 py-3 text-sm font-semibold text-text">
                {group.title}
              </p>

              {confirmed.length > 0 ? (
                <dl className="divide-y divide-border">
                  {confirmed.map((item, itemIndex) => (
                    <div
                      key={`${itemIndex}-${item.label}`}
                      className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3"
                    >
                      <dt className="flex items-center gap-2 text-sm text-text-muted">
                        <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-brand-accent" />
                        {item.label}
                      </dt>
                      <dd className="text-sm font-medium text-text">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {pending.length > 0 ? (
                <div className="border-t border-border bg-surface-muted/60 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                    En verificación
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    Tu asesor Atheron te confirma estos datos antes de comprar.
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {pending.map((item, itemIndex) => (
                      <li
                        key={`${itemIndex}-${item.label}`}
                        className="rounded-full border border-dashed border-border bg-white px-3 py-1 text-xs font-medium text-text-muted"
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-sm text-text-muted">
        ¿Necesitas la ficha técnica completa? Solicítala a tu asesor Atheron antes de comprar.
      </p>
    </Section>
  );
}

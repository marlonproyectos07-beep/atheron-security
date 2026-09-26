import type { Product, Specification } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

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
        {groups.map((group) => (
          <div key={group.title} className="overflow-hidden rounded-xl border border-border bg-white">
            <p className="border-b border-border bg-surface-muted px-5 py-3 text-sm font-semibold text-text">
              {group.title}
            </p>
            <dl className="divide-y divide-border">
              {group.items.map((item, itemIndex) => (
                <div
                  key={`${itemIndex}-${item.label}`}
                  className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3"
                >
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

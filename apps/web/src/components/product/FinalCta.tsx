import type { Product } from "@/lib/products/types";
import { Section } from "@/components/ui/Section";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { buildProductWhatsappMessage } from "@/lib/whatsapp";

export function FinalCta({ product }: { product: Product }) {
  return (
    <Section tone="dark" ariaLabel="Contacto">
      <div className="atheron-glow -bottom-16 -right-16 h-64 w-64" aria-hidden="true" />
      <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            ¿Listo para dar el primer paso?
          </h2>
          <p className="mt-3 text-base text-text-on-dark-muted">
            Un asesor Atheron te ayuda a confirmar disponibilidad, condiciones y cómo este equipo
            encaja en tu Ruta de Crecimiento.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <DesignSystemModal
            triggerLabel="Diseñar mi sistema"
            triggerSize="lg"
            productContext={{ slug: product.slug, name: product.name }}
          />
          <WhatsappCta
            message={buildProductWhatsappMessage(product.name, product.atheronSku)}
            size="lg"
            tone="dark"
          />
        </div>
      </div>
    </Section>
  );
}

import type { Product } from "@/lib/products/types";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { buildProductWhatsappMessage, buildWhatsappLink } from "@/lib/whatsapp";

export function FinalCta({ product }: { product: Product }) {
  const whatsappHref = buildWhatsappLink(
    buildProductWhatsappMessage(product.name, product.atheronSku),
  );

  return (
    <Section tone="dark" ariaLabel="Contacto">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            ¿Listo para dar el primer paso?
          </h2>
          <p className="mt-3 text-base text-text-on-dark-muted">
            Un asesor Atheron te ayuda a confirmar disponibilidad, condiciones y cómo este equipo
            encaja en tu Ruta de Crecimiento.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <DesignSystemModal
            triggerLabel="Diseñar mi sistema"
            triggerSize="lg"
            productContext={{ slug: product.slug, name: product.name }}
          />
          <ButtonLink href={whatsappHref} variant="whatsapp" size="lg">
            <Icon name="whatsapp" className="h-5 w-5" />
            Escribir por WhatsApp
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

import type { Product } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { Icon } from "@/components/ui/Icon";

export function Installation({ product }: { product: Product }) {
  const { installation } = product;

  return (
    <Section tone="muted" id="instalacion" ariaLabel="Opciones de instalación">
      <SectionHeading
        eyebrow="Cómo lo recibes"
        title="Solo equipo o con instalación"
        description="Elige lo que necesitas. Un asesor Atheron confirma alcance, condiciones y tiempos antes de cualquier compra."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {installation.offersEquipmentOnly ? (
          <OptionCard
            title="Comprar solo el equipo"
            description="Recibes el kit y lo instalas por tu cuenta o con tu técnico de confianza."
            productContext={{ slug: product.slug, name: product.name }}
          />
        ) : null}
        {installation.offersInstallationRequest ? (
          <OptionCard
            title="Solicitar instalación"
            description="Un asesor Atheron confirma alcance, condiciones y tiempos según tu ciudad y tipo de propiedad."
            productContext={{ slug: product.slug, name: product.name }}
          />
        ) : null}
      </div>
    </Section>
  );
}

function OptionCard({
  title,
  description,
  productContext,
}: {
  title: string;
  description: string;
  productContext: { slug: string; name: string };
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent-light text-brand-accent">
        <Icon name="install" className="h-5 w-5" />
      </div>
      <p className="mt-4 text-base font-semibold text-text">{title}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{description}</p>
      <div className="mt-5">
        <DesignSystemModal
          triggerLabel="Consultar con un asesor"
          triggerVariant="secondary"
          productContext={productContext}
        />
      </div>
    </div>
  );
}

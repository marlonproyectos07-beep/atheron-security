import type { Product } from "@/lib/products/types";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { buildProductWhatsappMessage, buildWhatsappLink } from "@/lib/whatsapp";

export function MobileStickyCta({ product }: { product: Product }) {
  const whatsappHref = buildWhatsappLink(
    buildProductWhatsappMessage(product.name, product.atheronSku),
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-white p-3 shadow-[0_-4px_16px_rgba(10,35,80,0.12)] md:hidden">
      <ButtonLink href={whatsappHref} variant="whatsapp" size="md" className="flex-1">
        <Icon name="whatsapp" className="h-5 w-5" />
        WhatsApp
      </ButtonLink>
      <DesignSystemModal
        triggerLabel="Diseñar mi sistema"
        triggerVariant="primary"
        triggerClassName="flex-1"
        productContext={{ slug: product.slug, name: product.name }}
      />
    </div>
  );
}

import type { Product } from "@/lib/products/types";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { buildProductWhatsappMessage } from "@/lib/whatsapp";

export function MobileStickyCta({ product }: { product: Product }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-white p-3 shadow-[0_-4px_16px_rgba(10,35,80,0.12)] md:hidden">
      <WhatsappCta
        message={buildProductWhatsappMessage(product.name, product.atheronSku)}
        className="flex-1"
        verifiedLabel="WhatsApp"
        pendingLabel="WhatsApp"
      />
      <DesignSystemModal
        triggerLabel="Diseñar mi sistema"
        triggerVariant="primary"
        triggerClassName="flex-1"
        productContext={{ slug: product.slug, name: product.name }}
      />
    </div>
  );
}

import Image from "next/image";
import type { Product } from "@/lib/products/types";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { formatCOP } from "@/lib/format";
import { buildProductWhatsappMessage } from "@/lib/whatsapp";

export function Hero({ product }: { product: Product }) {
  const heroImage = product.images[0];

  return (
    <section className="border-b border-border bg-gradient-to-b from-surface-muted to-white">
      <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
        <div>
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Productos", href: "/productos" },
              { label: product.name },
            ]}
          />

          <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-brand-accent">
            {product.brand} · {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-text sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-text">{product.headline}</p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-text-muted">
            {product.shortDescription}
          </p>

          <PriceOrAvailabilityNotice product={product} />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <DesignSystemModal
              triggerLabel="Diseñar mi sistema"
              triggerSize="lg"
              productContext={{ slug: product.slug, name: product.name }}
            />
            <WhatsappCta
              message={buildProductWhatsappMessage(product.name, product.atheronSku)}
              size="lg"
            />
          </div>
          <p className="mt-3 text-xs text-text-muted">
            Un asesor Atheron confirma contigo alcance, condiciones y disponibilidad antes de
            cualquier compra.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="relative aspect-square w-full">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-contain p-10"
                priority
              />
            </div>
          </div>
          {heroImage.isPlaceholder ? (
            <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-text-muted shadow-sm">
              Imagen ilustrativa
            </span>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function PriceOrAvailabilityNotice({ product }: { product: Product }) {
  const { pricing } = product;

  if (pricing.status === "verified" && pricing.cashPrice) {
    return (
      <div className="mt-6 flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-extrabold text-brand-primary">
          {formatCOP(pricing.cashPrice)}
        </span>
        <span className="text-sm text-text-muted">de contado</span>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-muted">
      Precio y disponibilidad se confirman con un asesor Atheron según tu ciudad.
    </div>
  );
}

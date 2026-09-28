import Image from "next/image";
import type { Product } from "@/lib/products/types";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Icon } from "@/components/ui/Icon";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { formatCOP } from "@/lib/format";
import { buildProductWhatsappMessage } from "@/lib/whatsapp";

export function Hero({ product }: { product: Product }) {
  const heroImage = product.images[0];

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface-muted to-white">
      <div className="atheron-glow -right-20 -top-24 h-72 w-72" aria-hidden="true" />
      <Container className="relative grid gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
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

          <HighlightChips product={product} />

          <PriceOrAvailabilityNotice product={product} />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <DesignSystemModal
              triggerLabel="Diseñar mi sistema"
              triggerSize="lg"
              productContext={{ slug: product.slug, name: product.name }}
            />
            <WhatsappCta
              message={buildProductWhatsappMessage(product)}
              size="lg"
            />
          </div>
          <p className="mt-3 text-xs text-text-muted">
            Un asesor Atheron confirma contigo alcance, condiciones y disponibilidad antes de
            cualquier compra.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-xl shadow-brand-primary/10">
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

/**
 * Chips de highlight derivados de `product.benefits` (001E): reutilizan la
 * misma fuente de verdad que la sección "Lo que ganas con este equipo" en
 * vez de declarar una segunda lista de "specs de hero" que podría
 * desalinearse — cero datos nuevos, solo una presentación más compacta y
 * escaneable arriba del pliegue.
 */
function HighlightChips({ product }: { product: Product }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {product.benefits.map((benefit) => (
        <li
          key={benefit.title}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-text"
        >
          <Icon name={benefit.icon} className="h-3.5 w-3.5 text-brand-accent" />
          {benefit.title}
        </li>
      ))}
    </ul>
  );
}

function PriceOrAvailabilityNotice({ product }: { product: Product }) {
  const { pricing } = product;

  if (pricing.status === "verified" && pricing.cashPrice) {
    return (
      <div className="mt-6">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-3xl font-extrabold text-brand-primary">
            {formatCOP(pricing.cashPrice)}
          </span>
          <span className="text-sm text-text-muted">de contado</span>
        </div>
        <CreditBreakdown pricing={pricing} />
      </div>
    );
  }

  return (
    <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-muted">
      <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
      <span>Precio y disponibilidad se confirman con un asesor Atheron según tu ciudad.</span>
    </div>
  );
}

/**
 * Desglose de crédito (carga de catálogo Línea Hogar): `pricing.creditPrice`/
 * `downPayment`/`installments` ya existían en el tipo pero ningún
 * componente los mostraba todavía — el producto piloto nunca tuvo esos
 * datos reales. Se muestra solo lo que vino dado: el total a crédito es
 * opcional (varios productos solo traen inicial + cuotas, sin un total
 * definido) y nunca se calcula ni se infiere aquí.
 */
function CreditBreakdown({ pricing }: { pricing: Product["pricing"] }) {
  const { downPayment, installments, creditPrice } = pricing;
  if (!downPayment && !installments) return null;

  return (
    <p className="mt-2 text-sm text-text-muted">
      O a crédito
      {creditPrice ? <>: {formatCOP(creditPrice)}</> : null}
      {downPayment ? (
        <>
          {creditPrice ? "," : ":"} inicial {formatCOP(downPayment)}
        </>
      ) : null}
      {installments ? (
        <>
          {" "}
          + {installments.count} cuotas semanales de {formatCOP(installments.amount)}
        </>
      ) : null}
    </p>
  );
}

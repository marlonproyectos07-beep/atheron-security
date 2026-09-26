import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Icon } from "@/components/ui/Icon";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { GrowthPath } from "@/components/product/GrowthPath";
import { getAllProducts } from "@/lib/products/registry";
import { buildDesignSystemWhatsappMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Seguridad que crece contigo",
  description:
    "De una cámara a un sistema completo: cámaras, alarmas, control de acceso y automatización. Atheron te acompaña antes, durante y después de tu compra.",
  alternates: { canonical: "/" },
};

const segments = [
  {
    title: "Hogar",
    description: "El primer punto de vigilancia de tu casa, con espacio para crecer.",
  },
  {
    title: "Finca",
    description: "Cobertura para predios extensos, ampliable cámara a cámara.",
  },
  {
    title: "Negocio",
    description: "El inicio de un sistema de seguridad para tu local o empresa.",
  },
];

export default function HomePage() {
  const products = getAllProducts();

  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-surface-muted to-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
            Atheron Security
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-5xl">
            Seguridad que crece contigo
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
            ATHERON no solo vende cámaras. Puedes empezar comprando un solo equipo, y te
            acompañamos a construir un sistema completo a medida que crecen tus necesidades:
            cámaras, alarmas, control de acceso y automatización.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DesignSystemModal triggerLabel="Diseñar mi sistema" triggerSize="lg" />
            <WhatsappCta message={buildDesignSystemWhatsappMessage()} size="lg" />
          </div>
        </div>
      </section>

      <Section id="segmentos" ariaLabel="Segmentos que atendemos">
        <SectionHeading eyebrow="Para quién trabajamos" title="Hogar, finca y negocio" />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {segments.map((segment) => (
            <div key={segment.title} className="rounded-xl border border-border bg-white p-6">
              <p className="text-base font-semibold text-text">{segment.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {segment.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted" id="producto-destacado" ariaLabel="Producto destacado">
        <SectionHeading eyebrow="Catálogo piloto" title="Empieza por aquí" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/productos/${product.slug}`}
              className="group rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
                {product.brand}
              </p>
              <p className="mt-2 text-base font-semibold text-text group-hover:text-brand-primary">
                {product.name}
              </p>
              <p className="mt-2 text-sm text-text-muted">{product.shortDescription}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-accent">
                Ver producto
                <Icon name="arrow-right" className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <GrowthPath />
    </div>
  );
}

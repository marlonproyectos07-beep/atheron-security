import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { HomeHero } from "@/components/home/Hero";
import { Segments } from "@/components/home/Segments";
import { GrowthPath } from "@/components/product/GrowthPath";
import { getAllProducts } from "@/lib/products/registry";

export const metadata: Metadata = {
  title: "Seguridad que crece contigo",
  description:
    "De una cámara a un sistema completo: cámaras, alarmas, control de acceso y automatización. Atheron te acompaña antes, durante y después de tu compra.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const products = getAllProducts();

  return (
    <div>
      <HomeHero />
      <Segments />

      <Section tone="muted" id="producto-destacado" ariaLabel="Producto destacado">
        <SectionHeading eyebrow="Catálogo piloto" title="Empieza por aquí" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/productos/${product.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/10"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-accent to-brand-primary opacity-0 transition-opacity group-hover:opacity-100" />
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
                {product.brand}
              </p>
              <p className="mt-2 text-base font-semibold text-text group-hover:text-brand-primary">
                {product.name}
              </p>
              <p className="mt-2 text-sm text-text-muted">{product.shortDescription}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-accent">
                Ver producto
                <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <GrowthPath />
    </div>
  );
}

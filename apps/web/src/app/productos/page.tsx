import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getAllProducts } from "@/lib/products/registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Productos",
  description: `Catálogo de productos de ${siteConfig.name}, con acompañamiento antes, durante y después de tu compra.`,
  alternates: { canonical: "/productos" },
};

export default function ProductsIndexPage() {
  const products = getAllProducts();

  return (
    <Section ariaLabel="Catálogo de productos">
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Productos" }]} />
      <div className="mt-6">
        <SectionHeading
          eyebrow="Catálogo"
          title="Productos"
          description="Este es el catálogo piloto de Atheron Security. Iremos publicando más productos sobre esta misma plantilla."
        />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/productos/${product.slug}`}
            className="group rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface-muted">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="320px"
                className="object-contain p-6"
              />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-accent">
              {product.brand}
            </p>
            <p className="mt-1 text-sm font-semibold text-text group-hover:text-brand-primary">
              {product.name}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

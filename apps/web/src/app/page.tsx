import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { HomeHero } from "@/components/home/Hero";
import { Solutions } from "@/components/home/Solutions";
import { Capabilities } from "@/components/home/Capabilities";
import { GrowthPath } from "@/components/product/GrowthPath";
import { getProductBySlug } from "@/lib/products/registry";
import type { Product, Segment } from "@/lib/products/types";

/**
 * Destacados del home (mandato CEO: el catálogo completo bajaba
 * demasiado arriba en la página): 4 productos elegidos para mostrar el
 * rango real del catálogo, no solo el más barato — entrada accesible
 * (H1c), interior/exterior, y el kit dual-lente de gama alta. El
 * catálogo completo (10 productos) sigue disponible tal cual en
 * `/productos`, con su propio link "Ver catálogo completo" al final de
 * esta sección.
 */
const FEATURED_PRODUCT_SLUGS = [
  "ezviz-h8c-4mp-64gb",
  "ezviz-h1c-2mp",
  "ezviz-h3c-kit-4mp-64gb",
  "ezviz-h9c-kit-dual-3k-64gb",
] as const;

export const metadata: Metadata = {
  title: "Seguridad que crece contigo",
  description:
    "De una cámara a un sistema completo: cámaras, alarmas, control de acceso y automatización. Atheron te acompaña antes, durante y después de tu compra.",
  alternates: { canonical: "/" },
};

const SEGMENT_LABEL: Record<Segment, string> = {
  hogar: "Hogar",
  finca: "Finca",
  negocio: "Negocio",
};

/**
 * Chips visuales de la card de catálogo en home (ATH-SECURITY-WEB-001,
 * mandato "vender visualmente, no solo por referencia técnica"): se
 * derivan SOLO de datos ya existentes y `status: "verified"` en
 * `product.specifications`/`product.segment` — nunca de un campo
 * `requires_source` (mostrarlo como chip lo haría leer como un hecho
 * confirmado que no lo es) ni de texto inventado. Máximo 3, priorizando
 * lo más distintivo para decidir (uso recomendado > conectividad > tipo
 * de lente > almacenamiento), con el segmento como respaldo si el
 * producto no trae suficientes specs verificadas para llenar el cupo.
 */
function getCatalogChips(product: Product): string[] {
  const verifiedSpecs = product.specifications
    .flatMap((group) => group.items)
    .filter((item) => item.status === "verified");

  const findValue = (label: string) => verifiedSpecs.find((item) => item.label === label)?.value;

  const chips: string[] = [];

  const location = findValue("Uso recomendado");
  if (location?.startsWith("Exterior")) chips.push("Exterior");
  else if (location?.startsWith("Interior")) chips.push("Interior");

  const connectivity = findValue("Conectividad");
  if (connectivity?.includes("4G")) chips.push("4G");
  if (connectivity?.includes("Wi-Fi")) chips.push("Wi-Fi");

  const lenses = findValue("Lentes");
  if (lenses?.includes("PT")) chips.push("PTZ");
  else if (lenses?.includes("Doble lente")) chips.push("Dual lens");

  const storage = findValue("Almacenamiento incluido");
  const storageGB = storage?.match(/(\d+)\s*GB/i)?.[1];
  if (storageGB && chips.length < 3) chips.push(`microSD ${storageGB}GB`);

  if (chips.length < 2) {
    const segmentLabel = SEGMENT_LABEL[product.segment[0]];
    if (segmentLabel && !chips.includes(segmentLabel)) chips.push(segmentLabel);
  }

  return chips.slice(0, 3);
}

export default function HomePage() {
  const featuredProducts = FEATURED_PRODUCT_SLUGS.map((slug) => getProductBySlug(slug)).filter(
    (product): product is Product => Boolean(product),
  );

  return (
    <div>
      <HomeHero />
      <Solutions />

      <Section tone="muted" id="producto-destacado" ariaLabel="Producto destacado">
        <SectionHeading eyebrow="Catálogo piloto" title="Empieza por aquí" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => {
            const heroImage = product.images[0];
            const chips = getCatalogChips(product);

            return (
              <Link
                key={product.slug}
                href={`/productos/${product.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/10"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-accent to-brand-primary opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface-muted">
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                    className="object-contain p-6"
                  />
                  {heroImage.isPlaceholder ? (
                    <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-medium text-text-muted shadow-sm">
                      Imagen ilustrativa
                    </span>
                  ) : null}
                </div>

                <p className="mt-4 text-base font-semibold text-text group-hover:text-brand-primary">
                  {product.name}
                </p>
                <p className="mt-0.5 text-xs text-text-muted">
                  {product.brand} · Ref. {product.atheronSku}
                </p>
                <p className="mt-2 line-clamp-1 text-sm text-text-muted">
                  {product.benefits[0]?.description ?? product.shortDescription}
                </p>

                {chips.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {chips.map((chip) => (
                      <li
                        key={chip}
                        className="inline-flex items-center rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium text-text"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-accent">
                  Ver producto
                  <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/productos"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-accent"
          >
            Ver catálogo completo
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Capabilities />
      <GrowthPath />
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/products/registry";
import { siteConfig } from "@/lib/site-config";
import { Hero } from "@/components/product/Hero";
import { Benefits } from "@/components/product/Benefits";
import { UseCases } from "@/components/product/UseCases";
import { WhatsIncluded } from "@/components/product/WhatsIncluded";
import { Specifications } from "@/components/product/Specifications";
import { Support } from "@/components/product/Support";
import { Installation } from "@/components/product/Installation";
import { GrowthPath } from "@/components/product/GrowthPath";
import { Warranty } from "@/components/product/Warranty";
import { Testimonials } from "@/components/product/Testimonials";
import { Faq } from "@/components/product/Faq";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { FinalCta } from "@/components/product/FinalCta";
import { ProductJsonLd } from "@/components/product/ProductJsonLd";
import { MobileStickyCta } from "@/components/product/MobileStickyCta";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: PageProps<"/productos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const canonical = product.seo.canonicalPath;

  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: product.seo.ogImageSrc }],
      locale: "es_CO",
      type: "website",
    },
  };
}

export default async function ProductPage(props: PageProps<"/productos/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="has-sticky-mobile-cta">
      <ProductJsonLd product={product} />
      <Hero product={product} />
      <Benefits product={product} />
      <UseCases product={product} />
      <WhatsIncluded product={product} />
      <Specifications product={product} />
      <Support product={product} />
      <Installation product={product} />
      <GrowthPath currentStageId={product.growthPath.currentStageId} />
      <Warranty product={product} />
      <Testimonials product={product} />
      <Faq product={product} />
      <RelatedProducts product={product} />
      <FinalCta product={product} />
      <MobileStickyCta product={product} />
    </div>
  );
}

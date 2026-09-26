import { buildBreadcrumbJsonLd, stringifyJsonLd } from "@/lib/seo";

/**
 * BreadcrumbList en JSON-LD para páginas que no son fichas de producto
 * (esas ya lo tienen vía ProductJsonLd). Auditoría 001B, SEO técnico, P2:
 * antes solo existía en /productos/[slug], perdiendo la oportunidad de
 * breadcrumbs enriquecidos en el resto de páginas con breadcrumb visible.
 */
export function BreadcrumbJsonLd({ items }: { items: { label: string; path: string }[] }) {
  const json = buildBreadcrumbJsonLd(items);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(json) }} />;
}

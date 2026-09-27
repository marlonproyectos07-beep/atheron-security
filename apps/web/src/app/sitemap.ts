import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products/registry";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/productos", "/soluciones", "/empresas", "/soporte"];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path, siteConfig.baseUrl).toString(),
    lastModified: new Date(),
  }));

  const productEntries: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: new URL(product.seo.canonicalPath, siteConfig.baseUrl).toString(),
    lastModified: new Date(),
  }));

  return [...staticEntries, ...productEntries];
}

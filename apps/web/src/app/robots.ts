import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/aviso-de-privacidad"],
    },
    sitemap: new URL("/sitemap.xml", siteConfig.baseUrl).toString(),
  };
}

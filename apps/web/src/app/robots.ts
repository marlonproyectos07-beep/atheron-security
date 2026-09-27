import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.allowIndexing) {
    // Gate de indexación (ver site-config.ts): sin aprobación explícita,
    // ningún user-agent puede rastrear nada.
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /aviso-de-privacidad NO va aquí: bloquear su rastreo Y marcarlo
      // noindex a la vez es contraproducente (Google no puede leer un
      // noindex que no puede rastrear). Su propia metadata ya declara
      // `robots: { index: false }` — un solo mecanismo, no dos.
      disallow: ["/api/"],
    },
    sitemap: new URL("/sitemap.xml", siteConfig.baseUrl).toString(),
  };
}

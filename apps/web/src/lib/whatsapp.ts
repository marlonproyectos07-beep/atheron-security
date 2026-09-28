import type { Product } from "@/lib/products/types";
import { siteConfig } from "@/lib/site-config";

/**
 * Construye un enlace wa.me con mensaje contextual por producto.
 * No usa la API de WhatsApp Cloud (fuera de alcance de este piloto,
 * ver docs/ATH-SECURITY-WEB-001.md) — es un enlace simple de clic a chat.
 *
 * Devuelve `null` si todavía no hay un número comercial verificado — nunca
 * se genera un enlace hacia un número inventado. Los componentes deben
 * usar `WhatsappCta` (src/components/ui/WhatsappCta.tsx) en vez de llamar
 * esta función directamente, para no duplicar esa guarda.
 */
export function buildWhatsappLink(message: string): string | null {
  if (!siteConfig.whatsappNumberVerified || !siteConfig.whatsappNumber) return null;
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${digits}?${params.toString()}`;
}

/**
 * Mensaje de WhatsApp con contexto de producto (preparación Web → WhatsApp
 * → Odoo CRM, mandato de catálogo Línea Hogar): identifica producto,
 * referencia (SKU Atheron) y la URL de la página de origen, además de la
 * intención explícita — para que, cuando el número real se active, el
 * primer mensaje ya traiga todo lo que Odoo necesita para crear el lead sin
 * pedirle al cliente que repita esos datos.
 */
export function buildProductWhatsappMessage(
  product: Pick<Product, "name" | "atheronSku" | "seo">,
): string {
  const pageUrl = `${siteConfig.baseUrl}${product.seo.canonicalPath}`;
  return `Hola Atheron, me interesa este producto: ${product.name} (Ref. ${product.atheronSku}). Página: ${pageUrl}`;
}

export function buildDesignSystemWhatsappMessage(): string {
  return "Hola Atheron, quiero diseñar mi sistema de seguridad.";
}

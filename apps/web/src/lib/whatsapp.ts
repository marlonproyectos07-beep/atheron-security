import { siteConfig } from "@/lib/site-config";

/**
 * Construye un enlace wa.me con mensaje contextual por producto.
 * No usa la API de WhatsApp Cloud (fuera de alcance de este piloto,
 * ver docs/ATH-SECURITY-WEB-001.md) — es un enlace simple de clic a chat.
 */
export function buildWhatsappLink(message: string): string {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${digits}?${params.toString()}`;
}

export function buildProductWhatsappMessage(productName: string, sku: string): string {
  return `Hola Atheron, quiero información sobre ${productName} (${sku}).`;
}

export function buildDesignSystemWhatsappMessage(): string {
  return "Hola Atheron, quiero diseñar mi sistema de seguridad.";
}

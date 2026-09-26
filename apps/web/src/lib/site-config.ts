/**
 * Configuración global del sitio.
 *
 * `whatsappNumber` es un PLACEHOLDER de formato válido, no un número
 * comercial confirmado. REQUIERE_FUENTE: número real de WhatsApp Business
 * de Atheron Security antes de publicar en producción (ver
 * docs/ATH-SECURITY-WEB-001.md).
 */
export const siteConfig = {
  name: "Atheron Security",
  legalName: "Atheron Security",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsappNumber: process.env.NEXT_PUBLIC_ATHERON_WHATSAPP_NUMBER ?? "573000000000",
  whatsappNumberVerified: Boolean(process.env.NEXT_PUBLIC_ATHERON_WHATSAPP_NUMBER),
  privacyPolicyPath: "/aviso-de-privacidad",
} as const;

export const mainNavLinks = [
  { label: "Productos", href: "/productos" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Empresas", href: "/empresas" },
  { label: "Soporte", href: "/soporte" },
] as const;

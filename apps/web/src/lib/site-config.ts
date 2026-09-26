const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const isProduction = process.env.NODE_ENV === "production";

/**
 * Resuelve la URL pública del sitio de forma segura.
 *
 * En desarrollo, sin configurar, cae a localhost (conveniente). En
 * producción, sin configurar, NO debe caer a localhost — un canonical o
 * JSON-LD con `http://localhost:3000` publicado por error es peor que uno
 * que falla de forma obvia. Se usa un dominio reservado por RFC 2606
 * (`.invalid`, nunca resuelve) para que la señal de "falta configurar" sea
 * imposible de confundir con un entorno real.
 */
function resolveBaseUrl(): string {
  if (configuredSiteUrl) return configuredSiteUrl;
  if (isProduction) return "https://pending-site-url.atheron.invalid";
  return "http://localhost:3000";
}

if (isProduction && !configuredSiteUrl) {
  // Señal ruidosa a propósito: debe verse en cualquier log de build/despliegue.
  console.warn(
    "[atheron:site-config] NEXT_PUBLIC_SITE_URL no está configurada en producción. " +
      "canonical/sitemap/JSON-LD usarán un dominio placeholder (*.invalid) hasta configurarla.",
  );
}

/**
 * `whatsappNumber` es `null` hasta que exista un número comercial real
 * confirmado (decisión CEO: se configura después). Ningún componente debe
 * navegar a un número inventado — ver `whatsappNumberVerified`.
 */
export const siteConfig = {
  name: "Atheron Security",
  legalName: "Atheron Security",
  baseUrl: resolveBaseUrl(),
  siteUrlVerified: Boolean(configuredSiteUrl),
  whatsappNumber: process.env.NEXT_PUBLIC_ATHERON_WHATSAPP_NUMBER || null,
  whatsappNumberVerified: Boolean(process.env.NEXT_PUBLIC_ATHERON_WHATSAPP_NUMBER),
  privacyPolicyPath: "/aviso-de-privacidad",
} as const;

export const mainNavLinks = [
  { label: "Productos", href: "/productos" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Empresas", href: "/empresas" },
  { label: "Soporte", href: "/soporte" },
] as const;

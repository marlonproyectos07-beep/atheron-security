import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: "Cómo Atheron Security trata los datos personales que recibe a través de este sitio.",
  alternates: { canonical: siteConfig.privacyPolicyPath },
  robots: { index: false, follow: true },
};

/**
 * BORRADOR. Este texto es un placeholder neutral, no un aviso de
 * privacidad aprobado legalmente. Ver docs/adr/0007-consentimiento-datos-personales.md
 * (REQUIERE_FUENTE: validación jurídica antes de producción) y
 * docs/ATH-SECURITY-WEB-001.md.
 */
export default function AvisoDePrivacidadPage() {
  return (
    <Section ariaLabel="Aviso de privacidad">
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Aviso de privacidad" }]} />
      <div className="mt-6 max-w-2xl">
        <SectionHeading eyebrow="Legal" title="Aviso de privacidad" />

        <div className="mt-6 rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-text-muted">
          Este documento está en borrador y pendiente de validación jurídica. No debe
          considerarse un aviso de privacidad definitivo.
        </div>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-text-muted">
          <p>
            {siteConfig.legalName} recolecta los datos que entregas voluntariamente en los
            formularios de este sitio (por ejemplo, nombre, ciudad y número de WhatsApp) para
            gestionar tu solicitud de contacto e información comercial.
          </p>
          <p>
            El tratamiento de tus datos se realiza según la finalidad que autorizas en cada
            formulario: gestionar tu solicitud, enviarte comunicaciones comerciales de Atheron, o
            informarte sobre otras líneas del ecosistema Atheron. Nunca marcamos estas casillas
            por ti.
          </p>
          <p>
            Puedes conocer, actualizar, rectificar o solicitar la supresión de tus datos
            escribiéndonos por los canales de contacto publicados en este sitio.
          </p>
        </div>
      </div>
    </Section>
  );
}

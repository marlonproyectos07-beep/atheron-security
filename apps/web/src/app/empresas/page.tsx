import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { siteConfig } from "@/lib/site-config";
import { buildDesignSystemWhatsappMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Empresas",
  description: `${siteConfig.name} acompaña proyectos de seguridad para negocios, desde un primer punto de vigilancia hasta soluciones comerciales e industriales.`,
  alternates: { canonical: "/empresas" },
};

export default function EmpresasPage() {
  return (
    <Section ariaLabel="Atheron para empresas">
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Empresas" }]} />
      <div className="mt-6 max-w-2xl">
        <SectionHeading
          eyebrow="Atheron para empresas"
          title="Seguridad que acompaña tu operación"
          description="Desde un negocio pequeño hasta proyectos comerciales e industriales: te ayudamos a definir el sistema correcto para tu operación, sin sobre-venderte lo que no necesitas hoy."
        />
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <DesignSystemModal triggerLabel="Diseñar mi sistema" triggerSize="lg" />
        <WhatsappCta message={buildDesignSystemWhatsappMessage()} size="lg" />
      </div>
      <p className="mt-4 text-sm text-text-muted">
        Un asesor Atheron confirma contigo el alcance, las condiciones y los tiempos según tu
        proyecto.
      </p>
    </Section>
  );
}

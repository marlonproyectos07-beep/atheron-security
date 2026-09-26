import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { GrowthPath } from "@/components/product/GrowthPath";
import { siteConfig } from "@/lib/site-config";
import { ATHERON_CENTRAL_MESSAGE } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Soluciones",
  description: `Conoce cómo ${siteConfig.name} acompaña tu seguridad de una cámara a un sistema completo.`,
  alternates: { canonical: "/soluciones" },
};

export default function SolucionesPage() {
  return (
    <div>
      <Section ariaLabel="Soluciones Atheron">
        <BreadcrumbJsonLd items={[{ label: "Inicio", path: "/" }, { label: "Soluciones", path: "/soluciones" }]} />
        <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Soluciones" }]} />
        <div className="mt-6">
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Una sola relación, muchas soluciones"
            description={ATHERON_CENTRAL_MESSAGE}
          />
        </div>
      </Section>
      <GrowthPath />
    </div>
  );
}

import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GrowthPath } from "@/components/product/GrowthPath";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Soluciones",
  description: `Conoce cómo ${siteConfig.name} acompaña tu seguridad de una cámara a un sistema completo.`,
  alternates: { canonical: "/soluciones" },
};

export default function SolucionesPage() {
  return (
    <div>
      <Section ariaLabel="Soluciones Atheron">
        <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Soluciones" }]} />
        <div className="mt-6">
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Una sola relación, muchas soluciones"
            description="Atheron no vende productos aislados. Acompañamos tu seguridad en el tiempo: de un primer equipo a un sistema completo, a tu ritmo y según lo que realmente necesites."
          />
        </div>
      </Section>
      <GrowthPath />
    </div>
  );
}

import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { siteConfig } from "@/lib/site-config";
import { buildDesignSystemWhatsappMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Soporte",
  description: `Cómo ${siteConfig.name} te acompaña antes, durante y después de tu compra.`,
  alternates: { canonical: "/soporte" },
};

const stages = [
  {
    title: "Antes de comprar",
    description: "Te ayudamos a confirmar si el equipo resuelve lo que necesitas.",
  },
  {
    title: "Durante la configuración",
    description: "Acompañamiento en la puesta en marcha y, si la solicitas, la instalación.",
  },
  {
    title: "Después de tu compra",
    description: "Un canal disponible para resolver dudas sobre tu equipo.",
  },
];

export default function SoportePage() {
  return (
    <Section ariaLabel="Soporte Atheron">
      <BreadcrumbJsonLd items={[{ label: "Inicio", path: "/" }, { label: "Soporte", path: "/soporte" }]} />
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Soporte" }]} />
      <div className="mt-6 max-w-2xl">
        <SectionHeading
          eyebrow="Soporte"
          title="Te acompañamos, no solo te vendemos"
          description="Cada compra en Atheron viene con acompañamiento en tres momentos."
        />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {stages.map((stage, index) => (
          <div key={stage.title} className="rounded-xl border border-border bg-white p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
              {index + 1}
            </div>
            <p className="mt-4 text-base font-semibold text-text">{stage.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{stage.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <WhatsappCta message={buildDesignSystemWhatsappMessage()} size="lg" />
      </div>
    </Section>
  );
}

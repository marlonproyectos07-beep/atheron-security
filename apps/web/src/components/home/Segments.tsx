import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

interface SegmentCard {
  icon: IconName;
  title: string;
  description: string;
}

/**
 * Copy revisado (001E): la versión anterior describía Hogar y Finca como
 * "el primer punto de vigilancia de tu X" — lenguaje que puede leerse en
 * clave de vigilancia/monitoreo. Se reformula en clave comercial neutra
 * (base de un sistema que crece), sin cambiar el significado ni inventar
 * datos nuevos.
 */
const SEGMENTS: SegmentCard[] = [
  {
    icon: "home",
    title: "Hogar",
    description: "La base de tu sistema de seguridad en casa, lista para crecer contigo.",
  },
  {
    icon: "tree",
    title: "Finca",
    description: "Cobertura para predios extensos, ampliable cámara a cámara.",
  },
  {
    icon: "building",
    title: "Negocio",
    description: "El inicio de un sistema de seguridad pensado para tu local o empresa.",
  },
];

export function Segments() {
  return (
    <Section id="segmentos" ariaLabel="Segmentos que atendemos">
      <SectionHeading eyebrow="Para quién trabajamos" title="Hogar, finca y negocio" />
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {SEGMENTS.map((segment, index) => (
          <Reveal key={segment.title} delayMs={index * 80}>
            <div className="group relative overflow-hidden rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-accent to-brand-primary opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent-light text-brand-accent">
                <Icon name={segment.icon} className="h-5 w-5" />
              </div>
              <p className="mt-4 text-base font-semibold text-text">{segment.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{segment.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

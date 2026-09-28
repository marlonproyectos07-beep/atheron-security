import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";

interface SolutionCard {
  slug: "hogar" | "negocios" | "institucional" | "industrial";
  icon: IconName;
  eyebrow: string;
  text: string;
  support: string;
}

/**
 * Reordenamiento del Home (mandato CEO): que Atheron se perciba como
 * empresa de soluciones integrales, no como "cámaras para el hogar".
 * Reemplaza la sección `Segments` (Hogar/Finca/Negocio, 3 cards
 * pequeñas) — este segmentado es más completo (suma institucional e
 * industrial) y con más presencia visual, pensado para que un cliente
 * grande entienda en un scroll que Atheron atiende hogar → negocio →
 * institucional → industria.
 *
 * `slug` deja preparada la ruta futura (`/soluciones/${slug}`) sin
 * crearla todavía: no existe contenido propio por segmento que publicar
 * ahí sin inventarlo, así que el CTA apunta por ahora a `/soluciones`
 * (ruta real ya existente) — cambiar a la ruta propia el día que exista
 * será un solo valor por card, no un rediseño.
 */
const SOLUTIONS: SolutionCard[] = [
  {
    slug: "hogar",
    icon: "home",
    eyebrow: "Hogar",
    text: "Protege y conecta tu hogar con soluciones que pueden crecer contigo.",
    support: "Cámaras, alarmas, accesos y automatización.",
  },
  {
    slug: "negocios",
    icon: "building",
    eyebrow: "Negocios y comercios",
    text: "Seguridad práctica para tiendas, restaurantes, oficinas y operaciones en crecimiento.",
    support: "CCTV, alarmas, accesos y control.",
  },
  {
    slug: "institucional",
    icon: "trust",
    eyebrow: "Institucional y empresarial",
    text: "Soluciones integradas para hoteles, colegios, clínicas, conjuntos y empresas.",
    support: "Seguridad, control y continuidad operativa.",
  },
  {
    slug: "industrial",
    icon: "factory",
    eyebrow: "Industrial y proyectos especiales",
    text: "Sistemas de mayor escala para plantas, bodegas, perímetros y proyectos de integración.",
    support: "CCTV, accesos, incendio, automatización y energía.",
  },
];

export function Solutions() {
  return (
    <Section id="soluciones-home" ariaLabel="Explora nuestras soluciones">
      <SectionHeading
        eyebrow="Por dónde empezar"
        title="Explora nuestras soluciones"
        description="Un mismo acompañamiento Atheron, adaptado a la escala de lo que estás protegiendo."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {SOLUTIONS.map((solution, index) => (
          <div
            key={solution.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-primary/10"
          >
            {/* Espacio protagonista reservado para imagen/video real por
                segmento (no existe fuente todavía): degradado de marca +
                ícono, nunca una foto simulada. */}
            <div
              className="atheron-solution-visual relative flex aspect-[16/10] items-center justify-center overflow-hidden"
              data-variant={index % 2}
              aria-hidden="true"
            >
              <div className="atheron-grid-overlay opacity-40" />
              <Icon
                name={solution.icon}
                className="h-16 w-16 text-white/90 transition-transform duration-300 group-hover:scale-105"
                strokeWidth={1.3}
              />
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
                {solution.eyebrow}
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug text-text">{solution.text}</p>
              <p className="mt-2 text-sm text-text-muted">{solution.support}</p>

              <Link
                href="/soluciones"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-accent transition-colors hover:text-brand-primary"
              >
                Ver soluciones
                <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

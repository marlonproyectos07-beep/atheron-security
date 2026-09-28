import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";

type Pattern = "dots" | "storefront" | "columns" | "blueprint";

interface SolutionCard {
  slug: "hogar" | "negocios" | "institucional" | "industrial";
  icon: IconName;
  pattern: Pattern;
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
 *
 * Cierre visual (pulido "segundo WOW del Home"): la v1 de estas cards
 * era un degradado + un ícono centrado — leía genérico, "plantilla
 * SaaS". Sin foto real por segmento (no inventar fotografía), cada card
 * ahora tiene una composición abstracta propia en SVG (`pattern`, ver
 * abajo) que evoca su segmento por FORMA, no por foto ni por afirmar
 * una capacidad nueva: puntos conectados para hogar, vitrina para
 * negocios, columnata para institucional, plano de planta para
 * industrial. Todo en la misma familia azul/blanco ya aprobada — la
 * diferenciación es de composición, no de color nuevo.
 */
const SOLUTIONS: SolutionCard[] = [
  {
    slug: "hogar",
    icon: "home",
    pattern: "dots",
    eyebrow: "Hogar",
    text: "Protege y conecta tu hogar con soluciones que pueden crecer contigo.",
    support: "Cámaras, alarmas, accesos y automatización.",
  },
  {
    slug: "negocios",
    icon: "building",
    pattern: "storefront",
    eyebrow: "Negocios y comercios",
    text: "Seguridad práctica para tiendas, restaurantes, oficinas y operaciones en crecimiento.",
    support: "CCTV, alarmas, accesos y control.",
  },
  {
    slug: "institucional",
    icon: "trust",
    pattern: "columns",
    eyebrow: "Institucional y empresarial",
    text: "Soluciones integradas para hoteles, colegios, clínicas, conjuntos y empresas.",
    support: "Seguridad, control y continuidad operativa.",
  },
  {
    slug: "industrial",
    icon: "factory",
    pattern: "blueprint",
    eyebrow: "Industrial y proyectos especiales",
    text: "Sistemas de mayor escala para plantas, bodegas, perímetros y proyectos de integración.",
    support: "CCTV, accesos, incendio, automatización y energía.",
  },
];

function SolutionPattern({ pattern }: { pattern: Pattern }) {
  const common = {
    viewBox: "0 0 400 250",
    className: "absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]",
    "aria-hidden": true,
    preserveAspectRatio: "xMidYMid slice",
  } as const;

  if (pattern === "dots") {
    // Hogar — nodos conectados (mismo lenguaje visual que los íconos del hero real).
    return (
      <svg {...common}>
        <circle cx="300" cy="70" r="3.5" fill="white" fillOpacity="0.5" />
        <circle cx="345" cy="130" r="5" fill="white" fillOpacity="0.3" />
        <circle cx="255" cy="165" r="3" fill="white" fillOpacity="0.4" />
        <circle cx="365" cy="55" r="2" fill="white" fillOpacity="0.35" />
        <circle cx="310" cy="195" r="2.5" fill="white" fillOpacity="0.3" />
        <path
          d="M300 70 Q325 100 345 130 Q330 150 310 195 M300 70 Q278 118 255 165"
          stroke="white"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeDasharray="2 7"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  if (pattern === "storefront") {
    // Negocios y comercios — vitrina/fachada comercial.
    return (
      <svg {...common}>
        <line x1="215" y1="65" x2="385" y2="65" stroke="white" strokeOpacity="0.35" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={228 + i * 33}
            y="82"
            width="22"
            height="30"
            rx="3"
            fill="white"
            fillOpacity={i % 2 === 0 ? 0.16 : 0.08}
            stroke="white"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
        ))}
        <line x1="215" y1="135" x2="385" y2="135" stroke="white" strokeOpacity="0.22" strokeWidth="1.5" />
        <line x1="215" y1="180" x2="385" y2="180" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
      </svg>
    );
  }

  if (pattern === "columns") {
    // Institucional y empresarial — columnata / fachada formal.
    return (
      <svg {...common}>
        <line x1="230" y1="55" x2="390" y2="55" stroke="white" strokeOpacity="0.35" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={242 + i * 29}
            y1="60"
            x2={242 + i * 29}
            y2="165"
            stroke="white"
            strokeOpacity="0.22"
            strokeWidth="2"
          />
        ))}
        <line x1="230" y1="165" x2="390" y2="165" stroke="white" strokeOpacity="0.35" strokeWidth="2" />
      </svg>
    );
  }

  // Industrial y proyectos especiales — plano de planta + techo tipo nave industrial.
  return (
    <svg {...common}>
      <rect
        x="225"
        y="45"
        width="150"
        height="105"
        fill="none"
        stroke="white"
        strokeOpacity="0.22"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <path d="M225 58 v-13 h14" stroke="white" strokeOpacity="0.4" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M375 58 v-13 h-14" stroke="white" strokeOpacity="0.4" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M225 137 v13 h14" stroke="white" strokeOpacity="0.4" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M375 137 v13 h-14" stroke="white" strokeOpacity="0.4" strokeWidth="2" fill="none" strokeLinecap="round" />
      <polyline
        points="245,150 265,120 285,150 305,120 325,150 345,120 365,150"
        stroke="white"
        strokeOpacity="0.28"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
                segmento (no existe fuente todavía): composición abstracta
                propia + degradado de marca, nunca una foto simulada. */}
            <div
              className="atheron-solution-visual relative aspect-[16/10] overflow-hidden"
              data-variant={index}
              aria-hidden="true"
            >
              <div className="atheron-grid-overlay opacity-30" />
              <SolutionPattern pattern={solution.pattern} />
              <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                <Icon name={solution.icon} className="h-5 w-5" strokeWidth={1.6} />
              </span>
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

import { Section } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";

interface Capability {
  icon: IconName;
  title: string;
}

/**
 * Las 6 capacidades ya establecidas en el copy del sitio (subcopy del
 * hero, specs de producto): cámaras/CCTV, alarmas, control de acceso,
 * detección de incendio, automatización y energía solar. Nada nuevo se
 * afirma aquí — es la misma lista, presentada como ecosistema conectado
 * en vez de repetirse como texto plano dentro de otro párrafo.
 */
const CAPABILITIES: Capability[] = [
  { icon: "camera", title: "CCTV / videovigilancia" },
  { icon: "bell", title: "Alarmas" },
  { icon: "lock", title: "Control de acceso" },
  { icon: "flame", title: "Detección de incendios" },
  { icon: "automation", title: "Automatización" },
  { icon: "solar", title: "Energía solar" },
];

export function Capabilities() {
  return (
    <Section tone="dark" id="capacidades" ariaLabel="Capacidades Atheron">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-accent-light">
          Un solo ecosistema
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Todo lo que necesitas, conectado
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-on-dark-muted">
          Cada capacidad funciona sola o integrada con las demás — el mismo acompañamiento
          Atheron, sumando piezas a medida que las necesitas.
        </p>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {CAPABILITIES.map((capability, index) => (
          <li
            key={capability.title}
            className="atheron-hero-enter relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm transition-colors hover:bg-white/10"
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-accent-light">
              <Icon name={capability.icon} className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-white">{capability.title}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

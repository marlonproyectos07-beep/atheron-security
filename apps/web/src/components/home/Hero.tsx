import Image from "next/image";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { buildDesignSystemWhatsappMessage } from "@/lib/whatsapp";
import { ATHERON_CENTRAL_MESSAGE } from "@/lib/copy";

const TRUST_ITEMS: { icon: IconName; label: string }[] = [
  { icon: "shield", label: "Soluciones escalables" },
  { icon: "chart-bars", label: "Tecnología de clase mundial" },
  { icon: "users", label: "Acompañamiento en cada etapa" },
  { icon: "gear", label: "Integración total" },
];

/**
 * Badges de micro-detalle conectados a la cámara — no un "diagrama de
 * ecosistema" aparte (lo que el CEO ya rechazó en V4), sino un detalle
 * integrado a la propia escena del hero, como en la referencia
 * aprobada. `x`/`y` son porcentajes del mismo contenedor que la
 * ilustración de la cámara: los mismos números alimentan tanto la
 * posición CSS del badge como el punto final de la línea SVG (bug real
 * evitado desde V3: nunca mezclar un `<div>` posicionado por `%` con un
 * `<svg>` de viewBox cuadrado y letterboxed — aquí el `<svg>` usa
 * `preserveAspectRatio="none"` para estirarse exactamente al mismo
 * cuadro que los badges, así que comparten el mismo espacio de
 * coordenadas siempre, sin importar la proporción real del contenedor).
 */
const FEATURE_BADGES: {
  icon: IconName;
  label: string;
  detail: string;
  badgeX: number;
  badgeY: number;
  anchorX: number;
  anchorY: number;
  align: "left" | "right";
}[] = [
  {
    icon: "camera",
    label: "Videovigilancia",
    detail: "Siempre presente",
    badgeX: 8,
    badgeY: 10,
    anchorX: 38,
    anchorY: 28,
    align: "right",
  },
  {
    icon: "bell",
    label: "Alarmas",
    detail: "Respuesta rápida",
    badgeX: 88,
    badgeY: 8,
    anchorX: 68,
    anchorY: 22,
    align: "left",
  },
  {
    icon: "access",
    label: "Control de accesos",
    detail: "Quién entra y sale",
    badgeX: 6,
    badgeY: 66,
    anchorX: 34,
    anchorY: 62,
    align: "right",
  },
  {
    icon: "gear",
    label: "Automatización",
    detail: "Espacios más inteligentes",
    badgeX: 90,
    badgeY: 70,
    anchorX: 66,
    anchorY: 58,
    align: "left",
  },
];

/**
 * HOME PREMIUM V5 — dirección de arte aprobada por el CEO (imagen de
 * referencia: escena nocturna, arquitectura de fondo, cámara de doble
 * lente como protagonista). Esta sección DESCOMPONE esa referencia en
 * partes reales (nunca se pega la imagen aprobada como screenshot):
 *
 * 1. Fondo/atmósfera: gradiente nocturno + halo cálido (idea de luz de
 *    vivienda) + halo azul respirando detrás de la cámara + panel de
 *    "muro" a la derecha — todo CSS puro, sin fotografía.
 * 2. Producto protagonista: ilustración SVG de una cámara de doble
 *    lente (hero-camera-v5.svg) — es una REFERENCIA CONCEPTUAL, no un
 *    modelo comercial afirmado (alt text y copy lo dejan explícito, sin
 *    resolución/IA/certificaciones inventadas).
 * 3-4. Copy y botones: HTML real, mismo mensaje central ya aprobado.
 * 5. Navegación: se mantiene el `Header` real existente sin tocar —
 *    fuera de alcance de este mandato ("primero el Hero", el header es
 *    chrome compartido por todo el sitio, no solo Home).
 * 6. Microdetalles: los 4 badges conectados a la cámara.
 *
 * Movimiento: 100% CSS (entrada escalonada + halo respirando), sin
 * ninguna librería. Bajo `prefers-reduced-motion: reduce` todo nace ya
 * visible en su posición final — sin rama de código distinta.
 */
export function HomeHero() {
  return (
    <section
      className="atheron-surface-dark relative isolate overflow-hidden border-b border-white/10"
      aria-label="Introducción Atheron Security"
    >
      <div className="atheron-grid-overlay opacity-60" aria-hidden="true" />
      {/* Halo cálido: sugiere la iluminación interior de una vivienda, sin fotografía */}
      <div
        className="atheron-glow-warm left-[8%] top-[20%] h-72 w-72 sm:h-96 sm:w-96"
        aria-hidden="true"
      />
      {/* Panel de muro nocturno a la derecha, donde "se monta" la cámara */}
      <div className="atheron-wall-panel inset-y-0 right-0 hidden w-[46%] lg:block" aria-hidden="true" />
      {/* Franja de piso reflectante, muy sutil, en la base */}
      <div className="atheron-ground-sheen inset-x-0 bottom-0 h-40" aria-hidden="true" />

      <Container className="relative grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-6 lg:py-24">
        <div className="text-center lg:text-left">
          <p className="atheron-hero-enter atheron-hero-enter-1 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent-light/90">
            Atheron Security
          </p>
          <h1 className="atheron-hero-enter atheron-hero-enter-2 mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[3.5rem]">
            Seguridad que crece <span className="text-brand-accent-light">contigo</span>
          </h1>
          <p className="atheron-hero-enter atheron-hero-enter-3 mx-auto mt-6 max-w-lg text-lg leading-relaxed text-text-on-dark-muted lg:mx-0">
            {ATHERON_CENTRAL_MESSAGE} Cámaras, alarmas, control de acceso y automatización
            pueden formar parte de esa evolución.
          </p>
          <div className="atheron-hero-enter atheron-hero-enter-4 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <DesignSystemModal
              triggerLabel="Diseñar mi sistema"
              triggerSize="lg"
              triggerClassName="rounded-full"
            />
            <WhatsappCta
              message={buildDesignSystemWhatsappMessage()}
              size="lg"
              tone="dark"
              className="rounded-full"
            />
          </div>
        </div>

        <div className="atheron-hero-enter atheron-hero-enter-3 relative mx-auto aspect-square w-full max-w-sm sm:max-w-md lg:mx-0 lg:max-w-none lg:aspect-[4/5]">
          <div
            className="atheron-glow atheron-breathe absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          />

          <Image
            src="/home/hero-camera-v5.svg"
            alt="Ilustración conceptual de una cámara de seguridad exterior de doble lente, el punto de partida de un sistema que puede crecer con el tiempo"
            fill
            sizes="(min-width: 1024px) 46vw, (min-width: 640px) 60vw, 78vw"
            className="object-contain drop-shadow-[0_35px_55px_rgba(2,6,23,0.6)]"
            priority
          />

          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {FEATURE_BADGES.map((badge, i) => (
              <path
                key={badge.label}
                d={`M ${badge.anchorX} ${badge.anchorY} Q ${(badge.anchorX + badge.badgeX) / 2} ${badge.anchorY} ${badge.badgeX} ${badge.badgeY}`}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="0.35"
                strokeLinecap="round"
                opacity="0.55"
                className="atheron-hero-enter atheron-hero-enter-5"
                style={{ animationDelay: `${0.55 + i * 0.08}s` }}
              />
            ))}
          </svg>

          {FEATURE_BADGES.map((badge, i) => (
            <div
              key={badge.label}
              className="atheron-badge-in absolute hidden max-w-[9.5rem] items-center gap-2.5 lg:flex"
              style={{
                left: `${badge.badgeX}%`,
                top: `${badge.badgeY}%`,
                transform:
                  badge.align === "left" ? "translate(0, -50%)" : "translate(-100%, -50%)",
                flexDirection: badge.align === "left" ? "row" : "row-reverse",
                animationDelay: `${0.6 + i * 0.08}s`,
              }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-accent/40 bg-surface-dark/80 text-brand-accent-light shadow-[0_0_18px_rgba(59,130,246,0.35)] backdrop-blur">
                <Icon name={badge.icon} className="h-4.5 w-4.5" />
              </span>
              <span className={badge.align === "left" ? "text-left" : "text-right"}>
                <span className="block text-xs font-semibold text-white">{badge.label}</span>
                <span className="block text-[11px] text-text-on-dark-muted">{badge.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="grid grid-cols-2 gap-4 py-6 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10 sm:gap-y-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-text-on-dark-muted">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-accent-light">
                <Icon name={item.icon} className="h-4 w-4" />
              </span>
              {item.label}
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}

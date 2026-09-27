import Image from "next/image";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { buildDesignSystemWhatsappMessage } from "@/lib/whatsapp";
import { ATHERON_CENTRAL_MESSAGE } from "@/lib/copy";

const TRUST_ITEMS: { icon: IconName; label: string }[] = [
  { icon: "install", label: "Instalación opcional" },
  { icon: "support", label: "Soporte Atheron" },
  { icon: "growth", label: "Sistema escalable" },
];

/**
 * HOME PREMIUM V4: el CEO consideró la versión anterior (dos columnas
 * sobre fondo claro, ilustración de "diagrama de ecosistema" dentro de
 * una tarjeta) mejorada pero no "premium/internacional" — sin un
 * protagonista visual claro ni sensación de marca de alto nivel.
 *
 * Cambio de dirección: fondo oscuro cinematográfico (reutiliza
 * `.atheron-surface-dark`/`.atheron-grid-overlay`, ya usados en otras
 * secciones `tone="dark"` del sitio — consistencia visual, cero CSS
 * nuevo para el fondo en sí), UN objeto protagonista grande (la cámara
 * de `hero-protagonist.svg`, no un diagrama de 4 nodos) con halo
 * ambiental respirando lentamente, y tipografía mucho más grande/segura.
 *
 * Todo el movimiento es CSS puro (`atheron-hero-enter`/`atheron-breathe`,
 * ver globals.css): sin JS, sin librería de animación, sin scroll-linking.
 * Bajo `prefers-reduced-motion: reduce` esas clases no hacen nada — el
 * contenido nace ya en su posición final, visible, sin rama de código
 * distinta que mantener (a diferencia del experimento GSAP anterior).
 */
export function HomeHero() {
  return (
    <section
      className="atheron-surface-dark relative isolate overflow-hidden border-b border-white/10"
      aria-label="Introducción Atheron Security"
    >
      <div className="atheron-grid-overlay" aria-hidden="true" />
      <div
        className="atheron-glow atheron-breathe left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2"
        aria-hidden="true"
      />

      <Container className="relative grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:py-32">
        <div className="text-center lg:text-left">
          <p className="atheron-hero-enter atheron-hero-enter-1 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent-light/90">
            Atheron Security
          </p>
          <h1 className="atheron-hero-enter atheron-hero-enter-2 mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[3.75rem]">
            Seguridad que crece contigo
          </h1>
          <p className="atheron-hero-enter atheron-hero-enter-3 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-on-dark-muted lg:mx-0">
            {ATHERON_CENTRAL_MESSAGE} Cámaras, alarmas, control de acceso y automatización.
          </p>
          <div className="atheron-hero-enter atheron-hero-enter-4 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <DesignSystemModal triggerLabel="Diseñar mi sistema" triggerSize="lg" />
            <WhatsappCta message={buildDesignSystemWhatsappMessage()} size="lg" tone="dark" />
          </div>
        </div>

        <div className="atheron-hero-enter atheron-hero-enter-3 relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none">
          <div className="relative aspect-square w-full max-w-sm lg:max-w-md">
            <Image
              src="/home/hero-protagonist.svg"
              alt="Ilustración conceptual de una cámara de seguridad Atheron, el punto de partida de un sistema que crece con el tiempo"
              fill
              sizes="(min-width: 1024px) 480px, 70vw"
              className="object-contain drop-shadow-[0_30px_60px_rgba(2,6,23,0.55)]"
              priority
            />
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-center sm:gap-10">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-text-on-dark-muted">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-brand-accent-light">
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

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
 * HOME PREMIUM V5.1 — corrección de implementación (V5 fue rechazado
 * visualmente: una ilustración SVG conceptual seguía sin transmitir el
 * nivel "producto real" que el CEO aprobó). Esta versión usa los DOS
 * assets fotográficos reales aprobados:
 *
 * - `hero-bg-night.webp`: fondo nocturno real (arquitectura + luces).
 * - `hero-camera-photo.webp`: cámara de doble lente real, cutout con
 *   alpha, SIN redibujar ni reinterpretar.
 *
 * Fondo SOLO en desktop/tablet (`md:` en adelante): en mobile el hero
 * cae a `.atheron-surface-dark` (gradiente CSS ya usado en el resto del
 * sitio) — no es "comprimir el desktop", es una adaptación real. El
 * fondo se implementa como `background-image` (`.atheron-hero-bg` en
 * globals.css) DENTRO de un `@media (min-width: 768px)`, no como
 * `next/image` — medido con Playwright, un `<img>` (o un `fill` de
 * `next/image`) puesto en `display:none` vía `hidden md:block` IGUAL
 * dispara una descarga real en mobile (~15KB de una variante de
 * `next/image`, confirmado con el listener de `response` de Playwright
 * — no es "gigante" en bytes, pero es un recurso que nunca se pinta):
 * el navegador decide pedirlo
 * antes de enterarse de que nunca se va a pintar. Una URL dentro de un
 * `@media` que no matchea, en cambio, nunca se pide — es la única forma
 * con garantía real de no mandar esta foto a mobile.
 *
 * La cámara SÍ se muestra en todos los tamaños (es el protagonista),
 * con un halo azul detrás (`.atheron-glow`/`.atheron-breathe`, ya
 * usados en el resto del sitio) y un `drop-shadow` con canal alfa real
 * (no una caja) para que se sienta apoyada en la escena, no pegada
 * encima.
 *
 * V5.2 — elegancia (referencia: Atheron Suite): se retiraron los 4
 * badges de micro-detalle del primer viewport. La prioridad visual que
 * pidió el mandato es marca → mensaje → cámara → CTA; un badge flotante
 * no aparece en esa lista, y las 4 categorías que nombraban ya están en
 * el subcopy — quitarlos no pierde información, solo ruido. Movimiento
 * ahora en dos capas, ambas "casi imperceptibles" (igual que Suite):
 * `.atheron-bg-drift` (fondo, escala 1→1.045 en 26s) y
 * `.atheron-camera-breathe` (cámara, escala 1→1.03 en 9s) — ver
 * globals.css. Bajo `prefers-reduced-motion: reduce` ninguna de las dos
 * corre; el resto del movimiento (entrada, halo) sigue el mismo patrón
 * ya validado en V4/V5.
 */
export function HomeHero() {
  return (
    <section
      className="atheron-surface-dark relative isolate overflow-hidden"
      aria-label="Introducción Atheron Security"
    >
      {/* Fondo fotográfico real — solo desktop/tablet, ver comentario de .atheron-hero-bg en globals.css */}
      <div className="atheron-hero-bg atheron-bg-drift hidden md:block" aria-hidden="true" />
      <div className="atheron-scrim absolute inset-0 hidden md:block" aria-hidden="true" />
      {/* Textura de rejilla sutil — solo donde NO hay foto (mobile), para no competir con la imagen real */}
      <div className="atheron-grid-overlay opacity-60 md:hidden" aria-hidden="true" />

      <Container className="relative grid gap-8 py-20 sm:py-24 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-6 lg:py-28">
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
            className="atheron-glow atheron-breathe absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          />

          <div className="atheron-camera-breathe relative h-full w-full">
            <Image
              src="/home/hero-camera-photo.webp"
              alt="Cámara de seguridad exterior de doble lente — referencia visual conceptual de un sistema que puede crecer con el tiempo, no un modelo comercial específico"
              fill
              sizes="(min-width: 1024px) 42vw, (min-width: 640px) 55vw, 72vw"
              className="object-contain drop-shadow-[0_35px_45px_rgba(2,6,23,0.55)]"
            />
          </div>
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

      {/* Transición elegante hacia el bloque claro siguiente, en vez de un corte duro */}
      <div className="atheron-hero-fade-out absolute inset-x-0 bottom-0 h-20" aria-hidden="true" />
    </section>
  );
}

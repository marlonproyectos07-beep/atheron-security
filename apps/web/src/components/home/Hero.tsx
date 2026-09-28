import Image from "next/image";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { buildDesignSystemWhatsappMessage } from "@/lib/whatsapp";

const AUDIENCE_ITEMS: { icon: IconName; label: string; detail: string }[] = [
  { icon: "home", label: "Hogares", detail: "Más tranquilidad" },
  { icon: "building", label: "Empresas", detail: "Operación segura" },
  { icon: "factory", label: "Industria", detail: "Continuidad garantizada" },
];

/**
 * HOME ECOSYSTEM HERO — reemplaza el hero de una sola cámara (que el
 * CEO consideró que hacía ver a Atheron como "venta de una cámara para
 * hogar") por la foto real aprobada: una escena que muestra hogar Y
 * nave industrial/comercial en la misma composición, con iconos de
 * cámaras, alarmas, control de acceso, detección de incendio,
 * automatización y energía solar — comunicando seguridad INTEGRAL, no
 * un solo producto.
 *
 * El archivo que envió el CEO era la captura de página completa (con
 * un header y un copy simulados ya renderizados dentro de la imagen).
 * Se recortó ANTES de usarla (quitando la banda superior con el header
 * falso, para no duplicar el header real) — ver
 * `hero-ecosystem-desktop.webp`/`hero-ecosystem-mobile.webp` en
 * `public/home/`. El copy simulado que queda visible bajo el fondo
 * nunca es contenido real: en desktop lo cubre un scrim oscuro fuerte
 * (mismo criterio que V5.1) y en mobile la foto es un banner aparte,
 * DEBAJO del copy real en HTML, no superpuesta — cero posibilidad de
 * "texto fantasma" compitiendo con el H1/subcopy reales.
 *
 * Mobile no es "el desktop comprimido": es un recorte propio, ancho
 * pero bajo, que mantiene visibles AMBAS estructuras (casa e industria)
 * — un recorte vertical (retrato) del mismo origen habría perdido una
 * de las dos, deshaciendo el propio objetivo de esta tarea. Cada
 * imagen (`.atheron-hero-bg-desktop` en globals.css para desktop, la
 * de abajo vía `next/image` para mobile) se sirve SOLO en su propio
 * breakpoint — nunca se descargan las dos.
 *
 * Movimiento: un "slow drift" casi imperceptible del fondo (CSS puro,
 * `prefers-reduced-motion: no-preference`), igual criterio que
 * iteraciones anteriores. Sin GSAP/Motion/Three.js.
 */
export function HomeHero() {
  return (
    <section
      className="atheron-surface-dark relative isolate overflow-hidden"
      aria-label="Introducción Atheron Security"
    >
      {/* Fondo fotográfico real — solo desktop/tablet, ver .atheron-hero-bg-desktop en globals.css */}
      <div className="atheron-hero-bg-desktop atheron-bg-drift hidden md:block" aria-hidden="true" />
      <div className="atheron-scrim-ecosystem absolute inset-0 hidden md:block" aria-hidden="true" />
      <div className="atheron-grid-overlay opacity-60 md:hidden" aria-hidden="true" />

      <Container className="relative py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="max-w-xl text-center md:text-left">
          <p className="atheron-hero-enter atheron-hero-enter-1 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-text-on-dark-muted md:justify-start">
            <span className="hidden h-px w-6 shrink-0 bg-brand-accent sm:block" aria-hidden="true" />
            Soluciones integrales de seguridad
          </p>
          <h1 className="atheron-hero-enter atheron-hero-enter-2 mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            Seguridad que crece <span className="text-brand-accent-light">contigo</span>
          </h1>
          <p className="atheron-hero-enter atheron-hero-enter-3 mx-auto mt-6 max-w-lg text-lg leading-relaxed text-text-on-dark-muted md:mx-0">
            Atheron acompaña tus proyectos de cámaras, alarmas, control de acceso,
            detección de incendio, automatización y energía solar, para hogares,
            empresas e industria.
          </p>
          <div className="atheron-hero-enter atheron-hero-enter-4 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
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

          <div className="atheron-hero-enter atheron-hero-enter-4 mt-9 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
            {AUDIENCE_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 text-sm text-text-on-dark-muted sm:pl-4"
                style={i > 0 ? { borderLeft: "1px solid rgba(255,255,255,0.15)" } : undefined}
              >
                <Icon name={item.icon} className="h-5 w-5 shrink-0 text-brand-accent-light" />
                <span className="text-left">
                  <span className="block font-semibold text-white">{item.label}</span>
                  <span className="block text-xs">{item.detail}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Mobile: banner fotográfico real, aparte y DEBAJO del copy — nunca superpuesto */}
      <div className="relative aspect-[110/23] w-full md:hidden">
        <Image
          src="/home/hero-ecosystem-mobile.webp"
          alt="Atheron Security protege hogares, empresas e industria: cámaras, alarmas, control de acceso, detección de incendio, automatización y energía solar"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}

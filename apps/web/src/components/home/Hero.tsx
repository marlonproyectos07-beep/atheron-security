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
 * Se recortó ANTES de usarla (quitando la banda con el header y el
 * copy falsos, que ocupan la mitad izquierda del encuadre) — ver
 * `hero-ecosystem-desktop.webp`/`hero-ecosystem-mobile.webp` en
 * `public/home/`. En desktop, el resto del copy simulado que queda
 * bajo el fondo lo cubre un scrim oscuro fuerte (mismo criterio que
 * V5.1); en mobile el recorte usado (mitad derecha del encuadre, casa +
 * iconos + skyline) ya está completamente libre de texto simulado, así
 * que no necesita scrim de legibilidad — la foto va sin texto
 * superpuesto, cero posibilidad de "texto fantasma".
 *
 * Corrección (feedback CEO): la foto en mobile NO es una franja
 * pequeña debajo del texto — es un panel grande y protagonista arriba
 * del copy (aspect 4:5, mismo criterio visual que un hero premium),
 * coherente con desktop porque es la MISMA foto (misma familia de
 * iconos/casa/skyline), solo con un recorte propio en vertical. Un
 * recorte retrato que intentara mostrar casa E industria a la vez
 * (como hace el recorte desktop, en horizontal) perdía una de las dos
 * — el mensaje de "hogares, empresas e industria" ya lo cubre el copy
 * real y la fila de segmentos, así que el recorte mobile prioriza una
 * escena limpia y premium sobre replicar ambas estructuras.
 *
 * Igual que el fondo desktop, el panel mobile es `background-image`
 * DENTRO de su propio `@media` (`.atheron-hero-bg-mobile`,
 * `max-width: 767px`) — nunca `next/image`: un `<img>` oculto por CSS
 * (o con `priority`, que genera un `<link rel="preload">` sin filtro
 * de breakpoint) puede igual disparar su descarga en desktop. Cada
 * imagen se sirve SOLO en su propio breakpoint — nunca se descargan
 * las dos.
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

      {/* Mobile: panel fotográfico grande y protagonista, arriba del copy — ver .atheron-hero-bg-mobile en globals.css */}
      <div className="relative aspect-[4/5] w-full md:hidden">
        <div className="atheron-hero-bg-mobile atheron-bg-drift" aria-hidden="true" />
        <div className="atheron-hero-mobile-fade absolute inset-0" aria-hidden="true" />
      </div>

      <div className="relative">
        <div className="atheron-grid-overlay opacity-60 md:hidden" aria-hidden="true" />

        <Container className="relative pt-12 pb-12 sm:py-20 md:py-24 lg:py-28">
          <div className="max-w-xl text-center md:text-left">
            <p className="atheron-hero-enter atheron-hero-enter-1 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-text-on-dark-muted md:justify-start">
              <span className="hidden h-px w-6 shrink-0 bg-brand-accent sm:block" aria-hidden="true" />
              Soluciones integrales de seguridad
            </p>
            <h1 className="atheron-hero-enter atheron-hero-enter-2 mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:mt-4 lg:text-[3.4rem]">
              Seguridad que crece <span className="text-brand-accent-light">contigo</span>
            </h1>
            <p className="atheron-hero-enter atheron-hero-enter-3 mx-auto mt-7 max-w-lg text-lg leading-relaxed text-text-on-dark-muted md:mx-0 md:mt-6">
              Atheron acompaña tus proyectos de cámaras, alarmas, control de acceso,
              detección de incendio, automatización y energía solar, para hogares,
              empresas e industria.
            </p>
            <div className="atheron-hero-enter atheron-hero-enter-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-8 md:justify-start">
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

            <div className="atheron-hero-enter atheron-hero-enter-4 mt-12 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:mt-9 md:justify-start md:gap-4">
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
      </div>
    </section>
  );
}

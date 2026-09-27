import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { buildDesignSystemWhatsappMessage } from "@/lib/whatsapp";
import { ATHERON_CENTRAL_MESSAGE } from "@/lib/copy";
import { EcosystemIllustrationAnimated } from "@/components/home/EcosystemIllustrationAnimated";

const TRUST_ITEMS: { icon: IconName; label: string }[] = [
  { icon: "install", label: "Instalación opcional" },
  { icon: "support", label: "Soporte Atheron" },
  { icon: "growth", label: "Sistema escalable" },
];

/**
 * EXPERIMENTO — Home Signature Experience (Gate 6, rama
 * experiment/ath-security-home-signature). Variante del hero de 001E con
 * una entrada progresiva (CSS puro, sin dependencias) y una ilustración
 * del ecosistema que "dibuja" sus conexiones una sola vez al montar (Web
 * Animations API nativa). Contenido, copy, CTAs y estructura de datos son
 * IDÉNTICOS a components/home/Hero.tsx — este archivo es aditivo y
 * completamente reversible: no reemplaza ni modifica el hero estable.
 *
 * Todo el H1/copy sigue siendo HTML real renderizado por el servidor,
 * presente y legible sin JS ni CSS. Sin `prefers-reduced-motion: reduce`
 * (o si `Element.animate` no existe), el resultado visual es
 * indistinguible de la versión estable.
 */
export function HomeHeroSignature() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface-muted to-white">
      <div className="atheron-glow -left-24 -top-24 h-72 w-72" aria-hidden="true" />
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
        <div className="text-center lg:text-left">
          <p
            className="signature-reveal text-sm font-semibold uppercase tracking-wide text-brand-accent"
            style={{ "--signature-delay": "0ms" } as React.CSSProperties}
          >
            Atheron Security
          </p>
          <h1
            className="signature-reveal mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-text sm:text-5xl lg:text-[3.25rem]"
            style={{ "--signature-delay": "70ms" } as React.CSSProperties}
          >
            Seguridad que crece contigo
          </h1>
          <p
            className="signature-reveal mx-auto mt-5 max-w-xl text-lg leading-relaxed text-text-muted lg:mx-0"
            style={{ "--signature-delay": "140ms" } as React.CSSProperties}
          >
            {ATHERON_CENTRAL_MESSAGE} Cámaras, alarmas, control de acceso y automatización.
          </p>
          <div
            className="signature-reveal mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            style={{ "--signature-delay": "210ms" } as React.CSSProperties}
          >
            <DesignSystemModal triggerLabel="Diseñar mi sistema" triggerSize="lg" />
            <WhatsappCta message={buildDesignSystemWhatsappMessage()} size="lg" />
          </div>
        </div>

        <div
          className="signature-reveal relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          style={{ "--signature-delay": "120ms" } as React.CSSProperties}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-xl shadow-brand-primary/10">
            <div className="relative aspect-square w-full p-8">
              <EcosystemIllustrationAnimated />
            </div>
          </div>
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-text-muted shadow-sm">
            Ilustración conceptual
          </span>
        </div>
      </Container>

      <div className="border-t border-border bg-white/60">
        <Container className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-center sm:gap-10">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-text">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent-light text-brand-accent">
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

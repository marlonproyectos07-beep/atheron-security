"use client";

import { useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { buildDesignSystemWhatsappMessage } from "@/lib/whatsapp";
import { ATHERON_CENTRAL_MESSAGE } from "@/lib/copy";
import { EcosystemScene } from "@/components/home/cinematic/EcosystemScene";
import { GrowthTeaser } from "@/components/home/cinematic/GrowthTeaser";
import { useDirectStyle } from "@/components/home/cinematic/useDirectStyle";

/**
 * ATH-SECURITY-HOME-SIGNATURE-002 — "Cinematic Signature Experience".
 *
 * Arquitectura: UNA sola sección alta (`h-[190vh] md:h-[320vh]`) que ancla
 * (`position: sticky`) un viewport interno de 100dvh mientras dura el
 * scroll. `useScroll({ target })` da un progreso 0→1 exactamente a lo
 * largo de esa distancia — de ahí salen tres "escenas" que se funden
 * entre sí por opacidad/transform, nunca por scroll-hijacking: el
 * usuario sigue controlando el scroll con su rueda/dedo en todo momento,
 * solo estamos leyendo esa posición para animar.
 *
 * TODO el contenido crítico (H1, subcopy, CTAs, labels de la ruta de
 * crecimiento) es HTML real desde el primer render de servidor — lo que
 * cambia con el scroll es únicamente opacidad/transform/pathLength sobre
 * ese HTML, nunca su existencia en el DOM. Sin JS, o con
 * `prefers-reduced-motion: reduce`, la sección se aplana a un stack
 * estático normal (`StaticHero`, más abajo) — mismo contenido, sin pin,
 * sin fundidos, todo visible de una vez.
 *
 * Nota de implementación importante (bug real encontrado en V1): los
 * valores ligados a scroll NUNCA se pasan por el prop `style` de un
 * componente `motion.*`/`m.*` — ver `useDirectStyle.ts` para el porqué
 * (Motion los "acelera" a una animación nativa que, para esta estructura
 * sticky + absolute, calcula un progreso distinto al de nuestro
 * `useScroll`). De hecho, este archivo ya NO usa ningún componente de
 * render de Motion (`motion.*`/`m.*`): la entrada de la Escena 1 se
 * volvió CSS puro (`.cine-reveal`, ver globals.css) tras medir en
 * Lighthouse que `m.*` (incluso vía `LazyMotion`+`domAnimation`) seguía
 * añadiendo JS sin usar y bajaba Performance/TBT sin necesidad — Motion
 * ahora solo se usa para lo que de verdad no tiene equivalente nativo
 * simple: `useScroll`/`useTransform` para leer y mapear el progreso.
 */
export function CinematicHero() {
  // `useReducedMotion` de Motion ya resuelve el problema de SSR por su
  // cuenta: devuelve `null` en el render de servidor y en el primer
  // paint del cliente (mismo valor en ambos → sin mismatch de
  // hidratación), y solo pasa a `true`/`false` tras montar, en cuanto
  // puede leer `window.matchMedia`. Tratamos `null` igual que `false`
  // (experiencia completa) — ver la doc oficial del hook para ese
  // contrato exacto.
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion === true) {
    return <StaticHero />;
  }

  return <CinematicScroller />;
}

function CinematicScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Interactividad de la CTA de la Escena 1: se apaga con `inert` (no solo
  // opacidad) en cuanto deja de ser la escena protagonista, para que un
  // usuario de teclado nunca caiga en un botón invisible mientras se ve
  // la Escena 2 o 3 (auditoría de accesibilidad propia, no pedida
  // explícitamente pero coherente con "teclado y focus intactos").
  const [scene1Interactive, setScene1Interactive] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScene1Interactive(latest < 0.34);
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[190vh] md:h-[320vh]"
      aria-label="Introducción Atheron Security"
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-surface-dark">
        <BackgroundLayer progress={scrollYProgress} />

        <Scene1 progress={scrollYProgress} interactive={scene1Interactive} />
        <EcosystemScene progress={scrollYProgress} />
        <GrowthTeaser progress={scrollYProgress} />

        <ScrollHint progress={scrollYProgress} />
      </div>
    </section>
  );
}

/** Fondo compartido por las 3 escenas: rejilla + brillo, con una deriva de paralaje MUY moderada (±24px) solo en desktop. */
function BackgroundLayer({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useTransform(progress, [0, 1], [0, -24]);
  useDirectStyle(ref, { y });

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      <div className="atheron-grid-overlay opacity-60" />
      <div className="atheron-cine-glow" />
    </div>
  );
}

function Scene1({
  progress,
  interactive,
}: {
  progress: MotionValue<number>;
  interactive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const opacity = useTransform(progress, [0, 0.16, 0.28], [1, 1, 0]);
  const y = useTransform(progress, [0, 0.28], [0, -36]);
  const scale = useTransform(progress, [0, 0.28], [1, 0.94]);
  useDirectStyle(ref, { opacity, y, scale });

  return (
    <div ref={ref} className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
      <h1
        className="cine-reveal max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        style={{ "--cine-delay": "150ms" } as React.CSSProperties}
      >
        Seguridad que crece contigo
      </h1>

      <p
        className="cine-reveal mt-5 max-w-xl text-base leading-relaxed text-text-on-dark-muted sm:text-lg"
        style={{ "--cine-delay": "320ms" } as React.CSSProperties}
      >
        {ATHERON_CENTRAL_MESSAGE}
      </p>

      <div
        className="cine-reveal mt-8 flex flex-col items-center gap-3 sm:flex-row"
        style={{ "--cine-delay": "480ms" } as React.CSSProperties}
        // `inert` (no opacity/display) para no dejar la CTA enfocable
        // por teclado mientras está visualmente apagada en Escenas 2-3.
        inert={!interactive}
      >
        <DesignSystemModal triggerLabel="Diseñar mi sistema" triggerSize="lg" />
        <WhatsappCta message={buildDesignSystemWhatsappMessage()} size="lg" tone="dark" />
      </div>
    </div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const opacity = useTransform(progress, [0, 0.06, 0.12], [0, 1, 0]);
  useDirectStyle(ref, { opacity });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M12 5v14m0 0-6-6m6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

/**
 * Fallback estático: MISMO contenido, sin pin ni scroll-linking. Se usa
 * con `prefers-reduced-motion: reduce`. Reutiliza el hero 001E como base
 * porque ya es exactamente "una composición estática premium" — el
 * requisito del mandato para este caso.
 */
function StaticHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-dark px-4 py-20 text-center text-white sm:py-28">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent-light">
        Atheron Security
      </p>
      <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        Seguridad que crece contigo
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-text-on-dark-muted">
        {ATHERON_CENTRAL_MESSAGE}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <DesignSystemModal triggerLabel="Diseñar mi sistema" triggerSize="lg" />
        <WhatsappCta message={buildDesignSystemWhatsappMessage()} size="lg" tone="dark" />
      </div>
    </section>
  );
}

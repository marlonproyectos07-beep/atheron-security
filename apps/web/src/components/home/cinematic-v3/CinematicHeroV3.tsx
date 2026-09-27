"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DesignSystemModal } from "@/components/lead/DesignSystemModal";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { buildDesignSystemWhatsappMessage } from "@/lib/whatsapp";
import { ProtagonistObject } from "@/components/home/cinematic-v3/ProtagonistObject";
import { useCinematicReady } from "@/components/home/cinematic-v3/useCinematicReady";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SCENE2_LABELS = ["Visión", "Detección", "Control", "Automatización"];

const ECOSYSTEM_NODES = [
  { label: "Cámaras", x: 50, y: 8 },
  { label: "Alarma", x: 92, y: 50 },
  { label: "Control de acceso", x: 50, y: 92 },
  { label: "Automatización", x: 8, y: 50 },
];

const GROWTH_STEPS = ["1 equipo", "Más cobertura", "Sistema integrado", "ATHERON"];

/**
 * ATH-SECURITY-HOME-CINEMATIC-003 — motor de scroll con GSAP + ScrollTrigger.
 *
 * Un solo `ScrollTrigger` con `pin: true` fija esta sección (el propio
 * elemento, sin necesidad de `position: sticky` manual — GSAP gestiona
 * el spacer) durante una distancia de scroll (`end`) proporcional a la
 * altura de viewport. `scrub: 1` liga el playhead de un timeline maestro
 * al progreso real de scroll (con un segundo de suavizado) — el usuario
 * conserva control total del scroll, no hay autoplay ni scroll-hijacking.
 *
 * Las 5 escenas del mandato son tramos de UN timeline (posiciones 0→1):
 * 1. Aparición      0.00–0.16
 * 2. Giro + labels  0.16–0.52
 * 3. Ecosistema     0.50–0.74
 * 4. Crecimiento    0.72–0.96
 * 5. Salida         0.96–1.00 (el pin se libera solo al pasar `end`)
 *
 * Contenido crítico (H1, subcopy, labels, CTAs) es HTML real montado
 * siempre — GSAP solo anima opacidad/transform sobre él. El servidor
 * siempre asume `CinematicScroller` (caso común); `useCinematicReady`
 * resuelve `prefers-reduced-motion` de forma síncrona en el primer
 * render de cliente, así que para la inmensa mayoría de usuarios
 * (sin esa preferencia) el cliente coincide con el servidor y no hay
 * swap ni parpadeo. Solo si el usuario pidió `reduced: reduce`, React
 * detecta la discrepancia YA en la hidratación y monta `StaticHero`
 * desde cero — ver el comentario de `useCinematicReady` para el porqué
 * de este orden exacto (evita un crash real de desmontaje contra el DOM
 * que ScrollTrigger reestructura, y evita también una regresión de CLS
 * medida en una variante anterior de este mismo arreglo).
 */
export function CinematicHeroV3() {
  const cinematicReady = useCinematicReady();

  if (!cinematicReady) {
    return <StaticHero />;
  }

  return <CinematicScroller />;
}

function CinematicScroller() {
  const pinRef = useRef<HTMLDivElement>(null);
  const protagonistWrapRef = useRef<HTMLDivElement>(null);
  const protagonistRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2LabelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene3NodeRefs = useRef<(SVGGElement | null)[]>([]);
  const scene3LineRefs = useRef<(SVGLineElement | null)[]>([]);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const growthStepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closingTextRef = useRef<HTMLParagraphElement>(null);

  const [scene1Interactive, setScene1Interactive] = useState(true);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const scrollDistance = (isDesktop ? 5 : 3) * window.innerHeight;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setScene1Interactive(self.progress < 0.14),
        },
      });

      // --- Escena 1: aparición ---
      tl.fromTo(
        protagonistRef.current,
        { opacity: 0, scale: 0.65, rotateY: -48, filter: "blur(14px)" },
        { opacity: 1, scale: 1, rotateY: -18, filter: "blur(0px)", duration: 0.16, ease: "power2.out" },
        0,
      ).fromTo(scene1Ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.1 }, 0.02)
        .to(scene1Ref.current, { opacity: 0, y: -16, duration: 0.06 }, 0.16);

      // --- Escena 2: giro controlado + labels ---
      tl.to(
        protagonistRef.current,
        { rotateY: isDesktop ? 42 : 22, scale: isDesktop ? 1.22 : 1.08, duration: 0.34, ease: "none" },
        0.18,
      );
      SCENE2_LABELS.forEach((_label, i) => {
        const start = 0.2 + i * 0.075;
        const el = scene2LabelRefs.current[i];
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.025 }, start).to(
          el,
          { opacity: 0, duration: 0.025 },
          start + 0.055,
        );
      });

      // --- Escena 3: ecosistema ---
      tl.to(protagonistRef.current, { scale: 0.5, rotateY: 0, duration: 0.1, ease: "power1.inOut" }, 0.52).to(
        protagonistWrapRef.current,
        { opacity: 0, duration: 0.06 },
        0.72,
      );
      tl.fromTo(scene3Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0.5);
      scene3LineRefs.current.forEach((line, i) => {
        if (!line) return;
        const length = line.getTotalLength();
        line.style.strokeDasharray = `${length}`;
        gsap.set(line, { strokeDashoffset: length });
        tl.to(line, { strokeDashoffset: 0, duration: 0.05, ease: "none" }, 0.54 + i * 0.035);
      });
      scene3NodeRefs.current.forEach((node, i) => {
        tl.fromTo(
          node,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.04, ease: "back.out(1.6)" },
          0.58 + i * 0.035,
        );
      });
      tl.to(scene3Ref.current, { opacity: 0, duration: 0.04 }, 0.74);

      // --- Escena 4: crecimiento ---
      tl.fromTo(scene4Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0.76);
      growthStepRefs.current.forEach((step, i) => {
        tl.fromTo(
          step,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" },
          0.78 + i * 0.045,
        );
      });
      tl.fromTo(closingTextRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.06 }, 0.9);

      // --- Escena 5: salida ---
      tl.to([scene4Ref.current], { opacity: 0, duration: 0.04 }, 0.97);
    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pinRef}
      className="relative h-dvh overflow-hidden bg-gradient-to-b from-[#050c1f] via-surface-dark to-[#050c1f]"
      aria-label="Introducción Atheron Security"
    >
      <div className="atheron-grid-overlay opacity-40" aria-hidden="true" />

      <div
        ref={protagonistWrapRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1400px" }}
        aria-hidden="true"
      >
        <div className="h-[38vh] w-[38vh] sm:h-[42vh] sm:w-[42vh] md:h-[46vh] md:w-[46vh]">
          <ProtagonistObject ref={protagonistRef} />
        </div>
      </div>

      <div
        ref={scene1Ref}
        className="absolute inset-x-0 bottom-[8vh] flex flex-col items-center px-4 text-center sm:bottom-[10vh]"
      >
        <h1 className="max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          Seguridad que crece contigo
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-on-dark-muted sm:text-base">
          Empieza con lo que necesitas hoy. Construye el sistema que necesitarás mañana.
        </p>
        <div
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row"
          inert={!scene1Interactive}
        >
          <DesignSystemModal triggerLabel="Diseñar mi sistema" triggerSize="lg" />
          <WhatsappCta message={buildDesignSystemWhatsappMessage()} size="lg" tone="dark" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[18vh] flex justify-center sm:bottom-[20vh]" aria-hidden="true">
        <div className="relative h-8 w-full max-w-xs">
          {SCENE2_LABELS.map((label, i) => (
            <span
              key={label}
              ref={(el) => {
                scene2LabelRefs.current[i] = el;
              }}
              className="absolute inset-0 flex items-center justify-center text-lg font-semibold uppercase tracking-[0.3em] text-white opacity-0"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div ref={scene3Ref} className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0" aria-hidden="true">
        {/*
          Líneas Y nodos viven en el MISMO <svg> (mismo viewBox 0-100),
          nunca líneas en SVG + nodos como <div> con `left/top` en % —
          bug real encontrado en V1: el contenedor real es un rectángulo
          ancho (viewport completo), pero el viewBox es cuadrado; con
          `preserveAspectRatio="xMidYMid meet"` el dibujo SVG queda
          "letterboxed" centrado, mientras que un `div` posicionado por
          `%` sigue midiendo contra el ancho TOTAL del contenedor — los
          nodos y las líneas dejan de coincidir (el nodo "Alarma" a
          x:92% terminaba pegado al borde real de la pantalla, no al
          borde del dibujo). Con nodos como `<text>`/`<circle>` del
          propio SVG esto es imposible: comparten coordenadas siempre.
        */}
        <svg viewBox="0 0 100 100" className="h-[64vh] w-[64vh] max-h-full max-w-full">
          {ECOSYSTEM_NODES.map((node, i) => (
            <line
              key={node.label}
              ref={(el) => {
                scene3LineRefs.current[i] = el;
              }}
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              stroke="#2563eb"
              strokeWidth="0.4"
            />
          ))}
          {ECOSYSTEM_NODES.map((node, i) => (
            <g
              key={node.label}
              ref={(el) => {
                scene3NodeRefs.current[i] = el;
              }}
              opacity="0"
            >
              <circle
                cx={node.x}
                cy={node.y}
                r="2.2"
                fill="#2563eb"
                stroke="rgba(37,99,235,0.35)"
                strokeWidth="3"
              />
              <text
                x={node.x}
                y={node.y + (node.y <= 10 ? -6 : 8)}
                textAnchor={node.x <= 10 ? "start" : node.x >= 90 ? "end" : "middle"}
                className="fill-text-on-dark-muted"
                style={{ fontSize: "3.4px", fontWeight: 500 }}
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div
        ref={scene4Ref}
        className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 text-center opacity-0"
      >
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5" aria-hidden="true">
          {GROWTH_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-3 sm:gap-5">
              <div
                ref={(el) => {
                  growthStepRefs.current[i] = el;
                }}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white opacity-0 sm:text-base"
              >
                {step}
              </div>
              {i < GROWTH_STEPS.length - 1 ? <span className="text-white/30">→</span> : null}
            </div>
          ))}
        </div>
        <p
          ref={closingTextRef}
          className="max-w-xl text-lg font-semibold leading-snug text-white opacity-0 sm:text-2xl"
        >
          Empieza con lo que necesitas hoy.
          <br />
          Construye el sistema que necesitarás mañana.
        </p>
      </div>
    </div>
  );
}

/**
 * Fallback estático (`prefers-reduced-motion: reduce`): mismo contenido
 * crítico, sin pin, sin GSAP, sin ScrollTrigger — composición premium
 * normal, todo visible de inmediato.
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
        Empieza con lo que necesitas hoy. Construye el sistema que necesitarás mañana.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <DesignSystemModal triggerLabel="Diseñar mi sistema" triggerSize="lg" />
        <WhatsappCta message={buildDesignSystemWhatsappMessage()} size="lg" tone="dark" />
      </div>
    </section>
  );
}

import { useRef } from "react";
import { useTransform, type MotionValue } from "motion/react";
import { useDirectStyle } from "@/components/home/cinematic/useDirectStyle";

const MILESTONES = [
  { label: "1 equipo", range: [0.68, 0.75] as const },
  { label: "Más cobertura", range: [0.77, 0.84] as const },
  { label: "Sistema integrado", range: [0.86, 0.93] as const },
];

/**
 * Escena 3 — "Crecimiento". Progreso 0.60→1.0. Reutiliza el vocabulario
 * de `lib/growth/growth-path.ts` (mismos 3 hitos narrativos que agrupan
 * las 9 etapas reales de la Ruta de Crecimiento que aparece más abajo en
 * la página) a propósito: es un adelanto visual de esa sección, no un
 * dato nuevo ni una promesa distinta.
 *
 * Valores ligados a scroll aplicados a mano vía `useDirectStyle` — ver
 * `useDirectStyle.ts` para el porqué.
 */
export function GrowthTeaser({ progress }: { progress: MotionValue<number> }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sceneOpacity = useTransform(progress, [0.6, 0.68], [0, 1]);
  useDirectStyle(wrapperRef, { opacity: sceneOpacity });

  const lineRef = useRef<HTMLDivElement>(null);
  const lineScale = useTransform(progress, [0.68, 0.94], [0, 1]);
  useDirectStyle(lineRef, { scaleX: lineScale });

  const brandRef = useRef<HTMLParagraphElement>(null);
  const brandOpacity = useTransform(progress, [0.94, 1], [0, 1]);
  const brandScale = useTransform(progress, [0.94, 1], [0.9, 1]);
  useDirectStyle(brandRef, { opacity: brandOpacity, scale: brandScale });

  return (
    <div ref={wrapperRef} className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6">
      <div className="relative flex w-full max-w-2xl items-center justify-between">
        <div
          ref={lineRef}
          aria-hidden="true"
          className="absolute left-0 right-0 top-1/2 h-px origin-left bg-brand-accent/50"
        />
        {MILESTONES.map((milestone) => (
          <Milestone key={milestone.label} progress={progress} range={milestone.range} label={milestone.label} />
        ))}
      </div>

      <p ref={brandRef} className="text-center text-2xl font-black tracking-tight text-white sm:text-3xl">
        ATHERON
      </p>
    </div>
  );
}

function Milestone({
  progress,
  range,
  label,
}: {
  progress: MotionValue<number>;
  range: readonly [number, number];
  label: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const opacity = useTransform(progress, [range[0], range[1]], [0, 1]);
  useDirectStyle(wrapperRef, { opacity });

  const dotRef = useRef<HTMLSpanElement>(null);
  const scale = useTransform(progress, [range[0], range[1]], [0.5, 1]);
  useDirectStyle(dotRef, { scale });

  return (
    <div ref={wrapperRef} className="relative z-10 flex flex-col items-center gap-3">
      <span
        ref={dotRef}
        className="h-3.5 w-3.5 rounded-full bg-brand-accent shadow-[0_0_0_6px_rgba(37,99,235,0.2)]"
      />
      <span className="max-w-[7rem] text-center text-xs font-medium text-text-on-dark-muted sm:text-sm">
        {label}
      </span>
    </div>
  );
}

import { forwardRef } from "react";

/**
 * Objeto protagonista — PLACEHOLDER TÉCNICO (Fase 3 del mandato: "todavía
 * NO existe el asset definitivo... no invertir horas perfeccionando el
 * placeholder"). Una sola ilustración SVG de una cámara de seguridad,
 * más detallada que los placeholders anteriores del sitio (aquí es la
 * protagonista visual, no un ícono de tarjeta), animada por el padre vía
 * GSAP (`rotateY`/`scale`/`z` en el contenedor con `ref`) en vez de una
 * secuencia de frames real. Cuando exista la secuencia prerenderizada
 * definitiva, este componente se reemplaza por un `<img>` que consume
 * `useScrollFrame.ts` — la arquitectura de scroll→timeline no cambia.
 */
export const ProtagonistObject = forwardRef<HTMLDivElement>(function ProtagonistObject(_props, ref) {
  return (
    <div ref={ref} className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
      <svg viewBox="0 0 480 480" className="h-full w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]">
        <defs>
          <linearGradient id="p3-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="55%" stopColor="#123a7a" />
            <stop offset="100%" stopColor="#071a3d" />
          </linearGradient>
          <radialGradient id="p3-lens" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#7fa6f5" />
            <stop offset="45%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#071a3d" />
          </radialGradient>
          <radialGradient id="p3-rim" cx="50%" cy="50%" r="50%">
            <stop offset="78%" stopColor="transparent" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
          </radialGradient>
        </defs>

        {/* Anillo de luz ambiental detrás del cuerpo, sugiere iluminación cinematográfica */}
        <circle cx="240" cy="240" r="200" fill="url(#p3-rim)" opacity="0.5" />

        {/* Brazo/soporte trasero */}
        <path d="M120 300 C104 320 100 345 112 368" fill="none" stroke="#0a2350" strokeWidth="14" strokeLinecap="round" />
        <circle cx="112" cy="368" r="16" fill="#0a2350" />

        {/* Cuerpo principal */}
        <rect x="96" y="176" width="220" height="96" rx="46" fill="url(#p3-body)" />
        <rect x="96" y="176" width="220" height="34" rx="17" fill="#ffffff" opacity="0.08" />

        {/* Visera */}
        <path d="M270 176 q52 -26 96 6" fill="none" stroke="#071a3d" strokeWidth="12" strokeLinecap="round" />

        {/* Aro + lente */}
        <circle cx="322" cy="224" r="58" fill="#071a3d" stroke="#2563eb" strokeWidth="5" />
        <circle cx="322" cy="224" r="42" fill="url(#p3-lens)" />
        <circle cx="304" cy="206" r="12" fill="#ffffff" opacity="0.4" />

        {/* LEDs IR */}
        <g fill="#3b82f6" opacity="0.7">
          <circle cx="284" cy="188" r="3.4" />
          <circle cx="360" cy="188" r="3.4" />
          <circle cx="284" cy="260" r="3.4" />
          <circle cx="360" cy="260" r="3.4" />
        </g>

        {/* Rejilla de ventilación trasera */}
        <g stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" opacity="0.5">
          <line x1="118" y1="200" x2="118" y2="250" />
          <line x1="132" y1="200" x2="132" y2="250" />
          <line x1="146" y1="200" x2="146" y2="250" />
        </g>
      </svg>
    </div>
  );
});

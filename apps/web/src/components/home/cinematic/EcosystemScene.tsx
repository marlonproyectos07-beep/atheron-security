import { useRef } from "react";
import { useTransform, type MotionValue } from "motion/react";
import { useDirectStyle, useDirectPathLength } from "@/components/home/cinematic/useDirectStyle";

/**
 * Escena 2 — "El sistema cobra vida". Progreso 0.24→0.70 de la barra
 * general. El hub aparece, y las 4 conexiones se "dibujan" (pathLength
 * 0→1) una tras otra según el scroll, cada una revelando su nodo — todo
 * ligado al scroll (`useTransform`), nunca a un timer/autoplay.
 *
 * Todos los valores ligados a scroll se aplican al DOM a mano (ver
 * `useDirectStyle`/`useDirectPathLength`) en vez de por el prop `style`
 * de `motion.*` — evita que Motion los acelere a una animación nativa
 * que, para esta estructura, calcula un progreso incorrecto (bug real
 * encontrado y documentado en `useDirectStyle.ts`).
 *
 * El `translate(x,y)` de cada nodo vive en un <g> ESTÁTICO envolvente,
 * nunca en el mismo elemento cuyo `transform` animamos — igual que en el
 * prototipo anterior (experiment/ath-security-home-signature): animar
 * `scale` con un `transform` de CSS sobre un `<g transform="translate(...)">`
 * reemplaza ese atributo en vez de componerlo.
 */
export function EcosystemScene({ progress }: { progress: MotionValue<number> }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sceneOpacity = useTransform(progress, [0.22, 0.28, 0.62, 0.7], [0, 1, 1, 0]);
  const sceneScale = useTransform(progress, [0.22, 0.28], [0.92, 1]);
  useDirectStyle(wrapperRef, { opacity: sceneOpacity, scale: sceneScale });

  const ringRef = useRef<SVGCircleElement>(null);
  const hubOpacity = useTransform(progress, [0.24, 0.3], [0, 1]);
  useDirectStyle(ringRef, { opacity: hubOpacity });

  const hubGroupRef = useRef<SVGGElement>(null);
  const hubScale = useTransform(progress, [0.24, 0.3], [0.7, 1]);
  useDirectStyle(hubGroupRef, { opacity: hubOpacity, scale: hubScale });

  // 4 conexiones espaciadas en el tramo 0.30 → 0.58
  const line1Ref = useRef<SVGLineElement>(null);
  const line1 = useTransform(progress, [0.3, 0.37], [0, 1]);
  useDirectPathLength(line1Ref, line1, line1);

  const node1Ref = useRef<SVGGElement>(null);
  const node1 = useTransform(progress, [0.35, 0.4], [0, 1]);
  useDirectStyle(node1Ref, { opacity: node1, scale: node1 });

  const line2Ref = useRef<SVGLineElement>(null);
  const line2 = useTransform(progress, [0.38, 0.45], [0, 1]);
  useDirectPathLength(line2Ref, line2, line2);

  const node2Ref = useRef<SVGGElement>(null);
  const node2 = useTransform(progress, [0.43, 0.48], [0, 1]);
  useDirectStyle(node2Ref, { opacity: node2, scale: node2 });

  const line3Ref = useRef<SVGLineElement>(null);
  const line3 = useTransform(progress, [0.46, 0.53], [0, 1]);
  useDirectPathLength(line3Ref, line3, line3);

  const node3Ref = useRef<SVGGElement>(null);
  const node3 = useTransform(progress, [0.51, 0.56], [0, 1]);
  useDirectStyle(node3Ref, { opacity: node3, scale: node3 });

  const line4Ref = useRef<SVGLineElement>(null);
  const line4 = useTransform(progress, [0.54, 0.61], [0, 1]);
  useDirectPathLength(line4Ref, line4, line4);

  const node4Ref = useRef<SVGGElement>(null);
  const node4 = useTransform(progress, [0.59, 0.64], [0, 1]);
  useDirectStyle(node4Ref, { opacity: node4, scale: node4 });

  return (
    <div ref={wrapperRef} className="absolute inset-0 flex items-center justify-center px-6">
      <svg
        viewBox="0 0 480 480"
        className="h-full max-h-[70vh] w-full max-w-[70vh]"
        role="img"
        aria-label="El ecosistema Atheron: cámaras, alarma, control de acceso y automatización conectados a un centro de control"
      >
        <defs>
          <linearGradient id="cinehub" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0a2350" />
          </linearGradient>
        </defs>

        <circle
          ref={ringRef}
          cx="240"
          cy="240"
          r="118"
          fill="none"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeDasharray="3 8"
        />

        {/* 4 líneas de conexión, cada una con su propio pathLength ligado al scroll */}
        <line ref={line1Ref} x1="240" y1="196" x2="240" y2="112" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
        <line ref={line2Ref} x1="284" y1="240" x2="368" y2="240" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
        <line ref={line3Ref} x1="240" y1="284" x2="240" y2="368" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
        <line ref={line4Ref} x1="196" y1="240" x2="112" y2="240" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />

        {/* Hub central */}
        <g ref={hubGroupRef} style={{ transformOrigin: "240px 240px" }}>
          <rect x="196" y="196" width="88" height="88" rx="24" fill="url(#cinehub)" />
          <path d="M240 214 l24 9v18c0 17-10 28-24 33-14-5-24-16-24-33v-18Z" fill="none" stroke="#eaf1fd" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M231 240l7 7 13-15" fill="none" stroke="#eaf1fd" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Nodo: cámara (arriba) */}
        <g transform="translate(240,84)">
          <g ref={node1Ref} style={{ transformOrigin: "0px 0px" }}>
            <circle r="28" fill="#ffffff" stroke="#123a7a" strokeWidth="3" />
            <rect x="-14" y="-8" width="28" height="16" rx="6" fill="#123a7a" />
            <circle cx="6" r="6" fill="#2563eb" />
          </g>
        </g>

        {/* Nodo: alarma (derecha) */}
        <g transform="translate(396,240)">
          <g ref={node2Ref} style={{ transformOrigin: "0px 0px" }}>
            <circle r="28" fill="#ffffff" stroke="#123a7a" strokeWidth="3" />
            <path d="M0 -12a12 12 0 0 1 12 12v6l4 6H-16l4-6v-6a12 12 0 0 1 12-12Z" fill="#123a7a" />
            <path d="M-4 12a4 4 0 0 0 8 0" fill="none" stroke="#123a7a" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        </g>

        {/* Nodo: control de acceso (abajo) */}
        <g transform="translate(240,396)">
          <g ref={node3Ref} style={{ transformOrigin: "0px 0px" }}>
            <circle r="28" fill="#ffffff" stroke="#123a7a" strokeWidth="3" />
            <rect x="-11" y="-2" width="22" height="16" rx="4" fill="#123a7a" />
            <path d="M-6 -2v-6a6 6 0 0 1 12 0v6" fill="none" stroke="#123a7a" strokeWidth="3" />
          </g>
        </g>

        {/* Nodo: automatización (izquierda) */}
        <g transform="translate(84,240)">
          <g ref={node4Ref} style={{ transformOrigin: "0px 0px" }}>
            <circle r="28" fill="#ffffff" stroke="#123a7a" strokeWidth="3" />
            <path d="M-9 -9 a12.7 12.7 0 0 1 18 0 M9 9 a12.7 12.7 0 0 1-18 0" fill="none" stroke="#123a7a" strokeWidth="3" strokeLinecap="round" />
            <circle r="4.5" fill="#123a7a" />
          </g>
        </g>
      </svg>
    </div>
  );
}

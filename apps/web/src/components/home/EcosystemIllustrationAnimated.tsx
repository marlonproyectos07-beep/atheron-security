"use client";

import { useEffect, useRef } from "react";

/**
 * Versión animada de public/home/hero-ecosystem.svg (experimento Signature,
 * Gate 6 — NO forma parte de la rama piloto estable).
 *
 * Inlineamos el SVG (en vez de <Image>) porque solo así se puede animar el
 * trazo de las líneas de conexión con la Web Animations API nativa
 * (`Element.animate()`), sin ninguna dependencia nueva. Un solo efecto, una
 * sola vez al montar — no es un loop continuo salvo el brillo del centro,
 * deliberadamente muy sutil y también controlado por `prefers-reduced-motion`.
 *
 * Si el usuario tiene `prefers-reduced-motion: reduce`, o si
 * `Element.animate` no existe, el SVG se muestra completo y estático de
 * inmediato — el mismo resultado visual que la versión 001E estable.
 */
export function EcosystemIllustrationAnimated() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof svg.animate !== "function") return;

    const lines = svg.querySelectorAll<SVGLineElement>("[data-anim='line']");
    const nodes = svg.querySelectorAll<SVGGElement>("[data-anim='node']");
    const dots = svg.querySelectorAll<SVGCircleElement>("[data-anim='dot']");
    const hub = svg.querySelector<SVGGElement>("[data-anim='hub']");

    [...lines, ...nodes, ...dots, hub].forEach((el) => el?.setAttribute("opacity", "0"));

    if (hub) {
      hub.animate([{ opacity: 0, transform: "scale(0.85)" }, { opacity: 1, transform: "scale(1)" }], {
        duration: 420,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "forwards",
      });
    }

    lines.forEach((line, index) => {
      const length = line.getTotalLength ? line.getTotalLength() : 80;
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
      line.animate(
        [
          { opacity: 1, strokeDashoffset: length },
          { opacity: 1, strokeDashoffset: 0 },
        ],
        {
          duration: 360,
          delay: 200 + index * 90,
          easing: "ease-out",
          fill: "forwards",
        },
      );
    });

    dots.forEach((dot, index) => {
      dot.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        delay: 460 + index * 90,
        fill: "forwards",
      });
    });

    nodes.forEach((node, index) => {
      node.animate(
        [
          { opacity: 0, transform: "scale(0.6)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        {
          duration: 320,
          delay: 480 + index * 90,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "forwards",
        },
      );
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 480"
      role="img"
      aria-labelledby="signature-hero-title signature-hero-desc"
      className="h-full w-full"
    >
      <title id="signature-hero-title">Ecosistema de seguridad Atheron</title>
      <desc id="signature-hero-desc">
        Ilustración conceptual: un centro de control conectado a cámaras, alarmas, control de
        acceso y automatización. Representa la idea de un sistema que crece por etapas, no un
        producto ni certificación específica.
      </desc>
      <defs>
        <linearGradient id="shbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eaf1fd" />
          <stop offset="100%" stopColor="#dbe7fb" />
        </linearGradient>
        <linearGradient id="shhub" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0a2350" />
        </linearGradient>
        <radialGradient id="shglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
        <pattern id="shgrid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="#123a7a" strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
      </defs>

      <circle cx="240" cy="240" r="220" fill="url(#shbg)" />
      <circle cx="240" cy="240" r="220" fill="url(#shgrid)" />
      <circle cx="240" cy="240" r="150" fill="url(#shglow)" className="signature-hub-breathe" />

      <circle
        cx="240"
        cy="240"
        r="118"
        fill="none"
        stroke="#2563eb"
        strokeWidth="1.5"
        strokeDasharray="3 8"
        opacity="0.4"
      />

      <g stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round">
        <line data-anim="line" x1="240" y1="196" x2="240" y2="112" />
        <line data-anim="line" x1="284" y1="240" x2="368" y2="240" />
        <line data-anim="line" x1="240" y1="284" x2="240" y2="368" />
        <line data-anim="line" x1="196" y1="240" x2="112" y2="240" />
      </g>
      <g fill="#2563eb">
        <circle data-anim="dot" cx="240" cy="154" r="3.5" />
        <circle data-anim="dot" cx="326" cy="240" r="3.5" />
        <circle data-anim="dot" cx="240" cy="326" r="3.5" />
        <circle data-anim="dot" cx="154" cy="240" r="3.5" />
      </g>

      <g data-anim="hub" style={{ transformOrigin: "240px 240px" }}>
        <rect x="196" y="196" width="88" height="88" rx="24" fill="url(#shhub)" />
        <path
          d="M240 214 l24 9v18c0 17-10 28-24 33-14-5-24-16-24-33v-18Z"
          fill="none"
          stroke="#eaf1fd"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M231 240l7 7 13-15"
          fill="none"
          stroke="#eaf1fd"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/*
        IMPORTANTE: el `translate(...)` vive en un <g> ESTÁTICO envolvente,
        nunca en el mismo elemento que anima `transform` por WAAPI. Un
        `transform` de CSS (lo que produce `.animate()`) reemplaza por
        completo el atributo SVG `transform`, no lo compone — animar
        escala directamente sobre el <g transform="translate(...)"> hacía
        que los 4 nodos saltaran al origen del SVG en cuanto arrancaba la
        animación. El <g data-anim="node"> interno solo escala/desvanece
        alrededor de su propio origen local (0,0), que ya cae en el centro
        del nodo gracias al translate del envolvente.
      */}
      <g transform="translate(240,84)">
        <g data-anim="node" style={{ transformOrigin: "0px 0px" }}>
          <circle r="28" fill="#ffffff" stroke="#123a7a" strokeWidth="3" />
          <rect x="-14" y="-8" width="28" height="16" rx="6" fill="#123a7a" />
          <circle cx="6" r="6" fill="#2563eb" />
        </g>
      </g>

      <g transform="translate(396,240)">
        <g data-anim="node" style={{ transformOrigin: "0px 0px" }}>
          <circle r="28" fill="#ffffff" stroke="#123a7a" strokeWidth="3" />
          <path d="M0 -12a12 12 0 0 1 12 12v6l4 6H-16l4-6v-6a12 12 0 0 1 12-12Z" fill="#123a7a" />
          <path d="M-4 12a4 4 0 0 0 8 0" fill="none" stroke="#123a7a" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      </g>

      <g transform="translate(240,396)">
        <g data-anim="node" style={{ transformOrigin: "0px 0px" }}>
          <circle r="28" fill="#ffffff" stroke="#123a7a" strokeWidth="3" />
          <rect x="-11" y="-2" width="22" height="16" rx="4" fill="#123a7a" />
          <path d="M-6 -2v-6a6 6 0 0 1 12 0v6" fill="none" stroke="#123a7a" strokeWidth="3" />
        </g>
      </g>

      <g transform="translate(84,240)">
        <g data-anim="node" style={{ transformOrigin: "0px 0px" }}>
          <circle r="28" fill="#ffffff" stroke="#123a7a" strokeWidth="3" />
          <path
            d="M-9 -9 a12.7 12.7 0 0 1 18 0 M9 9 a12.7 12.7 0 0 1-18 0"
            fill="none"
            stroke="#123a7a"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle r="4.5" fill="#123a7a" />
        </g>
      </g>
    </svg>
  );
}

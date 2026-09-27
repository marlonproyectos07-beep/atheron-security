import { useEffect, type RefObject } from "react";
import type { MotionValue } from "motion/react";

interface DirectStyleValues {
  opacity?: MotionValue<number>;
  y?: MotionValue<number>;
  scale?: MotionValue<number>;
  scaleX?: MotionValue<number>;
}

/**
 * Aplica MotionValues directamente al DOM vía un ref, evitando el prop
 * `style` de los componentes `motion.*`.
 *
 * Por qué existe (bug real encontrado en V1, ATH-SECURITY-HOME-SIGNATURE-002):
 * cuando un valor de `useTransform`/`useScroll` llega a `style` de un
 * `motion.*`, Motion puede "acelerarlo" convirtiéndolo en una animación
 * WAAPI nativa ligada a un `ViewTimeline` del navegador (optimización real
 * de la librería, ver `motion-dom`'s `MotionValue.accelerate`). Verificado
 * con `element.getAnimations()`: para nuestra estructura (contenido
 * absoluto dentro de un contenedor `sticky`, medido contra un `<section>`
 * ancestro que SÍ hace scroll normal) ese `ViewTimeline` nativo calcula un
 * progreso distinto al que da nuestro `useScroll({ target, offset })` en
 * JS — confirmado comparando el valor crudo del MotionValue (siempre
 * correcto) contra `getComputedStyle` del elemento (incorrecto, seguía
 * subiendo de opacidad mucho después de que debía llegar a 0). No hay
 * flag público para desactivar esa aceleración, así que la forma
 * confiable de evitarla es no pasar el valor por `style` en absoluto:
 * nos suscribimos nosotros mismos con `MotionValue.on("change", ...)` y
 * escribimos el estilo a mano — el mismo camino que ya confirmamos
 * correcto al leer el valor crudo.
 */
export function useDirectStyle(
  ref: RefObject<HTMLElement | SVGElement | null>,
  values: DirectStyleValues,
) {
  const { opacity, y, scale, scaleX } = values;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = () => {
      const transformParts: string[] = [];
      if (y) transformParts.push(`translateY(${y.get()}px)`);
      if (scale) transformParts.push(`scale(${scale.get()})`);
      if (scaleX) transformParts.push(`scaleX(${scaleX.get()})`);
      if (transformParts.length > 0) {
        el.style.transform = transformParts.join(" ");
      }
      if (opacity) {
        el.style.opacity = String(opacity.get());
      }
    };

    apply();
    const unsubs = [
      opacity?.on("change", apply),
      y?.on("change", apply),
      scale?.on("change", apply),
      scaleX?.on("change", apply),
    ].filter((u): u is () => void => Boolean(u));

    return () => unsubs.forEach((u) => u());
  }, [ref, opacity, y, scale, scaleX]);
}

/** Igual que arriba, pero para el `pathLength` normalizado (0-1) de un <line>/<path> SVG, vía stroke-dasharray/dashoffset. */
export function useDirectPathLength(
  ref: RefObject<SVGLineElement | SVGPathElement | null>,
  pathLength: MotionValue<number>,
  opacity?: MotionValue<number>,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const totalLength = el.getTotalLength();
    el.style.strokeDasharray = `${totalLength}`;

    const apply = () => {
      const fraction = pathLength.get();
      el.style.strokeDashoffset = `${totalLength * (1 - fraction)}`;
      if (opacity) el.style.opacity = String(opacity.get());
    };

    apply();
    const unsubs = [pathLength.on("change", apply), opacity?.on("change", apply)].filter(
      (u): u is () => void => Boolean(u),
    );
    return () => unsubs.forEach((u) => u());
  }, [ref, pathLength, opacity]);
}

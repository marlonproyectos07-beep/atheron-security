"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll-reveal liviano (HOME PREMIUM V4): sin librería, sin scroll
 * listener propio — un solo `IntersectionObserver` por instancia. El
 * elemento se renderiza SIEMPRE visible (mismo HTML en servidor y en el
 * primer paint de cliente, cero riesgo de mismatch de hidratación); la
 * clase que de verdad lo oculta (`atheron-reveal-pre`, ver globals.css)
 * se agrega recién en un efecto, después del montaje, y solo si el
 * elemento todavía no está en el viewport — así que en el peor caso
 * (JS lento, o sin JS) el contenido nunca queda oculto.
 */
export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.9;
    if (alreadyVisible) return;

    el.style.transitionDelay = `${delayMs}ms`;
    el.classList.add("atheron-reveal-pre");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("atheron-reveal-pre");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className={cn("atheron-reveal", className)}>
      {children}
    </div>
  );
}

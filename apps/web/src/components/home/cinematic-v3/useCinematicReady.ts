import { useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function readPreference(): boolean {
  // El servidor no puede leer `matchMedia` — asume "sin reduced-motion"
  // (igual que el HTML que efectivamente envía: `CinematicScroller`).
  // El lazy initializer del cliente reevalúa esto con el valor real en
  // su primerísimo render; ver el comentario de `useCinematicReady`.
  if (typeof window === "undefined") return true;
  return !window.matchMedia(QUERY).matches;
}

/**
 * Decide en el PRIMER render de cliente (lazy initializer de `useState`,
 * no en un efecto posterior) si corresponde montar `CinematicScroller`.
 * Se probaron dos alternativas antes de esta y ambas tuvieron un costo
 * real medido:
 *
 * 1. Resolver el valor en un efecto (`useEffect`/`useLayoutEffect`/
 *    `useSyncExternalStore`) DESPUÉS del primer commit: en cualquiera de
 *    esas variantes, si el usuario pide reduced-motion, `CinematicScroller`
 *    llega a montarse aunque sea un instante — su propio `useEffect` ya
 *    deja a ScrollTrigger (`pin: true`) reestructurando el DOM (spacer +
 *    reparent) — y al desmontarlo para reemplazarlo por `StaticHero`,
 *    React intenta remover nodos que GSAP ya movió y lanza
 *    `NotFoundError: Failed to execute 'removeChild' on 'Node'`
 *    (reproducido con Playwright `reducedMotion: "reduce"`; la página
 *    entera caía con "This page couldn't load").
 *
 * 2. Arrancar SIEMPRE en `StaticHero` (igual en servidor y cliente) y
 *    recién después de montar decidir si conviene mostrar la versión
 *    cinemática: evita el crash, pero para el caso COMÚN (sin
 *    reduced-motion — la mayoría de usuarios reales, y también el modo
 *    por defecto en el que Lighthouse audita) esto fuerza un swap
 *    `StaticHero` → `CinematicScroller` en TODA carga, no solo cuando
 *    hace falta. Medido con Playwright (`PerformanceObserver` de
 *    `layout-shift`): ese swap empuja la sección siguiente (`Segments`)
 *    y produce un CLS real de 0.115 en mobile — peor que el objetivo
 *    "~0" del Performance Gate, y una regresión NUEVA que no existía
 *    antes de intentar arreglar el crash.
 *
 * Esta versión evalúa `matchMedia` de forma síncrona en el lazy
 * initializer de `useState`, que corre en el primerísimo render de
 * cliente — ANTES de que React intente reconciliar contra el HTML del
 * servidor. Para el caso común (sin reduced-motion) el valor coincide
 * con lo que asume el HTML del servidor (`CinematicScroller`): cero
 * mismatch, cero swap, cero regresión de CLS/rendimiento. Para el caso
 * raro (reduced-motion activo) el valor SÍ difiere del servidor —
 * React detecta la discrepancia durante la hidratación misma (no en un
 * efecto posterior) y monta `StaticHero` desde cero del lado del
 * cliente ANTES de que el árbol de `CinematicScroller` llegue a
 * comprometerse, evitando el crash. El costo aceptado: un error
 * recuperable de React (#418, hydration mismatch) en consola SOLO para
 * ese caso minoritario — la página igual termina mostrando el contenido
 * estático correcto, sin caída ni pérdida de funcionalidad. No cubre un
 * cambio EN VIVO del ajuste del sistema operativo mientras la página ya
 * está abierta (fuera de alcance del mandato; la decisión se toma una
 * sola vez, al cargar).
 */
export function useCinematicReady(): boolean {
  const [ready] = useState(readPreference);
  return ready;
}

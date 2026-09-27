/**
 * Arquitectura de "secuencia de frames" pedida en la Fase 3 del mandato
 * (ATH-SECURITY-HOME-CINEMATIC-003): mapea un progreso de scroll (0-1) a
 * un índice de frame de una futura secuencia prerenderizada
 * (`frame-0001.avif` ... `frame-NNNN.avif`), y calcula qué ventana de
 * frames precargar alrededor del índice actual.
 *
 * Hoy NO existe el asset definitivo (ver Fase 3 del mandato: "todavía NO
 * existe el asset definitivo"), así que nada en el render actual consume
 * esto todavía — el placeholder visual (`ProtagonistObject`) usa un
 * único SVG con transform 3D continuo en vez de swap de frames, porque
 * con solo 2-3 ángulos dibujados a mano un swap discreto se ve más
 * entrecortado que una rotación CSS continua, y "no invertir horas
 * perfeccionando el placeholder" pesa más que demostrar el swap
 * discreto con arte de relleno. Esta función queda lista para cuando
 * exista la secuencia real: sustituir `ProtagonistObject`'s transform
 * continuo por `<img src={frames[frameIndex]}>` es el único cambio
 * necesario en ese momento.
 */

export interface FrameWindow {
  /** Índice de frame 0-based para el progreso dado. */
  index: number;
  /** Índices a precargar ahora (el actual + una ventana alrededor), no toda la secuencia. */
  preloadIndices: number[];
}

export function progressToFrameIndex(progress: number, frameCount: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.min(frameCount - 1, Math.round(clamped * (frameCount - 1)));
}

/**
 * `windowSize` = cuántos frames precargar a cada lado del actual. Con
 * 100 frames y windowSize=3 esto precarga como máximo 7 imágenes en vez
 * de las 100 — el "no cargar 100 frames de golpe" del mandato.
 */
export function getFrameWindow(progress: number, frameCount: number, windowSize = 3): FrameWindow {
  const index = progressToFrameIndex(progress, frameCount);
  const preloadIndices: number[] = [];
  for (let offset = -windowSize; offset <= windowSize; offset++) {
    const candidate = index + offset;
    if (candidate >= 0 && candidate < frameCount) preloadIndices.push(candidate);
  }
  return { index, preloadIndices };
}

export function frameUrl(basePath: string, index: number, extension: "avif" | "webp" = "avif"): string {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `${basePath}/frame-${frameNumber}.${extension}`;
}

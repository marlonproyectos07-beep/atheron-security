/**
 * RUTA DE CRECIMIENTO ATHERON — concepto central del ecosistema
 * (docs/brief/ecosystem-v1.md, sección "ATHERON LOOP" y modelo comercial híbrido).
 *
 * Lo que compras hoy puede formar parte del sistema que necesitas mañana.
 * Esta lista es compartida por todas las landings de producto: cada
 * producto solo declara en qué etapa vive hoy (`growthPath.currentStageId`).
 */

/**
 * Ids válidos como lista explícita (no derivados de `GROWTH_PATH_STAGES`
 * con `as const`, para no perder el tipo `GrowthStage[]` de abajo). Un
 * `currentStageId` con un id fuera de esta lista falla en `tsc --noEmit`
 * en vez de caer silenciosamente a "ninguna etapa resaltada" (auditoría
 * 001B, Arquitectura/Maintainability, P1).
 */
export const GROWTH_PATH_STAGE_IDS = [
  "one-camera",
  "more-coverage",
  "four-cameras",
  "eight-sixteen-cameras",
  "nvr-storage",
  "alarms",
  "access-control",
  "automation",
  "commercial-industrial",
] as const;

export type GrowthStageId = (typeof GROWTH_PATH_STAGE_IDS)[number];

/**
 * Agrupación visual en 3 fases (001E, refinamiento premium): puramente
 * presentacional — no cambia el significado de ninguna etapa ni el orden
 * de `GROWTH_PATH_STAGES`. Ayuda a leer las 9 etapas como una progresión
 * narrativa ("empiezas → consolidas → integras") en vez de una cuadrícula
 * plana de 9 tarjetas idénticas.
 */
export const GROWTH_PATH_PHASE_IDS = ["empezar", "consolidar", "integrar"] as const;
export type GrowthPhaseId = (typeof GROWTH_PATH_PHASE_IDS)[number];

export interface GrowthStage {
  id: GrowthStageId;
  title: string;
  description: string;
  phase: GrowthPhaseId;
}

export const GROWTH_PATH_PHASE_LABELS: Record<GrowthPhaseId, string> = {
  empezar: "Empezar",
  consolidar: "Consolidar",
  integrar: "Integrar",
};

export const GROWTH_PATH_STAGES: GrowthStage[] = [
  {
    id: "one-camera",
    title: "1 cámara",
    description: "El primer equipo de vigilancia de tu casa, finca o negocio.",
    phase: "empezar",
  },
  {
    id: "more-coverage",
    title: "Más cobertura",
    description: "Sumas ángulos y zonas a medida que identificas nuevos puntos ciegos.",
    phase: "empezar",
  },
  {
    id: "four-cameras",
    title: "4 cámaras",
    description: "Cobertura perimetral básica de una propiedad completa.",
    phase: "empezar",
  },
  {
    id: "eight-sixteen-cameras",
    title: "8 / 16 cámaras",
    description: "Cobertura completa para propiedades grandes o negocios con varios frentes.",
    phase: "consolidar",
  },
  {
    id: "nvr-storage",
    title: "NVR / almacenamiento",
    description: "Grabación centralizada y respaldo, en lugar de tarjetas independientes.",
    phase: "consolidar",
  },
  {
    id: "alarms",
    title: "Alarmas",
    description: "Detección activa que complementa la vigilancia por video.",
    phase: "consolidar",
  },
  {
    id: "access-control",
    title: "Control de acceso",
    description: "Gestión de quién entra y sale, y cuándo.",
    phase: "integrar",
  },
  {
    id: "automation",
    title: "Automatización",
    description: "Tus equipos de seguridad empiezan a trabajar juntos.",
    phase: "integrar",
  },
  {
    id: "commercial-industrial",
    title: "Comercial / industrial",
    description: "Proyectos de mayor escala, con acompañamiento técnico de Atheron.",
    phase: "integrar",
  },
];

export function getGrowthStageIndex(stageId: GrowthStageId): number {
  return GROWTH_PATH_STAGES.findIndex((stage) => stage.id === stageId);
}

export interface GrowthPhaseGroup {
  id: GrowthPhaseId;
  label: string;
  stages: GrowthStage[];
}

export function getGrowthPathPhaseGroups(): GrowthPhaseGroup[] {
  return GROWTH_PATH_PHASE_IDS.map((id) => ({
    id,
    label: GROWTH_PATH_PHASE_LABELS[id],
    stages: GROWTH_PATH_STAGES.filter((stage) => stage.phase === id),
  }));
}

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

export interface GrowthStage {
  id: GrowthStageId;
  title: string;
  description: string;
}

export const GROWTH_PATH_STAGES: GrowthStage[] = [
  {
    id: "one-camera",
    title: "1 cámara",
    description: "El primer punto de vigilancia de tu casa, finca o negocio.",
  },
  {
    id: "more-coverage",
    title: "Más cobertura",
    description: "Sumas ángulos y zonas a medida que identificas nuevos puntos ciegos.",
  },
  {
    id: "four-cameras",
    title: "4 cámaras",
    description: "Cobertura perimetral básica de una propiedad completa.",
  },
  {
    id: "eight-sixteen-cameras",
    title: "8 / 16 cámaras",
    description: "Cobertura completa para propiedades grandes o negocios con varios frentes.",
  },
  {
    id: "nvr-storage",
    title: "NVR / almacenamiento",
    description: "Grabación centralizada y respaldo, en lugar de tarjetas independientes.",
  },
  {
    id: "alarms",
    title: "Alarmas",
    description: "Detección activa que complementa la vigilancia por video.",
  },
  {
    id: "access-control",
    title: "Control de acceso",
    description: "Gestión de quién entra y sale, y cuándo.",
  },
  {
    id: "automation",
    title: "Automatización",
    description: "Tus equipos de seguridad empiezan a trabajar juntos.",
  },
  {
    id: "commercial-industrial",
    title: "Comercial / industrial",
    description: "Proyectos de mayor escala, con acompañamiento técnico de Atheron.",
  },
];

export function getGrowthStageIndex(stageId: GrowthStageId): number {
  return GROWTH_PATH_STAGES.findIndex((stage) => stage.id === stageId);
}

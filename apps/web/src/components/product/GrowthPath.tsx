import { Section } from "@/components/ui/Section";
import {
  GROWTH_PATH_STAGES,
  getGrowthPathPhaseGroups,
  getGrowthStageIndex,
  type GrowthStageId,
} from "@/lib/growth/growth-path";
import { cn } from "@/lib/cn";
import { ATHERON_CENTRAL_MESSAGE } from "@/lib/copy";

/**
 * Bloque visual compartido: se usa en cada landing de producto (resaltando
 * la etapa actual) y en la home/soluciones (como mapa general). Sin
 * `currentStageId`, resalta la primera etapa como "Punto de partida" — el
 * bloque siempre debe leerse como "empiezas aquí", nunca como tabla suelta.
 *
 * Agrupado en 3 fases (001E, refinamiento visual): antes las 9 etapas se
 * leían como una cuadrícula plana de tarjetas iguales. Agruparlas en
 * "Empezar / Consolidar / Integrar" (`stage.phase`) da la sensación de
 * progresión narrativa que pedía el brief, sin romper la numeración 1-9
 * continua ni la lógica de resaltado de la etapa actual.
 */
export function GrowthPath({ currentStageId }: { currentStageId?: GrowthStageId }) {
  const highlightId = currentStageId ?? GROWTH_PATH_STAGES[0].id;
  const highlightLabel = currentStageId ? "Estás aquí" : "Punto de partida";
  const phaseGroups = getGrowthPathPhaseGroups();

  return (
    <Section tone="dark" id="ruta-de-crecimiento" ariaLabel="Ruta de crecimiento Atheron">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-accent-light">
          Ruta de crecimiento Atheron
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Lo que compras hoy puede formar parte del sistema que necesitas mañana
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-on-dark-muted">
          {ATHERON_CENTRAL_MESSAGE}
        </p>
      </div>

      <ol className="mt-10 flex flex-col gap-6 lg:flex-row lg:gap-6">
        {phaseGroups.map((group, groupIndex) => (
          <li key={group.id} className="flex-1">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent-light">
                {group.label}
              </p>
              {groupIndex < phaseGroups.length - 1 ? (
                <span className="hidden flex-1 border-t border-dashed border-white/15 lg:block" aria-hidden="true" />
              ) : null}
            </div>

            {/*
              Card compacta (pulido final): antes el número/flecha vivían en
              su propia fila arriba del título — una fila extra por cada una
              de las 9 etapas, en las 3 columnas. Ponerlo en línea con el
              título (mismo patrón horizontal que el resto del sitio, p.ej.
              Capabilities) recorta esa altura sin quitar ninguna etapa ni
              texto.
            */}
            <ol className="mt-3 flex flex-col gap-2.5">
              {group.stages.map((stage) => {
                const isCurrent = stage.id === highlightId;
                const index = getGrowthStageIndex(stage.id);
                return (
                  <li key={stage.id}>
                    <div
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-4 transition-colors",
                        isCurrent
                          ? "border-brand-accent bg-white text-text shadow-lg shadow-brand-accent/20 ring-1 ring-brand-accent/40"
                          : "border-white/15 bg-white/5 text-text-on-dark-muted hover:bg-white/[0.08]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                          isCurrent ? "bg-brand-accent text-white" : "bg-white/10 text-white",
                        )}
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <p className={cn("text-sm font-semibold", isCurrent ? "text-text" : "text-white")}>
                            {stage.title}
                          </p>
                          {isCurrent ? (
                            <span className="inline-flex items-center rounded-full bg-brand-accent-light px-2 py-0.5 text-[0.65rem] font-semibold text-brand-accent">
                              {highlightLabel}
                            </span>
                          ) : null}
                        </div>
                        <p
                          className={cn(
                            "mt-0.5 text-xs leading-relaxed",
                            isCurrent ? "text-text-muted" : "text-text-on-dark-muted",
                          )}
                        >
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </Section>
  );
}

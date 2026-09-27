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
 *
 * HOME PREMIUM V4: el CEO señaló "sensación de bloques fríos" — cada
 * etapa vivía en su propia caja con borde completo, sin hilo visual entre
 * ellas. Se reemplaza por una línea conectora vertical detrás de los
 * números (un solo timeline por fase) y se quita el borde/caja a las
 * etapas no-actuales (solo número + texto) — la etapa "actual" conserva
 * su tarjeta destacada, que ahora contrasta más al ser la única caja.
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

      <ol className="mt-12 flex flex-col gap-8 lg:flex-row lg:gap-6">
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

            <ol className="mt-4 flex flex-col gap-5">
              {group.stages.map((stage, stageIndex) => {
                const isCurrent = stage.id === highlightId;
                const index = getGrowthStageIndex(stage.id);
                const isLastInGroup = stageIndex === group.stages.length - 1;
                return (
                  <li key={stage.id} className="relative flex gap-4">
                    {!isLastInGroup ? (
                      <span
                        className="absolute left-4 top-9 h-[calc(100%+0.75rem)] w-px bg-white/12"
                        aria-hidden="true"
                      />
                    ) : null}
                    <span
                      className={cn(
                        "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                        isCurrent ? "bg-brand-accent text-white" : "bg-white/10 text-white",
                      )}
                    >
                      {index + 1}
                    </span>
                    <div
                      className={cn(
                        "flex-1 pb-1",
                        isCurrent &&
                          "rounded-xl border border-brand-accent bg-white p-5 text-text shadow-lg shadow-brand-accent/20 ring-1 ring-brand-accent/40",
                      )}
                    >
                      <p
                        className={cn(
                          "text-base font-semibold",
                          isCurrent ? "text-text" : "text-white",
                        )}
                      >
                        {stage.title}
                      </p>
                      <p
                        className={cn(
                          "mt-1.5 text-sm leading-relaxed",
                          isCurrent ? "text-text-muted" : "text-text-on-dark-muted",
                        )}
                      >
                        {stage.description}
                      </p>
                      {isCurrent ? (
                        <span className="mt-3 inline-flex w-fit items-center rounded-full bg-brand-accent-light px-2.5 py-1 text-xs font-semibold text-brand-accent">
                          {highlightLabel}
                        </span>
                      ) : null}
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

import { Section } from "@/components/ui/Section";
import { GROWTH_PATH_STAGES } from "@/lib/growth/growth-path";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Bloque visual compartido: se usa en cada landing de producto (resaltando
 * la etapa actual) y en la home (como mapa general, sin resaltar ninguna).
 */
export function GrowthPath({ currentStageId }: { currentStageId?: string }) {
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
          Atheron no vende cámaras sueltas. Acompañamos tu crecimiento: de un primer equipo a un
          sistema completo de seguridad, a tu ritmo.
        </p>
      </div>

      <ol className="mt-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-9 lg:gap-2">
        {GROWTH_PATH_STAGES.map((stage, index) => {
          const isCurrent = stage.id === currentStageId;
          return (
            <li key={stage.id} className="relative">
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border p-4",
                  isCurrent
                    ? "border-brand-accent bg-white text-text shadow-lg"
                    : "border-white/15 bg-white/5 text-text-on-dark-muted",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                      isCurrent ? "bg-brand-accent text-white" : "bg-white/10 text-white",
                    )}
                  >
                    {index + 1}
                  </span>
                  {index < GROWTH_PATH_STAGES.length - 1 ? (
                    <Icon
                      name="arrow-right"
                      className={cn(
                        "h-4 w-4 lg:hidden",
                        isCurrent ? "text-brand-accent" : "text-white/30",
                      )}
                    />
                  ) : null}
                </div>
                <p
                  className={cn(
                    "mt-3 text-sm font-semibold",
                    isCurrent ? "text-text" : "text-white",
                  )}
                >
                  {stage.title}
                </p>
                <p
                  className={cn(
                    "mt-1.5 text-xs leading-relaxed",
                    isCurrent ? "text-text-muted" : "text-text-on-dark-muted",
                  )}
                >
                  {stage.description}
                </p>
                {isCurrent ? (
                  <span className="mt-3 inline-flex w-fit items-center rounded-full bg-brand-accent-light px-2.5 py-1 text-[11px] font-semibold text-brand-accent">
                    Estás aquí
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

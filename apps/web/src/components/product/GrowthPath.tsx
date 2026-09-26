import { Section } from "@/components/ui/Section";
import { GROWTH_PATH_STAGES } from "@/lib/growth/growth-path";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Bloque visual compartido: se usa en cada landing de producto (resaltando
 * la etapa actual) y en la home/soluciones (como mapa general). Sin
 * `currentStageId`, resalta la primera etapa como "Punto de partida" — el
 * bloque siempre debe leerse como "empiezas aquí", nunca como tabla suelta.
 *
 * Grid en 5 columnas (no 9): a 1440px, 9 columnas dejaban cada tarjeta en
 * ~110px, con el título y la descripción casi ilegibles. Envolver en dos
 * filas de hasta 5 da a cada tarjeta el doble de ancho sin perder la
 * secuencia (la flecha en cada tarjeta sigue marcando "sigue aquí").
 */
export function GrowthPath({ currentStageId }: { currentStageId?: string }) {
  const highlightId = currentStageId ?? GROWTH_PATH_STAGES[0].id;
  const highlightLabel = currentStageId ? "Estás aquí" : "Punto de partida";

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
          ATHERON no solo vende cámaras. Puedes empezar comprando un solo equipo, y te
          acompañamos a construir un sistema completo a medida que crecen tus necesidades, a tu
          ritmo.
        </p>
      </div>

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {GROWTH_PATH_STAGES.map((stage, index) => {
          const isCurrent = stage.id === highlightId;
          return (
            <li key={stage.id}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border p-5",
                  isCurrent
                    ? "border-brand-accent bg-white text-text shadow-lg"
                    : "border-white/15 bg-white/5 text-text-on-dark-muted",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                      isCurrent ? "bg-brand-accent text-white" : "bg-white/10 text-white",
                    )}
                  >
                    {index + 1}
                  </span>
                  {index < GROWTH_PATH_STAGES.length - 1 ? (
                    <Icon
                      name="arrow-right"
                      className={cn("h-4 w-4", isCurrent ? "text-brand-accent" : "text-white/30")}
                    />
                  ) : null}
                </div>
                <p
                  className={cn(
                    "mt-3 text-base font-semibold",
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
                  <span className="mt-3 inline-flex w-fit items-center rounded-full bg-brand-accent-light px-2.5 py-1 text-[11px] font-semibold text-brand-accent">
                    {highlightLabel}
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

import type { Product } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export function Testimonials({ product }: { product: Product }) {
  const demoCount = product.testimonials.filter((testimonial) => testimonial.isDemo).length;

  return (
    <Section tone="muted" id="testimonios" ariaLabel="Testimonios">
      <SectionHeading eyebrow="Prueba social" title="Lo que dicen nuestros clientes" />
      {demoCount > 0 ? (
        <p className="mt-4 max-w-2xl text-sm text-text-muted">
          {demoCount === 1 ? (
            <>
              La tarjeta marcada como <strong>DEMO</strong> es contenido de demostración para
              mostrar cómo se vería esta sección — no es un testimonio real de un cliente.
            </>
          ) : (
            <>
              Las tarjetas marcadas como <strong>DEMO</strong> son contenido de demostración para
              mostrar cómo se vería esta sección — no son testimonios reales de clientes.
            </>
          )}
        </p>
      ) : null}

      {product.testimonials.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {product.testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className={
                testimonial.isDemo
                  ? "relative overflow-hidden rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/50 p-6"
                  : "relative overflow-hidden rounded-xl border border-border bg-white p-6 shadow-sm"
              }
            >
              {testimonial.isDemo ? (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-amber-950">
                  Demo
                </span>
              ) : null}

              {testimonial.videoUrl ? (
                <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-surface-dark text-white">
                  <Icon name="play" className="h-8 w-8" />
                </div>
              ) : null}

              <span
                aria-hidden="true"
                className={
                  testimonial.isDemo
                    ? "font-serif text-4xl leading-none text-amber-300"
                    : "font-serif text-4xl leading-none text-brand-accent-light"
                }
              >
                “
              </span>
              <blockquote className="-mt-3 text-sm leading-relaxed text-text">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={
                    testimonial.isDemo
                      ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-900"
                      : "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-accent-light text-xs font-bold text-brand-accent"
                  }
                >
                  {getInitials(testimonial.authorName)}
                </span>
                <span className="text-sm font-semibold text-text">
                  {testimonial.authorName}
                  <span className="block font-normal text-text-muted">
                    {testimonial.authorContext}
                  </span>
                  {testimonial.productOrProject ? (
                    <span className="mt-1 block text-xs font-normal text-text-muted">
                      {testimonial.productOrProject}
                    </span>
                  ) : null}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-white p-8 text-center">
          <p className="text-sm text-text-muted">
            Todavía no publicamos testimonios para este producto. Pronto compartiremos
            experiencias reales de clientes Atheron.
          </p>
        </div>
      )}
    </Section>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}

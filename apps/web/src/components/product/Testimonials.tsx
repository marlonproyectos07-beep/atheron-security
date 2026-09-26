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
                  ? "relative rounded-xl border-2 border-dashed border-amber-400 bg-amber-50/40 p-6"
                  : "relative rounded-xl border border-border bg-white p-6"
              }
            >
              {testimonial.isDemo ? (
                <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-amber-950">
                  Demo
                </span>
              ) : null}

              {testimonial.videoUrl ? (
                <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-surface-dark text-white">
                  <Icon name="play" className="h-8 w-8" />
                </div>
              ) : null}

              <blockquote className="text-sm leading-relaxed text-text">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-text">
                {testimonial.authorName}
                <span className="block font-normal text-text-muted">
                  {testimonial.authorContext}
                </span>
                {testimonial.productOrProject ? (
                  <span className="mt-1 block text-xs font-normal text-text-muted">
                    {testimonial.productOrProject}
                  </span>
                ) : null}
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

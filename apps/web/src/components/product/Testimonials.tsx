import type { Product } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Testimonials({ product }: { product: Product }) {
  return (
    <Section tone="muted" id="testimonios" ariaLabel="Testimonios">
      <SectionHeading eyebrow="Prueba social" title="Lo que dicen nuestros clientes" />
      {product.testimonials.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {product.testimonials.map((testimonial) => (
            <figure
              key={testimonial.authorName}
              className="rounded-xl border border-border bg-white p-6"
            >
              <blockquote className="text-sm leading-relaxed text-text">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-text">
                {testimonial.authorName}
                <span className="block font-normal text-text-muted">
                  {testimonial.authorContext}
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

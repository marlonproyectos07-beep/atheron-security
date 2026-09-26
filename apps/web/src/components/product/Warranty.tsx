import type { Product } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export function Warranty({ product }: { product: Product }) {
  const { warranty } = product;
  const isVerified = warranty.status === "verified" && warranty.durationMonths;

  return (
    <Section id="garantia" ariaLabel="Garantía">
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-white p-8 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-accent-light text-brand-accent">
          <Icon name="shield" className="h-6 w-6" />
        </div>
        <div>
          <SectionHeading eyebrow="Garantía" title="Respaldo de tu compra" />
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
            {isVerified ? warranty.coverageSummary : warranty.fallbackCopy}
          </p>
        </div>
      </div>
    </Section>
  );
}

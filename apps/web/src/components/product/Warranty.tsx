import type { Product } from "@/lib/products/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export function Warranty({ product }: { product: Product }) {
  const { warranty } = product;
  const isVerified = warranty.status === "verified" && warranty.durationMonths;

  return (
    <Section id="garantia" ariaLabel="Garantía">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-white to-surface-muted p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md shadow-brand-primary/20">
            <Icon name="shield" className="h-7 w-7" />
          </div>
          <div>
            <SectionHeading eyebrow="Garantía" title="Respaldo de tu compra" />
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
              {isVerified ? warranty.coverageSummary : warranty.fallbackCopy}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

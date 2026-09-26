import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

type Tone = "default" | "muted" | "dark";

const TONE_CLASSES: Record<Tone, string> = {
  default: "bg-surface text-text",
  muted: "bg-surface-muted text-text",
  dark: "bg-surface-dark text-text-on-dark",
};

export function Section({
  children,
  className,
  containerClassName,
  tone = "default",
  id,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: Tone;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("py-14 sm:py-20", TONE_CLASSES[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-text-muted">{description}</p>
      ) : null}
    </div>
  );
}

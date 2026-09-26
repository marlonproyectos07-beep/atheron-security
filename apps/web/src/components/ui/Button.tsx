import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline-on-dark" | "whatsapp" | "disabled-neutral";
type Size = "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brand-accent text-white hover:bg-brand-primary focus-visible:outline-brand-accent",
  secondary:
    "bg-white text-brand-primary border border-border hover:border-brand-accent hover:text-brand-accent focus-visible:outline-brand-accent",
  "outline-on-dark":
    "border border-white/40 text-white hover:bg-white/10 focus-visible:outline-white",
  whatsapp: "bg-[#25D366] text-[#0a2350] hover:brightness-95 focus-visible:outline-[#25D366]",
  "disabled-neutral": "border border-dashed border-border bg-surface-muted text-text-muted",
};

const SIZE_CLASSES: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);
  const isExternal = href.startsWith("http") || href.startsWith("https://wa.me");

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)} {...rest}>
      {children}
    </button>
  );
}

type ClassValue = string | false | null | undefined;

/** Pequeño joiner de clases. Evita instalar clsx/tailwind-merge para un solo uso. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

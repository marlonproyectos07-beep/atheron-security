import type { Money } from "@/lib/products/types";

export function formatCOP(money: Money): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: 0,
  }).format(money.amount);
}

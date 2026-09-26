import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsappLink } from "@/lib/whatsapp";

/**
 * CTA de WhatsApp que nunca navega a un número inventado.
 *
 * Decisión CEO (26-sep-2026): el número real se configura después. Hasta
 * entonces este componente se ve terminado pero no navega a ninguna
 * parte — un <button disabled> real, no un enlace falso, para que la
 * intención quede clara tanto visual como semánticamente (accesibilidad).
 */
export function WhatsappCta({
  message,
  size = "md",
  className,
  verifiedLabel = "Escribir por WhatsApp",
  pendingLabel = "WhatsApp (próximamente)",
}: {
  message: string;
  size?: "md" | "lg";
  className?: string;
  verifiedLabel?: string;
  pendingLabel?: string;
}) {
  const href = buildWhatsappLink(message);

  if (href) {
    return (
      <ButtonLink href={href} variant="whatsapp" size={size} className={className}>
        <Icon name="whatsapp" className="h-5 w-5" />
        {verifiedLabel}
      </ButtonLink>
    );
  }

  return (
    <Button
      type="button"
      variant="disabled-neutral"
      size={size}
      className={className}
      disabled
      title="Este canal se activará próximamente. Por ahora, usa “Diseñar mi sistema”."
    >
      <Icon name="whatsapp" className="h-5 w-5" />
      {pendingLabel}
    </Button>
  );
}

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Familia de marca Atheron (V5.2): el CEO aprobó que Security se vea
 * como la misma unidad corporativa que Atheron Suite
 * (hotelesatheron.com). El símbolo triangular es el activo REAL —
 * `atheron-simbolo.webp` copiado tal cual del repo de Suite
 * (`marlonproyectos07-beep/atheron-suite`,
 * `public/assets/img/marca/`), sin redibujar. Mismo lockup: símbolo +
 * "Atheron" (Fraunces, igual que Suite) + descriptor pequeño en
 * mayúsculas espaciadas — solo cambia la palabra del descriptor
 * ("Suite" → "Security") y su color, que sigue el propio token de
 * acento de Security en vez del de Suite (no se tocan los colores de
 * marca ya aprobados de Security).
 *
 * `tone` replica el mismo criterio de contraste que Suite ya resuelve
 * en su propio CSS: el descriptor necesita un tono distinto según el
 * fondo (claro en el Header, oscuro en el Footer).
 */
export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link href="/" className={cn("flex shrink-0 items-center gap-2.5", className)}>
      <Image
        src="/brand/atheron-simbolo.webp"
        alt=""
        width={137}
        height={120}
        className="h-8 w-auto shrink-0 sm:h-9"
        priority
      />
      <span className="flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-brand text-xl font-semibold tracking-tight sm:text-2xl",
            tone === "dark" ? "text-white" : "text-brand-primary",
          )}
        >
          Atheron
        </span>
        <span
          className={cn(
            "text-[0.68rem] font-semibold uppercase tracking-[0.22em]",
            tone === "dark" ? "text-brand-accent-light" : "text-brand-accent",
          )}
        >
          Security
        </span>
      </span>
    </Link>
  );
}

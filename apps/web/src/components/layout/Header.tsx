import Link from "next/link";
import { mainNavLinks } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Header sin JavaScript: el menú móvil se abre/cierra con un checkbox
 * oculto (peer) y utilidades peer-checked de Tailwind. No hay
 * interacción que justifique convertir esto en Client Component.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container className="relative flex h-16 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1 text-lg font-extrabold tracking-tight text-brand-primary">
          ATHERON
          <span className="font-semibold text-brand-accent">SECURITY</span>
        </Link>

        <nav aria-label="Principal" className="hidden md:flex md:items-center md:gap-8">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-brand-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/soporte" variant="secondary" size="md">
            Hablar con Atheron
          </ButtonLink>
        </div>

        <input type="checkbox" id="mobile-nav-toggle" className="peer sr-only" />
        <label
          htmlFor="mobile-nav-toggle"
          className="flex h-10 w-10 items-center justify-center rounded-md text-brand-primary peer-checked:hidden md:hidden"
          aria-label="Abrir menú"
        >
          <Icon name="menu" className="h-6 w-6" />
        </label>
        <label
          htmlFor="mobile-nav-toggle"
          className="hidden h-10 w-10 items-center justify-center rounded-md text-brand-primary peer-checked:flex md:hidden"
          aria-label="Cerrar menú"
        >
          <Icon name="close" className="h-6 w-6" />
        </label>

        <div className="absolute inset-x-0 top-full hidden flex-col gap-1 border-b border-border bg-white p-4 shadow-lg peer-checked:flex md:hidden">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2.5 text-base font-medium text-text hover:bg-surface-muted"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-border pt-3">
            <ButtonLink href="/soporte" variant="primary" size="md" className="w-full">
              Hablar con Atheron
            </ButtonLink>
          </div>
        </div>
      </Container>
    </header>
  );
}

import Link from "next/link";
import { mainNavLinks, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-dark text-text-on-dark">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo tone="dark" />
          <p className="mt-3 max-w-xs text-sm text-text-on-dark-muted">
            Acompañamos tu seguridad hoy y el sistema que vas a necesitar mañana.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-text-on-dark-muted">
            Navegación
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-text-on-dark-muted">
            Legal
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href={siteConfig.privacyPolicyPath} className="hover:text-white">
                Aviso de privacidad
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-text-on-dark-muted">
            Contacto
          </p>
          <p className="mt-4 text-sm text-text-on-dark-muted">
            Zipaquirá, Colombia
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container>
          <p className="text-xs text-text-on-dark-muted">
            © {year} {siteConfig.legalName}. Todos los derechos reservados. Sitio en fase piloto —
            los precios y la disponibilidad se confirman con un asesor.
          </p>
        </Container>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="text-sm text-text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-primary">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-text">
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? (
              <Icon name="chevron-right" className="h-3.5 w-3.5" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

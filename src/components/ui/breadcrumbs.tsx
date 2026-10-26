import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { NavLink } from "@/types";

export function Breadcrumbs({ items }: { items: NavLink[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-taupe">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="transition-colors hover:text-rose-600">
                    {item.label}
                  </Link>
                  <ChevronRight className="size-3" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

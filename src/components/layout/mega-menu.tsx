import Image from "next/image";
import Link from "next/link";
import type { MegaMenu as MegaMenuData } from "@/data/content";

/** Dropdown panel for a desktop nav item. Shown via the parent's group-hover / focus-within. */
export function MegaMenu({ menu }: { menu: MegaMenuData }) {
  return (
    <div className="invisible absolute inset-x-0 top-full z-30 border-t border-sand-dark bg-cream opacity-0 shadow-[0_24px_48px_-24px_rgba(34,26,28,0.25)] transition-all duration-300 group-focus-within/nav:visible group-focus-within/nav:opacity-100 group-hover/nav:visible group-hover/nav:opacity-100">
      <div className="container-x grid grid-cols-[1fr_1fr_1.1fr] gap-10 py-10">
        {menu.groups.map((group) => (
          <div key={group.title}>
            <p className="eyebrow mb-5">{group.title}</p>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-display text-xl transition-colors hover:text-rose-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link href={menu.feature.href} className="group/feature relative block aspect-[16/10] overflow-hidden bg-sand">
          <Image
            src={menu.feature.image}
            alt={menu.feature.title}
            fill
            sizes="420px"
            className="object-cover transition-transform duration-1000 group-hover/feature:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <span className="absolute bottom-5 left-5 text-cream">
            <span className="block font-display text-2xl">{menu.feature.title}</span>
            <span className="text-xs tracking-[0.18em] uppercase opacity-80">{menu.feature.caption}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

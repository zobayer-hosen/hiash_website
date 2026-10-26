"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import type { MegaMenu as MegaMenuData } from "@/data/content";
import { EASE_LUXE, fadeUp, stagger } from "@/components/motion/variants";

/** Dropdown panel under the header. The panel persists while open; content cross-fades between menus. */
export function MegaMenu({
  menu,
  onNavigate,
  onPointerEnter,
  onPointerLeave,
}: {
  menu: MegaMenuData | null;
  onNavigate: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  return (
    <AnimatePresence>
      {menu && (
        <m.div
          key="mega-panel"
          className="absolute inset-x-0 top-full z-30 origin-top border-t border-sand-dark bg-cream shadow-[0_24px_48px_-24px_rgba(34,26,28,0.25)]"
          initial={{ opacity: 0, y: -8, scaleY: 0.98 }}
          animate={{ opacity: 1, y: 0, scaleY: 1 }}
          exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
          transition={{ duration: 0.35, ease: EASE_LUXE }}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={menu.label}
              className="container-x grid grid-cols-[1fr_1fr_1.1fr] gap-10 py-10"
              variants={stagger(0.05)}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
            >
              {menu.groups.map((group) => (
                <div key={group.title}>
                  <m.p variants={fadeUp} className="eyebrow mb-5">
                    {group.title}
                  </m.p>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <m.li key={link.label} variants={fadeUp}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className="group/link inline-flex items-center gap-2 font-display text-xl transition-colors hover:text-rose-600"
                        >
                          <span className="h-px w-0 bg-rose-500 transition-all duration-300 group-hover/link:w-4" />
                          {link.label}
                        </Link>
                      </m.li>
                    ))}
                  </ul>
                </div>
              ))}
              <m.div variants={fadeUp}>
                <Link href={menu.feature.href} onClick={onNavigate} className="group/feature relative block aspect-[16/10] overflow-hidden bg-sand">
                  <m.span
                    className="absolute inset-0"
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: EASE_LUXE }}
                  >
                    <Image
                      src={menu.feature.image}
                      alt={menu.feature.title}
                      fill
                      sizes="420px"
                      className="object-cover transition-transform duration-1000 group-hover/feature:scale-105"
                    />
                  </m.span>
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <span className="absolute bottom-5 left-5 text-cream">
                    <span className="block font-display text-2xl">{menu.feature.title}</span>
                    <span className="text-xs tracking-[0.18em] uppercase opacity-80">{menu.feature.caption}</span>
                  </span>
                </Link>
              </m.div>
            </m.div>
          </AnimatePresence>
        </m.div>
      )}
    </AnimatePresence>
  );
}

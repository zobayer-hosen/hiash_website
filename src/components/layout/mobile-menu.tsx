"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, User, X } from "lucide-react";
import { mainNav } from "@/data/content";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { EASE_LUXE, fadeUp, stagger } from "@/components/motion/variants";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(mainNav[0].label);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <m.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <m.nav
            aria-label="Mobile"
            className="absolute inset-y-0 left-0 flex w-[min(88vw,380px)] flex-col bg-cream shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 0.35, ease: EASE_LUXE } }}
            transition={{ duration: 0.55, ease: EASE_LUXE }}
          >
            <div className="flex items-center justify-between border-b border-sand-dark px-5 py-4">
              <Image src="/brand/hiash-wordmark.png" alt="Hiash" width={110} height={60} className="h-auto w-[96px]" />
              <m.button
                type="button"
                onClick={onClose}
                whileTap={{ scale: 0.85, rotate: 90 }}
                className="grid size-10 place-items-center"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden />
              </m.button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <m.ul className="divide-y divide-sand-dark" variants={stagger(0.06, 0.15)} initial="hidden" animate="show">
                {mainNav.map((menu) => {
                  const isOpen = expanded === menu.label;
                  return (
                    <m.li key={menu.label} variants={fadeUp} className="py-1">
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : menu.label)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between py-3 font-display text-2xl"
                      >
                        {menu.label}
                        <m.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown className="size-5" aria-hidden />
                        </m.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <m.div
                            key="panel"
                            className="overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE_LUXE }}
                          >
                            <div className="pb-4">
                              <Link
                                href={menu.href}
                                onClick={onClose}
                                className="mb-2 block text-sm font-medium tracking-[0.16em] text-rose-600 uppercase"
                              >
                                Shop all {menu.label}
                              </Link>
                              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {menu.groups.flatMap((group) => group.links).slice(0, 8).map((link) => (
                                  <li key={link.label}>
                                    <Link href={link.href} onClick={onClose} className="text-sm text-taupe hover:text-ink">
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </m.li>
                  );
                })}
                <m.li variants={fadeUp} className="py-4">
                  <Link href="/shop?tag=flash" onClick={onClose} className={cn("font-display text-2xl text-rose-600")}>
                    Sale
                  </Link>
                </m.li>
              </m.ul>
            </div>

            <div className="space-y-3 border-t border-sand-dark bg-sand px-5 py-5 text-sm">
              <Link href="/account" onClick={onClose} className="flex items-center gap-3">
                <User className="size-4" aria-hidden /> Sign in / Register
              </Link>
              <Link href="/wishlist" onClick={onClose} className="flex items-center gap-3">
                <Heart className="size-4" aria-hidden /> Wishlist
              </Link>
              <p className="pt-2 text-xs text-taupe">
                Need help? {siteConfig.contact.phone} · {siteConfig.contact.hours}
              </p>
            </div>
          </m.nav>
        </div>
      )}
    </AnimatePresence>
  );
}

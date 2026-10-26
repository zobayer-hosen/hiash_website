"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, User, X } from "lucide-react";
import { mainNav } from "@/data/content";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

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
    <div className={cn("fixed inset-0 z-50 lg:hidden", open ? "visible" : "invisible")} aria-hidden={!open}>
      <div
        className={cn("absolute inset-0 bg-ink/40 transition-opacity duration-500", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <nav
        aria-label="Mobile"
        className={cn(
          "absolute inset-y-0 left-0 flex w-[min(88vw,380px)] flex-col bg-cream transition-transform duration-500 ease-[var(--ease-luxe)]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-sand-dark px-5 py-4">
          <Image src="/brand/hiash-wordmark.png" alt="Hiash" width={110} height={60} className="h-auto w-[96px]" />
          <button type="button" onClick={onClose} className="grid size-10 place-items-center" aria-label="Close menu">
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="divide-y divide-sand-dark">
            {mainNav.map((menu) => {
              const isOpen = expanded === menu.label;
              return (
                <li key={menu.label} className="py-1">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : menu.label)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-3 font-display text-2xl"
                  >
                    {menu.label}
                    <ChevronDown className={cn("size-5 transition-transform", isOpen && "rotate-180")} aria-hidden />
                  </button>
                  <div className={cn("grid transition-all duration-500", isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden">
                      <Link
                        href={menu.href}
                        onClick={onClose}
                        className="mb-2 block text-sm font-medium tracking-[0.16em] text-rose-600 uppercase"
                      >
                        Shop all {menu.label}
                      </Link>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {menu.groups[0].links.map((link) => (
                          <li key={link.label}>
                            <Link href={link.href} onClick={onClose} className="text-sm text-taupe hover:text-ink">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
            <li className="py-4">
              <Link href="/shop?tag=flash" onClick={onClose} className="font-display text-2xl text-rose-600">
                Sale
              </Link>
            </li>
          </ul>
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
      </nav>
    </div>
  );
}

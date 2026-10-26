"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { mainNav } from "@/data/content";
import { cn } from "@/lib/utils";
import { shopActions, useShop } from "@/store/shop-store";
import { Logo } from "@/components/ui/logo";
import { springPop } from "@/components/motion/variants";
import { MegaMenu } from "./mega-menu";
import { MobileMenu } from "./mobile-menu";
import { SearchPanel } from "./search-panel";

function CountBadge({ count }: { count: number }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <m.span
          key={count}
          className="absolute -top-1 -right-1 grid size-[18px] place-items-center rounded-full bg-rose-600 text-[0.6rem] font-semibold text-white tabular-nums"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.3, opacity: 0, transition: { duration: 0.15 } }}
          transition={springPop}
        >
          {count > 9 ? "9+" : count}
        </m.span>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const router = useRouter();
  const { items, wishlist } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = useCallback((label: string | null) => {
    window.clearTimeout(closeTimer.current);
    setActiveMenu(label);
  }, []);
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 140);
  }, []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const iconButton = "relative grid size-10 place-items-center rounded-full transition-colors hover:bg-rose-50 hover:text-rose-600";
  const active = mainNav.find((menu) => menu.label === activeMenu) ?? null;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-500",
          scrolled ? "border-sand-dark bg-cream/95 shadow-[0_8px_30px_-18px_rgba(34,26,28,0.35)] backdrop-blur" : "border-transparent bg-cream",
        )}
        onKeyDown={(event) => event.key === "Escape" && openMenu(null)}
      >
        <div className="container-x grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4 lg:h-[84px]">
          {/* Left: navigation */}
          <div className="flex items-center">
            <m.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={() => setMenuOpen(true)}
              className={cn(iconButton, "-ml-2 lg:hidden")}
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden />
            </m.button>
            <nav aria-label="Main" className="hidden h-full lg:block" onPointerLeave={scheduleClose}>
              <ul className="flex h-full items-center gap-7">
                {mainNav.map((menu) => (
                  <li key={menu.label} className="flex h-[84px] items-center" onPointerEnter={() => openMenu(menu.label)}>
                    <Link
                      href={menu.href}
                      onFocus={() => openMenu(menu.label)}
                      onClick={() => openMenu(null)}
                      aria-expanded={activeMenu === menu.label}
                      className={cn(
                        "relative py-2 text-[0.92rem] font-medium tracking-wide transition-colors",
                        activeMenu === menu.label && "text-rose-600",
                      )}
                    >
                      {menu.label}
                      {activeMenu === menu.label && (
                        <m.span
                          layoutId="nav-underline"
                          className="absolute inset-x-0 -bottom-0.5 h-px bg-rose-500"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
                <li onPointerEnter={() => openMenu(null)}>
                  <Link
                    href="/shop?tag=flash"
                    onFocus={() => openMenu(null)}
                    className="text-[0.92rem] font-medium tracking-wide text-rose-600 hover:text-rose-700"
                  >
                    Sale
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Centre: logo */}
          <Logo preload className="w-[104px] lg:w-[136px]" />

          {/* Right: actions */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <form
              role="search"
              className="mr-2 hidden items-center gap-2 rounded-full border border-sand-dark bg-white px-4 py-2 transition-colors focus-within:border-rose-400 xl:flex"
              onSubmit={(event) => {
                event.preventDefault();
                const q = new FormData(event.currentTarget).get("q")?.toString().trim();
                if (q) router.push(`/shop?q=${encodeURIComponent(q)}`);
              }}
            >
              <Search className="size-4 text-taupe" aria-hidden />
              <label htmlFor="header-search" className="sr-only">
                Search
              </label>
              <input
                id="header-search"
                name="q"
                placeholder="Search"
                className="w-36 bg-transparent text-sm placeholder:text-taupe/70 focus:outline-none"
              />
            </form>
            <m.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={() => setSearchOpen((open) => !open)}
              className={cn(iconButton, "xl:hidden")}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <Search className="size-5" aria-hidden />
            </m.button>
            <Link href="/wishlist" className={cn(iconButton, "hidden sm:grid")} aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart className="size-5" aria-hidden />
              <CountBadge count={wishlist.length} />
            </Link>
            <m.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={shopActions.openCart}
              className={iconButton}
              aria-label={`Bag, ${cartCount} items`}
            >
              <ShoppingBag className="size-5" aria-hidden />
              <CountBadge count={cartCount} />
            </m.button>
            <Link
              href="/account"
              className="ml-1 hidden items-center gap-2 text-sm font-medium transition-colors hover:text-rose-600 md:flex"
            >
              <User className="size-5" aria-hidden />
              <span className="hidden lg:inline">Login</span>
            </Link>
          </div>
        </div>

        <MegaMenu
          menu={active}
          onNavigate={() => openMenu(null)}
          onPointerEnter={() => openMenu(activeMenu)}
          onPointerLeave={scheduleClose}
        />
        <AnimatePresence>{searchOpen && <SearchPanel key="search" onClose={closeSearch} />}</AnimatePresence>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}

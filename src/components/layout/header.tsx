"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { mainNav } from "@/data/content";
import { cn } from "@/lib/utils";
import { shopActions, useShop } from "@/store/shop-store";
import { Logo } from "@/components/ui/logo";
import { MegaMenu } from "./mega-menu";
import { MobileMenu } from "./mobile-menu";
import { SearchPanel } from "./search-panel";

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -top-1 -right-1 grid size-[18px] place-items-center rounded-full bg-rose-600 text-[0.6rem] font-semibold text-white tabular-nums">
      {count > 9 ? "9+" : count}
    </span>
  );
}

export function Header() {
  const router = useRouter();
  const { items, wishlist } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const iconButton = "relative grid size-10 place-items-center rounded-full transition-colors hover:bg-rose-50 hover:text-rose-600";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-500",
          scrolled ? "border-sand-dark bg-cream/95 shadow-[0_8px_30px_-18px_rgba(34,26,28,0.35)] backdrop-blur" : "border-transparent bg-cream",
        )}
      >
        <div className="container-x grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4 lg:h-[84px]">
          {/* Left: navigation */}
          <div className="flex items-center">
            <button type="button" onClick={() => setMenuOpen(true)} className={cn(iconButton, "-ml-2 lg:hidden")} aria-label="Open menu">
              <Menu className="size-5" aria-hidden />
            </button>
            <nav aria-label="Main" className="hidden h-full lg:block">
              <ul className="flex h-full items-center gap-7">
                {mainNav.map((menu) => (
                  <li key={menu.label} className="group/nav flex h-[84px] items-center">
                    <Link
                      href={menu.href}
                      className="relative py-2 text-[0.92rem] font-medium tracking-wide transition-colors group-hover/nav:text-rose-600"
                    >
                      {menu.label}
                      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-rose-500 transition-transform duration-300 group-hover/nav:scale-x-100" />
                    </Link>
                    <MegaMenu menu={menu} />
                  </li>
                ))}
                <li>
                  <Link href="/shop?tag=flash" className="text-[0.92rem] font-medium tracking-wide text-rose-600 hover:text-rose-700">
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
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className={cn(iconButton, "xl:hidden")}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <Search className="size-5" aria-hidden />
            </button>
            <Link href="/wishlist" className={cn(iconButton, "hidden sm:grid")} aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart className="size-5" aria-hidden />
              <CountBadge count={wishlist.length} />
            </Link>
            <button type="button" onClick={shopActions.openCart} className={iconButton} aria-label={`Bag, ${cartCount} items`}>
              <ShoppingBag className="size-5" aria-hidden />
              <CountBadge count={cartCount} />
            </button>
            <Link
              href="/account"
              className="ml-1 hidden items-center gap-2 text-sm font-medium transition-colors hover:text-rose-600 md:flex"
            >
              <User className="size-5" aria-hidden />
              <span className="hidden lg:inline">Login</span>
            </Link>
          </div>
        </div>

        {searchOpen && <SearchPanel onClose={closeSearch} />}
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { EASE_LUXE, fadeUp, stagger } from "@/components/motion/variants";

const popular = ["Lehenga", "Sherwani", "Panjabi", "Khussa", "Jhumka", "Serum"];

export function SearchPanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const results = query.trim().length > 1 ? searchProducts(query).slice(0, 4) : [];

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function submit(value: string) {
    if (!value.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(value.trim())}`);
    onClose();
  }

  return (
    <m.div
      className="absolute inset-x-0 top-full z-30 border-t border-sand-dark bg-cream shadow-[0_24px_48px_-24px_rgba(34,26,28,0.25)]"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, ease: EASE_LUXE }}
    >
      <div className="container-x py-6">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            submit(query);
          }}
          className="relative flex items-center gap-3 pb-3"
        >
          <Search className="size-5 text-taupe" aria-hidden />
          <label htmlFor="site-search" className="sr-only">
            Search Hiash
          </label>
          <input
            ref={inputRef}
            id="site-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search lehengas, sherwanis, jewellery, serums…"
            className="flex-1 bg-transparent font-display text-2xl placeholder:text-taupe/60 focus:outline-none sm:text-3xl"
          />
          <button type="button" onClick={onClose} className="grid size-10 place-items-center hover:text-rose-600" aria-label="Close search">
            <X className="size-5" aria-hidden />
          </button>
          <m.span
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-ink/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.1 }}
          />
        </form>

        <AnimatePresence mode="wait" initial={false}>
          {results.length > 0 ? (
            <m.ul
              key="results"
              className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4"
              variants={stagger(0.05)}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {results.map((product) => (
                <m.li key={product.id} variants={fadeUp}>
                  <Link href={`/product/${product.slug}`} onClick={onClose} className="group flex items-center gap-3">
                    <span className="relative size-16 shrink-0 overflow-hidden bg-sand">
                      <Image src={product.images[0]} alt="" fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-base font-semibold group-hover:text-rose-600">{product.name}</span>
                      <span className="text-xs text-taupe">{formatPrice(product.price)}</span>
                    </span>
                  </Link>
                </m.li>
              ))}
            </m.ul>
          ) : (
            <m.div
              key="popular"
              className="mt-5 flex flex-wrap items-center gap-2"
              variants={stagger(0.04, 0.1)}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <span className="mr-2 text-xs tracking-[0.2em] text-taupe uppercase">Popular</span>
              {popular.map((term) => (
                <m.button
                  key={term}
                  type="button"
                  variants={fadeUp}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => submit(term)}
                  className="rounded-full border border-sand-dark px-4 py-1.5 text-sm transition-colors hover:border-rose-400 hover:bg-rose-50"
                >
                  {term}
                </m.button>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
}

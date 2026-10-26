"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const popular = ["Jamdani", "Banarasi", "Block heels", "Jhumka", "Serum", "Tote"];

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
    <div className="absolute inset-x-0 top-full z-30 border-t border-sand-dark bg-cream shadow-[0_24px_48px_-24px_rgba(34,26,28,0.25)]">
      <div className="container-x py-6">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            submit(query);
          }}
          className="flex items-center gap-3 border-b border-ink/70 pb-3"
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
            placeholder="Search sarees, heels, jewellery, serums…"
            className="flex-1 bg-transparent font-display text-2xl placeholder:text-taupe/60 focus:outline-none sm:text-3xl"
          />
          <button type="button" onClick={onClose} className="grid size-10 place-items-center hover:text-rose-600" aria-label="Close search">
            <X className="size-5" aria-hidden />
          </button>
        </form>

        {results.length > 0 ? (
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {results.map((product) => (
              <li key={product.id}>
                <Link href={`/product/${product.slug}`} onClick={onClose} className="group flex items-center gap-3">
                  <span className="relative size-16 shrink-0 overflow-hidden bg-sand">
                    <Image src={product.images[0]} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-base font-semibold group-hover:text-rose-600">
                      {product.name}
                    </span>
                    <span className="text-xs text-taupe">{formatPrice(product.price)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs tracking-[0.2em] text-taupe uppercase">Popular</span>
            {popular.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => submit(term)}
                className="rounded-full border border-sand-dark px-4 py-1.5 text-sm transition-colors hover:border-rose-400 hover:bg-rose-50"
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

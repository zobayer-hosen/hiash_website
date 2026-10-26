"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product/product-card";

/** Horizontal, snap-scrolling product row with prev / next controls. */
export function ProductRail({ products, label }: { products: Product[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="relative min-w-0">
      <div className="mb-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          className="grid size-11 place-items-center rounded-full border border-ink/25 transition-colors hover:border-ink hover:bg-ink hover:text-cream"
          aria-label={`Scroll ${label} left`}
        >
          <ArrowLeft className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          className="grid size-11 place-items-center rounded-full border border-ink/25 transition-colors hover:border-ink hover:bg-ink hover:text-cream"
          aria-label={`Scroll ${label} right`}
        >
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
      <div ref={trackRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="w-[min(70vw,270px)] shrink-0 snap-start"
            sizes="270px"
          />
        ))}
      </div>
    </div>
  );
}

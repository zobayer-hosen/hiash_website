"use client";

import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { shopActions } from "@/store/shop-store";

/** Hover panel on product cards: one-tap add, or pick a size first for sized items. */
export function QuickAdd({ product, className }: { product: Product; className?: string }) {
  const color = product.colors[0]?.name ?? "Default";

  if (product.sizes?.length) {
    return (
      <div className={cn("bg-white/95 p-3 backdrop-blur", className)}>
        <p className="mb-2 text-center text-[0.65rem] tracking-[0.2em] text-taupe uppercase">Quick add · select size</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => shopActions.addItem({ productId: product.id, color, size })}
              className="h-8 min-w-9 border border-sand-dark px-2 text-xs transition-colors hover:border-ink hover:bg-ink hover:text-cream"
              aria-label={`Add ${product.name}, size ${size}, to bag`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => shopActions.addItem({ productId: product.id, color })}
      className={cn(
        "flex h-11 w-full items-center justify-center gap-2 bg-ink text-[0.68rem] font-medium tracking-[0.2em] text-cream uppercase transition-colors hover:bg-rose-700",
        className,
      )}
    >
      <ShoppingBag className="size-4" aria-hidden />
      Add to bag
    </button>
  );
}

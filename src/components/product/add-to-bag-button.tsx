"use client";

import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { shopActions } from "@/store/shop-store";

/** One-tap add using the product's default colour and first size. */
export function AddToBagButton({
  product,
  className,
  children = "Add to cart",
}: {
  product: Product;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        shopActions.addItem({
          productId: product.id,
          color: product.colors[0]?.name ?? "Default",
          size: product.sizes?.[0],
        })
      }
      className={cn(
        "rounded-full border border-ink/70 px-6 py-2 text-xs font-medium tracking-[0.14em] uppercase transition-colors hover:border-ink hover:bg-ink hover:text-cream",
        className,
      )}
      aria-label={`Add ${product.name} to bag`}
    >
      {children}
    </button>
  );
}

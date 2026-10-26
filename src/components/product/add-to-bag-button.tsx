"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { shopActions } from "@/store/shop-store";

/** One-tap add using the product's default colour and first size, with a short "Added" confirmation. */
export function AddToBagButton({
  product,
  className,
  children = "Add to cart",
}: {
  product: Product;
  className?: string;
  children?: React.ReactNode;
}) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(timer);
  }, [added]);

  return (
    <m.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => {
        shopActions.addItem(
          { productId: product.id, color: product.colors[0]?.name ?? "Default", size: product.sizes?.[0] },
          false,
        );
        setAdded(true);
      }}
      className={cn(
        "relative overflow-hidden rounded-full border px-6 py-2 text-xs font-medium tracking-[0.14em] uppercase transition-colors",
        added ? "border-sage-700 bg-sage-700 text-white" : "border-ink/70 hover:border-ink hover:bg-ink hover:text-cream",
        className,
      )}
      aria-label={`Add ${product.name} to bag`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={added ? "added" : "idle"}
          className="flex items-center justify-center gap-1.5"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {added ? (
            <>
              <Check className="size-3.5" aria-hidden /> Added
            </>
          ) : (
            children
          )}
        </m.span>
      </AnimatePresence>
    </m.button>
  );
}

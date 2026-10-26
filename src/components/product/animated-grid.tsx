"use client";

import { AnimatePresence, m } from "framer-motion";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { gridItem } from "@/components/motion/variants";
import { ProductCard } from "./product-card";

/**
 * Product grid whose items animate in, out and into their new positions
 * whenever the list changes (tabs, filters, sorting).
 */
export function AnimatedProductGrid({
  products,
  className,
  sizes,
  columns = 4,
}: {
  products: Product[];
  className?: string;
  sizes?: string;
  columns?: 3 | 4;
}) {
  return (
    <m.div
      layout
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 lg:gap-x-5",
        columns === 4 ? "lg:grid-cols-4" : "md:grid-cols-3",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {products.map((product, index) => (
          <m.div
            key={product.id}
            layout
            variants={gridItem}
            initial="hidden"
            animate="show"
            exit="exit"
            custom={Math.min(index, 8)}
          >
            <ProductCard product={product} sizes={sizes} />
          </m.div>
        ))}
      </AnimatePresence>
    </m.div>
  );
}

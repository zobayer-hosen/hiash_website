"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";

export function SareeTabs({ products, weaves }: { products: Product[]; weaves: string[] }) {
  const tabs = ["All", ...weaves];
  const [active, setActive] = useState("All");
  const visible = (active === "All" ? products : products.filter((p) => p.type === active)).slice(0, 4);

  return (
    <div>
      <div role="tablist" aria-label="Filter sarees by weave" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            type="button"
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            className={cn(
              "shrink-0 rounded-full border px-5 py-2 text-sm transition-all duration-300",
              active === tab
                ? "border-ink bg-ink text-cream"
                : "border-sand-dark bg-white/60 text-ink hover:border-rose-400 hover:text-rose-600",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-5">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { CategorySlug, Product } from "@/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";

const tabs: { label: string; value: CategorySlug | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Sarees", value: "sarees" },
  { label: "Shoes", value: "shoes" },
  { label: "Accessories", value: "accessories" },
  { label: "Beauty", value: "beauty" },
];

export function BestSellers({ products }: { products: Product[] }) {
  const [active, setActive] = useState<(typeof tabs)[number]["value"]>("all");
  const visible = (active === "all" ? products : products.filter((p) => p.category === active)).slice(0, 8);

  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Most loved</p>
            <h2 className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
              Best <em className="text-rose-500 italic">sellers</em>
            </h2>
          </div>
          <div role="tablist" aria-label="Filter best sellers" className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={active === tab.value}
                onClick={() => setActive(tab.value)}
                className={cn(
                  "relative shrink-0 px-4 py-2 text-sm transition-colors",
                  active === tab.value ? "text-ink" : "text-taupe hover:text-ink",
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "absolute inset-x-4 bottom-0 h-px bg-rose-500 transition-transform duration-300",
                    active === tab.value ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div role="tabpanel" className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

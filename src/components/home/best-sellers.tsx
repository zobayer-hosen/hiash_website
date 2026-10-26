"use client";

import { useState, Fragment } from "react";
import type { CategorySlug, Product } from "@/types";
import { PillTabs } from "@/components/ui/pill-tabs";
import { AnimatedProductGrid } from "@/components/product/animated-grid";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";

type Tab = CategorySlug | "all";

const tabs: { label: string; value: Tab }[] = [
  { label: "All", value: "all" },
  { label: "Wedding", value: "wedding" },
  { label: "Shoes", value: "shoes" },
  { label: "Accessories", value: "accessories" },
  { label: "Beauty", value: "beauty" },
];

export function BestSellers({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Tab>("all");
  const visible = (active === "all" ? products : products.filter((p) => p.category === active)).slice(0, 8);

  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal y={10}>
              <p className="eyebrow mb-3">Most loved</p>
            </Reveal>
            <h2 className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
              <MaskLines
                lines={[
                  <Fragment key="line-1">
                    Best <em className="text-rose-500 italic">sellers</em>
                  </Fragment>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={150}>
            <PillTabs id="best-sellers" label="Filter best sellers" tabs={tabs} active={active} onChange={setActive} tone="underline" />
          </Reveal>
        </div>

        <Reveal delay={100}>
          <AnimatedProductGrid products={visible} />
        </Reveal>
      </div>
    </section>
  );
}

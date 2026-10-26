"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { PillTabs } from "@/components/ui/pill-tabs";
import { AnimatedProductGrid } from "@/components/product/animated-grid";

const groups = {
  all: { label: "All", types: null },
  bride: { label: "For the bride", types: ["Bridal Lehenga", "Reception", "Holud & Mehndi"] },
  groom: { label: "For the groom", types: ["Sherwani", "Jodhpuri", "Panjabi", "Groom Accessories"] },
  holud: { label: "Holud & mehndi", types: ["Holud & Mehndi", "Panjabi"] },
} as const;

type Group = keyof typeof groups;

export function WeddingTabs({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Group>("all");
  const types = groups[active].types as readonly string[] | null;
  const visible = (types ? products.filter((p) => types.includes(p.type)) : products).slice(0, 8);

  return (
    <div>
      <PillTabs
        id="wedding-tabs"
        label="Filter wedding wear"
        tabs={(Object.keys(groups) as Group[]).map((value) => ({ value, label: groups[value].label }))}
        active={active}
        onChange={setActive}
        className="mb-8"
      />
      <AnimatedProductGrid products={visible} />
    </div>
  );
}

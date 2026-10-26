"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product/product-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/** Horizontal, snap-scrolling product row with prev / next controls and a progress line. */
export function ProductRail({ products, label }: { products: Product[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: trackRef });
  const progress = useSpring(scrollXProgress, { stiffness: 200, damping: 30 });

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  }

  const arrow =
    "grid size-11 place-items-center rounded-full border border-ink/25 transition-colors hover:border-ink hover:bg-ink hover:text-cream";

  return (
    <div className="relative min-w-0">
      <div className="mb-5 flex items-center justify-end gap-4">
        <div className="h-px flex-1 overflow-hidden bg-sand-dark">
          <m.div className="h-full origin-left bg-ink" style={{ scaleX: progress }} />
        </div>
        <m.button type="button" whileTap={{ scale: 0.88 }} onClick={() => scrollBy(-1)} className={arrow} aria-label={`Scroll ${label} left`}>
          <ArrowLeft className="size-4" aria-hidden />
        </m.button>
        <m.button type="button" whileTap={{ scale: 0.88 }} onClick={() => scrollBy(1)} className={arrow} aria-label={`Scroll ${label} right`}>
          <ArrowRight className="size-4" aria-hidden />
        </m.button>
      </div>
      <div ref={trackRef} className="no-scrollbar snap-x snap-mandatory overflow-x-auto pb-2">
        <Stagger gap={0.08} amount={0.02} className="flex gap-4 lg:gap-5">
          {products.map((product) => (
            <StaggerItem key={product.id} className="w-[min(70vw,270px)] shrink-0 snap-start">
              <ProductCard product={product} sizes="270px" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}

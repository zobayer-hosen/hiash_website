"use client";

import { m, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useRef } from "react";
import { marqueeItems } from "@/data/content";
import { cn } from "@/lib/utils";

/** Infinite ticker driven by a motion value; slows to a stop on hover. */
export function Marquee({ tone = "rose", className }: { tone?: "rose" | "dark"; className?: string }) {
  const loop = [...marqueeItems, ...marqueeItems];
  const progress = useMotionValue(0);
  const speed = useRef(1);
  const target = useRef(1);
  const reduce = useReducedMotion();
  const x = useTransform(progress, (value) => `${-((value % 100) / 2)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    speed.current += (target.current - speed.current) * 0.06;
    progress.set(progress.get() + (delta / 1000) * 2.2 * speed.current);
  });

  return (
    <div
      className={cn(
        "overflow-hidden border-y py-5",
        tone === "rose" ? "border-rose-200 bg-rose-50 text-ink" : "border-ink bg-ink text-cream",
        className,
      )}
      aria-label={marqueeItems.join(", ")}
      onPointerEnter={() => (target.current = 0.15)}
      onPointerLeave={() => (target.current = 1)}
    >
      <m.div className="flex w-max items-center" style={{ x }} aria-hidden>
        {loop.map((item, index) => (
          <span key={index} className="flex items-center">
            <span className="px-7 font-display text-2xl tracking-[0.06em] whitespace-nowrap uppercase sm:text-[1.9rem]">{item}</span>
            <span className={cn("text-lg", tone === "rose" ? "text-rose-400" : "text-gold")}>✦</span>
          </span>
        ))}
      </m.div>
    </div>
  );
}

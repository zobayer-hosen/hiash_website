"use client";

import { AnimatePresence, m } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const box = size === "sm" ? "h-9" : "h-12";
  const btn = size === "sm" ? "w-9" : "w-11";
  return (
    <div className={cn("inline-flex items-center border border-sand-dark bg-white", box, className)}>
      <m.button
        type="button"
        whileTap={{ scale: 0.8 }}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn("grid h-full place-items-center text-ink transition-colors hover:bg-sand disabled:opacity-40", btn)}
        aria-label="Decrease quantity"
      >
        <Minus className="size-3.5" aria-hidden />
      </m.button>
      <span className="relative h-5 min-w-8 overflow-hidden text-center text-sm tabular-nums" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          <m.span
            key={value}
            className="block"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {value}
          </m.span>
        </AnimatePresence>
      </span>
      <m.button
        type="button"
        whileTap={{ scale: 0.8 }}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn("grid h-full place-items-center text-ink transition-colors hover:bg-sand disabled:opacity-40", btn)}
        aria-label="Increase quantity"
      >
        <Plus className="size-3.5" aria-hidden />
      </m.button>
    </div>
  );
}

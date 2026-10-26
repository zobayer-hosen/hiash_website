"use client";

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
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn("grid h-full place-items-center text-ink transition-colors hover:bg-sand disabled:opacity-40", btn)}
        aria-label="Decrease quantity"
      >
        <Minus className="size-3.5" aria-hidden />
      </button>
      <span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn("grid h-full place-items-center text-ink transition-colors hover:bg-sand disabled:opacity-40", btn)}
        aria-label="Increase quantity"
      >
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}

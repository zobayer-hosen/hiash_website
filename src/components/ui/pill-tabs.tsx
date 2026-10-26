"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";

/** Pill-style tab list with a sliding active background (shared layoutId). */
export function PillTabs<T extends string>({
  tabs,
  active,
  onChange,
  label,
  id,
  tone = "dark",
  className,
}: {
  tabs: { value: T; label: string }[];
  active: T;
  onChange: (value: T) => void;
  label: string;
  id: string;
  tone?: "dark" | "underline";
  className?: string;
}) {
  return (
    <div role="tablist" aria-label={label} className={cn("no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0", className)}>
      {tabs.map((tab) => {
        const selected = tab.value === active;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative shrink-0 px-5 py-2 text-sm transition-colors duration-300",
              tone === "dark"
                ? cn("rounded-full", selected ? "text-cream" : "text-ink hover:text-rose-600")
                : selected
                  ? "text-ink"
                  : "text-taupe hover:text-ink",
            )}
          >
            {selected && (
              <m.span
                layoutId={`${id}-indicator`}
                className={cn("absolute", tone === "dark" ? "inset-0 rounded-full bg-ink" : "inset-x-4 bottom-0 h-px bg-rose-500")}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

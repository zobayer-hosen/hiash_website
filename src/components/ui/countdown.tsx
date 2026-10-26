"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function msUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

function split(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/** A single digit that flips up when it changes. */
function FlipDigit({ value }: { value: string }) {
  return (
    <span className="relative inline-block h-[1.1em] w-[0.6em] overflow-hidden">
      <AnimatePresence initial={false}>
        <m.span
          key={value}
          className="absolute inset-0 text-center"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

/** Daily flash-sale countdown to local midnight. Renders placeholders until mounted. */
export function Countdown({ className }: { className?: string }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(msUntilMidnight());
    const first = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, []);

  const parts = remaining === null ? null : split(remaining);
  const units = [
    { label: "Hours", value: parts?.hours },
    { label: "Mins", value: parts?.minutes },
    { label: "Secs", value: parts?.seconds },
  ];

  return (
    <div className={cn("flex items-center gap-3", className)} role="timer" aria-label="Time left in today's flash sale">
      {units.map((unit, index) => {
        const digits = unit.value === undefined ? "--" : String(unit.value).padStart(2, "0");
        return (
          <div key={unit.label} className="flex items-center gap-3">
            <div className="flex w-16 flex-col items-center rounded-2xl bg-cream/10 py-3 ring-1 ring-cream/15 sm:w-20">
              <span className="flex font-display text-3xl font-semibold text-cream lining-nums tabular-nums sm:text-4xl">
                <FlipDigit value={digits[0]} />
                <FlipDigit value={digits[1]} />
              </span>
              <span className="mt-1 text-[0.62rem] tracking-[0.2em] text-cream/60 uppercase">{unit.label}</span>
            </div>
            {index < units.length - 1 && (
              <m.span
                className="font-display text-2xl text-rose-300"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                :
              </m.span>
            )}
          </div>
        );
      })}
    </div>
  );
}

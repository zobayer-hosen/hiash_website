"use client";

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
      {units.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-3">
          <div className="flex w-16 flex-col items-center rounded-2xl bg-cream/10 py-3 ring-1 ring-cream/15 sm:w-20">
            <span className="font-display text-3xl font-semibold text-cream lining-nums tabular-nums sm:text-4xl">
              {unit.value === undefined ? "--" : String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[0.62rem] tracking-[0.2em] text-cream/60 uppercase">{unit.label}</span>
          </div>
          {index < units.length - 1 && <span className="font-display text-2xl text-rose-300">:</span>}
        </div>
      ))}
    </div>
  );
}

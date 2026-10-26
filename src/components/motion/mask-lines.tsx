"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_LUXE } from "./variants";

/**
 * Headline reveal: each line slides up from behind a mask.
 * `trigger="mount"` plays immediately (hero); "inView" waits for scroll.
 */
export function MaskLines({
  lines,
  className,
  delay = 0,
  trigger = "inView",
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  trigger?: "mount" | "inView";
}) {
  const play = { y: "0%", opacity: 1 };
  return (
    <span className={cn("block", className)}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <m.span
            data-reveal
            className="block"
            initial={{ y: "105%", opacity: 0 }}
            {...(trigger === "mount" ? { animate: play } : { whileInView: play, viewport: { once: true, amount: 0.6 } })}
            transition={{ duration: 1.1, ease: EASE_LUXE, delay: delay + index * 0.12 }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </span>
  );
}

"use client";

import { AnimatePresence, m } from "framer-motion";
import { Truck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils";
import { EASE_LUXE } from "@/components/motion/variants";

export function FreeShippingMeter({ subtotal }: { subtotal: number }) {
  const threshold = siteConfig.freeShippingThreshold;
  const progress = Math.min(subtotal / threshold, 1);
  const remaining = Math.max(threshold - subtotal, 0);

  return (
    <div className="bg-rose-50 px-4 py-3.5">
      <p className="flex items-center gap-2 text-sm">
        <m.span animate={remaining > 0 ? { x: 0 } : { x: [0, 6, 0] }} transition={{ duration: 0.6 }}>
          <Truck className="size-4 text-rose-600" aria-hidden />
        </m.span>
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={remaining > 0 ? "away" : "unlocked"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {remaining > 0 ? (
              <>
                You&rsquo;re <strong className="font-semibold">{formatPrice(remaining)}</strong> away from free delivery
              </>
            ) : (
              <span className="font-medium">You&rsquo;ve unlocked free delivery ✦</span>
            )}
          </m.span>
        </AnimatePresence>
      </p>
      <div
        className="mt-2.5 h-1 overflow-hidden rounded-full bg-rose-200"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress to free delivery"
      >
        <m.div
          className="h-full origin-left rounded-full bg-rose-500"
          initial={false}
          animate={{ scaleX: progress }}
          transition={{ duration: 0.8, ease: EASE_LUXE }}
        />
      </div>
    </div>
  );
}

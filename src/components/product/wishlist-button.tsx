"use client";

import { AnimatePresence, m } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { shopActions, useShop } from "@/store/shop-store";
import { springPop } from "@/components/motion/variants";

export function WishlistButton({
  productId,
  productName,
  className,
  variant = "floating",
}: {
  productId: string;
  productName: string;
  className?: string;
  variant?: "floating" | "outline";
}) {
  const { wishlist } = useShop();
  const active = wishlist.includes(productId);

  return (
    <m.button
      type="button"
      onClick={() => shopActions.toggleWishlist(productId)}
      aria-pressed={active}
      aria-label={active ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.82 }}
      className={cn(
        "relative grid place-items-center transition-colors duration-300",
        variant === "floating"
          ? "size-10 rounded-full bg-white/90 text-ink shadow-sm backdrop-blur hover:text-rose-600"
          : "size-12 border border-sand-dark bg-white text-ink hover:border-rose-400 hover:text-rose-600",
        active && "text-rose-600",
        className,
      )}
    >
      <m.span key={active ? "on" : "off"} initial={{ scale: active ? 0.4 : 1 }} animate={{ scale: 1 }} transition={springPop}>
        <Heart className={cn("size-[18px]", active && "fill-rose-500 text-rose-500")} aria-hidden />
      </m.span>
      <AnimatePresence>
        {active && (
          <m.span
            key="burst"
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-rose-400"
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </m.button>
  );
}

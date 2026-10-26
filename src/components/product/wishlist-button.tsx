"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { shopActions, useShop } from "@/store/shop-store";

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
    <button
      type="button"
      onClick={() => shopActions.toggleWishlist(productId)}
      aria-pressed={active}
      aria-label={active ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      className={cn(
        "grid place-items-center transition-all duration-300",
        variant === "floating"
          ? "size-10 rounded-full bg-white/90 text-ink shadow-sm backdrop-blur hover:scale-110 hover:text-rose-600"
          : "size-12 border border-sand-dark bg-white text-ink hover:border-rose-400 hover:text-rose-600",
        active && "text-rose-600",
        className,
      )}
    >
      <Heart className={cn("size-[18px]", active && "fill-rose-500 text-rose-500")} aria-hidden />
    </button>
  );
}

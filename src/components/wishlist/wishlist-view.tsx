"use client";

import { Heart } from "lucide-react";
import { getProductById } from "@/data/products";
import { useShop } from "@/store/shop-store";
import { ButtonLink } from "@/components/ui/button";
import { AnimatedProductGrid } from "@/components/product/animated-grid";

export function WishlistView() {
  const { wishlist } = useShop();
  const saved = wishlist.flatMap((id) => {
    const product = getProductById(id);
    return product ? [product] : [];
  });

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 bg-sand px-6 py-24 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-cream text-rose-600">
          <Heart className="size-8" aria-hidden />
        </span>
        <div>
          <p className="font-display text-4xl">Nothing saved yet</p>
          <p className="mt-3 text-taupe">Tap the heart on any piece to keep it here for later.</p>
        </div>
        <ButtonLink href="/shop">Discover the shop</ButtonLink>
      </div>
    );
  }

  return (
    <>
      <p className="mb-8 text-sm text-taupe">
        {saved.length} saved {saved.length === 1 ? "piece" : "pieces"}
      </p>
      <AnimatedProductGrid products={saved} />
    </>
  );
}

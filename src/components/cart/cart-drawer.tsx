"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { cartTotals, resolveCartLines } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/utils";
import { shopActions, useShop } from "@/store/shop-store";
import { buttonClasses } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { FreeShippingMeter } from "./free-shipping-meter";

export function CartDrawer() {
  const { items, cartOpen } = useShop();
  const lines = resolveCartLines(items);
  const totals = cartTotals(lines);

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && shopActions.closeCart();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen]);

  return (
    <div className={cn("fixed inset-0 z-50", cartOpen ? "visible" : "invisible")} aria-hidden={!cartOpen}>
      <div
        className={cn("absolute inset-0 bg-ink/40 transition-opacity duration-500", cartOpen ? "opacity-100" : "opacity-0")}
        onClick={shopActions.closeCart}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-500 ease-[var(--ease-luxe)]",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-sand-dark px-6 py-5">
          <h2 className="font-display text-2xl">
            Your Bag <span className="text-base text-taupe">({totals.count})</span>
          </h2>
          <button type="button" onClick={shopActions.closeCart} className="grid size-10 place-items-center hover:text-rose-600" aria-label="Close bag">
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <span className="grid size-20 place-items-center rounded-full bg-rose-100 text-rose-600">
              <ShoppingBag className="size-8" aria-hidden />
            </span>
            <div>
              <p className="font-display text-2xl">Your bag is empty</p>
              <p className="mt-2 text-sm text-taupe">Discover handwoven sarees, heels and beauty favourites.</p>
            </div>
            <Link href="/shop" onClick={shopActions.closeCart} className={buttonClasses()}>
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <FreeShippingMeter subtotal={totals.subtotal} />
            <ul className="flex-1 divide-y divide-sand-dark overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 py-5">
                  <Link
                    href={`/product/${line.product.slug}`}
                    onClick={shopActions.closeCart}
                    className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-sand"
                  >
                    <Image src={line.product.images[0]} alt={line.product.name} fill sizes="80px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/product/${line.product.slug}`}
                        onClick={shopActions.closeCart}
                        className="font-display text-lg leading-tight font-semibold hover:text-rose-600"
                      >
                        {line.product.name}
                      </Link>
                      <span className="text-sm font-medium tabular-nums">{formatPrice(line.lineTotal)}</span>
                    </div>
                    <p className="mt-1 text-xs text-taupe">
                      {line.color}
                      {line.size && ` · Size ${line.size}`}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QuantityStepper size="sm" value={line.qty} onChange={(qty) => shopActions.updateQty(line.key, qty)} />
                      <button
                        type="button"
                        onClick={() => shopActions.removeItem(line.key)}
                        className="text-xs text-taupe underline-offset-4 hover:text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t border-sand-dark bg-white px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-taupe">Subtotal</span>
                <span className="font-display text-2xl font-semibold lining-nums tabular-nums">{formatPrice(totals.subtotal)}</span>
              </div>
              <p className="text-xs text-taupe">Delivery and promo codes are calculated at checkout.</p>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/cart" onClick={shopActions.closeCart} className={buttonClasses({ variant: "outline" })}>
                  View bag
                </Link>
                <Link href="/checkout" onClick={shopActions.closeCart} className={buttonClasses()}>
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { cartTotals, resolveCartLines } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { shopActions, useShop } from "@/store/shop-store";
import { buttonClasses } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { EASE_LUXE } from "@/components/motion/variants";
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
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <m.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={shopActions.closeCart}
          />
          <m.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.35, ease: EASE_LUXE } }}
            transition={{ duration: 0.55, ease: EASE_LUXE }}
          >
            <div className="flex items-center justify-between border-b border-sand-dark px-6 py-5">
              <h2 className="font-display text-2xl">
                Your Bag <span className="text-base text-taupe">({totals.count})</span>
              </h2>
              <m.button
                type="button"
                whileTap={{ scale: 0.85, rotate: 90 }}
                onClick={shopActions.closeCart}
                className="grid size-10 place-items-center hover:text-rose-600"
                aria-label="Close bag"
              >
                <X className="size-5" aria-hidden />
              </m.button>
            </div>

            {lines.length === 0 ? (
              <m.div
                className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <m.span
                  className="grid size-20 place-items-center rounded-full bg-rose-100 text-rose-600"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ShoppingBag className="size-8" aria-hidden />
                </m.span>
                <div>
                  <p className="font-display text-2xl">Your bag is empty</p>
                  <p className="mt-2 text-sm text-taupe">Discover bridal couture, heels and beauty favourites.</p>
                </div>
                <Link href="/shop" onClick={shopActions.closeCart} className={buttonClasses()}>
                  Start shopping
                </Link>
              </m.div>
            ) : (
              <>
                <FreeShippingMeter subtotal={totals.subtotal} />
                <ul className="flex-1 overflow-x-hidden overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {lines.map((line, index) => (
                      <m.li
                        key={line.key}
                        layout
                        className="flex gap-4 border-b border-sand-dark py-5 last:border-b-0"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.15 + index * 0.05, duration: 0.5, ease: EASE_LUXE } }}
                        exit={{ opacity: 0, x: 60, transition: { duration: 0.3 } }}
                      >
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
                      </m.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <m.div
                  className="space-y-4 border-t border-sand-dark bg-white px-6 py-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-taupe">Subtotal</span>
                    <m.span
                      key={totals.subtotal}
                      initial={{ opacity: 0.4, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-2xl font-semibold lining-nums tabular-nums"
                    >
                      {formatPrice(totals.subtotal)}
                    </m.span>
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
                </m.div>
              </>
            )}
          </m.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

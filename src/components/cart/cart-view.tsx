"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, Lock, RefreshCw, ShoppingBag } from "lucide-react";
import { cartTotals, resolveCartLines } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { shopActions, useShop } from "@/store/shop-store";
import { ButtonLink } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { FreeShippingMeter } from "./free-shipping-meter";
import { PromoForm } from "./promo-form";
import { SummaryRows } from "./summary-rows";

export function CartView() {
  const { items, promoApplied } = useShop();
  const lines = resolveCartLines(items);
  const totals = cartTotals(lines, { promoApplied });
  // Delivery depends on the address, so the bag shows the total before delivery.
  const beforeDelivery = { ...totals, shipping: 0, total: totals.subtotal - totals.discount };

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 bg-sand px-6 py-24 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-cream text-rose-600">
          <ShoppingBag className="size-8" aria-hidden />
        </span>
        <div>
          <p className="font-display text-4xl">Your bag is waiting</p>
          <p className="mt-3 text-taupe">Fill it with something that makes the moment.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/collections/wedding">Shop wedding</ButtonLink>
          <ButtonLink href="/shop?tag=bestseller" variant="outline">
            Bestsellers
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
      <div>
        <ul className="space-y-4">
          <AnimatePresence initial={false}>
            {lines.map((line, index) => (
              <m.li
                key={line.key}
                layout
                className="flex gap-5 border border-sand-dark bg-white p-4 sm:p-5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.06, duration: 0.5 } }}
                exit={{ opacity: 0, x: -60, transition: { duration: 0.3 } }}
              >
                <Link
                  href={`/product/${line.product.slug}`}
                  className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-sand sm:w-32"
                >
                  <Image src={line.product.images[0]} alt={line.product.name} fill sizes="128px" className="object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <Link
                      href={`/product/${line.product.slug}`}
                      className="font-display text-xl font-semibold hover:text-rose-600"
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-taupe">
                      {line.color}
                      {line.size && ` · Size ${line.size}`}
                    </p>
                    <p className="mt-1 text-sm text-taupe">{formatPrice(line.product.price)} each</p>
                    <button
                      type="button"
                      onClick={() => shopActions.removeItem(line.key)}
                      className="mt-3 text-xs text-mocha underline-offset-4 hover:text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                    <QuantityStepper value={line.qty} onChange={(qty) => shopActions.updateQty(line.key, qty)} />
                    <span className="text-lg font-medium tabular-nums">{formatPrice(line.lineTotal)}</span>
                  </div>
                </div>
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
        <Link href="/shop" className="mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-rose-600">
          <ArrowLeft className="size-4" aria-hidden /> Continue shopping
        </Link>
      </div>

      <m.aside
        className="lg:sticky lg:top-28 lg:self-start"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <div className="border border-sand-dark bg-sand p-6 sm:p-7">
          <p className="text-xs font-medium tracking-[0.24em] uppercase">Order summary</p>
          <div className="mt-5">
            <SummaryRows
              totals={beforeDelivery}
              shippingLabel={totals.qualifiesFreeShipping ? "Free" : "Calculated at checkout"}
            />
          </div>
          <div className="mt-6">
            <PromoForm />
          </div>
          <ButtonLink href="/checkout" size="lg" className="mt-6 w-full">
            Proceed to checkout
          </ButtonLink>
        </div>
        <div className="mt-4">
          <FreeShippingMeter subtotal={totals.subtotal} />
        </div>
        <ul className="mt-5 space-y-2 text-sm text-taupe">
          <li className="flex items-center gap-2">
            <RefreshCw className="size-4" aria-hidden /> Free returns & exchanges within 7 days
          </li>
          <li className="flex items-center gap-2">
            <Lock className="size-4" aria-hidden /> Secure checkout — encrypted end to end
          </li>
        </ul>
      </m.aside>
    </div>
  );
}

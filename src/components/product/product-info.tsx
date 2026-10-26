"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Ruler, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { siteConfig } from "@/config/site";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { shopActions } from "@/store/shop-store";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { RatingStars } from "@/components/ui/rating-stars";
import { AccordionItem } from "./accordion";
import { Price } from "./price";
import { WishlistButton } from "./wishlist-button";
import { fadeUp, stagger } from "@/components/motion/variants";

export function ProductInfo({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? "Default");
  const [size, setSize] = useState<string | undefined>(product.sizes?.length === 1 ? product.sizes[0] : undefined);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const off = discountPercent(product.price, product.compareAt);
  const needsSize = Boolean(product.sizes?.length);
  const isBeauty = product.category === "beauty";

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(timer);
  }, [added]);

  function addToBag() {
    if (needsSize && !size) {
      setSizeError(true);
      return;
    }
    shopActions.addItem({ productId: product.id, color, size, qty });
    setAdded(true);
  }

  return (
    <m.div variants={stagger(0.07, 0.15)} initial="hidden" animate="show">
      <m.p variants={fadeUp} className="eyebrow">
        {product.category} · {product.type}
      </m.p>
      <m.h1 variants={fadeUp} className="mt-3 font-display text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
        {product.name}
      </m.h1>
      <m.a variants={fadeUp} href="#reviews" className="mt-3 inline-block">
        <RatingStars rating={product.rating} reviews={product.reviews} size="md" />
      </m.a>
      <m.div variants={fadeUp} className="mt-5 flex items-center gap-3">
        <Price price={product.price} compareAt={product.compareAt} size="lg" />
        {off > 0 && (
          <m.span
            className="bg-rose-600 px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.16em] text-white uppercase"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.6 }}
          >
            Save {off}%
          </m.span>
        )}
      </m.div>

      <m.div variants={fadeUp} className="my-7 h-px bg-sand-dark" />

      <m.p variants={fadeUp} className="max-w-lg leading-relaxed text-taupe">
        {product.description}
      </m.p>

      {/* Colour / shade — hidden for single-variant beauty products */}
      {!(isBeauty && product.colors.length === 1) && (
        <m.div variants={fadeUp} className="mt-7">
          <p className="text-sm font-medium">
            {isBeauty ? "Shade" : "Colour"} — <span className="font-normal text-taupe">{color}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-3" role="radiogroup" aria-label={isBeauty ? "Shade" : "Colour"}>
            {product.colors.map((option) => (
              <m.button
                key={option.name}
                type="button"
                role="radio"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                aria-checked={color === option.name}
                aria-label={option.name}
                onClick={() => setColor(option.name)}
                className={cn(
                  "grid size-10 place-items-center rounded-full transition-all",
                  color === option.name ? "ring-2 ring-ink ring-offset-2 ring-offset-cream" : "ring-1 ring-sand-dark hover:ring-ink/50",
                )}
              >
                <span className="size-8 rounded-full border border-black/5" style={{ backgroundColor: option.hex }} />
              </m.button>
            ))}
          </div>
        </m.div>
      )}

      {/* Size */}
      {needsSize && (
        <m.div variants={fadeUp} className="mt-7">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {product.category === "shoes" || product.type === "Groom Accessories"
                ? "Size (EU)"
                : product.type === "Jewellery"
                  ? "Size (inches)"
                  : "Size"}
              {size && <span className="font-normal text-taupe"> — {size}</span>}
            </p>
            <Link href="/help#size-guide" className="inline-flex items-center gap-1.5 text-xs text-taupe hover:text-rose-600">
              <Ruler className="size-3.5" aria-hidden /> Size guide
            </Link>
          </div>
          <m.div
            className="mt-3 flex flex-wrap gap-2"
            role="radiogroup"
            aria-label="Size"
            animate={sizeError ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
            transition={{ duration: 0.45 }}
          >
            {product.sizes?.map((option) => (
              <m.button
                key={option}
                type="button"
                role="radio"
                whileTap={{ scale: 0.92 }}
                aria-checked={size === option}
                onClick={() => {
                  setSize(option);
                  setSizeError(false);
                }}
                className={cn(
                  "relative h-11 min-w-12 border px-3 text-sm transition-colors duration-300",
                  size === option ? "border-ink text-cream" : "bg-white hover:border-ink",
                  size !== option && (sizeError ? "border-rose-400" : "border-sand-dark"),
                )}
              >
                {size === option && (
                  <m.span
                    layoutId={`size-${product.id}`}
                    className="absolute inset-0 bg-ink"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{option}</span>
              </m.button>
            ))}
          </m.div>
          <AnimatePresence>
            {sizeError && (
              <m.p
                className="mt-2 text-sm text-rose-600"
                role="alert"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                Please choose a size to continue.
              </m.p>
            )}
          </AnimatePresence>
        </m.div>
      )}

      {/* Add to bag */}
      <m.div variants={fadeUp} className="mt-8 flex gap-3">
        <QuantityStepper value={qty} onChange={setQty} />
        <m.button
          type="button"
          onClick={addToBag}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "relative flex h-12 flex-1 items-center justify-center overflow-hidden px-6 text-xs font-medium tracking-[0.2em] text-cream uppercase transition-colors duration-300",
            added ? "bg-sage-700" : "bg-ink hover:bg-rose-700",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={added ? "added" : "idle"}
              className="flex items-center gap-2"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {added ? (
                <>
                  <Check className="size-4" aria-hidden /> Added to bag
                </>
              ) : (
                <>
                  <ShoppingBag className="size-4" aria-hidden /> Add to bag — {formatPrice(product.price * qty)}
                </>
              )}
            </m.span>
          </AnimatePresence>
        </m.button>
        <WishlistButton productId={product.id} productName={product.name} variant="outline" />
      </m.div>

      <m.ul variants={fadeUp} className="mt-5 space-y-2 text-sm text-taupe">
        <li className="flex items-center gap-2">
          <Check className="size-4 text-sage-700" aria-hidden /> In stock — ships within 1–3 business days
        </li>
        <li className="flex items-center gap-2">
          <Check className="size-4 text-sage-700" aria-hidden /> Free delivery over {formatPrice(siteConfig.freeShippingThreshold)} ·
          Cash on delivery available
        </li>
        <li className="flex items-center gap-2">
          <Check className="size-4 text-sage-700" aria-hidden /> Easy 7-day returns & exchanges
        </li>
      </m.ul>

      <m.div variants={fadeUp} className="mt-8 border-t border-sand-dark">
        <AccordionItem title="Details & materials" defaultOpen>
          <ul className="list-disc space-y-1 pl-5">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </AccordionItem>
        <AccordionItem title="Care instructions">{product.care}</AccordionItem>
        <AccordionItem title="Delivery & returns">
          Inside Dhaka delivery in 24–48 hours ({formatPrice(siteConfig.shipping.insideDhaka)}), outside Dhaka in 3–5 days (
          {formatPrice(siteConfig.shipping.outsideDhaka)}). Free on orders over {formatPrice(siteConfig.freeShippingThreshold)}. Unworn
          items can be returned or exchanged within 7 days in their original packaging.
        </AccordionItem>
      </m.div>
    </m.div>
  );
}

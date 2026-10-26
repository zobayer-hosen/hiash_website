"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Ruler } from "lucide-react";
import type { Product } from "@/types";
import { siteConfig } from "@/config/site";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { shopActions } from "@/store/shop-store";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { RatingStars } from "@/components/ui/rating-stars";
import { AccordionItem } from "./accordion";
import { Price } from "./price";
import { WishlistButton } from "./wishlist-button";

export function ProductInfo({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? "Default");
  const [size, setSize] = useState<string | undefined>(product.sizes?.length === 1 ? product.sizes[0] : undefined);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const off = discountPercent(product.price, product.compareAt);
  const needsSize = Boolean(product.sizes?.length);
  const isBeauty = product.category === "beauty";

  function addToBag() {
    if (needsSize && !size) {
      setSizeError(true);
      return;
    }
    shopActions.addItem({ productId: product.id, color, size, qty });
  }

  return (
    <div>
      <p className="eyebrow">
        {product.category} · {product.type}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight font-medium tracking-tight sm:text-5xl">{product.name}</h1>
      <a href="#reviews" className="mt-3 inline-block">
        <RatingStars rating={product.rating} reviews={product.reviews} size="md" />
      </a>
      <div className="mt-5 flex items-center gap-3">
        <Price price={product.price} compareAt={product.compareAt} size="lg" />
        {off > 0 && <span className="bg-rose-600 px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.16em] text-white uppercase">Save {off}%</span>}
      </div>

      <div className="my-7 h-px bg-sand-dark" />

      <p className="max-w-lg leading-relaxed text-taupe">{product.description}</p>

      {/* Colour / shade — hidden for single-variant beauty products */}
      {!(isBeauty && product.colors.length === 1) && (
        <div className="mt-7">
          <p className="text-sm font-medium">
            {isBeauty ? "Shade" : "Colour"} — <span className="font-normal text-taupe">{color}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-3" role="radiogroup" aria-label={isBeauty ? "Shade" : "Colour"}>
            {product.colors.map((option) => (
              <button
                key={option.name}
                type="button"
                role="radio"
                aria-checked={color === option.name}
                aria-label={option.name}
                onClick={() => setColor(option.name)}
                className={cn(
                  "grid size-10 place-items-center rounded-full transition-all",
                  color === option.name ? "ring-2 ring-ink ring-offset-2 ring-offset-cream" : "ring-1 ring-sand-dark hover:ring-ink/50",
                )}
              >
                <span className="size-8 rounded-full border border-black/5" style={{ backgroundColor: option.hex }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size */}
      {needsSize && (
        <div className="mt-7">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {product.category === "shoes" ? "Size (EU)" : product.type === "Jewellery" ? "Size (inches)" : "Size"}
              {size && <span className="font-normal text-taupe"> — {size}</span>}
            </p>
            <Link href="/help#size-guide" className="inline-flex items-center gap-1.5 text-xs text-taupe hover:text-rose-600">
              <Ruler className="size-3.5" aria-hidden /> Size guide
            </Link>
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
            {product.sizes?.map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={size === option}
                onClick={() => {
                  setSize(option);
                  setSizeError(false);
                }}
                className={cn(
                  "h-11 min-w-12 border px-3 text-sm transition-colors",
                  size === option ? "border-ink bg-ink text-cream" : "border-sand-dark bg-white hover:border-ink",
                )}
              >
                {option}
              </button>
            ))}
          </div>
          {sizeError && (
            <p className="mt-2 text-sm text-rose-600" role="alert">
              Please choose a size to continue.
            </p>
          )}
        </div>
      )}

      {/* Add to bag */}
      <div className="mt-8 flex gap-3">
        <QuantityStepper value={qty} onChange={setQty} />
        <button
          type="button"
          onClick={addToBag}
          className="flex h-12 flex-1 items-center justify-center bg-ink px-6 text-xs font-medium tracking-[0.2em] text-cream uppercase transition-colors hover:bg-rose-700"
        >
          Add to bag — {formatPrice(product.price * qty)}
        </button>
        <WishlistButton productId={product.id} productName={product.name} variant="outline" />
      </div>

      <ul className="mt-5 space-y-2 text-sm text-taupe">
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
      </ul>

      <div className="mt-8 border-t border-sand-dark">
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
      </div>
    </div>
  );
}

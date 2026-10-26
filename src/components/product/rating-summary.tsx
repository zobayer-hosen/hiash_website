"use client";

import { m } from "framer-motion";
import type { Product } from "@/types";
import { RatingStars } from "@/components/ui/rating-stars";
import { CountUp } from "@/components/motion/effects";
import { Reveal } from "@/components/motion/reveal";
import { EASE_LUXE } from "@/components/motion/variants";

/** Star distribution derived from the average so the bars always agree with the score. */
function distribution(rating: number) {
  const fiveShare = Math.min(0.95, Math.max(0.5, (rating - 4) * 0.9 + 0.1));
  const rest = 1 - fiveShare;
  return [fiveShare, rest * 0.65, rest * 0.2, rest * 0.1, rest * 0.05];
}

export function RatingSummary({ product }: { product: Product }) {
  const shares = distribution(product.rating);

  return (
    <section id="reviews" className="scroll-mt-28 border-t border-sand-dark py-16 lg:py-20">
      <div className="grid gap-10 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-16">
        <Reveal>
          <p className="eyebrow">Reviews</p>
          <p className="mt-3 font-display text-7xl leading-none font-medium lining-nums">{product.rating.toFixed(1)}</p>
          <RatingStars rating={product.rating} size="md" className="mt-3" />
          <p className="mt-2 text-sm text-taupe">
            Based on <CountUp value={product.reviews} /> verified reviews
          </p>
        </Reveal>
        <ul className="max-w-md space-y-2.5">
          {shares.map((share, index) => {
            const stars = 5 - index;
            return (
              <li key={stars} className="flex items-center gap-3 text-sm">
                <span className="w-10 text-taupe">{stars} ★</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand-dark">
                  <m.span
                    className="block h-full origin-left rounded-full bg-gold"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: share }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1.1, ease: EASE_LUXE, delay: index * 0.08 }}
                  />
                </span>
                <span className="w-10 text-right text-xs text-taupe tabular-nums">{Math.round(share * product.reviews)}</span>
              </li>
            );
          })}
        </ul>
        <Reveal delay={200} className="max-w-xs bg-rose-50 p-6">
          <p className="font-display text-xl font-semibold">Share your moment</p>
          <p className="mt-2 text-sm text-taupe">Tag @hiash on Instagram with your wedding look for a chance to be featured.</p>
        </Reveal>
      </div>
    </section>
  );
}

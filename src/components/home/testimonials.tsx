"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import { cn } from "@/lib/utils";
import { RatingStars } from "@/components/ui/rating-stars";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const go = (step: number) => setIndex((i) => (i + step + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-[#efe4d8] py-20 lg:py-28" aria-roledescription="carousel" aria-label="Customer stories">
      <div className="pointer-events-none absolute top-1/2 -left-40 size-[520px] -translate-y-1/2 rounded-full bg-cream/60" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow">Customer stories</p>
          <Quote className="mt-8 size-12 fill-rose-200 text-rose-200" aria-hidden />
          <div className="relative mt-4 min-h-[260px] sm:min-h-[220px]" aria-live="polite">
            {testimonials.map((item, i) => (
              <figure
                key={item.name}
                className={cn(
                  "absolute inset-0 transition-all duration-700 ease-[var(--ease-luxe)]",
                  i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
                )}
                aria-hidden={i !== index}
              >
                <blockquote className="font-display text-[1.65rem] leading-snug text-ink sm:text-[2.1rem]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-taupe">{item.location}</span>
                  <span className="hidden h-4 w-px bg-sand-dark sm:block" aria-hidden />
                  <span className="text-sm text-rose-600">Bought: {item.product}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                className="grid size-12 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-cream"
                aria-label="Previous story"
              >
                <ArrowLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="grid size-12 place-items-center rounded-full bg-ink text-cream transition-colors hover:bg-rose-700"
                aria-label="Next story"
              >
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn("h-1.5 rounded-full transition-all duration-500", i === index ? "w-8 bg-rose-500" : "w-3 bg-ink/20")}
                  aria-label={`Show story ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[440px]">
          <div className="relative aspect-square overflow-hidden rounded-full bg-sand ring-[14px] ring-cream/70">
            {testimonials.map((item, i) => (
              <Image
                key={item.image}
                src={item.image}
                alt={i === index ? `Portrait of ${item.name}` : ""}
                fill
                sizes="440px"
                className={cn("object-cover transition-opacity duration-700", i === index ? "opacity-100" : "opacity-0")}
              />
            ))}
          </div>
          <div className="absolute -bottom-2 -left-2 grid size-32 place-items-center rounded-full bg-rose-600 text-center text-white shadow-xl sm:size-36">
            <span>
              <span className="block font-display text-4xl leading-none font-semibold">25k+</span>
              <span className="mt-1 block text-[0.6rem] tracking-[0.18em] uppercase">Happy women</span>
            </span>
          </div>
          <div className="absolute top-6 -right-2 rounded-full bg-white px-4 py-2.5 shadow-lg">
            <RatingStars rating={4.9} />
            <p className="mt-0.5 text-center text-xs text-taupe">4.9 average</p>
          </div>
        </div>
      </div>
    </section>
  );
}

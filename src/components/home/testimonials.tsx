"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import { cn } from "@/lib/utils";
import { RatingStars } from "@/components/ui/rating-stars";
import { Float } from "@/components/motion/effects";
import { Reveal } from "@/components/motion/reveal";
import { EASE_LUXE } from "@/components/motion/variants";

export function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const current = testimonials[index];
  const go = (step: number) => setState(([i]) => [(i + step + testimonials.length) % testimonials.length, step]);

  useEffect(() => {
    const timer = window.setTimeout(() => setState(([i]) => [(i + 1) % testimonials.length, 1]), 8000);
    return () => window.clearTimeout(timer);
  }, [index]);

  return (
    <section className="relative overflow-hidden bg-[#efe4d8] py-20 lg:py-28" aria-roledescription="carousel" aria-label="Customer stories">
      <div className="pointer-events-none absolute top-1/2 -left-40 size-[520px] -translate-y-1/2 rounded-full bg-cream/60" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Wedding stories</p>
          <m.span
            className="mt-8 block w-fit"
            initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
          >
            <Quote className="size-12 fill-rose-200 text-rose-200" aria-hidden />
          </m.span>
          <div className="relative mt-4 min-h-[280px] sm:min-h-[230px]" aria-live="polite">
            <AnimatePresence mode="wait" custom={direction}>
              <m.figure
                key={current.name}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.55, ease: EASE_LUXE }}
              >
                <blockquote className="font-display text-[1.65rem] leading-snug text-ink sm:text-[2.1rem]">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-medium">{current.name}</span>
                  <span className="text-sm text-taupe">{current.location}</span>
                  <span className="hidden h-4 w-px bg-sand-dark sm:block" aria-hidden />
                  <span className="text-sm text-rose-600">Wore: {current.product}</span>
                </figcaption>
              </m.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex gap-2">
              <m.button
                type="button"
                whileTap={{ scale: 0.88 }}
                onClick={() => go(-1)}
                className="grid size-12 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-cream"
                aria-label="Previous story"
              >
                <ArrowLeft className="size-4" aria-hidden />
              </m.button>
              <m.button
                type="button"
                whileTap={{ scale: 0.88 }}
                onClick={() => go(1)}
                className="grid size-12 place-items-center rounded-full bg-ink text-cream transition-colors hover:bg-rose-700"
                aria-label="Next story"
              >
                <ArrowRight className="size-4" aria-hidden />
              </m.button>
            </div>
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className="relative h-1.5 w-8 overflow-hidden rounded-full bg-ink/15"
                  aria-label={`Show story ${i + 1}`}
                  aria-current={i === index}
                >
                  {i === index && (
                    <m.span
                      layoutId="testimonial-dot"
                      className="absolute inset-0 rounded-full bg-rose-500"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-[440px]">
          <div className={cn("relative aspect-square overflow-hidden rounded-full bg-sand ring-[14px] ring-cream/70")}>
            <AnimatePresence initial={false}>
              <m.div
                key={current.image}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE_LUXE }}
              >
                <Image src={current.image} alt={`${current.name}`} fill sizes="440px" className="object-cover object-top" />
              </m.div>
            </AnimatePresence>
          </div>
          <Float className="absolute -bottom-2 -left-2" amplitude={8} duration={6}>
            <div className="grid size-32 place-items-center rounded-full bg-rose-600 text-center text-white shadow-xl sm:size-36">
              <span>
                <span className="block font-display text-4xl leading-none font-semibold">1.2k+</span>
                <span className="mt-1 block text-[0.6rem] tracking-[0.18em] uppercase">Happy couples</span>
              </span>
            </div>
          </Float>
          <Float className="absolute top-6 -right-2" amplitude={6} duration={5} delay={1}>
            <div className="rounded-full bg-white px-4 py-2.5 shadow-lg">
              <RatingStars rating={4.9} />
              <p className="mt-0.5 text-center text-xs text-taupe">4.9 average</p>
            </div>
          </Float>
        </Reveal>
      </div>
    </section>
  );
}

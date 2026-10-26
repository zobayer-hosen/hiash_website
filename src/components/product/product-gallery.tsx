"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EASE_LUXE } from "@/components/motion/variants";

type View = { src: string; zoom?: string };

/** Main image + thumbnails. Single-photo products get two close-up "detail" views. */
export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const views: View[] = images.map((src) => ({ src }));
  if (views.length < 3) {
    views.push({ src: images[0], zoom: "scale-[1.7] object-[50%_35%]" });
  }
  if (views.length < 4) {
    views.push({ src: images[0], zoom: "scale-[2.2] object-[60%_60%]" });
  }

  const [active, setActive] = useState(0);
  const current = views[active];

  return (
    <m.div
      className="grid min-w-0 gap-4 lg:grid-cols-[88px_minmax(0,1fr)]"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_LUXE }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand lg:order-2">
        <AnimatePresence initial={false}>
          <m.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_LUXE }}
          >
            <Image
              src={current.src}
              alt={`${name} — view ${active + 1}`}
              fill
              preload={active === 0}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className={cn("object-cover", current.zoom ?? "object-top")}
            />
          </m.div>
        </AnimatePresence>
        <m.span
          className="absolute top-5 right-5 grid size-16 place-items-center rounded-full border border-ink/20 bg-cream/80 backdrop-blur"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.5 }}
        >
          <span className="grid size-[52px] place-items-center rounded-full border border-ink/15">
            <Image src="/brand/butterfly.png" alt="" width={319} height={299} className="w-7" />
          </span>
        </m.span>
      </div>

      <div className="no-scrollbar flex gap-3 overflow-x-auto p-1 lg:order-1 lg:flex-col lg:overflow-visible lg:p-0">
        {views.map((view, index) => (
          <m.button
            key={`${view.src}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative aspect-[4/5] w-20 shrink-0 bg-sand transition-opacity lg:w-full",
              index === active ? "opacity-100" : "opacity-65 hover:opacity-100",
            )}
            aria-label={`Show image ${index + 1}`}
            aria-current={index === active}
          >
            <span className="absolute inset-0 overflow-hidden">
              <Image src={view.src} alt="" fill sizes="96px" className={cn("object-cover", view.zoom ?? "object-top")} />
            </span>
            {index === active && (
              <m.span
                layoutId="gallery-thumb-ring"
                className="absolute -inset-1 border-2 border-ink"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
          </m.button>
        ))}
      </div>
    </m.div>
  );
}

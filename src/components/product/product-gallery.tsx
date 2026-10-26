"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
    <div className="grid min-w-0 gap-4 lg:grid-cols-[88px_minmax(0,1fr)]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand lg:order-2">
        <Image
          key={active}
          src={current.src}
          alt={`${name} — view ${active + 1}`}
          fill
          preload={active === 0}
          sizes="(min-width: 1024px) 46vw, 100vw"
          className={cn("animate-fade-in object-cover", current.zoom)}
        />
        <span className="absolute top-5 right-5 grid size-16 place-items-center rounded-full border border-ink/20 bg-cream/80 backdrop-blur">
          <span className="grid size-[52px] place-items-center rounded-full border border-ink/15">
            <Image src="/brand/butterfly.png" alt="" width={319} height={299} className="w-7" />
          </span>
        </span>
      </div>

      <div className="no-scrollbar flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
        {views.map((view, index) => (
          <button
            key={`${view.src}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-sand transition-all lg:w-full",
              index === active ? "ring-2 ring-ink ring-offset-2 ring-offset-cream" : "opacity-70 hover:opacity-100",
            )}
            aria-label={`Show image ${index + 1}`}
            aria-current={index === active}
          >
            <Image src={view.src} alt="" fill sizes="96px" className={cn("object-cover", view.zoom)} />
          </button>
        ))}
      </div>
    </div>
  );
}

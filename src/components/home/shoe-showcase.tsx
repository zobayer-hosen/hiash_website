import { Fragment } from "react";
import Image from "next/image";
import { getProductsByCategory } from "@/data/products";
import { pexels } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Parallax } from "@/components/motion/effects";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";
import { ProductRail } from "./product-rail";

export function ShoeShowcase() {
  const shoes = getProductsByCategory("shoes");

  return (
    <section className="py-20 lg:py-28">
      <div className="container-x grid gap-8 lg:grid-cols-[0.9fr_2fr] lg:gap-10">
        <Reveal y={40} className="relative min-h-[480px] overflow-hidden bg-sand lg:min-h-0">
          <Parallax offset={40} className="absolute -inset-y-12 inset-x-0">
            <div className="relative h-full w-full">
              <Image
                src={pexels(4376757)}
                alt="Elegant blue high heels styled with a chic outfit"
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-cream">
            <p className="eyebrow text-rose-200">Footwear</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] font-medium sm:text-5xl">
              <MaskLines
                lines={[
                  <Fragment key="line-1">
                    Step into <em className="italic">every</em>
                  </Fragment>,
                  "moment.",
                ]}
              />
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/80">
              Embroidered khussa, crystal bridal flats and heels made to dance in — all night long.
            </p>
            <ArrowLink href="/collections/shoes" tone="light" className="mt-6">
              Shop shoes
            </ArrowLink>
          </div>
        </Reveal>

        <div className="flex min-w-0 flex-col justify-center">
          <div className="mb-2 max-w-xl">
            <Reveal y={10}>
              <p className="eyebrow">Wedding season</p>
            </Reveal>
            <h3 className="mt-3 font-display text-4xl leading-tight font-medium sm:text-5xl">
              <MaskLines lines={["Khussa, heels & bridal flats"]} />
            </h3>
          </div>
          <ProductRail products={shoes} label="shoes" />
        </div>
      </div>
    </section>
  );
}

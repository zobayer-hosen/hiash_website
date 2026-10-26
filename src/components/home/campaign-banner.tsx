import Image from "next/image";
import { pexels } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { ScrollZoom } from "@/components/motion/effects";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";

export function CampaignBanner() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-x">
        <Reveal y={40}>
          <div className="relative grid overflow-hidden bg-[#e8dacb] lg:grid-cols-[1fr_1.1fr]">
            <div className="relative z-10 flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
              <Reveal y={10}>
                <p className="eyebrow text-mocha">The Carry Capsule</p>
              </Reveal>
              <h2 className="mt-4 max-w-md font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-[3.6rem]">
                <MaskLines lines={["Carry confidence", "with every single", "outfit."]} />
              </h2>
              <Reveal delay={250}>
                <p className="mt-5 max-w-sm leading-relaxed text-ink-soft/80">
                  Tightly edited leather bags built to mix, layer and repeat — from reception nights to Monday meetings.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <ButtonLink href="/collections/accessories?type=Bags">Shop the capsule</ButtonLink>
                  <ButtonLink href="/product/cocoa-structured-tote" variant="outline">
                    Bestselling tote
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <ScrollZoom className="relative min-h-[380px] overflow-hidden lg:min-h-[560px]">
              <Image
                src={pexels(5706269)}
                alt="Brown leather handbags displayed on white pedestals"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover object-[60%_88%]"
              />
            </ScrollZoom>
            <div className="pointer-events-none absolute inset-y-0 left-[47.6%] hidden w-24 bg-gradient-to-r from-[#e8dacb] to-transparent lg:block" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

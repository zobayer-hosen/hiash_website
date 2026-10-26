import Image from "next/image";
import { pexels } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CampaignBanner() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative grid overflow-hidden bg-[#e8dacb] lg:grid-cols-[1fr_1.1fr]">
            <div className="relative z-10 flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
              <p className="eyebrow text-mocha">The Carry Capsule</p>
              <h2 className="mt-4 max-w-md font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-[3.6rem]">
                Carry confidence with every single outfit.
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-ink-soft/80">
                Tightly edited leather bags built to mix, layer and repeat — from saree evenings to Monday meetings.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/collections/accessories?type=Bags">Shop the capsule</ButtonLink>
                <ButtonLink href="/product/cocoa-structured-tote" variant="outline">
                  Bestselling tote
                </ButtonLink>
              </div>
            </div>
            <div className="relative min-h-[380px] lg:min-h-[560px]">
              <Image
                src={pexels(5706269)}
                alt="Brown leather handbags displayed on white pedestals"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover object-[60%_88%]"
              />
              <div className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-[#e8dacb] to-transparent lg:block" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { Fragment } from "react";
import Image from "next/image";
import { Gem, HeartHandshake, Ruler } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import { pexels } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Ornament } from "@/components/ui/ornament";
import { CountUp, Float, Parallax } from "@/components/motion/effects";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { WeddingTabs } from "./wedding-tabs";

const promises = [
  { Icon: Ruler, title: "Bespoke fittings", text: "Complimentary measurements and two fittings at our Gulshan studio." },
  { Icon: Gem, title: "Hand zardozi", text: "Every motif embroidered by hand — gold thread, dabka, pearls and stones." },
  { Icon: HeartHandshake, title: "Couple styling", text: "Coordinate bride and groom across holud, biye and reception." },
];

const stats = [
  { value: 120, suffix: "+", label: "Master karigars" },
  { value: 1200, suffix: "+", label: "Couples dressed" },
  { value: 6, suffix: " wk", label: "Per couture piece" },
];

export function WeddingAtelier() {
  const wedding = getProductsByCategory("wedding");

  return (
    <section className="relative overflow-hidden bg-sand py-20 lg:py-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Collage */}
          <Reveal className="relative mx-auto w-full max-w-[560px] pb-16 sm:pb-20">
            <div className="relative w-[80%]">
              <span className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] border border-gold/60" aria-hidden />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-sand-dark">
                <Parallax offset={30} className="absolute -inset-y-10 inset-x-0">
                  <div className="relative h-full w-full">
                    <Image
                      src={pexels(10983399)}
                      alt="Bangladeshi bride and groom in traditional wedding attire"
                      fill
                      sizes="(min-width: 1024px) 460px, 80vw"
                      className="object-cover"
                    />
                  </div>
                </Parallax>
              </div>
            </div>
            <Reveal delay={250} y={40} className="absolute right-0 bottom-0 aspect-square w-[50%] overflow-hidden border-[10px] border-sand bg-sand-dark shadow-xl">
              <Image
                src={pexels(35533303)}
                alt="Close-up of hand embroidery on a red bridal lehenga"
                fill
                sizes="(min-width: 1024px) 300px, 50vw"
                className="object-cover"
              />
            </Reveal>
            <Float className="absolute top-10 right-2 sm:right-6" amplitude={8} duration={5}>
              <div className="grid size-28 place-items-center rounded-full bg-wine p-4 text-center text-gold-light shadow-lg ring-1 ring-gold/40 sm:size-32">
                <span>
                  <span className="block font-display text-2xl leading-none font-semibold">Hand</span>
                  <span className="mt-1 block text-[0.6rem] tracking-[0.2em] uppercase">Zardozi</span>
                </span>
              </div>
            </Float>
          </Reveal>

          {/* Story */}
          <div>
            <Reveal y={12}>
              <Ornament tone="rose">The Wedding Atelier</Ornament>
            </Reveal>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-6xl">
              <MaskLines
                lines={[
                  "Hand-embroidered",
                  <Fragment key="line-1">
                    for your <em className="text-rose-500 italic">forever.</em>
                  </Fragment>,
                ]}
              />
            </h2>
            <Reveal delay={150}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-taupe">
                From the rani-red lehenga to the groom&rsquo;s zardozi sherwani, every Hiash wedding piece is cut, embroidered and
                finished by our karigars in Dhaka. We style bride and groom together — so your gaye holud, biye and bou bhaat tell
                one beautiful story.
              </p>
            </Reveal>

            <Stagger as="ul" className="mt-9 grid gap-6 sm:grid-cols-3" delay={0.2}>
              {promises.map(({ Icon, title, text }) => (
                <StaggerItem as="li" key={title}>
                  <span className="grid size-11 place-items-center rounded-full bg-cream text-rose-600 ring-1 ring-rose-200">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-3 font-display text-lg font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-taupe">{text}</p>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={200}>
              <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4 border-t border-sand-dark pt-7">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-4xl font-semibold text-mocha lining-nums">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dd className="text-xs tracking-[0.18em] text-taupe uppercase">{stat.label}</dd>
                  </div>
                ))}
              </dl>
              <ArrowLink href="/collections/wedding" className="mt-10">
                Explore the wedding edit
              </ArrowLink>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-20 lg:mt-24">
          <WeddingTabs products={wedding} />
        </Reveal>
      </div>
    </section>
  );
}

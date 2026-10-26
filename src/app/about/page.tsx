import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Flower2, HandHeart, Sparkles } from "lucide-react";
import { pexels } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { JaaliPattern, Ornament } from "@/components/ui/ornament";
import { Marquee } from "@/components/home/marquee";
import { ServicePerks } from "@/components/home/service-perks";
import { CountUp, Float, Parallax } from "@/components/motion/effects";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Our story",
  description: "Hiash brings hand-embroidered wedding couture, thoughtful accessories and clean beauty together — to elevate every moment.",
};

const values = [
  {
    Icon: HandHeart,
    title: "Made by hands we know",
    text: "Our karigars work in our own Dhaka atelier — paid fairly, credited proudly, and given the time true craftsmanship needs.",
  },
  {
    Icon: Sparkles,
    title: "Couture, made personal",
    text: "Every bride and groom gets bespoke measurements, two fittings and styling that ties the whole wedding wardrobe together.",
  },
  {
    Icon: Flower2,
    title: "Beauty that's kind",
    text: "Our beauty line is cruelty free, fragrance-conscious and tested for Bangladesh's heat and humidity.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-sand">
        <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Reveal y={10}>
              <Ornament tone="rose">Our story</Ornament>
            </Reveal>
            <h1 className="mt-5 font-display text-5xl leading-[1] font-medium tracking-tight sm:text-7xl">
              <MaskLines
                trigger="mount"
                delay={0.1}
                lines={[
                  <Fragment key="line-1">
                    Elevate <em className="text-rose-500 italic">every</em>
                  </Fragment>,
                  "moment.",
                ]}
              />
            </h1>
            <Reveal delay={200}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-taupe">
                Hiash began with a simple belief: the clothes you wear to life&rsquo;s biggest moments — the holud, the biye, the first
                dawat as a couple — deserve as much care as the moments themselves.
              </p>
              <p className="mt-4 max-w-lg leading-relaxed text-taupe">
                So we bring together hand-embroidered bridal and groom couture, comfortable statement shoes, considered accessories and
                clean beauty, all chosen with the same eye. Like the butterfly in our logo, every piece is about transformation — feeling
                lighter, more beautiful, more you.
              </p>
              <ButtonLink href="/collections/wedding" className="mt-9">
                Explore the wedding edit
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={150} y={50} className="relative mx-auto w-full max-w-[520px]">
            <span className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] border border-gold/60" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-sand-dark">
              <Parallax offset={30} className="absolute -inset-y-10 inset-x-0">
                <div className="relative h-full w-full">
                  <Image
                    src={pexels(16709635)}
                    alt="Bride and groom in traditional Bangladeshi wedding attire in a park"
                    fill
                    preload
                    sizes="(min-width: 1024px) 520px, 92vw"
                    className="object-cover object-top"
                  />
                </div>
              </Parallax>
            </div>
            <Float className="absolute -top-6 -right-4" amplitude={12} duration={7}>
              <Image src="/brand/butterfly.png" alt="" width={319} height={299} className="w-28" />
            </Float>
          </Reveal>
        </div>
      </section>

      <Marquee />

      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal y={10}>
              <p className="eyebrow">What we stand for</p>
            </Reveal>
            <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
              <MaskLines lines={["Crafted with intention"]} />
            </h2>
          </div>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3" gap={0.12}>
            {values.map(({ Icon, title, text }) => (
              <StaggerItem key={title} className="bg-white p-8 transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_rgba(34,26,28,0.4)]">
                <span className="grid size-12 place-items-center rounded-full bg-rose-100 text-rose-600">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-taupe">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="artisans" className="relative isolate scroll-mt-28 overflow-hidden bg-wine-dark py-20 text-cream lg:py-28">
        <JaaliPattern id="about-jaali" className="-z-10 text-gold-light opacity-[0.06]" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <Reveal y={50} className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={pexels(35533303)}
                alt="Close-up of hand embroidery on a red bridal lehenga"
                fill
                sizes="(min-width: 1024px) 24vw, 46vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal y={80} delay={150} className="relative mt-12 aspect-[3/4] overflow-hidden">
              <Image
                src={pexels(18016521)}
                alt="Hand-embroidered sherwani on a hanger"
                fill
                sizes="(min-width: 1024px) 24vw, 46vw"
                className="object-cover"
              />
            </Reveal>
          </div>
          <div>
            <Reveal y={10}>
              <Ornament>The karigars</Ornament>
            </Reveal>
            <h2 className="mt-5 font-display text-4xl leading-tight font-medium sm:text-5xl">
              <MaskLines
                lines={[
                  "120+ karigars. Six weeks a piece.",
                  <em key="promise" className="text-gold-light italic">
                    One promise.
                  </em>,
                ]}
              />
            </h2>
            <Reveal delay={200}>
              <p className="mt-6 leading-relaxed text-cream/75">
                A single couture lehenga can take two karigars up to six weeks — zardozi, dabka, pearls and stones set one by one. In our
                Dhaka atelier we plan every design together, pay fairly and up front, and make sure the craft is passed on to the next
                generation.
              </p>
              <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-cream/15 pt-8">
                {[
                  { value: 120, suffix: "+", label: "Karigars" },
                  { value: 1200, suffix: "+", label: "Couples dressed" },
                  { value: 6, suffix: " wk", label: "Per couture piece" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-4xl font-semibold text-gold-light lining-nums">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dd className="mt-1 text-xs tracking-[0.18em] text-cream/60 uppercase">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <ServicePerks />
    </>
  );
}

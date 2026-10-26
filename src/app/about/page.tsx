import type { Metadata } from "next";
import Image from "next/image";
import { Flower2, HandHeart, Leaf } from "lucide-react";
import { pexels } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/home/marquee";
import { ServicePerks } from "@/components/home/service-perks";

export const metadata: Metadata = {
  title: "Our story",
  description: "Hiash brings handwoven sarees, thoughtful accessories and clean beauty together — to elevate every moment.",
};

const values = [
  {
    Icon: HandHeart,
    title: "Made by hands we know",
    text: "We buy directly from weaver families and small workshops, paying fairly and planning orders months ahead so looms never sit idle.",
  },
  {
    Icon: Leaf,
    title: "Less, but better",
    text: "Small runs, natural fibres and recyclable packaging. We'd rather sell out than overproduce.",
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
            <p className="eyebrow">Our story</p>
            <h1 className="mt-4 font-display text-5xl leading-[1] font-medium tracking-tight sm:text-7xl">
              Elevate <em className="text-rose-500 italic">every</em> moment.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-taupe">
              Hiash began with a simple belief: the pieces you wear to life&rsquo;s moments — the wedding, the first job, the quiet
              Friday dinner — deserve as much care as the moments themselves.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-taupe">
              So we bring together handwoven sarees, comfortable statement shoes, considered accessories and clean beauty,
              all chosen with the same eye. Like the butterfly in our logo, every piece is about transformation — feeling lighter,
              more beautiful, more you.
            </p>
            <ButtonLink href="/shop" className="mt-9">
              Explore the collection
            </ButtonLink>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px]">
              <Image
                src={pexels(7920188)}
                alt="Two women wearing traditional sarees, smiling outdoors"
                fill
                preload
                sizes="(min-width: 1024px) 520px, 92vw"
                className="object-cover"
              />
            </div>
            <Image
              src="/brand/butterfly.png"
              alt=""
              width={319}
              height={299}
              className="absolute -top-6 -right-4 w-28 animate-float"
            />
          </div>
        </div>
      </section>

      <Marquee />

      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What we stand for</p>
            <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">Crafted with intention</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map(({ Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 100} className="bg-white p-8">
                <span className="grid size-12 place-items-center rounded-full bg-rose-100 text-rose-600">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-taupe">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="artisans" className="scroll-mt-28 bg-wine py-20 text-cream lg:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={pexels(10317113)} alt="Close-up of an intricate handwoven silk saree" fill sizes="(min-width: 1024px) 24vw, 46vw" className="object-cover" />
            </div>
            <div className="relative mt-12 aspect-[3/4] overflow-hidden">
              <Image src={pexels(8886948)} alt="Woman examining saree fabric" fill sizes="(min-width: 1024px) 24vw, 46vw" className="object-cover" />
            </div>
          </div>
          <div>
            <p className="eyebrow text-rose-200">The artisans</p>
            <h2 className="mt-4 font-display text-4xl leading-tight font-medium sm:text-5xl">
              300+ weavers. Six heritage crafts. <em className="text-rose-300 italic">One promise.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-cream/75">
              A single Dhakai Jamdani can take two weavers up to three months on the loom. We visit our partner clusters in
              Narayanganj, Tangail and Rajshahi every season — to plan designs together, agree fair prices up front, and make sure
              the craft is passed on to the next generation.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-cream/15 pt-8">
              {[
                ["300+", "Artisans"],
                ["12", "Partner clusters"],
                ["3 mo", "Per jamdani"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-4xl font-semibold text-rose-200">{value}</dd>
                  <dd className="mt-1 text-xs tracking-[0.18em] text-cream/60 uppercase">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ServicePerks />
    </>
  );
}

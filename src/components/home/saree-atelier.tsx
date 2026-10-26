import Image from "next/image";
import { Gem, Leaf, Scissors } from "lucide-react";
import { getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { pexels } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/ui/reveal";
import { SareeTabs } from "./saree-tabs";

const promises = [
  { Icon: Leaf, title: "Handloom certified", text: "Every saree is woven on a traditional loom — never machine printed." },
  { Icon: Gem, title: "Pure fibres", text: "Silk, muslin and cotton sourced directly from weaver clusters." },
  { Icon: Scissors, title: "Blouse piece included", text: "Plus free fall & pico finishing in Dhaka on request." },
];

const stats = [
  { value: "300+", label: "Artisan weavers" },
  { value: "6", label: "Heritage weaves" },
  { value: "48h", label: "Dhaka delivery" },
];

export function SareeAtelier() {
  const sarees = getProductsByCategory("sarees");
  const weaves = getCategory("sarees")?.types ?? [];

  return (
    <section className="relative overflow-hidden bg-sand py-20 lg:py-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Collage */}
          <Reveal className="relative mx-auto w-full max-w-[560px] pb-16 sm:pb-20">
            <div className="relative aspect-[4/5] w-[82%] overflow-hidden rounded-t-[999px] bg-sand-dark">
              <Image
                src={pexels(37054322)}
                alt="Woman in a golden saree standing by a tree"
                fill
                sizes="(min-width: 1024px) 460px, 80vw"
                className="object-cover"
              />
            </div>
            <div className="absolute right-0 bottom-0 aspect-square w-[52%] overflow-hidden border-[10px] border-sand bg-sand-dark">
              <Image
                src={pexels(10317106)}
                alt="A stack of handwoven silk sarees with intricate borders"
                fill
                sizes="(min-width: 1024px) 300px, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute top-10 right-2 grid size-28 place-items-center rounded-full bg-rose-600 p-4 text-center text-white shadow-lg sm:right-6 sm:size-32">
              <span>
                <span className="block font-display text-3xl leading-none font-semibold">100%</span>
                <span className="mt-1 block text-[0.6rem] tracking-[0.2em] uppercase">Handloom</span>
              </span>
            </div>
          </Reveal>

          {/* Story */}
          <Reveal delay={120}>
            <p className="eyebrow">The Saree Atelier</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl">
              Woven by hand, <em className="text-rose-500 italic">worn with heart.</em>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-taupe">
              From the misty muslin of Dhakai Jamdani to the gilded brocades of Banarasi, every Hiash saree is a conversation
              between a weaver&rsquo;s hands and centuries of craft. We work directly with artisan families in Narayanganj,
              Tangail and Rajshahi — so every drape carries its story to you.
            </p>

            <ul className="mt-9 grid gap-6 sm:grid-cols-3">
              {promises.map(({ Icon, title, text }) => (
                <li key={title}>
                  <span className="grid size-11 place-items-center rounded-full bg-cream text-rose-600 ring-1 ring-rose-200">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-3 font-display text-lg font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-taupe">{text}</p>
                </li>
              ))}
            </ul>

            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4 border-t border-sand-dark pt-7">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-4xl font-semibold text-mocha">{stat.value}</dd>
                  <dd className="text-xs tracking-[0.18em] text-taupe uppercase">{stat.label}</dd>
                </div>
              ))}
            </dl>

            <ArrowLink href="/collections/sarees" className="mt-10">
              Shop all sarees
            </ArrowLink>
          </Reveal>
        </div>

        <div className="mt-20 lg:mt-24">
          <SareeTabs products={sarees} weaves={weaves} />
        </div>
      </div>
    </section>
  );
}

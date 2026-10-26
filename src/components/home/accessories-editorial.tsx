import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, pexels } from "@/lib/utils";
import { Parallax } from "@/components/motion/effects";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const tiles = [
  {
    eyebrow: "Bridal jewellery",
    title: "Heirloom gold",
    href: "/collections/accessories?type=Jewellery",
    image: pexels(28347073),
    alt: "Ornate gold bridal jewellery set displayed on a velvet stand",
  },
  {
    eyebrow: "Bags",
    title: "The investment bag",
    href: "/collections/accessories?type=Bags",
    image: pexels(21897309),
    alt: "Woman in a white dress holding two luxury handbags",
  },
  {
    eyebrow: "Eyewear",
    title: "Sunlit statements",
    href: "/collections/accessories?type=Sunglasses",
    image: pexels(27408060),
    alt: "Woman wearing sunglasses, a silk headscarf and pearls",
  },
];

export function AccessoriesEditorial() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Finishing touches"
          title={
            <>
              Accessories that <em className="text-rose-500 italic">complete</em> the story
            </>
          }
          description="Bridal jewellery, structured bags and sunglasses — chosen to sit beautifully beside a lehenga or a slip dress."
          align="center"
        />
        <div className="grid gap-5 md:grid-cols-3 md:pb-14">
          {tiles.map((tile, index) => (
            <Reveal key={tile.title} delay={index * 140} y={50} className={cn(index === 1 && "md:translate-y-14")}>
              <Link href={tile.href} className="group relative block aspect-[3/4] overflow-hidden bg-sand">
                <Parallax offset={30} className="absolute -inset-y-10 inset-x-0">
                  <div className="relative h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-105">
                    <Image src={tile.image} alt={tile.alt} fill sizes="(min-width: 768px) 32vw, 100vw" className="object-cover" />
                  </div>
                </Parallax>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 text-cream">
                  <div>
                    <p className="text-[0.7rem] tracking-[0.24em] text-rose-200 uppercase">{tile.eyebrow}</p>
                    <p className="mt-2 font-display text-3xl leading-tight">{tile.title}</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-cream/50 transition-all duration-500 group-hover:rotate-45 group-hover:bg-cream group-hover:text-ink">
                    <ArrowUpRight className="size-5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

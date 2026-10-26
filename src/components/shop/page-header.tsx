import { Fragment } from "react";
import Image from "next/image";
import type { NavLink } from "@/types";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Float } from "@/components/motion/effects";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";

export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
}: {
  breadcrumbs: NavLink[];
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-sand-dark bg-sand">
      <div className="container-x grid items-center gap-8 py-10 md:grid-cols-[1.4fr_1fr] lg:py-14">
        <div>
          <Reveal y={10}>
            <Breadcrumbs items={breadcrumbs} />
            {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
          </Reveal>
          <h1 className="mt-3 font-display text-5xl leading-[1] font-medium tracking-tight sm:text-6xl">
            <MaskLines lines={[<Fragment key="title">{title}</Fragment>]} trigger="mount" delay={0.15} />
          </h1>
          {description && (
            <Reveal delay={250}>
              <p className="mt-4 max-w-xl leading-relaxed text-taupe">{description}</p>
            </Reveal>
          )}
        </div>
        {image && (
          <Reveal delay={150} y={40} className="relative hidden h-[260px] justify-self-end md:block md:w-[300px] lg:h-[300px] lg:w-[360px]">
            <span className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] border border-gold/60" aria-hidden />
            <div className="absolute inset-0 overflow-hidden rounded-t-[999px] bg-sand-dark">
              <Image src={image} alt={imageAlt} fill preload sizes="360px" className="object-cover object-top" />
            </div>
            <Float className="absolute -top-4 -left-8" amplitude={10} duration={6}>
              <Image src="/brand/butterfly.png" alt="" width={319} height={299} className="w-20" />
            </Float>
          </Reveal>
        )}
      </div>
    </header>
  );
}

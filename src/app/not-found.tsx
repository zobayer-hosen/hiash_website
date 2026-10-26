import { Fragment } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Float } from "@/components/motion/effects";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center py-24 text-center lg:py-32">
      <Float amplitude={14} duration={5}>
        <Image src="/brand/butterfly.png" alt="" width={319} height={299} className="w-24" />
      </Float>
      <p className="eyebrow mt-8">Error 404</p>
      <h1 className="mt-4 font-display text-5xl font-medium sm:text-6xl">
        <MaskLines
          trigger="mount"
          lines={[
            <Fragment key="line-1">
              This page has <em className="text-rose-500 italic">fluttered away</em>
            </Fragment>,
          ]}
        />
      </h1>
      <Reveal delay={200}>
        <p className="mt-5 max-w-md text-taupe">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s find you something lovely instead.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/shop" variant="outline">
            Shop all
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}

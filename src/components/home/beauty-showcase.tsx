import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/data/products";
import { cn, discountPercent, pexels } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button";
import { RatingStars } from "@/components/ui/rating-stars";
import { RotatingBadge } from "@/components/ui/rotating-badge";
import { StampBadge } from "@/components/ui/stamp-badge";
import { AddToBagButton } from "@/components/product/add-to-bag-button";
import { Price } from "@/components/product/price";
import { Float } from "@/components/motion/effects";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const picks = [
  { slug: "rose-glow-serum", tint: "bg-rose-100" },
  { slug: "amber-botanical-face-oil", tint: "bg-peach-100" },
  { slug: "blush-petal-eau-de-parfum", tint: "bg-lilac-100" },
  { slug: "velvet-matte-lipstick-trio", tint: "bg-sage-100" },
];

export function BeautyShowcase() {
  const products = picks.flatMap((pick) => {
    const product = getProductBySlug(pick.slug);
    return product ? [{ product, tint: pick.tint }] : [];
  });

  return (
    <section className="relative overflow-hidden bg-sage-50 py-20 lg:py-28">
      <svg className="pointer-events-none absolute top-16 right-10 hidden w-40 text-sage-200 lg:block" viewBox="0 0 160 40" fill="none" aria-hidden>
        <path d="M2 30c20-26 36 10 56-12s34 14 52-6 32 8 48-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <div className="container-x">
        <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal y={10}>
              <p className="eyebrow text-sage-700">Bridal Beauty · Clean formulas</p>
            </Reveal>
            <h2 className="mt-5 font-display text-[2.8rem] leading-[1] font-medium tracking-tight sm:text-7xl">
              <MaskLines
                lines={[
                  <Fragment key="line-1">
                    Bridal glow,
                    <span className="relative mx-3 inline-block h-[0.72em] w-[1.7em] translate-y-[0.06em] overflow-hidden rounded-full align-baseline">
                      <Image src={pexels(8131568)} alt="" fill sizes="180px" className="object-cover" />
                    </span>
                  </Fragment>,
                  <Fragment key="line-2">
                    <em className="text-sage-700 italic">best</em> result.
                  </Fragment>,
                ]}
              />
            </h2>
            <Reveal delay={200}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-taupe">
                Skincare, makeup and fragrance formulated for humid wedding seasons and long celebrations — gentle on skin, generous with
                glow.
              </p>
              <ArrowLink href="/collections/beauty" className="mt-8">
                Explore beauty
              </ArrowLink>
            </Reveal>
          </div>

          <Reveal delay={150} className="flex flex-wrap items-center gap-8 lg:justify-end">
            <RotatingBadge href="/collections/beauty" text="Explore Products ✦ Explore Products ✦ " />
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[pexels(5468699), pexels(9774786)].map((src) => (
                  <span key={src} className="relative size-14 overflow-hidden rounded-full ring-4 ring-sage-50">
                    <Image src={src} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                ))}
              </div>
              <p className="max-w-[12rem] border-l border-sage-200 pl-4 text-sm leading-snug text-taupe">
                Experience perfect tone and restore your skin&rsquo;s natural beauty
              </p>
            </div>
          </Reveal>
        </div>

        <Stagger as="ul" gap={0.12} className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {products.map(({ product, tint }) => {
            const off = discountPercent(product.price, product.compareAt);
            return (
              <StaggerItem as="li" key={product.id} className="relative flex flex-col items-center text-center">
                <Link
                  href={`/product/${product.slug}`}
                  className={cn(
                    "group relative block aspect-[3/4] w-full overflow-hidden rounded-[999px] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(74,87,69,0.6)]",
                    tint,
                  )}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-105"
                  />
                </Link>
                {off > 0 && (
                  <Float className="absolute top-2 -right-1" amplitude={5} duration={4}>
                    <StampBadge className="rotate-12">
                      {off}%<br />
                      OFF
                    </StampBadge>
                  </Float>
                )}
                <h3 className="mt-5 font-display text-xl font-semibold">
                  <Link href={`/product/${product.slug}`} className="hover:text-sage-700">
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-xs text-taupe">{product.subtitle}</p>
                <RatingStars rating={product.rating} reviews={product.reviews} className="mt-2 justify-center" />
                <Price price={product.price} compareAt={product.compareAt} className="mt-2 justify-center" />
                <AddToBagButton product={product} className="mt-4" />
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-14 flex justify-center">
          <ButtonLink href="/collections/beauty" size="sm">
            View all products
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

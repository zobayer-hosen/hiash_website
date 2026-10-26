import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/data/products";
import { formatPrice, pexels } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button";
import { RatingStars } from "@/components/ui/rating-stars";
import { RotatingBadge } from "@/components/ui/rotating-badge";

const avatars = [pexels(20507062), pexels(36322504), pexels(28284556)];

export function Hero() {
  const featured = getProductBySlug("saffron-katan-silk-saree");

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Soft background washes */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] size-[640px] rounded-full bg-rose-100/80 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-30%] left-[-10%] size-[520px] rounded-full bg-sand blur-3xl" />
      <Image
        src="/brand/butterfly.png"
        alt=""
        width={319}
        height={299}
        className="pointer-events-none absolute top-10 right-[3%] hidden w-24 animate-float opacity-80 select-none lg:block"
      />

      <div className="container-x relative grid items-center gap-14 pt-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-14 lg:pb-24">
        {/* Copy */}
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-10 bg-rose-400" aria-hidden />
            The Festive Edit · 2026
          </p>
          <h1 className="mt-6 font-display text-[3.3rem] leading-[0.95] font-medium tracking-tight text-ink sm:text-7xl xl:text-[6.4rem]">
            Elevate
            <span className="relative mx-3 inline-block h-[0.72em] w-[1.75em] translate-y-[0.06em] overflow-hidden rounded-full align-baseline ring-1 ring-rose-200">
              <Image src={pexels(10317113)} alt="" fill sizes="200px" className="object-cover" preload />
            </span>
            <br />
            every <em className="font-normal text-rose-500 italic">moment.</em>
          </h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-taupe">
            Handwoven sarees, statement shoes, fine accessories and clean beauty — curated for the woman who makes every
            moment count.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href="/shop" size="lg">
              Shop the edit
            </ButtonLink>
            <ArrowLink href="/collections/sarees">Explore sarees</ArrowLink>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-sand-dark pt-7">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {avatars.map((src) => (
                  <span key={src} className="relative size-11 overflow-hidden rounded-full ring-2 ring-cream">
                    <Image src={src} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                ))}
              </div>
              <div>
                <RatingStars rating={4.9} />
                <p className="mt-1 text-sm text-taupe">
                  Loved by <strong className="font-semibold text-ink">25,000+</strong> women
                </p>
              </div>
            </div>
            <span className="hidden h-10 w-px bg-sand-dark sm:block" aria-hidden />
            <p className="max-w-[13rem] text-sm leading-snug text-taupe">
              Handwoven by <strong className="font-semibold text-ink">300+ artisans</strong> across Bangladesh
            </p>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-[540px]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand shadow-[0_40px_80px_-40px_rgba(122,90,72,0.45)]">
            <Image
              src={pexels(36194199)}
              alt="Woman in an elegant saree standing by a sunlit window"
              fill
              preload
              sizes="(min-width: 1024px) 540px, 92vw"
              className="object-cover"
            />
          </div>

          <RotatingBadge href="/shop?tag=new" text="New Arrivals ✦ New Arrivals ✦ " className="absolute top-20 -left-4 sm:-left-12" />

          <div className="absolute -bottom-6 -left-2 size-32 overflow-hidden rounded-full ring-8 ring-cream sm:-left-12 sm:size-44">
            <Image src={pexels(37601639)} alt="Close-up of an ornate gold jhumka earring" fill sizes="176px" className="object-cover" />
          </div>

          {featured && (
            <Link
              href={`/product/${featured.slug}`}
              className="absolute right-2 bottom-10 flex w-[230px] animate-float items-center gap-3 bg-white/90 p-3 shadow-[0_20px_40px_-20px_rgba(34,26,28,0.4)] backdrop-blur transition-colors hover:bg-white sm:-right-8"
            >
              <span className="relative size-16 shrink-0 overflow-hidden bg-sand">
                <Image src={featured.images[0]} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="text-[0.6rem] font-medium tracking-[0.2em] text-rose-600 uppercase">Just in</span>
                <span className="block truncate font-display text-lg leading-tight font-semibold">{featured.name}</span>
                <span className="text-sm text-taupe">{formatPrice(featured.price)}</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

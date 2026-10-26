import Image from "next/image";
import { Zap } from "lucide-react";
import { getProductsByTag } from "@/data/products";
import { ButtonLink } from "@/components/ui/button";
import { Countdown } from "@/components/ui/countdown";
import { ProductCard } from "@/components/product/product-card";

export function FlashSale() {
  const deals = getProductsByTag("flash", 8);

  return (
    <section className="relative overflow-hidden bg-wine py-20 text-cream lg:py-24">
      <div className="pointer-events-none absolute -top-32 -left-32 size-[480px] rounded-full bg-rose-700/40 blur-3xl" />
      <Image
        src="/brand/butterfly.png"
        alt=""
        width={319}
        height={299}
        className="pointer-events-none absolute right-6 bottom-6 w-40 opacity-10 select-none"
      />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[0.85fr_2fr] lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-[0.7rem] font-medium tracking-[0.2em] text-rose-200 uppercase ring-1 ring-cream/15">
            <Zap className="size-3.5 fill-rose-200" aria-hidden /> Today only
          </p>
          <h2 className="mt-5 font-display text-5xl leading-none font-medium sm:text-6xl">
            Flash <em className="text-rose-300 italic">Sale</em>
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-cream/75">
            Up to 30% off selected heels, jewellery, watches and beauty favourites. Prices reset at midnight.
          </p>
          <p className="mt-8 mb-3 text-xs tracking-[0.2em] text-cream/60 uppercase">Ends in</p>
          <Countdown />
          <ButtonLink href="/shop?tag=flash" variant="light" className="mt-9">
            Shop all deals
          </ButtonLink>
        </div>

        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:px-0">
          {deals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-[240px] shrink-0 snap-start text-ink sm:w-[260px]"
              sizes="260px"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

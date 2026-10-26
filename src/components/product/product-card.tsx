import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { cn, discountPercent } from "@/lib/utils";
import { Price } from "./price";
import { QuickAdd } from "./quick-add";
import { WishlistButton } from "./wishlist-button";

export function ProductCard({
  product,
  className,
  aspect = "aspect-[3/4]",
  sizes = "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw",
  caption = "boxed",
}: {
  product: Product;
  className?: string;
  aspect?: string;
  sizes?: string;
  caption?: "boxed" | "plain";
}) {
  const [primary, secondary] = product.images;
  const off = discountPercent(product.price, product.compareAt);
  const href = `/product/${product.slug}`;

  return (
    <article className={cn("group flex flex-col", className)}>
      <div className={cn("relative overflow-hidden bg-sand", aspect)}>
        <Link href={href} aria-label={product.name} className="absolute inset-0">
          <Image
            src={primary}
            alt={product.name}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
          />
          {secondary && (
            <Image
              src={secondary}
              alt=""
              fill
              sizes={sizes}
              className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {product.badge && (
            <span className="bg-ink px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.18em] text-cream uppercase">
              {product.badge}
            </span>
          )}
          {off > 0 && (
            <span className="bg-rose-600 px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.18em] text-white uppercase">
              −{off}%
            </span>
          )}
        </div>

        <WishlistButton productId={product.id} productName={product.name} className="absolute top-3 right-3" />

        <QuickAdd
          product={product}
          className="absolute inset-x-3 bottom-3 translate-y-[calc(100%+1rem)] transition-transform duration-500 ease-[var(--ease-luxe)] group-focus-within:translate-y-0 group-hover:translate-y-0 max-md:hidden"
        />
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3",
          caption === "boxed" ? "bg-white px-3.5 py-3 sm:px-4 sm:py-3.5" : "pt-3.5",
        )}
      >
        <div className="min-w-0">
          <h3 className="font-display text-base leading-tight font-semibold sm:text-lg">
            <Link href={href} className="transition-colors hover:text-rose-600">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 truncate text-xs text-taupe">{product.subtitle}</p>
        </div>
        <Price price={product.price} compareAt={product.compareAt} className="shrink-0 sm:flex-col sm:items-end sm:gap-0.5" />
      </div>
    </article>
  );
}

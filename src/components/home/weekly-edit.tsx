import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { getProductBySlug } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const layout = [
  { slug: "saffron-katan-silk-saree", area: "md:row-span-2", aspect: "aspect-[4/5] md:aspect-auto", sizes: "(min-width: 768px) 40vw, 92vw" },
  { slug: "rose-square-watch", area: "md:row-span-2", aspect: "aspect-[3/4] md:aspect-auto", sizes: "(min-width: 768px) 28vw, 46vw" },
  { slug: "pearl-strap-heels", area: "", aspect: "aspect-[3/4] md:aspect-auto", sizes: "(min-width: 768px) 28vw, 46vw" },
  { slug: "blush-ruched-handbag", area: "", aspect: "aspect-[4/5] md:aspect-auto", sizes: "(min-width: 768px) 28vw, 92vw" },
];

function EditTile({ product, className, aspect, sizes }: { product: Product; className?: string; aspect: string; sizes: string }) {
  return (
    <Link href={`/product/${product.slug}`} className={cn("group flex flex-col overflow-hidden bg-white", className)}>
      <div className={cn("relative flex-1 overflow-hidden bg-sand", aspect)}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-105"
        />
        {product.tags.includes("new") && (
          <span className="absolute top-4 left-4 bg-ink px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.18em] text-cream uppercase">
            New
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <p className="font-display text-lg leading-tight font-semibold transition-colors group-hover:text-rose-600">{product.name}</p>
          <p className="mt-1 truncate text-xs text-taupe">{product.subtitle}</p>
        </div>
        <span className="shrink-0 text-sm font-medium tabular-nums">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}

export function WeeklyEdit() {
  const tiles = layout.flatMap((item) => {
    const product = getProductBySlug(item.slug);
    return product ? [{ ...item, product }] : [];
  });

  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="New arrivals"
          title={
            <>
              This week&rsquo;s <em className="text-rose-500 italic">edit</em>
            </>
          }
          action={{ label: "View all", href: "/shop?tag=new" }}
        />
        <Reveal>
          <div className="grid grid-cols-2 gap-4 md:h-[760px] md:grid-cols-[1.35fr_1fr_1fr] md:grid-rows-2 lg:gap-5">
            {tiles.map((tile, index) => (
              <EditTile
                key={tile.slug}
                product={tile.product}
                aspect={tile.aspect}
                sizes={tile.sizes}
                className={cn(tile.area, (index === 0 || index === 3) && "max-md:col-span-2")}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

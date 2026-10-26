import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { getProductBySlug } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const layout = [
  { slug: "rani-red-bridal-lehenga", area: "md:row-span-2", aspect: "aspect-[4/5] md:aspect-auto", sizes: "(min-width: 768px) 40vw, 92vw" },
  { slug: "shahzada-ivory-sherwani", area: "md:row-span-2", aspect: "aspect-[3/4] md:aspect-auto", sizes: "(min-width: 768px) 28vw, 46vw" },
  { slug: "royal-gold-bridal-set", area: "", aspect: "aspect-[3/4] md:aspect-auto", sizes: "(min-width: 768px) 28vw, 46vw" },
  { slug: "bridal-crystal-flats", area: "", aspect: "aspect-[4/5] md:aspect-auto", sizes: "(min-width: 768px) 28vw, 92vw" },
];

function EditTile({ product, aspect, sizes }: { product: Product; aspect: string; sizes: string }) {
  return (
    <Link href={`/product/${product.slug}`} className="group flex h-full flex-col overflow-hidden bg-white">
      <div className={cn("relative flex-1 overflow-hidden bg-sand", aspect)}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-ink px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.18em] text-cream uppercase">
            {product.badge}
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
        <Stagger gap={0.12} className="grid grid-cols-2 gap-4 md:h-[760px] md:grid-cols-[1.35fr_1fr_1fr] md:grid-rows-2 lg:gap-5">
          {tiles.map((tile, index) => (
            <StaggerItem key={tile.slug} className={cn(tile.area, (index === 0 || index === 3) && "max-md:col-span-2")}>
              <EditTile product={tile.product} aspect={tile.aspect} sizes={tile.sizes} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

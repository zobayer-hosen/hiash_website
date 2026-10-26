import Image from "next/image";
import Link from "next/link";
import { categoryShortcuts } from "@/data/categories";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function CategoryCircles() {
  return (
    <section aria-labelledby="shop-by-category" className="bg-sand py-12 lg:py-14">
      <h2 id="shop-by-category" className="sr-only">
        Shop by category
      </h2>
      <div className="container-x">
        <Stagger
          as="ul"
          gap={0.07}
          className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 lg:mx-0 lg:grid lg:grid-cols-8 lg:gap-0 lg:overflow-visible lg:px-0"
        >
          {categoryShortcuts.map((item) => (
            <StaggerItem as="li" key={item.label} className="snap-start lg:border-r lg:border-sand-dark lg:last:border-r-0">
              <Link href={item.href} className="group flex w-28 flex-col items-center gap-3 px-2 text-center lg:w-auto">
                <span className="relative size-24 overflow-hidden rounded-full bg-cream ring-1 ring-sand-dark ring-offset-4 ring-offset-sand transition-all duration-500 group-hover:-translate-y-1 group-hover:ring-gold lg:size-[104px]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="110px"
                    className="object-cover object-top transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-110"
                  />
                </span>
                <span>
                  <span className="block text-[0.95rem] font-medium transition-colors group-hover:text-rose-600">{item.label}</span>
                  <span className="text-xs text-taupe">{item.count}</span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { journalPosts } from "@/data/content";
import { Float } from "@/components/motion/effects";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Journal() {
  return (
    <section id="journal" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-x">
        <Float className="mb-4 flex justify-center" amplitude={8} duration={6}>
          <Image src="/brand/butterfly.png" alt="" width={319} height={299} className="w-14" />
        </Float>
        <SectionHeading
          eyebrow="The Hiash Journal"
          title={
            <>
              From the <em className="text-rose-500 italic">journal</em>
            </>
          }
          description="Wedding planning notes, beauty rituals and style guides from our studio in Dhaka."
          align="center"
        />
        <Stagger gap={0.14} className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {journalPosts.map((post) => (
            <StaggerItem as="article" key={post.slug}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 32vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-[0.65rem] font-medium tracking-[0.16em] text-rose-700 uppercase backdrop-blur">
                    {post.category}
                  </span>
                </div>
                <p className="mt-5 text-xs tracking-[0.16em] text-taupe uppercase">{post.date}</p>
                <h3 className="mt-2 font-display text-2xl leading-snug font-semibold text-balance transition-colors group-hover:text-rose-600">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-taupe">{post.excerpt}</p>
                <span className="relative mt-4 inline-block pb-0.5 text-xs font-medium tracking-[0.16em] uppercase group-hover:text-rose-600">
                  Read more
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 group-hover:scale-x-50" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

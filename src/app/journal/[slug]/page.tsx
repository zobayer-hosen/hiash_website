import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { journalPosts } from "@/data/content";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default function JournalPostPage({ params }: PageProps<"/journal/[slug]">) {
  return (
    <Suspense fallback={<div className="container-x h-[70vh] animate-pulse bg-sand" aria-hidden />}>
      <JournalArticle params={params} />
    </Suspense>
  );
}

async function JournalArticle({ params }: { params: PageProps<"/journal/[slug]">["params"] }) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const more = journalPosts.filter((p) => p.slug !== post.slug);

  return (
    <article>
      <header className="container-x max-w-3xl pt-10 pb-10 text-center">
        <div className="flex justify-center">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Journal", href: "/#journal" },
              { label: post.category, href: `/journal/${post.slug}` },
            ]}
          />
        </div>
        <p className="eyebrow mt-8">
          {post.category} · {post.date}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight font-medium text-balance sm:text-6xl">{post.title}</h1>
        <p className="mt-5 text-lg text-taupe">{post.excerpt}</p>
      </header>

      <div className="container-x">
        <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden bg-sand">
          <Image src={post.image} alt="" fill preload sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="container-x max-w-2xl py-14 lg:py-20">
        {post.body.map((block, index) => (
          <div key={index} className="mt-8 first:mt-0">
            {block.heading && <h2 className="font-display text-3xl font-semibold">{block.heading}</h2>}
            <p className={block.heading ? "mt-3 text-lg leading-relaxed text-ink-soft" : "text-xl leading-relaxed text-ink-soft first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-none first-letter:text-rose-500"}>
              {block.text}
            </p>
          </div>
        ))}
        <div className="mt-14 flex flex-wrap gap-3 border-t border-sand-dark pt-10">
          <ButtonLink href="/shop">Shop the story</ButtonLink>
          <ButtonLink href="/" variant="outline">
            Back home
          </ButtonLink>
        </div>
      </div>

      <section className="bg-sand py-16">
        <div className="container-x">
          <p className="eyebrow">Keep reading</p>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {more.map((item) => (
              <Link key={item.slug} href={`/journal/${item.slug}`} className="group flex gap-5">
                <span className="relative aspect-square w-32 shrink-0 overflow-hidden bg-sand-dark">
                  <Image src={item.image} alt="" fill sizes="128px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span>
                  <span className="text-xs tracking-[0.16em] text-rose-600 uppercase">{item.category}</span>
                  <span className="mt-2 block font-display text-2xl leading-snug font-semibold group-hover:text-rose-600">{item.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

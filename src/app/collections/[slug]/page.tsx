import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { ListingSkeleton } from "@/components/shop/listing-skeleton";
import { PageHeader } from "@/components/shop/page-header";
import { ShopView } from "@/components/shop/shop-view";
import { ServicePerks } from "@/components/home/service-perks";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return { title: category.name, description: category.description };
}

export default function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  return (
    <>
      <Suspense fallback={<div className="h-[360px] animate-pulse bg-sand" aria-hidden />}>
        <CollectionHeader params={params} />
      </Suspense>
      <Suspense fallback={<ListingSkeleton />}>
        <CollectionListing params={params} />
      </Suspense>
      <ServicePerks className="mt-10" />
    </>
  );
}

type CollectionParams = PageProps<"/collections/[slug]">["params"];

async function resolveCategory(params: CollectionParams) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  return category;
}

async function CollectionHeader({ params }: { params: CollectionParams }) {
  const category = await resolveCategory(params);
  const count = getProductsByCategory(category.slug).length;

  return (
    <PageHeader
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: category.name, href: `/collections/${category.slug}` },
      ]}
      eyebrow={`${count} pieces · ${category.tagline}`}
      title={category.name}
      description={category.description}
      image={category.banner}
      imageAlt={`${category.name} at Hiash`}
    />
  );
}

async function CollectionListing({ params }: { params: CollectionParams }) {
  const category = await resolveCategory(params);
  return <ShopView category={category.slug} />;
}

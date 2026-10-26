import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCategory } from "@/data/categories";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductSkeleton } from "@/components/product/product-skeleton";
import { RatingSummary } from "@/components/product/rating-summary";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [`${product.images[0]}?auto=compress&cs=tinysrgb&w=1200`] },
  };
}

export default function ProductPage({ params }: PageProps<"/product/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: { params: PageProps<"/product/[slug]">["params"] }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 4);

  return (
    <div className="container-x">
      <div className="py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: category?.name ?? "Shop", href: `/collections/${product.category}` },
            { label: product.type, href: `/collections/${product.category}?type=${encodeURIComponent(product.type)}` },
            { label: product.name, href: `/product/${product.slug}` },
          ]}
        />
      </div>

      <div className="grid gap-10 pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:pb-20">
        <ProductGallery images={product.images} name={product.name} />
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductInfo product={product} />
        </div>
      </div>

      <RatingSummary product={product} />

      {related.length > 0 && (
        <section className="border-t border-sand-dark py-16 lg:py-24">
          <SectionHeading
            eyebrow="Complete the look"
            title={
              <>
                You might also <em className="text-rose-500 italic">love</em>
              </>
            }
            action={{ label: `All ${category?.name ?? "products"}`, href: `/collections/${product.category}` }}
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

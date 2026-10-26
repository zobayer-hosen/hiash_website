import type { Metadata } from "next";
import { getProductsByTag } from "@/data/products";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { CartView } from "@/components/cart/cart-view";
import { ProductCard } from "@/components/product/product-card";

export const metadata: Metadata = { title: "Your bag" };

export default function CartPage() {
  const suggestions = getProductsByTag("edit", 4);

  return (
    <>
      <div className="border-b border-sand-dark">
        <div className="container-x py-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Bag", href: "/cart" },
            ]}
          />
          <h1 className="mt-4 font-display text-5xl font-medium sm:text-6xl">Your Bag</h1>
        </div>
      </div>
      <div className="container-x py-10 lg:py-14">
        <CartView />
      </div>
      <section className="border-t border-sand-dark py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Complete the look"
            title={
              <>
                You might also <em className="text-rose-500 italic">like</em>
              </>
            }
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
            {suggestions.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

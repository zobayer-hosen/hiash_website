import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="bg-sand">
      <div className="border-b border-sand-dark">
        <div className="container-x py-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Bag", href: "/cart" },
              { label: "Checkout", href: "/checkout" },
            ]}
          />
          <h1 className="mt-4 font-display text-5xl font-medium sm:text-6xl">Checkout</h1>
        </div>
      </div>
      <div className="container-x py-10 lg:py-14">
        <CheckoutView />
      </div>
    </div>
  );
}

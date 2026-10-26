import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <>
      <div className="border-b border-sand-dark">
        <div className="container-x py-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Wishlist", href: "/wishlist" },
            ]}
          />
          <h1 className="mt-4 font-display text-5xl font-medium sm:text-6xl">
            Your <em className="text-rose-500 italic">wishlist</em>
          </h1>
        </div>
      </div>
      <div className="container-x py-10 lg:py-14">
        <WishlistView />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { pexels } from "@/lib/utils";
import { ListingSkeleton } from "@/components/shop/listing-skeleton";
import { PageHeader } from "@/components/shop/page-header";
import { ShopView } from "@/components/shop/shop-view";

export const metadata: Metadata = {
  title: "Shop all",
  description: "Shop bridal lehengas, sherwanis, wedding shoes, bags, jewellery and clean beauty at Hiash.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
        ]}
        eyebrow="The Hiash Shop"
        title={
          <>
            Everything, <em className="text-rose-500 italic">beautifully</em> curated
          </>
        }
        description="Wedding couture, shoes, accessories and beauty — chosen in small runs and finished with care."
        image={pexels(16709635)}
        imageAlt="Bride and groom in traditional Bangladeshi wedding attire"
      />
      <Suspense fallback={<ListingSkeleton />}>
        <ShopView />
      </Suspense>
    </>
  );
}

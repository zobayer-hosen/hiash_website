import { getProductsByTag } from "@/data/products";
import { Hero } from "@/components/home/hero";
import { CategoryCircles } from "@/components/home/category-circles";
import { Marquee } from "@/components/home/marquee";
import { WeeklyEdit } from "@/components/home/weekly-edit";
import { WeddingAtelier } from "@/components/home/wedding-atelier";
import { CampaignBanner } from "@/components/home/campaign-banner";
import { FlashSale } from "@/components/home/flash-sale";
import { BeautyShowcase } from "@/components/home/beauty-showcase";
import { ShoeShowcase } from "@/components/home/shoe-showcase";
import { BestSellers } from "@/components/home/best-sellers";
import { AccessoriesEditorial } from "@/components/home/accessories-editorial";
import { ServicePerks } from "@/components/home/service-perks";
import { Testimonials } from "@/components/home/testimonials";
import { Journal } from "@/components/home/journal";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryCircles />
      <Marquee />
      <WeeklyEdit />
      <WeddingAtelier />
      <CampaignBanner />
      <FlashSale />
      <ShoeShowcase />
      <BeautyShowcase />
      <AccessoriesEditorial />
      <BestSellers products={getProductsByTag("bestseller")} />
      <Testimonials />
      <ServicePerks />
      <Journal />
      <Newsletter />
    </>
  );
}

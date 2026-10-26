import type { Category, CategorySlug } from "@/types";
import { pexels } from "@/lib/utils";

export const categories: Category[] = [
  {
    slug: "sarees",
    name: "Sarees",
    tagline: "Woven by hand, worn with heart",
    description:
      "Jamdani, Banarasi, Katan, Tant and silk — handwoven drapes from master weavers, chosen for weddings, festivals and every day in between.",
    image: pexels(20161456),
    banner: pexels(36194199),
    types: ["Jamdani", "Banarasi", "Katan", "Silk", "Muslin", "Tant"],
  },
  {
    slug: "shoes",
    name: "Shoes",
    tagline: "Step into every moment",
    description:
      "Heels for the reception, sandals for the mehndi and sneakers for everything after — crafted in soft leathers and made for comfort.",
    image: pexels(36589769),
    banner: pexels(4376757),
    types: ["Heels", "Sandals", "Flats", "Sneakers"],
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "The finishing touch",
    description:
      "Structured bags, statement jewellery, watches and sunglasses — the details that turn an outfit into a look.",
    image: pexels(27174573),
    banner: pexels(9429420),
    types: ["Bags", "Jewellery", "Watches", "Sunglasses", "Scarves"],
  },
  {
    slug: "beauty",
    name: "Beauty",
    tagline: "Clean beauty, real glow",
    description:
      "Thoughtfully formulated skincare, makeup and fragrance — kind to your skin and made for Bangladesh's climate.",
    image: pexels(8101534),
    banner: pexels(8131568),
    types: ["Skincare", "Makeup", "Fragrance"],
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return categories.some((c) => c.slug === slug);
}

/** Circle shortcuts on the home page — finer-grained than the four main categories. */
export const categoryShortcuts = [
  { label: "Sarees", count: "120+ styles", href: "/collections/sarees", image: pexels(20161456) },
  { label: "Heels", count: "60+ styles", href: "/collections/shoes?type=Heels", image: pexels(27204295) },
  { label: "Sandals", count: "45+ styles", href: "/collections/shoes?type=Sandals", image: pexels(36589769) },
  { label: "Bags", count: "80+ styles", href: "/collections/accessories?type=Bags", image: pexels(27174573) },
  { label: "Jewellery", count: "150+ pieces", href: "/collections/accessories?type=Jewellery", image: pexels(19564918) },
  { label: "Watches", count: "30+ styles", href: "/collections/accessories?type=Watches", image: pexels(35991456) },
  { label: "Skincare", count: "40+ formulas", href: "/collections/beauty?type=Skincare", image: pexels(8101534) },
  { label: "Fragrance", count: "18 scents", href: "/collections/beauty?type=Fragrance", image: pexels(32645088) },
];

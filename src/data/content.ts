import type { NavLink } from "@/types";
import { pexels } from "@/lib/utils";

export const announcements = [
  "Free delivery across Bangladesh on orders over ৳5,000",
  "Cash on delivery · bKash · Nagad · Cards accepted",
  "New: The Wedding Edit 2026 — bridal & groom couture has arrived",
];

export type MegaMenu = {
  label: string;
  href: string;
  groups: { title: string; links: NavLink[] }[];
  feature: { title: string; caption: string; href: string; image: string };
};

export const mainNav: MegaMenu[] = [
  {
    label: "Wedding",
    href: "/collections/wedding",
    groups: [
      {
        title: "For the bride",
        links: [
          { label: "Bridal lehenga", href: "/collections/wedding?type=Bridal+Lehenga" },
          { label: "Reception & bou bhaat", href: "/collections/wedding?type=Reception" },
          { label: "Holud & mehndi", href: "/collections/wedding?type=Holud+%26+Mehndi" },
          { label: "Bridal jewellery", href: "/collections/accessories?type=Jewellery" },
          { label: "Bridal shoes", href: "/collections/shoes?type=Flats" },
        ],
      },
      {
        title: "For the groom",
        links: [
          { label: "Sherwani", href: "/collections/wedding?type=Sherwani" },
          { label: "Panjabi", href: "/collections/wedding?type=Panjabi" },
          { label: "Jodhpuri", href: "/collections/wedding?type=Jodhpuri" },
          { label: "Pagri & khussa set", href: "/collections/wedding?type=Groom+Accessories" },
          { label: "Groom's khussa", href: "/collections/shoes?type=Khussa" },
        ],
      },
    ],
    feature: {
      title: "The Wedding Edit",
      caption: "Bride & groom couture, 2026",
      href: "/collections/wedding",
      image: pexels(28293024),
    },
  },
  {
    label: "Shoes",
    href: "/collections/shoes",
    groups: [
      {
        title: "Category",
        links: [
          { label: "Heels", href: "/collections/shoes?type=Heels" },
          { label: "Sandals", href: "/collections/shoes?type=Sandals" },
          { label: "Flats & Loafers", href: "/collections/shoes?type=Flats" },
          { label: "Wedding khussa", href: "/collections/shoes?type=Khussa" },
          { label: "Sneakers", href: "/collections/shoes?type=Sneakers" },
        ],
      },
      {
        title: "Edit",
        links: [
          { label: "Wedding season", href: "/collections/shoes?type=Heels" },
          { label: "Bestsellers", href: "/shop?tag=bestseller" },
          { label: "On sale", href: "/shop?tag=flash" },
        ],
      },
    ],
    feature: {
      title: "Block Heel Shop",
      caption: "Comfort meets elegance",
      href: "/product/mocha-block-heel-sandals",
      image: pexels(36589768),
    },
  },
  {
    label: "Accessories",
    href: "/collections/accessories",
    groups: [
      {
        title: "Category",
        links: [
          { label: "Bags", href: "/collections/accessories?type=Bags" },
          { label: "Jewellery", href: "/collections/accessories?type=Jewellery" },
          { label: "Watches", href: "/collections/accessories?type=Watches" },
          { label: "Sunglasses", href: "/collections/accessories?type=Sunglasses" },
          { label: "Scarves", href: "/collections/accessories?type=Scarves" },
        ],
      },
      {
        title: "Gifting",
        links: [
          { label: "Gift sets", href: "/collections/accessories?q=set" },
          { label: "Under ৳3,000", href: "/collections/accessories?max=3000" },
          { label: "Bestsellers", href: "/shop?tag=bestseller" },
        ],
      },
    ],
    feature: {
      title: "Temple Jewellery",
      caption: "Heirloom-inspired gold",
      href: "/product/temple-gold-jhumka",
      image: pexels(37601639),
    },
  },
  {
    label: "Beauty",
    href: "/collections/beauty",
    groups: [
      {
        title: "Category",
        links: [
          { label: "Skincare", href: "/collections/beauty?type=Skincare" },
          { label: "Makeup", href: "/collections/beauty?type=Makeup" },
          { label: "Fragrance", href: "/collections/beauty?type=Fragrance" },
        ],
      },
      {
        title: "Concern",
        links: [
          { label: "Glow & radiance", href: "/collections/beauty?q=glow" },
          { label: "Hydration", href: "/collections/beauty?q=cream" },
          { label: "Bestsellers", href: "/shop?tag=bestseller" },
        ],
      },
    ],
    feature: {
      title: "Rose Glow Serum",
      caption: "Our #1 bestseller",
      href: "/product/rose-glow-serum",
      image: pexels(8131568),
    },
  },
];

export const marqueeItems = [
  "Bridal Lehenga",
  "Royal Sherwani",
  "Gaye Holud",
  "Kundan Jewellery",
  "Groom's Khussa",
  "Bridal Beauty",
  "Bou Bhaat",
  "Signature Fragrance",
];

export const perks = [
  {
    icon: "truck",
    title: "Free Delivery",
    text: "Free nationwide delivery on orders over ৳5,000. Dhaka in 24–48 hours.",
  },
  {
    icon: "wallet",
    title: "Pay Your Way",
    text: "Cash on delivery, bKash, Nagad and all major cards — fully secured.",
  },
  {
    icon: "refresh",
    title: "7-Day Easy Returns",
    text: "Changed your mind? Return or exchange unworn pieces within 7 days.",
  },
  {
    icon: "headset",
    title: "Style Concierge",
    text: "Chat with our stylists for draping tips, sizing and gifting help.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "My Rani Red lehenga from Hiash was everything I dreamed of. The zardozi is even richer in person, and the fitting at the Gulshan studio made it feel like it was sewn on me.",
    name: "Nusrat J.",
    location: "Dhanmondi, Dhaka",
    product: "Rani Red Bridal Lehenga",
    image: pexels(12791932),
  },
  {
    quote:
      "We styled both our outfits with Hiash — my lehenga and his Maharaja sherwani coordinated perfectly. Every guest asked where we found them.",
    name: "Tahmina & Rafiq",
    location: "Chattogram",
    product: "Maharaja Red Sherwani",
    image: pexels(28113694),
  },
  {
    quote:
      "The Rose Glow Serum got my skin wedding-ready. Lightweight, no fragrance, and my makeup artist said my skin looked like silk on the big day.",
    name: "Farhana K.",
    location: "Sylhet",
    product: "Rose Glow Serum",
    image: pexels(5468699),
  },
];

export type JournalPost = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  body: { heading?: string; text: string }[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "planning-your-wedding-wardrobe",
    category: "Wedding Stories",
    date: "Oct 18, 2026",
    title: "From gaye holud to bou bhaat: planning your wedding wardrobe",
    excerpt: "Five events, two families, one cohesive story — our stylists share how to plan every look, for bride and groom.",
    image: pexels(31957458),
    body: [
      {
        text: "A Bangladeshi wedding is not one day but a season — the gaye holud, the mehndi, the akdh, the biye and the bou bhaat. Each deserves its own look, yet the best wardrobes feel like chapters of the same story.",
      },
      {
        heading: "1. Start with the biye",
        text: "Choose the bridal lehenga and the groom's sherwani first, ideally three to four months ahead. Everything else — colours, jewellery, even the décor — can take its cue from this pairing.",
      },
      {
        heading: "2. Let the holud be joyful",
        text: "Marigold, turmeric and leaf green are classics for a reason. Opt for lighter fabrics like chanderi and cotton silk, mirror work instead of heavy zardozi, and a panjabi the groom can actually dance in.",
      },
      {
        heading: "3. Coordinate, don't match",
        text: "Couples look most elegant when their outfits share a palette rather than an identical colour — think ivory sherwani with a blush lehenga, or antique gold with deep ruby.",
      },
      {
        heading: "4. Leave time for fittings",
        text: "Book your first fitting six weeks before the wedding and a final one ten days out. Our Gulshan studio offers complimentary bespoke fittings for every Hiash bride and groom.",
      },
    ],
  },
  {
    slug: "five-step-glow-routine",
    category: "Beauty Notes",
    date: "Oct 09, 2026",
    title: "The five-step glow routine for humid Dhaka days",
    excerpt: "Lightweight layers that keep skin calm, hydrated and radiant through monsoon and beyond.",
    image: pexels(8989973),
    body: [
      {
        text: "Humidity changes everything about how skin behaves. Heavy creams can feel suffocating, while skipping moisture leaves skin dull and oily at the same time. The answer is fewer, lighter layers that each do one job well.",
      },
      {
        heading: "Cleanse gently",
        text: "A milky, pH-balanced cleanser removes sweat and sunscreen without stripping. Our Pink Clay Cleansing Milk is gentle enough for morning and night.",
      },
      {
        heading: "Treat with one serum",
        text: "Choose a single targeted serum. Niacinamide (like the Rose Glow Serum) balances oil and brightens; vitamin C fades dark spots. Using both? Keep vitamin C for mornings.",
      },
      {
        heading: "Moisturise lightly, protect always",
        text: "A whipped gel-cream locks in hydration without shine. Finish every morning with a broad-spectrum sunscreen — the single best glow step there is.",
      },
    ],
  },
  {
    slug: "shoes-for-every-wedding-look",
    category: "Style Guide",
    date: "Sep 27, 2026",
    title: "Finding the right shoes for every wedding look",
    excerpt: "From embroidered khussa to crystal flats — the height, shape and shade that complete each outfit.",
    image: pexels(31450735),
    body: [
      {
        text: "Shoes change how a lehenga falls, how you walk in it and how the whole look photographs. The right pair is less about trend and more about fabric, weight and the length of your night.",
      },
      {
        heading: "Heavy bridal lehengas",
        text: "Structured skirts need stability. A 6 cm block heel or an embellished flat keeps the hem lifted and gives you confidence on stairs and stages. Gold or nude tones disappear under the skirt and lengthen the leg.",
      },
      {
        heading: "Reception and bou bhaat",
        text: "Lighter net and georgette move beautifully with a slimmer heel. A pointed pump or strappy sandal adds polish without overpowering the embroidery.",
      },
      {
        heading: "For the groom",
        text: "A hand-embroidered khussa is the classic partner for any sherwani or panjabi. Match the embroidery to the zardozi, and break them in at home a week before the wedding.",
      },
    ],
  },
];

export const lookbookPortraits = [
  pexels(12791932),
  pexels(28497003),
  pexels(30184702),
  pexels(31957455),
  pexels(35542193),
  pexels(12411105),
  pexels(28293006),
];

export const footerLinks: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Wedding", href: "/collections/wedding" },
      { label: "Shoes", href: "/collections/shoes" },
      { label: "Accessories", href: "/collections/accessories" },
      { label: "Beauty", href: "/collections/beauty" },
      { label: "New arrivals", href: "/shop?tag=new" },
      { label: "Sale", href: "/shop?tag=flash" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & delivery", href: "/help#shipping" },
      { label: "Returns & exchanges", href: "/help#returns" },
      { label: "Size guide", href: "/help#size-guide" },
      { label: "FAQs", href: "/help#faq" },
      { label: "Track your order", href: "/account" },
    ],
  },
  {
    title: "Hiash",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Artisans", href: "/about#artisans" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "My account", href: "/account" },
    ],
  },
];

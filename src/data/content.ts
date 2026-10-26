import type { NavLink } from "@/types";
import { pexels } from "@/lib/utils";

export const announcements = [
  "Free delivery across Bangladesh on orders over ৳5,000",
  "Cash on delivery · bKash · Nagad · Cards accepted",
  "New: The Festive Saree Edit has arrived",
];

export type MegaMenu = {
  label: string;
  href: string;
  groups: { title: string; links: NavLink[] }[];
  feature: { title: string; caption: string; href: string; image: string };
};

export const mainNav: MegaMenu[] = [
  {
    label: "Sarees",
    href: "/collections/sarees",
    groups: [
      {
        title: "By weave",
        links: [
          { label: "Dhakai Jamdani", href: "/collections/sarees?type=Jamdani" },
          { label: "Banarasi", href: "/collections/sarees?type=Banarasi" },
          { label: "Katan", href: "/collections/sarees?type=Katan" },
          { label: "Pure Silk", href: "/collections/sarees?type=Silk" },
          { label: "Muslin", href: "/collections/sarees?type=Muslin" },
          { label: "Tant Cotton", href: "/collections/sarees?type=Tant" },
        ],
      },
      {
        title: "Occasion",
        links: [
          { label: "Bridal", href: "/collections/sarees?q=bridal" },
          { label: "Festive", href: "/collections/sarees" },
          { label: "Everyday", href: "/collections/sarees?type=Tant" },
          { label: "New arrivals", href: "/shop?tag=new" },
        ],
      },
    ],
    feature: {
      title: "The Festive Edit",
      caption: "Katan, Banarasi & tissue silks",
      href: "/collections/sarees",
      image: pexels(28943474),
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
  "Dhakai Jamdani",
  "Banarasi Silk",
  "Katan",
  "Handcrafted Heels",
  "Temple Jewellery",
  "Clean Beauty",
  "Leather Bags",
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
      "My Banarasi from Hiash was the most complimented thing at my sister's wedding. The weave is even richer in person, and it arrived beautifully packed within two days.",
    name: "Nusrat J.",
    location: "Dhanmondi, Dhaka",
    product: "Rangoli Banarasi Silk Saree",
    image: pexels(20507062),
  },
  {
    quote:
      "I wore the Mocha block heels for an entire reception night and my feet didn't hurt once. Elegant and genuinely comfortable — I've already ordered a second colour.",
    name: "Tahmina R.",
    location: "Chattogram",
    product: "Mocha Block Heel Sandals",
    image: pexels(36322504),
  },
  {
    quote:
      "The Rose Glow Serum has become a non-negotiable in my routine. Lightweight, no fragrance and my skin looks brighter after just three weeks.",
    name: "Farhana K.",
    location: "Sylhet",
    product: "Rose Glow Serum",
    image: pexels(28284556),
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
    slug: "how-to-drape-a-jamdani",
    category: "Saree Stories",
    date: "Oct 18, 2026",
    title: "How to drape a Jamdani like a pro in six simple steps",
    excerpt: "Pleats that stay put, a pallu that falls just right — our stylists share their go-to technique.",
    image: pexels(7920055),
    body: [
      {
        text: "Jamdani is featherlight and slightly crisp, which makes it forgiving to pleat but quick to slip. A few small habits make all the difference between a drape that holds all evening and one that needs constant fixing.",
      },
      {
        heading: "1. Start with the right base",
        text: "Wear a fitted petticoat that matches the body colour and tie it firmly at the waist. Choose your heels before you drape — the hem should just graze the floor in the shoes you'll wear.",
      },
      {
        heading: "2. Tuck, wrap and measure the pallu",
        text: "Tuck the plain end in at the right of your navel and wrap once around. Bring the pallu over your left shoulder so it falls to the back of your knee, then pin it at the shoulder.",
      },
      {
        heading: "3. Pleat with your fingers, not your palm",
        text: "Make five to seven pleats of about five inches each, using your thumb and index finger. Line up the border edges, secure them with a small safety pin, then tuck them in slightly to the left of your navel.",
      },
      {
        heading: "4. Finish and steam",
        text: "Smooth the drape over your hip, adjust the pallu pleats and give the whole saree a quick shot of steam from a distance. Jamdani loves a gentle steam — never press directly over the motifs.",
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
    slug: "heels-for-every-saree",
    category: "Style Guide",
    date: "Sep 27, 2026",
    title: "Finding the right heel for every saree in your wardrobe",
    excerpt: "From silk to cotton tant — the heel height, shape and shade that complete each drape.",
    image: pexels(31450735),
    body: [
      {
        text: "Heels change how a saree falls, how you walk in it and how the whole look photographs. The right pair is less about trend and more about fabric, weight and the length of your night.",
      },
      {
        heading: "Heavy silks and Banarasi",
        text: "Structured fabrics need stability. A 6–8 cm block heel keeps the hem lifted and gives you confidence on stairs and stages. Metallic gold or nude tones disappear under the drape and lengthen the leg.",
      },
      {
        heading: "Jamdani, muslin and chiffon",
        text: "Light fabrics move beautifully with a slimmer heel. A pointed pump or strappy sandal adds polish without overpowering the delicate weave.",
      },
      {
        heading: "Cotton and everyday tant",
        text: "Comfort wins. Flat sandals, loafers or even clean white sneakers make cotton sarees feel modern and wearable all day.",
      },
    ],
  },
];

export const lookbookPortraits = [
  pexels(28943601),
  pexels(8070398),
  pexels(9429420),
  pexels(36951580),
  pexels(27408060),
  pexels(28284556),
  pexels(4456729),
];

export const footerLinks: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Sarees", href: "/collections/sarees" },
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

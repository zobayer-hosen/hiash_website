# Hiash — Elevate Every Moment

E-commerce storefront for **Hiash**: handwoven sarees, shoes, fashion accessories and beauty.

Built with **Next.js 16** (App Router, Cache Components), **React 19**, **Tailwind CSS v4** and **TypeScript**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home — hero, category circles, weekly edit, saree atelier, campaign banner, flash sale, shoes, beauty, accessories, best sellers, testimonials, perks, journal, newsletter |
| `/shop` | All products with filters (category, type, price, sale, rating), sort, search (`?q=`), tags (`?tag=new\|bestseller\|flash`) |
| `/collections/[slug]` | `sarees`, `shoes`, `accessories`, `beauty` (supports `?type=` and `?max=`) |
| `/product/[slug]` | Product detail — gallery, colour / size, add to bag, details, reviews summary, related |
| `/cart` | Bag with quantity, promo code (`HIASH10`) and free-delivery meter |
| `/checkout` | Contact, Bangladesh address, delivery method, payment (COD / bKash / Nagad / card), confirmation |
| `/wishlist`, `/account`, `/about`, `/help`, `/journal/[slug]` | Supporting pages |

## Project structure

```
src/
├── app/                  # Routes (App Router)
│   ├── layout.tsx        # Fonts, metadata, header / footer / cart drawer
│   ├── globals.css       # Design tokens (@theme) + base styles
│   ├── page.tsx          # Home page — composes the home sections
│   ├── shop/ collections/[slug]/ product/[slug]/
│   ├── cart/ checkout/ wishlist/ account/
│   └── about/ help/ journal/[slug]/ not-found.tsx
├── components/
│   ├── layout/           # Announcement bar, header, mega menu, mobile menu, search, footer
│   ├── home/             # One file per home-page section
│   ├── product/          # Product card, gallery, info, price, wishlist / add-to-bag buttons
│   ├── shop/             # Listing with filters, page header, skeleton
│   ├── cart/ checkout/ wishlist/ account/
│   └── ui/               # Buttons, headings, reveal, badges, countdown, breadcrumbs…
├── config/site.ts        # Brand, currency, shipping fees, promo code, contact details
├── data/                 # products.ts, categories.ts, content.ts (nav, testimonials, journal…)
├── lib/                  # utils (formatPrice, pexels), cart totals, image loader
├── store/shop-store.ts   # Bag + wishlist + promo, persisted to localStorage
└── types/                # Shared TypeScript types
public/brand/             # Logo (transparent), light logo, wordmark, butterfly
```

## Customising

- **Products** — edit `src/data/products.ts`. Each product has images, colours, optional sizes, price / `compareAt`, tags (`new`, `bestseller`, `flash`, `edit`) and details.
- **Brand settings** — currency (৳ BDT), free-delivery threshold, delivery fees, promo code and contact details live in `src/config/site.ts`.
- **Colours & fonts** — tokens are in `src/app/globals.css` (`rose-*` is sampled from the logo). Fonts: Cormorant Garamond (display) and Jost (body).
- **Images** — `pexels(id)` builds a Pexels URL; the custom loader in `src/lib/image-loader.ts` asks the Pexels CDN for the right width. To use your own photos, drop them in `public/` and pass the path instead.

## Before launch

- Product photography currently comes from [Pexels](https://www.pexels.com) (free to use under the Pexels License). Replace it with your own product shots.
- Prices, ratings, testimonials and journal articles are sample content — update them with real data.
- Bag and wishlist are stored in the browser. Checkout and sign-in are front-end only: connect a backend, payment gateway (e.g. SSLCommerz / bKash) and auth provider before taking real orders.

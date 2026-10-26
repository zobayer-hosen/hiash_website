export const siteConfig = {
  name: "Hiash",
  tagline: "Elevate Every Moment",
  description:
    "Hiash is a Dhaka boutique for bridal and groom wedding couture, statement shoes, fine accessories and clean beauty — made to elevate every moment.",
  currency: {
    code: "BDT",
    symbol: "৳",
    locale: "en-IN",
  },
  freeShippingThreshold: 5000,
  shipping: {
    insideDhaka: 80,
    outsideDhaka: 150,
    express: 250,
  },
  promo: {
    code: "HIASH10",
    percent: 10,
  },
  contact: {
    email: "hello@hiash.com",
    phone: "+880 1700-000000",
    address: "House 12, Road 27, Gulshan 1, Dhaka 1212",
    hours: "Sat – Thu, 10am – 9pm",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    pinterest: "https://pinterest.com",
    youtube: "https://youtube.com",
  },
} as const;

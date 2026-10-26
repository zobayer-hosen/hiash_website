import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Noto_Sans_Bengali } from "next/font/google";
import { siteConfig } from "@/config/site";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

// Fallback for the Taka sign (৳), which the Latin faces don't include.
// unicode-range means it only downloads on pages that show a price.
const taka = Noto_Sans_Bengali({
  variable: "--font-taka",
  subsets: ["bengali"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Sarees, Shoes, Accessories & Beauty`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cormorant.variable} ${jost.variable} ${taka.variable} antialiased`}>
      <head>
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] bg-ink px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AccordionItem } from "@/components/product/accordion";

export const metadata: Metadata = { title: "Help & FAQs" };

const shoeSizes = [
  ["36", "3", "5", "22.5"],
  ["37", "4", "6", "23.5"],
  ["38", "5", "7", "24.0"],
  ["39", "6", "8", "25.0"],
  ["40", "7", "9", "25.5"],
  ["41", "8", "10", "26.5"],
];

const bangleSizes = [
  ["2.4", "5.7", "Petite wrists"],
  ["2.6", "6.0", "Most common"],
  ["2.8", "6.4", "Larger wrists"],
];

const faqs = [
  {
    q: "Do sarees come with a blouse piece?",
    a: "Yes — every saree includes an unstitched 0.8 m blouse piece. In Dhaka we also offer free fall and pico finishing on request; just add a note when you order.",
  },
  {
    q: "Can I pay with bKash or Nagad?",
    a: "Absolutely. Choose bKash or Nagad at checkout and you'll receive a payment request on your phone. Cash on delivery and all major cards are also accepted.",
  },
  {
    q: "Are your jewellery pieces real gold?",
    a: "Our jewellery is 18k gold vermeil on sterling silver or 22k gold plating on brass, as noted on each product. They're designed to look and feel fine while staying wearable every day.",
  },
  {
    q: "Is your beauty range suitable for sensitive skin?",
    a: "Our skincare is fragrance-free unless noted, dermatologist reviewed and cruelty free. We still recommend a patch test before first use.",
  },
  {
    q: "Do you ship outside Bangladesh?",
    a: "Not yet — but international shipping is coming soon. Join the Hiash Circle newsletter to be the first to know.",
  },
];

export default function HelpPage() {
  return (
    <>
      <div className="border-b border-sand-dark bg-sand">
        <div className="container-x py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Help", href: "/help" },
            ]}
          />
          <h1 className="mt-4 font-display text-5xl font-medium sm:text-6xl">
            How can we <em className="text-rose-500 italic">help?</em>
          </h1>
          <p className="mt-3 max-w-xl text-taupe">
            Can&rsquo;t find what you need? Call {siteConfig.contact.phone} or email {siteConfig.contact.email} — {siteConfig.contact.hours}.
          </p>
          <nav aria-label="Help topics" className="mt-8 flex flex-wrap gap-2">
            {[
              ["Shipping", "#shipping"],
              ["Returns", "#returns"],
              ["Size guide", "#size-guide"],
              ["FAQs", "#faq"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="rounded-full border border-sand-dark bg-cream px-5 py-2 text-sm hover:border-rose-400">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="container-x max-w-4xl space-y-16 py-16">
        <section id="shipping" className="scroll-mt-28">
          <h2 className="font-display text-4xl font-medium">Shipping & delivery</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] border border-sand-dark text-left text-sm">
              <thead className="bg-sand">
                <tr>
                  <th className="px-4 py-3 font-medium">Method</th>
                  <th className="px-4 py-3 font-medium">Delivery time</th>
                  <th className="px-4 py-3 font-medium">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-dark bg-white">
                <tr>
                  <td className="px-4 py-3">Inside Dhaka</td>
                  <td className="px-4 py-3">24–48 hours</td>
                  <td className="px-4 py-3">{formatPrice(siteConfig.shipping.insideDhaka)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Outside Dhaka</td>
                  <td className="px-4 py-3">3–5 business days</td>
                  <td className="px-4 py-3">{formatPrice(siteConfig.shipping.outsideDhaka)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Express (Dhaka)</td>
                  <td className="px-4 py-3">Same day before 2pm</td>
                  <td className="px-4 py-3">{formatPrice(siteConfig.shipping.express)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-taupe">
            Standard delivery is free on all orders over {formatPrice(siteConfig.freeShippingThreshold)}.
          </p>
        </section>

        <section id="returns" className="scroll-mt-28">
          <h2 className="font-display text-4xl font-medium">Returns & exchanges</h2>
          <p className="mt-5 leading-relaxed text-taupe">
            Unworn items in their original packaging can be returned or exchanged within 7 days of delivery. Beauty products must be
            unopened. Request a return by calling us or replying to your order email — we&rsquo;ll arrange a pickup in Dhaka, or share a
            courier address for orders outside Dhaka. Refunds are issued to your original payment method (or bKash for cash on
            delivery) within 5 business days of the item reaching us.
          </p>
        </section>

        <section id="size-guide" className="scroll-mt-28">
          <h2 className="font-display text-4xl font-medium">Size guide</h2>
          <h3 className="mt-6 font-display text-2xl font-semibold">Shoes</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] border border-sand-dark text-left text-sm">
              <thead className="bg-sand">
                <tr>
                  <th className="px-4 py-3 font-medium">EU</th>
                  <th className="px-4 py-3 font-medium">UK</th>
                  <th className="px-4 py-3 font-medium">US</th>
                  <th className="px-4 py-3 font-medium">Foot length (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-dark bg-white">
                {shoeSizes.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell} className="px-4 py-3 tabular-nums">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="mt-10 font-display text-2xl font-semibold">Bangles</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[420px] border border-sand-dark text-left text-sm">
              <thead className="bg-sand">
                <tr>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium">Inner diameter (cm)</th>
                  <th className="px-4 py-3 font-medium">Fits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-dark bg-white">
                {bangleSizes.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell} className="px-4 py-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <h2 className="font-display text-4xl font-medium">Frequently asked</h2>
          <div className="mt-6 border-t border-sand-dark">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} title={faq.q} defaultOpen={index === 0}>
                {faq.a}
              </AccordionItem>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

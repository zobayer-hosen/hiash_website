import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { footerLinks } from "@/data/content";
import { FacebookIcon, InstagramIcon, PinterestIcon, YoutubeIcon } from "@/components/ui/social-icons";

const socials = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "Pinterest", href: siteConfig.social.pinterest, Icon: PinterestIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YoutubeIcon },
];

const payments = ["bKash", "Nagad", "Visa", "Mastercard", "Amex", "Cash on Delivery"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <Image
        src="/brand/butterfly.png"
        alt=""
        width={319}
        height={299}
        className="pointer-events-none absolute -top-10 -right-16 w-[340px] opacity-[0.06] select-none"
      />

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] lg:gap-10 lg:py-20">
        <div className="max-w-xs">
          <Link href="/" aria-label="Hiash — home" className="inline-block">
            <Image src="/brand/hiash-logo-light.png" alt="Hiash — Elevate Every Moment" width={792} height={466} className="h-auto w-44" />
          </Link>
          <p className="mt-6 text-sm leading-relaxed text-cream/65">{siteConfig.description}</p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-cream/15 transition-colors hover:border-rose-300 hover:bg-rose-300 hover:text-ink"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerLinks.map((column) => (
          <div key={column.title}>
            <p className="mb-5 text-xs font-medium tracking-[0.24em] text-rose-200 uppercase">{column.title}</p>
            <ul className="space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-cream/70 transition-colors hover:text-cream">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-5 text-xs font-medium tracking-[0.24em] text-rose-200 uppercase">Visit & contact</p>
          <ul className="space-y-3.5 text-sm text-cream/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-rose-300" aria-hidden />
              {siteConfig.contact.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-rose-300" aria-hidden />
              <a href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-cream">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-rose-300" aria-hidden />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-cream">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-rose-300" aria-hidden />
              {siteConfig.contact.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream/50 md:flex-row">
          <p>© 2026 Hiash. Elevate every moment.</p>
          <ul className="flex flex-wrap justify-center gap-2" aria-label="Accepted payment methods">
            {payments.map((method) => (
              <li key={method} className="rounded border border-cream/15 px-2.5 py-1 text-[0.65rem] tracking-wide text-cream/70">
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

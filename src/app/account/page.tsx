import type { Metadata } from "next";
import Image from "next/image";
import { Gift, Heart, Package } from "lucide-react";
import { pexels } from "@/lib/utils";
import { AuthCard } from "@/components/account/auth-card";

export const metadata: Metadata = { title: "My account" };

const benefits = [
  { Icon: Package, text: "Track orders and manage returns" },
  { Icon: Heart, text: "Sync your wishlist across devices" },
  { Icon: Gift, text: "Members-only offers and early access" },
];

export default function AccountPage() {
  return (
    <section className="relative overflow-hidden bg-sand">
      <div className="container-x grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="eyebrow">Hiash Circle</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] font-medium sm:text-6xl">
            Welcome <em className="text-rose-500 italic">back.</em>
          </h1>
          <p className="mt-5 max-w-md text-taupe">Sign in to see your orders, saved pieces and members-only offers.</p>
          <ul className="mt-8 space-y-4">
            {benefits.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full bg-cream text-rose-600 ring-1 ring-rose-200">
                  <Icon className="size-5" aria-hidden />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <div className="relative mt-10 hidden aspect-[16/9] max-w-md overflow-hidden rounded-t-[999px] lg:block">
            <Image src={pexels(4735885)} alt="Gold necklaces styled with fresh flowers" fill sizes="450px" className="object-cover" />
          </div>
        </div>
        <AuthCard />
      </div>
    </section>
  );
}

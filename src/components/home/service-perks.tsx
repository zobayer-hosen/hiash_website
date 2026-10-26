"use client";

import { Fragment } from "react";
import { m } from "framer-motion";
import { Headset, RefreshCw, Truck, Wallet } from "lucide-react";
import { perks } from "@/data/content";
import { cn } from "@/lib/utils";
import { MaskLines } from "@/components/motion/mask-lines";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const icons = { truck: Truck, wallet: Wallet, refresh: RefreshCw, headset: Headset } as const;

export function ServicePerks({ className }: { className?: string }) {
  return (
    <section className={cn("bg-rose-50 py-16 lg:py-20", className)} aria-labelledby="perks-heading">
      <div className="container-x">
        <h2 id="perks-heading" className="mb-10 text-center font-display text-4xl font-medium sm:text-5xl">
          <MaskLines
            lines={[
              <Fragment key="line-1">
                Shopping, <em className="text-rose-500 italic">made lovely</em>
              </Fragment>,
            ]}
          />
        </h2>
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {perks.map((perk) => {
            const Icon = icons[perk.icon];
            return (
              <StaggerItem as="li" key={perk.title}>
                <m.div
                  className="group h-full rounded-3xl bg-white p-7 text-center shadow-[0_20px_40px_-32px_rgba(34,26,28,0.35)]"
                  whileHover={{ y: -6, boxShadow: "0 30px 50px -30px rgba(34,26,28,0.45)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <m.span
                    className="mx-auto grid size-14 place-items-center rounded-full bg-rose-100 text-rose-600 transition-colors duration-300 group-hover:bg-rose-600 group-hover:text-white"
                    whileHover={{ rotate: [0, -12, 10, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="size-6" aria-hidden />
                  </m.span>
                  <p className="mt-5 font-display text-2xl font-semibold">{perk.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-taupe">{perk.text}</p>
                </m.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

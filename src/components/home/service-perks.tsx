import { Headset, RefreshCw, Truck, Wallet } from "lucide-react";
import { perks } from "@/data/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

const icons = { truck: Truck, wallet: Wallet, refresh: RefreshCw, headset: Headset } as const;

export function ServicePerks({ className }: { className?: string }) {
  return (
    <section className={cn("bg-rose-50 py-16 lg:py-20", className)} aria-labelledby="perks-heading">
      <div className="container-x">
        <h2 id="perks-heading" className="mb-10 text-center font-display text-4xl font-medium sm:text-5xl">
          Shopping, <em className="text-rose-500 italic">made lovely</em>
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {perks.map((perk, index) => {
            const Icon = icons[perk.icon];
            return (
              <Reveal as="li" key={perk.title} delay={index * 80}>
                <div className="h-full rounded-3xl bg-white p-7 text-center shadow-[0_20px_40px_-32px_rgba(34,26,28,0.35)] transition-transform duration-500 hover:-translate-y-1">
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-rose-100 text-rose-600">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <p className="mt-5 font-display text-2xl font-semibold">{perk.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-taupe">{perk.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import { marqueeItems } from "@/data/content";
import { cn } from "@/lib/utils";

export function Marquee({ tone = "rose", className }: { tone?: "rose" | "dark"; className?: string }) {
  const loop = [...marqueeItems, ...marqueeItems];
  return (
    <div
      className={cn(
        "group overflow-hidden border-y py-5",
        tone === "rose" ? "border-rose-200 bg-rose-50 text-ink" : "border-ink bg-ink text-cream",
        className,
      )}
      aria-label={marqueeItems.join(", ")}
    >
      <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]" aria-hidden>
        {loop.map((item, index) => (
          <span key={index} className="flex items-center">
            <span className="px-7 font-display text-2xl tracking-[0.06em] whitespace-nowrap uppercase sm:text-[1.9rem]">{item}</span>
            <span className={cn("text-lg", tone === "rose" ? "text-rose-400" : "text-rose-300")}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

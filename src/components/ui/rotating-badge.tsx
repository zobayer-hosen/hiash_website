import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Circular text badge that slowly rotates around an arrow — links somewhere. */
export function RotatingBadge({
  href,
  text = "Explore Collection ✦ Explore Collection ✦ ",
  className,
  tone = "dark",
}: {
  href: string;
  text?: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  const id = `badge-path-${href.replace(/\W+/g, "-")}`;
  return (
    <Link
      href={href}
      aria-label="Explore the collection"
      className={cn(
        "group grid size-28 place-items-center rounded-full backdrop-blur-sm transition-transform duration-500 hover:scale-105 sm:size-32",
        tone === "dark" ? "bg-cream/80 text-ink" : "bg-ink/20 text-cream",
        className?.includes("absolute") ? undefined : "relative",
        className,
      )}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
        <defs>
          <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current text-[9px] font-medium uppercase">
          <textPath href={`#${id}`} textLength="236" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span
        className={cn(
          "grid size-11 place-items-center rounded-full border transition-colors duration-300",
          tone === "dark"
            ? "border-ink/30 group-hover:border-rose-600 group-hover:bg-rose-600 group-hover:text-white"
            : "border-cream/50 group-hover:bg-cream group-hover:text-ink",
        )}
      >
        <ArrowUpRight className="size-5" aria-hidden />
      </span>
    </Link>
  );
}

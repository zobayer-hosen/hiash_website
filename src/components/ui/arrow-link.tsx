import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Underlined text link with a circled arrow — the "Explore shop →" pattern. */
export function ArrowLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 text-sm font-medium tracking-[0.14em] uppercase",
        tone === "dark" ? "text-ink" : "text-cream",
        className,
      )}
    >
      <span className="relative pb-1">
        {children}
        <span
          className={cn(
            "absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:scale-x-50",
            tone === "dark" ? "bg-ink" : "bg-cream",
          )}
        />
      </span>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-luxe)] group-hover:rotate-45",
          tone === "dark"
            ? "border-ink/40 group-hover:border-rose-600 group-hover:bg-rose-600 group-hover:text-white"
            : "border-cream/50 group-hover:bg-cream group-hover:text-ink",
        )}
      >
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </Link>
  );
}

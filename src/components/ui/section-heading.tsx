import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  action?: { label: string; href: string };
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-5 md:mb-14",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow && <p className={cn("eyebrow mb-3", tone === "light" && "text-rose-200")}>{eyebrow}</p>}
        <h2
          className={cn(
            "font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl",
            tone === "light" ? "text-cream" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={cn("mt-4 text-base leading-relaxed text-pretty", tone === "light" ? "text-cream/75" : "text-taupe")}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className={cn(
            "group inline-flex shrink-0 items-center gap-2 text-sm font-medium tracking-[0.14em] uppercase",
            tone === "light" ? "text-cream hover:text-rose-200" : "text-ink hover:text-rose-600",
          )}
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </div>
  );
}

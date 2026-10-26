import { cn } from "@/lib/utils";

/** Classic gold divider: line — ✦ label ✦ — line. */
export function Ornament({
  children,
  className,
  tone = "gold",
  align = "left",
}: {
  children?: React.ReactNode;
  className?: string;
  tone?: "gold" | "rose";
  align?: "left" | "center";
}) {
  const color = tone === "gold" ? "text-gold-light" : "text-rose-600";
  const line = tone === "gold" ? "from-transparent via-gold/70 to-gold" : "from-transparent via-rose-300 to-rose-400";
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.32em] uppercase",
        color,
        align === "center" && "justify-center",
        className,
      )}
    >
      <span className={cn("h-px w-10 bg-gradient-to-r sm:w-14", line)} aria-hidden />
      <span aria-hidden>✦</span>
      {children && <span>{children}</span>}
      <span aria-hidden>✦</span>
      <span className={cn("h-px w-10 bg-gradient-to-l sm:w-14", line)} aria-hidden />
    </p>
  );
}

/** Repeating jaali (lattice) pattern used as a subtle texture on rich backgrounds. */
export function JaaliPattern({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={cn("pointer-events-none absolute inset-0 size-full", className)} aria-hidden>
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <path
            d="M28 4c6 8 6 16 0 24-6-8-6-16 0-24ZM28 28c6 8 6 16 0 24-6-8-6-16 0-24ZM4 28c8-6 16-6 24 0-8 6-16 6-24 0ZM28 28c8-6 16-6 24 0-8 6-16 6-24 0Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
          />
          <circle cx="28" cy="28" r="1.4" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

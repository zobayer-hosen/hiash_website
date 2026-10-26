import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "rose" | "outline" | "light" | "ghost" | "gold" | "outlineLight";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.18em] transition-all duration-300 ease-[var(--ease-luxe)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-rose-700",
  rose: "bg-rose-600 text-white hover:bg-rose-700",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-cream",
  light: "bg-cream text-ink hover:bg-rose-100",
  ghost: "text-ink hover:text-rose-600",
  gold: "bg-gold text-ink shadow-[0_12px_30px_-12px_rgba(196,160,106,0.7)] hover:bg-gold-light",
  outlineLight: "border border-cream/40 text-cream hover:border-cream hover:bg-cream hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.68rem]",
  md: "h-12 px-7 text-[0.72rem]",
  lg: "h-14 px-9 text-xs",
};

type StyleProps = { variant?: Variant; size?: Size; className?: string };

export function buttonClasses({ variant = "primary", size = "md", className }: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({ variant, size, className, ...props }: ComponentProps<"button"> & StyleProps) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}

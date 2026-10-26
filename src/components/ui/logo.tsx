import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Hiash wordmark. `variant="full"` adds the "Elevate Every Moment" tagline. */
export function Logo({
  variant = "wordmark",
  tone = "dark",
  className,
  preload,
}: {
  variant?: "wordmark" | "full";
  tone?: "dark" | "light";
  className?: string;
  preload?: boolean;
}) {
  const src =
    variant === "full"
      ? tone === "light"
        ? "/brand/hiash-logo-light.png"
        : "/brand/hiash-logo.png"
      : "/brand/hiash-wordmark.png";
  const [width, height] = variant === "full" ? [792, 466] : [792, 430];

  return (
    <Link href="/" aria-label="Hiash — home" className={cn("inline-block shrink-0", className)}>
      <Image
        src={src}
        alt="Hiash — Elevate Every Moment"
        width={width}
        height={height}
        preload={preload}
        sizes="(min-width: 1024px) 180px, 140px"
        className="h-auto w-full"
      />
    </Link>
  );
}

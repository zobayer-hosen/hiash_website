import { cn, formatPrice } from "@/lib/utils";

export function Price({
  price,
  compareAt,
  className,
  size = "sm",
}: {
  price: number;
  compareAt?: number;
  className?: string;
  size?: "sm" | "lg";
}) {
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-medium tabular-nums",
          size === "lg" ? "text-2xl text-mocha" : "text-sm",
          compareAt ? "text-rose-600" : undefined,
        )}
      >
        {formatPrice(price)}
      </span>
      {compareAt ? (
        <span className={cn("text-taupe/80 line-through tabular-nums", size === "lg" ? "text-base" : "text-xs")}>
          {formatPrice(compareAt)}
        </span>
      ) : null}
    </div>
  );
}

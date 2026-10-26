import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  reviews,
  size = "sm",
  className,
}: {
  rating: number;
  reviews?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const iconSize = size === "sm" ? "size-3.5" : "size-4";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            aria-hidden
            className={cn(iconSize, i < Math.round(rating) ? "fill-gold text-gold" : "fill-transparent text-sand-dark")}
          />
        ))}
      </div>
      {reviews !== undefined && (
        <span className="text-xs text-taupe">
          {rating.toFixed(1)} ({reviews})
        </span>
      )}
    </div>
  );
}

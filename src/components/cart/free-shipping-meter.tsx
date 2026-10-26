import { Truck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils";

export function FreeShippingMeter({ subtotal }: { subtotal: number }) {
  const threshold = siteConfig.freeShippingThreshold;
  const progress = Math.min(subtotal / threshold, 1);
  const remaining = Math.max(threshold - subtotal, 0);

  return (
    <div className="bg-rose-50 px-4 py-3.5">
      <p className="flex items-center gap-2 text-sm">
        <Truck className="size-4 text-rose-600" aria-hidden />
        {remaining > 0 ? (
          <span>
            You&rsquo;re <strong className="font-semibold">{formatPrice(remaining)}</strong> away from free delivery
          </span>
        ) : (
          <span className="font-medium">You&rsquo;ve unlocked free delivery ✦</span>
        )}
      </p>
      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-rose-200" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to free delivery">
        <div className="h-full rounded-full bg-rose-500 transition-[width] duration-700" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { shopActions, useShop } from "@/store/shop-store";

export function PromoForm() {
  const { promoApplied } = useShop();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  if (promoApplied) {
    return (
      <div className="flex items-center justify-between bg-white px-4 py-3 text-sm">
        <span className="flex items-center gap-2 text-sage-700">
          <Tag className="size-4" aria-hidden />
          <strong className="font-semibold">{siteConfig.promo.code}</strong> applied — {siteConfig.promo.percent}% off
        </span>
        <button type="button" onClick={shopActions.removePromo} className="grid size-7 place-items-center hover:text-rose-600" aria-label="Remove promo code">
          <X className="size-4" aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setError(!shopActions.applyPromo(code));
      }}
    >
      <div className="flex gap-2">
        <label htmlFor="promo" className="sr-only">
          Promo code
        </label>
        <input
          id="promo"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setError(false);
          }}
          placeholder="Promo code"
          aria-invalid={error}
          aria-describedby="promo-hint"
          className="h-11 min-w-0 flex-1 border border-sand-dark bg-white px-4 text-sm uppercase placeholder:normal-case focus:border-ink focus:outline-none"
        />
        <button type="submit" className="h-11 border border-ink px-5 text-sm transition-colors hover:bg-ink hover:text-cream">
          Apply
        </button>
      </div>
      <p id="promo-hint" className={error ? "mt-2 text-xs text-rose-600" : "mt-2 text-xs text-taupe"}>
        {error ? "That code isn't valid." : `Try ${siteConfig.promo.code} for ${siteConfig.promo.percent}% off your first order.`}
      </p>
    </form>
  );
}

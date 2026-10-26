import { siteConfig } from "@/config/site";

/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const numberFormat = new Intl.NumberFormat(siteConfig.currency.locale, {
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number) {
  return `${siteConfig.currency.symbol}${numberFormat.format(amount)}`;
}

export function discountPercent(price: number, compareAt?: number) {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

/** Full-resolution Pexels photo URL; sizing is added by the image loader. */
export function pexels(id: number | string) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;
}

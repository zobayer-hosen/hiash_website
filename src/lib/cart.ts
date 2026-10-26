import { siteConfig } from "@/config/site";
import { getProductById } from "@/data/products";
import type { CartItem, Product } from "@/types";

export type CartLine = CartItem & { product: Product; lineTotal: number };

export type ShippingMethod = "insideDhaka" | "outsideDhaka" | "express";

export function resolveCartLines(items: CartItem[]): CartLine[] {
  return items.flatMap((item) => {
    const product = getProductById(item.productId);
    return product ? [{ ...item, product, lineTotal: product.price * item.qty }] : [];
  });
}

export function cartTotals(
  lines: CartLine[],
  options: { promoApplied?: boolean; shipping?: ShippingMethod } = {},
) {
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const discount = options.promoApplied ? Math.round((subtotal * siteConfig.promo.percent) / 100) : 0;
  const qualifiesFreeShipping = subtotal >= siteConfig.freeShippingThreshold;
  const method = options.shipping ?? "insideDhaka";
  const shipping =
    subtotal === 0 ? 0 : method === "express" ? siteConfig.shipping.express : qualifiesFreeShipping ? 0 : siteConfig.shipping[method];
  const remainingForFreeShipping = Math.max(siteConfig.freeShippingThreshold - subtotal, 0);

  return {
    subtotal,
    count,
    discount,
    shipping,
    total: subtotal - discount + shipping,
    qualifiesFreeShipping,
    remainingForFreeShipping,
  };
}

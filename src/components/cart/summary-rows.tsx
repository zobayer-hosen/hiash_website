import { cn, formatPrice } from "@/lib/utils";

type Totals = { subtotal: number; discount: number; shipping: number; total: number };

export function SummaryRows({ totals, shippingLabel }: { totals: Totals; shippingLabel?: string }) {
  const rows = [
    { label: "Subtotal", value: formatPrice(totals.subtotal) },
    ...(totals.discount > 0 ? [{ label: "Promo discount", value: `−${formatPrice(totals.discount)}`, accent: true }] : []),
    { label: "Delivery", value: shippingLabel ?? (totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)) },
  ];

  return (
    <dl className="space-y-3 text-sm">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between">
          <dt className="text-taupe">{row.label}</dt>
          <dd className={cn("tabular-nums", "accent" in row && row.accent && "text-sage-700")}>{row.value}</dd>
        </div>
      ))}
      <div className="flex items-center justify-between border-t border-sand-dark pt-4">
        <dt className="font-medium">Total</dt>
        <dd className="font-display text-2xl font-semibold lining-nums tabular-nums">{formatPrice(totals.total)}</dd>
      </div>
    </dl>
  );
}

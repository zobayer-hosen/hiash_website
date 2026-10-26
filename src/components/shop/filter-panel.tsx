"use client";

import { Check } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

export type FacetOption = { value: string; label: string; count: number };

function CheckboxRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="group flex cursor-pointer items-center justify-between gap-3 py-1.5 text-sm">
      <span className="flex items-center gap-3">
        <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
        <span
          className={cn(
            "grid size-[18px] place-items-center border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-rose-400",
            checked ? "border-ink bg-ink text-cream" : "border-ink/30 bg-white group-hover:border-ink",
          )}
          aria-hidden
        >
          {checked && <Check className="size-3" />}
        </span>
        <span className={cn(checked ? "text-ink" : "text-ink-soft")}>{label}</span>
      </span>
      <span className="text-xs text-taupe tabular-nums">{count}</span>
    </label>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b border-sand-dark py-6 first:pt-0">
      <legend className="mb-3 font-display text-lg font-semibold">{title}</legend>
      {children}
    </fieldset>
  );
}

export function FilterPanel({
  categoryOptions,
  selectedCategories,
  onToggleCategory,
  typeOptions,
  selectedTypes,
  onToggleType,
  priceCeiling,
  priceMax,
  onPriceMax,
  onSaleOnly,
  onToggleSale,
  saleCount,
  topRated,
  onToggleTopRated,
  topRatedCount,
  onClear,
}: {
  categoryOptions?: FacetOption[];
  selectedCategories: string[];
  onToggleCategory: (value: string) => void;
  typeOptions: FacetOption[];
  selectedTypes: string[];
  onToggleType: (value: string) => void;
  priceCeiling: number;
  priceMax: number;
  onPriceMax: (value: number) => void;
  onSaleOnly: boolean;
  onToggleSale: () => void;
  saleCount: number;
  topRated: boolean;
  onToggleTopRated: () => void;
  topRatedCount: number;
  onClear: () => void;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between border-b border-sand-dark pb-4">
        <p className="text-xs font-medium tracking-[0.24em] uppercase">Filters</p>
        <button type="button" onClick={onClear} className="text-xs text-taupe underline-offset-4 hover:text-rose-600 hover:underline">
          Clear all
        </button>
      </div>

      {categoryOptions && (
        <Group title="Category">
          {categoryOptions.map((option) => (
            <CheckboxRow
              key={option.value}
              label={option.label}
              count={option.count}
              checked={selectedCategories.includes(option.value)}
              onChange={() => onToggleCategory(option.value)}
            />
          ))}
        </Group>
      )}

      <Group title="Type">
        {typeOptions.map((option) => (
          <CheckboxRow
            key={option.value}
            label={option.label}
            count={option.count}
            checked={selectedTypes.includes(option.value)}
            onChange={() => onToggleType(option.value)}
          />
        ))}
      </Group>

      <Group title="Price">
        <label htmlFor="price-max" className="sr-only">
          Maximum price
        </label>
        <input
          id="price-max"
          type="range"
          min={500}
          max={priceCeiling}
          step={100}
          value={priceMax}
          onChange={(event) => onPriceMax(Number(event.target.value))}
          className="w-full accent-mocha"
        />
        <div className="mt-2 flex justify-between text-xs text-taupe tabular-nums">
          <span>{formatPrice(500)}</span>
          <span className="font-medium text-ink">Up to {formatPrice(priceMax)}</span>
        </div>
      </Group>

      <Group title="Refine">
        <CheckboxRow label="On sale" count={saleCount} checked={onSaleOnly} onChange={onToggleSale} />
        <CheckboxRow label="Rated 4.8 & above" count={topRatedCount} checked={topRated} onChange={onToggleTopRated} />
      </Group>
    </div>
  );
}

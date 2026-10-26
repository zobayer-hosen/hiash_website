"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { CategorySlug, Product, ProductTag } from "@/types";
import { categories } from "@/data/categories";
import { products as allProducts, searchProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { AnimatedProductGrid } from "@/components/product/animated-grid";
import { EASE_LUXE } from "@/components/motion/variants";
import { FilterPanel, type FacetOption } from "./filter-panel";

const PAGE_SIZE = 12;
const TAG_LABELS: Record<ProductTag, string> = {
  new: "New arrivals",
  bestseller: "Bestsellers",
  flash: "On sale",
  edit: "The edit",
};

const sorts = {
  featured: { label: "Featured", fn: () => 0 },
  newest: { label: "Newest first", fn: (a: Product, b: Product) => Number(b.tags.includes("new")) - Number(a.tags.includes("new")) },
  "price-asc": { label: "Price: low to high", fn: (a: Product, b: Product) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a: Product, b: Product) => b.price - a.price },
  rating: { label: "Top rated", fn: (a: Product, b: Product) => b.rating - a.rating },
} as const;

type SortKey = keyof typeof sorts;

function countBy(list: Product[], key: (p: Product) => string) {
  const counts = new Map<string, number>();
  list.forEach((p) => counts.set(key(p), (counts.get(key(p)) ?? 0) + 1));
  return counts;
}

/** Reads the URL once and remounts the listing whenever the query string changes. */
export function ShopView({ category }: { category?: CategorySlug }) {
  const params = useSearchParams();
  return (
    <ShopListing
      key={params.toString()}
      category={category}
      query={params.get("q") ?? ""}
      initialType={params.get("type")}
      tag={(params.get("tag") as ProductTag | null) ?? null}
      initialMax={Number(params.get("max")) || null}
    />
  );
}

function ShopListing({
  category,
  query,
  initialType,
  tag,
  initialMax,
}: {
  category?: CategorySlug;
  query: string;
  initialType: string | null;
  tag: ProductTag | null;
  initialMax: number | null;
}) {
  // Base set: everything the URL scopes us to, before sidebar filters.
  const base = useMemo(() => {
    let list = query ? searchProducts(query) : allProducts;
    if (category) list = list.filter((p) => p.category === category);
    if (tag) list = list.filter((p) => p.tags.includes(tag));
    return list;
  }, [category, query, tag]);

  const priceCeiling = useMemo(() => Math.ceil(Math.max(...allProducts.map((p) => p.price)) / 1000) * 1000, []);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialType ? [initialType] : []);
  const [priceMax, setPriceMax] = useState(initialMax ?? priceCeiling);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const toggle = (list: string[], value: string) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const scopedForTypes = selectedCategories.length ? base.filter((p) => selectedCategories.includes(p.category)) : base;

  const categoryOptions: FacetOption[] | undefined = category
    ? undefined
    : (() => {
        const counts = countBy(base, (p) => p.category);
        return categories.map((c) => ({ value: c.slug, label: c.name, count: counts.get(c.slug) ?? 0 }));
      })();

  const typeOptions: FacetOption[] = (() => {
    const counts = countBy(scopedForTypes, (p) => p.type);
    const order = category ? (categories.find((c) => c.slug === category)?.types ?? []) : categories.flatMap((c) => c.types);
    const known = order.filter((t) => counts.has(t));
    const extra = [...counts.keys()].filter((t) => !known.includes(t));
    return [...known, ...extra].map((t) => ({ value: t, label: t, count: counts.get(t) ?? 0 }));
  })();

  const filtered = scopedForTypes
    .filter((p) => (selectedTypes.length ? selectedTypes.includes(p.type) : true))
    .filter((p) => p.price <= priceMax)
    .filter((p) => (onSaleOnly ? Boolean(p.compareAt) : true))
    .filter((p) => (topRated ? p.rating >= 4.8 : true))
    .toSorted(sorts[sort].fn);

  const shown = filtered.slice(0, visibleCount);

  const chips = [
    ...selectedCategories.map((c) => ({
      label: categories.find((cat) => cat.slug === c)?.name ?? c,
      clear: () => setSelectedCategories((v) => v.filter((x) => x !== c)),
    })),
    ...selectedTypes.map((t) => ({ label: t, clear: () => setSelectedTypes((v) => v.filter((x) => x !== t)) })),
    ...(priceMax < priceCeiling ? [{ label: `Under ৳${priceMax.toLocaleString("en-IN")}`, clear: () => setPriceMax(priceCeiling) }] : []),
    ...(onSaleOnly ? [{ label: "On sale", clear: () => setOnSaleOnly(false) }] : []),
    ...(topRated ? [{ label: "4.8★ & above", clear: () => setTopRated(false) }] : []),
  ];

  function clearAll() {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setPriceMax(priceCeiling);
    setOnSaleOnly(false);
    setTopRated(false);
  }

  const panel = (
    <FilterPanel
      categoryOptions={categoryOptions}
      selectedCategories={selectedCategories}
      onToggleCategory={(value) => {
        setSelectedCategories((v) => toggle(v, value));
        setVisibleCount(PAGE_SIZE);
      }}
      typeOptions={typeOptions}
      selectedTypes={selectedTypes}
      onToggleType={(value) => {
        setSelectedTypes((v) => toggle(v, value));
        setVisibleCount(PAGE_SIZE);
      }}
      priceCeiling={priceCeiling}
      priceMax={priceMax}
      onPriceMax={setPriceMax}
      onSaleOnly={onSaleOnly}
      onToggleSale={() => setOnSaleOnly((v) => !v)}
      saleCount={scopedForTypes.filter((p) => p.compareAt).length}
      topRated={topRated}
      onToggleTopRated={() => setTopRated((v) => !v)}
      topRatedCount={scopedForTypes.filter((p) => p.rating >= 4.8).length}
      onClear={clearAll}
    />
  );

  return (
    <div className="container-x py-10 lg:py-14">
      {(query || tag) && (
        <div className="mb-8 flex flex-wrap items-center gap-3 bg-rose-50 px-5 py-4 text-sm">
          {query && (
            <span>
              Results for <strong className="font-semibold">&ldquo;{query}&rdquo;</strong>
            </span>
          )}
          {tag && <span className="rounded-full bg-white px-3 py-1 text-xs tracking-wide text-rose-700">{TAG_LABELS[tag] ?? tag}</span>}
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-14">
        <aside className="hidden lg:block" aria-label="Product filters">
          <div className="sticky top-28">{panel}</div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-taupe">
              Showing <span className="text-ink">{shown.length}</span> of <span className="text-ink">{filtered.length}</span> pieces
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex h-11 items-center gap-2 border border-sand-dark bg-white px-4 text-sm lg:hidden"
              >
                <SlidersHorizontal className="size-4" aria-hidden /> Filters
                {chips.length > 0 && <span className="grid size-5 place-items-center rounded-full bg-ink text-[0.65rem] text-cream">{chips.length}</span>}
              </button>
              <label htmlFor="sort" className="sr-only">
                Sort products
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="h-11 border border-sand-dark bg-white px-4 pr-9 text-sm focus:border-ink focus:outline-none"
              >
                {(Object.keys(sorts) as SortKey[]).map((key) => (
                  <option key={key} value={key}>
                    Sort: {sorts[key].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ul className="mb-8 flex flex-wrap gap-2 empty:mb-0">
            <AnimatePresence initial={false}>
              {chips.map((chip) => (
                <m.li
                  key={chip.label}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                >
                  <button
                    type="button"
                    onClick={chip.clear}
                    className="inline-flex items-center gap-1.5 rounded-full border border-sand-dark bg-white px-3.5 py-1.5 text-xs transition-colors hover:border-rose-400"
                    aria-label={`Remove filter ${chip.label}`}
                  >
                    {chip.label}
                    <X className="size-3" aria-hidden />
                  </button>
                </m.li>
              ))}
            </AnimatePresence>
          </ul>

          <AnimatePresence mode="wait" initial={false}>
            {shown.length > 0 ? (
              <m.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AnimatedProductGrid
                  products={shown}
                  columns={3}
                  sizes="(min-width: 1024px) 26vw, (min-width: 768px) 31vw, 46vw"
                />
              </m.div>
            ) : (
              <m.div
                key="empty"
                className="flex flex-col items-center gap-4 bg-sand px-6 py-20 text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-display text-3xl">Nothing matches just yet</p>
                <p className="max-w-sm text-sm text-taupe">
                  Try removing a filter or searching for something else — new pieces arrive every week.
                </p>
                <Button variant="outline" onClick={clearAll}>
                  Clear filters
                </Button>
              </m.div>
            )}
          </AnimatePresence>

          {visibleCount < filtered.length && (
            <div className="mt-14 flex flex-col items-center gap-4">
              <div className="h-px w-48 bg-sand-dark">
                <m.div
                  className="h-full origin-left bg-ink"
                  initial={false}
                  animate={{ scaleX: shown.length / filtered.length }}
                  transition={{ duration: 0.6, ease: EASE_LUXE }}
                />
              </div>
              <Button variant="outline" onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}>
                Load more
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <m.div
              className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              className="absolute inset-y-0 left-0 flex w-[min(88vw,360px)] flex-col bg-cream shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%", transition: { duration: 0.35, ease: EASE_LUXE } }}
              transition={{ duration: 0.5, ease: EASE_LUXE }}
            >
              <div className="flex items-center justify-between border-b border-sand-dark px-5 py-4">
                <p className="font-display text-2xl">Filter & refine</p>
                <m.button
                  type="button"
                  whileTap={{ scale: 0.85, rotate: 90 }}
                  onClick={() => setDrawerOpen(false)}
                  className="grid size-10 place-items-center"
                  aria-label="Close filters"
                >
                  <X className="size-5" aria-hidden />
                </m.button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6">{panel}</div>
              <div className="border-t border-sand-dark p-5">
                <Button className="w-full" onClick={() => setDrawerOpen(false)}>
                  Show {filtered.length} results
                </Button>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

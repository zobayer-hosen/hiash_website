/** Fallback shown while a product route resolves its params. */
export function ProductSkeleton() {
  return (
    <div className="container-x py-6" aria-hidden>
      <div className="h-3 w-64 animate-pulse bg-sand" />
      <div className="mt-6 grid gap-10 pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="aspect-[4/5] w-full animate-pulse bg-sand" />
        <div className="space-y-4">
          <div className="h-3 w-32 animate-pulse bg-sand" />
          <div className="h-10 w-3/4 animate-pulse bg-sand" />
          <div className="h-6 w-28 animate-pulse bg-sand" />
          <div className="h-24 w-full animate-pulse bg-sand" />
          <div className="h-12 w-full animate-pulse bg-sand" />
        </div>
      </div>
    </div>
  );
}

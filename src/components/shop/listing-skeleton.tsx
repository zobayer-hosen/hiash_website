/** Placeholder grid shown while the URL-driven listing hydrates. */
export function ListingSkeleton() {
  return (
    <div className="container-x py-10 lg:py-14" aria-hidden>
      <div className="grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-14">
        <div className="hidden space-y-4 lg:block">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-4 animate-pulse bg-sand" style={{ width: `${60 + ((i * 13) % 35)}%` }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-5">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i}>
              <div className="aspect-[3/4] animate-pulse bg-sand" />
              <div className="mt-3 h-4 w-2/3 animate-pulse bg-sand" />
              <div className="mt-2 h-3 w-1/3 animate-pulse bg-sand" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

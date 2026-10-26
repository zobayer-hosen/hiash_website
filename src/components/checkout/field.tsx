import { cn } from "@/lib/utils";

const inputClass =
  "h-12 w-full border bg-white px-4 text-sm transition-colors placeholder:text-taupe/60 focus:border-ink focus:outline-none";

export function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[0.7rem] font-medium tracking-[0.14em] uppercase">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function fieldClasses(hasError?: boolean) {
  return cn(inputClass, hasError ? "border-rose-500" : "border-sand-dark");
}

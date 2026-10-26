import { cn } from "@/lib/utils";

/** Scalloped "postage stamp" outline, computed once at module load. */
const SCALLOP_PATH = (() => {
  const bumps = 22;
  const outer = 48;
  const inner = 43;
  const points: string[] = [];
  for (let i = 0; i < bumps * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI * i) / bumps;
    points.push(`${(50 + r * Math.cos(angle)).toFixed(2)},${(50 + r * Math.sin(angle)).toFixed(2)}`);
  }
  return `M${points.join(" L")} Z`;
})();

export function StampBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("grid size-[72px] place-items-center text-center text-white", className?.includes("absolute") ? undefined : "relative", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full fill-rose-600" aria-hidden>
        <path d={SCALLOP_PATH} strokeLinejoin="round" />
      </svg>
      <span className="relative font-display text-sm leading-[1.05] font-semibold">{children}</span>
    </span>
  );
}

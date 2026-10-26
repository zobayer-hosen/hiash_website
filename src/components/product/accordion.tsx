"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="border-b border-sand-dark">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between py-5 text-left font-medium"
      >
        {title}
        <Plus className={cn("size-4 transition-transform duration-300", open && "rotate-45")} aria-hidden />
      </button>
      <div id={id} className={cn("grid transition-all duration-500 ease-[var(--ease-luxe)]", open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden text-sm leading-relaxed text-taupe">{children}</div>
      </div>
    </div>
  );
}

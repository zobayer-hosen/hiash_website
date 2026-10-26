"use client";

import { AnimatePresence, m } from "framer-motion";
import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { EASE_LUXE } from "@/components/motion/variants";

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
        className="flex w-full items-center justify-between py-5 text-left font-medium transition-colors hover:text-rose-600"
      >
        {title}
        <m.span animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
          <Plus className="size-4" aria-hidden />
        </m.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={id}
            key="content"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_LUXE }}
          >
            <div className="pb-5 text-sm leading-relaxed text-taupe">{children}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

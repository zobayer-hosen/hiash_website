"use client";

import { m } from "framer-motion";
import { EASE_LUXE } from "@/components/motion/variants";

/**
 * Re-mounts on every navigation, so each page fades in.
 * Only opacity + a small lift: transforms reset to `none` when finished,
 * so fixed-position drawers inside pages keep working.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <m.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_LUXE }}>
      {children}
    </m.div>
  );
}

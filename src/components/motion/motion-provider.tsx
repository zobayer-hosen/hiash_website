"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { EASE_LUXE } from "./variants";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * App-wide Framer Motion setup:
 * - LazyMotion (strict) keeps the bundle small — use `m.*` components, never `motion.*`.
 * - reducedMotion="user" turns transform animations off for people who ask their OS for less motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE_LUXE }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

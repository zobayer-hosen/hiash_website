"use client";

import { m } from "framer-motion";
import { EASE_LUXE, fadeUp, stagger } from "./variants";

const tags = { div: m.div, li: m.li, ul: m.ul, section: m.section, article: m.article, span: m.span } as const;
type Tag = keyof typeof tags;

/** Fades + lifts content once when it scrolls into view. `delay` is in milliseconds. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  amount = 0.2,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: Tag;
  amount?: number;
}) {
  const Component = tags[as] as typeof m.div;
  return (
    <Component
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE_LUXE, delay: delay / 1000 }}
    >
      {children}
    </Component>
  );
}

/** Parent that staggers its <StaggerItem> children as they enter the viewport. */
export function Stagger({
  children,
  className,
  as = "div",
  gap = 0.09,
  delay = 0,
  amount = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  gap?: number;
  delay?: number;
  amount?: number;
}) {
  const Component = tags[as] as typeof m.div;
  return (
    <Component
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const Component = tags[as] as typeof m.div;
  return (
    <Component data-reveal className={className} variants={fadeUp}>
      {children}
    </Component>
  );
}

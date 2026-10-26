import type { Transition, Variants } from "framer-motion";

/** The site's signature easing — a soft, luxurious ease-out. */
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

export const springSoft: Transition = { type: "spring", stiffness: 260, damping: 30 };
export const springPop: Transition = { type: "spring", stiffness: 500, damping: 22 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_LUXE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_LUXE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE_LUXE } },
};

export function stagger(staggerChildren = 0.09, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
  };
}

/** Shared enter / exit for items inside animated grids (filters, tabs). */
export const gridItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_LUXE, delay: index * 0.045 },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.25, ease: EASE_LUXE } },
};

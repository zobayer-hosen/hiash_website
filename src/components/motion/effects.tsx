"use client";

import { animate, m, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/** Moves its children against the scroll direction for a gentle depth effect. */
export function Parallax({
  children,
  offset = 60,
  className,
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  return (
    <div ref={ref} className={className}>
      <m.div style={{ y }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}

/** Slow zoom-out on scroll, used behind banners. */
export function ScrollZoom({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  return (
    <div ref={ref} className={className}>
      <m.div style={{ scale }} className="absolute inset-0">
        {children}
      </m.div>
    </div>
  );
}

/** Endless gentle bob — for decorative butterflies and badges. */
export function Float({
  children,
  className,
  amplitude = 10,
  duration = 6,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <m.div
      className={className}
      animate={{ y: [0, -amplitude, 0], rotate: [0, 2, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </m.div>
  );
}

/** Animates a number up from zero the first time it scrolls into view. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${Math.round(latest).toLocaleString("en-IN")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/** Continuous slow rotation (circular text badges). */
export function Spin({ children, className, duration = 22 }: { children: React.ReactNode; className?: string; duration?: number }) {
  return (
    <m.div className={className} animate={{ rotate: 360 }} transition={{ duration, repeat: Infinity, ease: "linear" }}>
      {children}
    </m.div>
  );
}

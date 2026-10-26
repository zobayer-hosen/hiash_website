"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { announcements } from "@/data/content";
import { EASE_LUXE } from "@/components/motion/variants";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % announcements.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-rose-100 text-rose-800">
      <div className="container-x flex h-10 items-center justify-between gap-4 text-[0.7rem] font-medium tracking-[0.12em] uppercase">
        <div className="relative h-5 flex-1 overflow-hidden text-center md:text-left" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <m.p
              key={index}
              className="absolute inset-0 truncate"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_LUXE }}
            >
              {announcements[index]}
            </m.p>
          </AnimatePresence>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/help#shipping" className="transition-colors hover:text-rose-600">
            Delivery info
          </Link>
          <Link href="/account" className="transition-colors hover:text-rose-600">
            Track order
          </Link>
          <span className="text-rose-700/70">BDT ৳</span>
        </div>
      </div>
    </div>
  );
}

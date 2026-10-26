"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { announcements } from "@/data/content";
import { cn } from "@/lib/utils";

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
          {announcements.map((message, i) => (
            <p
              key={message}
              className={cn(
                "absolute inset-0 truncate transition-all duration-700 ease-[var(--ease-luxe)]",
                i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
              )}
              aria-hidden={i !== index}
            >
              {message}
            </p>
          ))}
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

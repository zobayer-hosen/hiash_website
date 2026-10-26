"use client";

import Image from "next/image";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { lookbookPortraits } from "@/data/content";
import { cn } from "@/lib/utils";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setStatus(valid ? "done" : "error");
  }

  return (
    <section className="overflow-hidden bg-white pt-20 lg:pt-28">
      <div className="container-x text-center">
        <p className="eyebrow">Hiash Circle</p>
        <h2 className="mt-4 font-display text-5xl font-medium tracking-tight sm:text-6xl">
          Join & get <em className="text-rose-500 italic">10% off</em>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-taupe">
          Early access to new drops, festive edits and members-only offers — delivered softly to your inbox.
        </p>

        {status === "done" ? (
          <p className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-rose-50 px-6 py-3 text-sm text-rose-800" role="status">
            <CircleCheck className="size-4" aria-hidden />
            Welcome to the circle! Use code <strong className="font-semibold">{siteConfig.promo.code}</strong> at checkout.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mx-auto mt-8 max-w-md">
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border bg-cream p-1.5 pl-6 transition-colors focus-within:border-rose-400",
                status === "error" ? "border-rose-500" : "border-sand-dark",
              )}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Your email address"
                autoComplete="email"
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? "newsletter-error" : undefined}
                className="min-w-0 flex-1 bg-transparent text-sm placeholder:text-taupe/70 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-ink px-6 py-3 text-[0.7rem] font-medium tracking-[0.18em] text-cream uppercase transition-colors hover:bg-rose-700"
              >
                Become a member
              </button>
            </div>
            {status === "error" && (
              <p id="newsletter-error" className="mt-2 text-sm text-rose-600">
                Please enter a valid email address.
              </p>
            )}
          </form>
        )}
      </div>

      <div className="mt-16 flex items-end justify-center gap-3 sm:gap-4" aria-hidden>
        {lookbookPortraits.map((src, index) => (
          <div
            key={src}
            className={cn(
              "relative w-[30vw] max-w-[180px] shrink-0 overflow-hidden rounded-t-[999px] bg-sand sm:w-[18vw]",
              index % 2 === 0 ? "aspect-[3/5]" : "aspect-[3/4.4]",
              (index === 0 || index === lookbookPortraits.length - 1) && "max-sm:hidden",
            )}
          >
            <Image src={src} alt="" fill sizes="180px" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

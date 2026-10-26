"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { useState, Fragment } from "react";
import { CircleCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { lookbookPortraits } from "@/data/content";
import { cn } from "@/lib/utils";
import { MaskLines } from "@/components/motion/mask-lines";
import { Reveal } from "@/components/motion/reveal";
import { EASE_LUXE, springPop } from "@/components/motion/variants";

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
        <Reveal y={10}>
          <p className="eyebrow">Hiash Circle</p>
        </Reveal>
        <h2 className="mt-4 font-display text-5xl font-medium tracking-tight sm:text-6xl">
          <MaskLines
            lines={[
              <Fragment key="line-1">
                Join & get <em className="text-rose-500 italic">10% off</em>
              </Fragment>,
            ]}
          />
        </h2>
        <Reveal delay={150}>
          <p className="mx-auto mt-4 max-w-md text-taupe">
            Early access to new wedding collections, festive edits and members-only offers — delivered softly to your inbox.
          </p>
        </Reveal>

        <Reveal delay={250} className="mx-auto mt-8 max-w-md">
          <AnimatePresence mode="wait" initial={false}>
            {status === "done" ? (
              <m.p
                key="done"
                className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-6 py-3 text-sm text-rose-800"
                role="status"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={springPop}
              >
                <CircleCheck className="size-4" aria-hidden />
                Welcome to the circle! Use code <strong className="font-semibold">{siteConfig.promo.code}</strong> at checkout.
              </m.p>
            ) : (
              <m.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}>
                <m.div
                  animate={status === "error" ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
                  transition={{ duration: 0.45 }}
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
                  <m.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="shrink-0 rounded-full bg-ink px-6 py-3 text-[0.7rem] font-medium tracking-[0.18em] text-cream uppercase transition-colors hover:bg-rose-700"
                  >
                    Become a member
                  </m.button>
                </m.div>
                {status === "error" && (
                  <p id="newsletter-error" className="mt-2 text-sm text-rose-600">
                    Please enter a valid email address.
                  </p>
                )}
              </m.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>

      <div className="mt-16 flex items-end justify-center gap-3 sm:gap-4" aria-hidden>
        {lookbookPortraits.map((src, index) => {
          const fromCentre = Math.abs(index - (lookbookPortraits.length - 1) / 2);
          return (
            <m.div
              key={src}
              className={cn(
                "relative w-[30vw] max-w-[180px] shrink-0 overflow-hidden rounded-t-[999px] bg-sand sm:w-[18vw]",
                index % 2 === 0 ? "aspect-[3/5]" : "aspect-[3/4.4]",
                (index === 0 || index === lookbookPortraits.length - 1) && "max-sm:hidden",
              )}
              initial={{ y: 120, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: EASE_LUXE, delay: fromCentre * 0.12 }}
              whileHover={{ y: -12, transition: { duration: 0.4, delay: 0 } }}
            >
              <Image src={src} alt="" fill sizes="180px" className="object-cover object-top" />
            </m.div>
          );
        })}
      </div>
    </section>
  );
}

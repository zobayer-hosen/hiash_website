"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Field, fieldClasses } from "@/components/checkout/field";
import { EASE_LUXE } from "@/components/motion/variants";

/** Sign-in / register UI. Wire `onSubmit` to your auth provider when the backend is ready. */
export function AuthCard() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [submitted, setSubmitted] = useState(false);

  return (
    <m.div
      className="bg-white p-7 shadow-[0_30px_60px_-40px_rgba(34,26,28,0.4)] sm:p-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.15 }}
    >
      <div role="tablist" aria-label="Account" className="grid grid-cols-2 border-b border-sand-dark">
        {(["signin", "register"] as const).map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={mode === value}
            onClick={() => {
              setMode(value);
              setSubmitted(false);
            }}
            className={cn("relative pb-3 font-display text-xl transition-colors", mode === value ? "text-ink" : "text-taupe hover:text-ink")}
          >
            {value === "signin" ? "Sign in" : "Create account"}
            {mode === value && (
              <m.span layoutId="auth-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <m.p
            key="done"
            className="mt-8 flex items-start gap-3 bg-sage-50 p-4 text-sm text-sage-700"
            role="status"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
            Accounts are coming soon. Your details weren&rsquo;t stored — check back shortly to track orders and save addresses.
          </m.p>
        ) : (
          <m.form
            key={mode}
            className="mt-8 space-y-4"
            initial={{ opacity: 0, x: mode === "register" ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "register" ? -30 : 30, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: EASE_LUXE }}
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            {mode === "register" && (
              <Field id="name" label="Full name">
                <input id="name" required autoComplete="name" className={fieldClasses()} />
              </Field>
            )}
            <Field id="account-email" label="Email or mobile">
              <input id="account-email" required autoComplete="username" className={fieldClasses()} />
            </Field>
            <Field id="password" label="Password">
              <input
                id="password"
                type="password"
                required
                minLength={8}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                className={fieldClasses()}
              />
            </Field>
            <m.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              className="mt-2 h-12 w-full bg-ink text-xs font-medium tracking-[0.2em] text-cream uppercase transition-colors hover:bg-rose-700"
            >
              {mode === "signin" ? "Sign in" : "Create account"}
            </m.button>
          </m.form>
        )}
      </AnimatePresence>
    </m.div>
  );
}

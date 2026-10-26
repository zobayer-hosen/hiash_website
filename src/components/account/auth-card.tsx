"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Field, fieldClasses } from "@/components/checkout/field";

/** Sign-in / register UI. Wire `onSubmit` to your auth provider when the backend is ready. */
export function AuthCard() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-white p-7 shadow-[0_30px_60px_-40px_rgba(34,26,28,0.4)] sm:p-10">
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
            className={cn(
              "-mb-px border-b-2 pb-3 font-display text-xl transition-colors",
              mode === value ? "border-ink text-ink" : "border-transparent text-taupe hover:text-ink",
            )}
          >
            {value === "signin" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      {submitted ? (
        <p className="mt-8 flex items-start gap-3 bg-sage-50 p-4 text-sm text-sage-700" role="status">
          <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
          Accounts are coming soon. Your details weren&rsquo;t stored — check back shortly to track orders and save addresses.
        </p>
      ) : (
        <form
          className="mt-8 space-y-4"
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
          <button
            type="submit"
            className="mt-2 h-12 w-full bg-ink text-xs font-medium tracking-[0.2em] text-cream uppercase transition-colors hover:bg-rose-700"
          >
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
      )}
    </div>
  );
}

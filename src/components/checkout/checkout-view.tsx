"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { Banknote, CreditCard, Lock, Smartphone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cartTotals, resolveCartLines, type ShippingMethod } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/utils";
import { shopActions, useShop } from "@/store/shop-store";
import { ButtonLink } from "@/components/ui/button";
import { PromoForm } from "@/components/cart/promo-form";
import { SummaryRows } from "@/components/cart/summary-rows";
import { EASE_LUXE, fadeUp, stagger } from "@/components/motion/variants";
import { Field, fieldClasses } from "./field";

const divisions = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

const deliveryOptions: { value: ShippingMethod; label: string; eta: string }[] = [
  { value: "insideDhaka", label: "Inside Dhaka", eta: "24–48 hours" },
  { value: "outsideDhaka", label: "Outside Dhaka", eta: "3–5 business days" },
  { value: "express", label: "Express (Dhaka)", eta: "Same day if ordered before 2pm" },
];

const paymentOptions = [
  { value: "cod", label: "Cash on delivery", note: "Pay in cash when your order arrives.", Icon: Banknote },
  { value: "bkash", label: "bKash", note: "You'll receive a bKash payment request after placing the order.", Icon: Smartphone },
  { value: "nagad", label: "Nagad", note: "You'll receive a Nagad payment request after placing the order.", Icon: Smartphone },
  { value: "card", label: "Credit / debit card", note: "Visa, Mastercard and Amex accepted.", Icon: CreditCard },
] as const;

type Payment = (typeof paymentOptions)[number]["value"];

const emptyForm = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  area: "",
  city: "Dhaka",
  postcode: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

type FormState = typeof emptyForm;
type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState, payment: Payment): Errors {
  const errors: Errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!/^(\+?880)?0?1[3-9]\d{8}$/.test(form.phone.replace(/[\s-]/g, "")))
    errors.phone = "Enter a valid Bangladeshi mobile number.";
  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  if (form.address.trim().length < 6) errors.address = "Enter your full street address.";
  if (!form.area.trim()) errors.area = "Area / thana is required.";
  if (payment === "card") {
    if (form.cardNumber.replace(/\s/g, "").length < 15) errors.cardNumber = "Enter a valid card number.";
    if (!/^\d{2}\s?\/\s?\d{2}$/.test(form.cardExpiry)) errors.cardExpiry = "Use MM / YY.";
    if (!/^\d{3,4}$/.test(form.cardCvc)) errors.cardCvc = "3 or 4 digits.";
  }
  return errors;
}

export function CheckoutView() {
  const { items, promoApplied } = useShop();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [shipping, setShipping] = useState<ShippingMethod>("insideDhaka");
  const [payment, setPayment] = useState<Payment>("cod");
  const [subscribe, setSubscribe] = useState(true);
  const [order, setOrder] = useState<{ id: string; total: number; name: string; city: string } | null>(null);

  const lines = resolveCartLines(items);
  const totals = cartTotals(lines, { promoApplied, shipping });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (key === "city") setShipping(value === "Dhaka" ? "insideDhaka" : "outsideDhaka");
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(form, payment);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setOrder({
      id: `HS-${String(Date.now()).slice(-6)}`,
      total: totals.total,
      name: form.firstName.trim(),
      city: form.city,
    });
    shopActions.clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const input = (key: keyof FormState, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <input
      id={key}
      value={form[key]}
      onChange={(event) => update(key, event.target.value)}
      aria-invalid={Boolean(errors[key])}
      aria-describedby={errors[key] ? `${key}-error` : undefined}
      className={fieldClasses(Boolean(errors[key]))}
      {...props}
    />
  );

  if (order) {
    return (
      <m.div className="mx-auto max-w-xl py-10 text-center" variants={stagger(0.12)} initial="hidden" animate="show">
        <m.span
          className="mx-auto grid size-24 place-items-center rounded-full bg-sage-100 text-sage-700"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
        >
          <svg viewBox="0 0 52 52" className="size-12" aria-hidden>
            <m.circle
              cx="26"
              cy="26"
              r="23"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE_LUXE }}
            />
            <m.path
              d="M15 27l7 7 15-16"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.75, ease: EASE_LUXE }}
            />
          </svg>
        </m.span>
        <m.h2 variants={fadeUp} className="mt-6 font-display text-5xl font-medium">
          Thank you, {order.name}!
        </m.h2>
        <m.p variants={fadeUp} className="mt-4 text-taupe">
          Your order <strong className="font-semibold text-ink">{order.id}</strong> is confirmed. We&rsquo;ll send updates to your
          phone and email as it&rsquo;s packed and shipped to {order.city}.
        </m.p>
        <m.div
          variants={fadeUp}
          className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-px overflow-hidden border border-sand-dark bg-sand-dark text-left text-sm"
        >
          <div className="bg-white p-4">
            <p className="text-xs tracking-[0.16em] text-taupe uppercase">Order total</p>
            <p className="mt-1 font-display text-2xl font-semibold lining-nums">{formatPrice(order.total)}</p>
          </div>
          <div className="bg-white p-4">
            <p className="text-xs tracking-[0.16em] text-taupe uppercase">Payment</p>
            <p className="mt-1 font-medium">{paymentOptions.find((p) => p.value === payment)?.label}</p>
          </div>
        </m.div>
        <m.div variants={fadeUp}>
          <ButtonLink href="/shop" className="mt-10">
            Continue shopping
          </ButtonLink>
        </m.div>
      </m.div>
    );
  }

  if (lines.length === 0) {
    return (
      <m.div
        className="flex flex-col items-center gap-5 bg-white px-6 py-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-display text-4xl">Your bag is empty</p>
        <p className="text-taupe">Add a few favourites before checking out.</p>
        <ButtonLink href="/shop">Browse the shop</ButtonLink>
      </m.div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-14">
      <m.form
        id="checkout-form"
        onSubmit={onSubmit}
        noValidate
        className="space-y-10"
        variants={stagger(0.1)}
        initial="hidden"
        animate="show"
      >
        {/* 1. Contact */}
        <m.section variants={fadeUp} aria-labelledby="step-contact">
          <h2 id="step-contact" className="flex items-center gap-3 font-display text-2xl font-semibold">
            <span className="grid size-7 place-items-center rounded-full bg-ink text-xs text-cream">1</span> Contact
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field id="email" label="Email" error={errors.email}>
              {input("email", { type: "email", autoComplete: "email", placeholder: "you@example.com" })}
            </Field>
            <Field id="phone" label="Mobile number" error={errors.phone}>
              {input("phone", { type: "tel", autoComplete: "tel", placeholder: "01XXXXXXXXX" })}
            </Field>
          </div>
          <label className="mt-4 flex items-center gap-3 text-sm text-taupe">
            <input
              type="checkbox"
              checked={subscribe}
              onChange={(event) => setSubscribe(event.target.checked)}
              className="size-4 accent-ink"
            />
            Email me about new arrivals and members-only offers
          </label>
        </m.section>

        {/* 2. Address */}
        <m.section variants={fadeUp} aria-labelledby="step-address" className="border-t border-sand-dark pt-10">
          <h2 id="step-address" className="flex items-center gap-3 font-display text-2xl font-semibold">
            <span className="grid size-7 place-items-center rounded-full bg-ink text-xs text-cream">2</span> Shipping address
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field id="firstName" label="First name" error={errors.firstName}>
              {input("firstName", { autoComplete: "given-name" })}
            </Field>
            <Field id="lastName" label="Last name" error={errors.lastName}>
              {input("lastName", { autoComplete: "family-name" })}
            </Field>
            <Field id="address" label="Address" error={errors.address} className="sm:col-span-2">
              {input("address", { autoComplete: "street-address", placeholder: "House, road, apartment" })}
            </Field>
            <Field id="area" label="Area / Thana" error={errors.area}>
              {input("area", { placeholder: "e.g. Dhanmondi" })}
            </Field>
            <Field id="city" label="Division">
              <select
                id="city"
                value={form.city}
                onChange={(event) => update("city", event.target.value)}
                className={fieldClasses()}
              >
                {divisions.map((division) => (
                  <option key={division}>{division}</option>
                ))}
              </select>
            </Field>
            <Field id="postcode" label="Postcode (optional)">
              {input("postcode", { autoComplete: "postal-code", inputMode: "numeric", placeholder: "1209" })}
            </Field>
            <Field id="country" label="Country">
              <input id="country" value="Bangladesh" readOnly className={cn(fieldClasses(), "bg-sand text-taupe")} />
            </Field>
          </div>
        </m.section>

        {/* 3. Delivery */}
        <m.section variants={fadeUp} aria-labelledby="step-delivery" className="border-t border-sand-dark pt-10">
          <h2 id="step-delivery" className="flex items-center gap-3 font-display text-2xl font-semibold">
            <span className="grid size-7 place-items-center rounded-full bg-ink text-xs text-cream">3</span> Delivery method
          </h2>
          <div className="mt-5 space-y-3" role="radiogroup" aria-labelledby="step-delivery">
            {deliveryOptions.map((option) => {
              const disabled = form.city !== "Dhaka" && option.value !== "outsideDhaka";
              const price = cartTotals(lines, { shipping: option.value }).shipping;
              return (
                <label
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-4 border bg-white px-5 py-4 transition-colors",
                    shipping === option.value ? "border-ink" : "border-sand-dark hover:border-ink/40",
                    disabled && "cursor-not-allowed opacity-45",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value={option.value}
                      checked={shipping === option.value}
                      disabled={disabled}
                      onChange={() => setShipping(option.value)}
                      className="size-4 accent-ink"
                    />
                    <span>
                      <span className="block text-sm font-medium">{option.label}</span>
                      <span className="text-xs text-taupe">{option.eta}</span>
                    </span>
                  </span>
                  <span className="text-sm tabular-nums">{price === 0 ? "Free" : formatPrice(price)}</span>
                </label>
              );
            })}
          </div>
        </m.section>

        {/* 4. Payment */}
        <m.section variants={fadeUp} aria-labelledby="step-payment" className="border-t border-sand-dark pt-10">
          <div className="flex items-center justify-between">
            <h2 id="step-payment" className="flex items-center gap-3 font-display text-2xl font-semibold">
              <span className="grid size-7 place-items-center rounded-full bg-ink text-xs text-cream">4</span> Payment
            </h2>
            <span className="flex items-center gap-1.5 text-xs text-taupe">
              <Lock className="size-3.5" aria-hidden /> Secure, encrypted
            </span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-labelledby="step-payment">
            {paymentOptions.map(({ value, label, Icon }) => (
              <label
                key={value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 border bg-white px-5 py-4 transition-colors",
                  payment === value ? "border-ink" : "border-sand-dark hover:border-ink/40",
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  value={value}
                  checked={payment === value}
                  onChange={() => setPayment(value)}
                  className="size-4 accent-ink"
                />
                <Icon className="size-5 text-mocha" aria-hidden />
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>
          <p className="mt-3 text-sm text-taupe">{paymentOptions.find((p) => p.value === payment)?.note}</p>

          <AnimatePresence initial={false}>
            {payment === "card" && (
              <m.div
                key="card-fields"
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE_LUXE }}
              >
                <div className="mt-5 grid gap-4 bg-white p-5 sm:grid-cols-[2fr_1fr_1fr]">
                  <Field id="cardNumber" label="Card number" error={errors.cardNumber}>
                    {input("cardNumber", { inputMode: "numeric", autoComplete: "cc-number", placeholder: "1234 5678 9012 3456" })}
                  </Field>
                  <Field id="cardExpiry" label="Expiry" error={errors.cardExpiry}>
                    {input("cardExpiry", { autoComplete: "cc-exp", placeholder: "MM / YY" })}
                  </Field>
                  <Field id="cardCvc" label="CVC" error={errors.cardCvc}>
                    {input("cardCvc", { inputMode: "numeric", autoComplete: "cc-csc", placeholder: "123" })}
                  </Field>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.section>
      </m.form>

      {/* Summary */}
      <m.aside
        className="lg:sticky lg:top-28 lg:self-start"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE_LUXE }}
      >
        <div className="border border-sand-dark bg-white p-6 sm:p-7">
          <p className="text-xs font-medium tracking-[0.24em] uppercase">Order summary</p>
          <ul className="mt-5 divide-y divide-sand-dark">
            {lines.map((line) => (
              <li key={line.key} className="flex items-center gap-4 py-3">
                <span className="relative aspect-[4/5] w-14 shrink-0 bg-sand">
                  <span className="absolute inset-0 overflow-hidden">
                    <Image src={line.product.images[0]} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-ink text-[0.6rem] text-cream">
                    {line.qty}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-base font-semibold">{line.product.name}</span>
                  <span className="text-xs text-taupe">
                    {line.color}
                    {line.size && ` · ${line.size}`}
                  </span>
                </span>
                <span className="text-sm tabular-nums">{formatPrice(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-sand-dark pt-5">
            <PromoForm />
          </div>
          <div className="mt-6">
            <SummaryRows totals={totals} />
          </div>
          <button
            type="submit"
            form="checkout-form"
            className="mt-6 flex h-14 w-full items-center justify-center bg-ink text-xs font-medium tracking-[0.2em] text-cream uppercase transition-colors hover:bg-rose-700"
          >
            Place order — {formatPrice(totals.total)}
          </button>
          <p className="mt-3 text-center text-xs text-taupe">
            By placing your order you agree to our{" "}
            <Link href="/help#returns" className="underline underline-offset-2">
              returns policy
            </Link>
            .
          </p>
        </div>
        <div className="mt-5 flex items-center gap-4 px-2">
          <span className="grid size-14 shrink-0 place-items-center rounded-full border border-ink/20">
            <Image src="/brand/butterfly.png" alt="" width={319} height={299} className="w-7" />
          </span>
          <p className="text-sm text-taupe">
            Packed by hand at our Dhaka studio and shipped within 1–2 business days. Questions? Call {siteConfig.contact.phone}.
          </p>
        </div>
      </m.aside>
    </div>
  );
}

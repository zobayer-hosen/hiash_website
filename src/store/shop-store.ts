"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/config/site";
import type { CartItem } from "@/types";

/**
 * Tiny client store for bag + wishlist, persisted to localStorage.
 * useSyncExternalStore gives us a server snapshot during hydration and the
 * persisted snapshot right after, so there is no hydration mismatch.
 */

type ShopState = {
  items: CartItem[];
  wishlist: string[];
  promoApplied: boolean;
  cartOpen: boolean;
};

const STORAGE_KEY = "hiash-shop-v1";
const SERVER_STATE: ShopState = { items: [], wishlist: [], promoApplied: false, cartOpen: false };

let state: ShopState = SERVER_STATE;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<ShopState>;
      state = {
        ...state,
        items: Array.isArray(saved.items) ? saved.items : [],
        wishlist: Array.isArray(saved.wishlist) ? saved.wishlist : [],
        promoApplied: saved.promoApplied === true,
      };
    }
  } catch {
    // Storage may be unavailable (private mode) — fall back to in-memory state.
  }
}

function setState(next: Partial<ShopState>) {
  state = { ...state, ...next };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items, wishlist: state.wishlist, promoApplied: state.promoApplied }));
  } catch {
    // Ignore quota / privacy errors; the in-memory state still works.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  load();
  return state;
}

function getServerSnapshot() {
  return SERVER_STATE;
}

export function useShop() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* --------------------------------------------------------------- Actions */

export function itemKey(productId: string, color: string, size?: string) {
  return [productId, color, size].filter(Boolean).join("__");
}

export const shopActions = {
  addItem(input: { productId: string; color: string; size?: string; qty?: number }, openCart = true) {
    const key = itemKey(input.productId, input.color, input.size);
    const qty = input.qty ?? 1;
    const existing = state.items.find((item) => item.key === key);
    const items = existing
      ? state.items.map((item) => (item.key === key ? { ...item, qty: Math.min(item.qty + qty, 10) } : item))
      : [...state.items, { key, productId: input.productId, color: input.color, size: input.size, qty }];
    setState({ items, cartOpen: openCart ? true : state.cartOpen });
  },
  updateQty(key: string, qty: number) {
    if (qty <= 0) {
      setState({ items: state.items.filter((item) => item.key !== key) });
      return;
    }
    setState({ items: state.items.map((item) => (item.key === key ? { ...item, qty: Math.min(qty, 10) } : item)) });
  },
  removeItem(key: string) {
    setState({ items: state.items.filter((item) => item.key !== key) });
  },
  clearCart() {
    setState({ items: [], promoApplied: false });
  },
  /** Returns true when the code is valid and applied. */
  applyPromo(code: string) {
    const valid = code.trim().toUpperCase() === siteConfig.promo.code;
    if (valid) setState({ promoApplied: true });
    return valid;
  },
  removePromo() {
    setState({ promoApplied: false });
  },
  toggleWishlist(productId: string) {
    const wishlist = state.wishlist.includes(productId)
      ? state.wishlist.filter((id) => id !== productId)
      : [...state.wishlist, productId];
    setState({ wishlist });
  },
  openCart() {
    setState({ cartOpen: true });
  },
  closeCart() {
    setState({ cartOpen: false });
  },
};

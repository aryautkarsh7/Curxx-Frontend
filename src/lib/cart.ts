'use client';
import { useMemo, useSyncExternalStore } from 'react';

/**
 * Carts live in localStorage (so they survive reloads without an account) and are
 * priced again by the API at checkout — the stored price is display-only.
 */
export type CartKind = 'pharmacy' | 'lab';
export type CartItem = { slug: string; name: string; price: number; mrp: number; qty: number; rxRequired?: boolean; subtitle?: string };

const KEY: Record<CartKind, string> = { pharmacy: 'curxx_cart', lab: 'curxx_lab_cart' };
const EVENT = 'curxx-cart';
const MAX_QTY: Record<CartKind, number> = { pharmacy: 10, lab: 1 };

function read(kind: CartKind) {
  try {
    return localStorage.getItem(KEY[kind]) ?? '[]';
  } catch {
    return '[]';
  }
}

function parse(raw: string): CartItem[] {
  try {
    const items = JSON.parse(raw);
    // Older carts stored items without a slug-derived shape; drop anything malformed.
    return Array.isArray(items) ? items.filter((i) => i && typeof i.slug === 'string' && typeof i.price === 'number').map((i) => ({ mrp: i.price, ...i })) : [];
  } catch {
    return [];
  }
}

function write(kind: CartKind, items: CartItem[]) {
  try {
    localStorage.setItem(KEY[kind], JSON.stringify(items));
  } catch {
    // Storage blocked — the cart lives for this page only.
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

export function addToCart(item: Omit<CartItem, 'qty'>, qty = 1, kind: CartKind = 'pharmacy') {
  const items = parse(read(kind));
  const existing = items.find((i) => i.slug === item.slug);
  if (existing) existing.qty = Math.min(MAX_QTY[kind], existing.qty + qty);
  else items.push({ ...item, qty: Math.min(MAX_QTY[kind], qty) });
  write(kind, items);
}

export function setQty(slug: string, qty: number, kind: CartKind = 'pharmacy') {
  const items = parse(read(kind));
  const next = qty <= 0 ? items.filter((i) => i.slug !== slug) : items.map((i) => (i.slug === slug ? { ...i, qty: Math.min(MAX_QTY[kind], qty) } : i));
  write(kind, next);
}

export const removeFromCart = (slug: string, kind: CartKind = 'pharmacy') => setQty(slug, 0, kind);
export const clearCart = (kind: CartKind = 'pharmacy') => write(kind, []);

const noop = () => () => {};

export function useCart(kind: CartKind = 'pharmacy') {
  const raw = useSyncExternalStore(subscribe, () => read(kind), () => '[]');
  // False on the server and during hydration, when the cart always reads as empty.
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  return useMemo(() => {
    const items = parse(raw);
    const total = items.reduce((n, i) => n + i.qty * i.price, 0);
    const mrpTotal = items.reduce((n, i) => n + i.qty * i.mrp, 0);
    return {
      hydrated,
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total,
      savings: mrpTotal - total,
      needsPrescription: items.some((i) => i.rxRequired),
      has: (slug: string) => items.some((i) => i.slug === slug),
      qtyOf: (slug: string) => items.find((i) => i.slug === slug)?.qty ?? 0,
    };
  }, [raw, hydrated]);
}

/** Pharmacy delivery is free from ₹499; matches the API's pricing. */
export const FREE_DELIVERY_OVER = 499;
export const DELIVERY_FEE = 49;

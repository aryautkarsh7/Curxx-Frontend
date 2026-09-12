'use client';
import { useMemo, useSyncExternalStore } from 'react';

// Medicine cart kept in localStorage until checkout is backed by an API.
const CART_KEY = 'curxx_cart';
const CART_EVENT = 'curxx-cart';

export type CartItem = { slug: string; name: string; price: number; qty: number };

function readRaw() {
  try {
    return localStorage.getItem(CART_KEY) ?? '[]';
  } catch {
    return '[]';
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CART_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CART_EVENT, onChange);
  };
}

function parse(raw: string): CartItem[] {
  try {
    const items = JSON.parse(raw);
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export function addToCart(item: Omit<CartItem, 'qty'>, qty = 1) {
  const items = parse(readRaw());
  const existing = items.find((i) => i.slug === item.slug);
  if (existing) existing.qty += qty;
  else items.push({ ...item, qty });
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // Storage blocked — cart won't persist.
  }
  window.dispatchEvent(new Event(CART_EVENT));
}

/** Reads name and price from the product card containing `from` (Stitch cards have no data attributes). */
export function cartItemFromCard(from: HTMLElement): Omit<CartItem, 'qty'> | null {
  let card = from.parentElement;
  while (card && !card.querySelector('h1, h3')) card = card.parentElement;
  const name = card?.querySelector('h1, h3')?.textContent?.trim();
  if (!card || !name) return null;
  const priceText = [...card.querySelectorAll('p, span, div')]
    .map((n) => n.textContent?.trim() ?? '')
    .find((t) => /^₹[\d,]+(\.\d+)?$/.test(t));
  const price = priceText ? Number(priceText.replace(/[₹,]/g, '')) : 0;
  return { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), name, price };
}

export function useCart() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => '[]');
  return useMemo(() => {
    const items = parse(raw);
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.qty * i.price, 0),
    };
  }, [raw]);
}

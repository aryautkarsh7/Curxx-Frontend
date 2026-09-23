'use client';
import type { CollectionChoice } from '@/components/labs/CollectionSlotPicker';

const KEY = 'curxx_lab_slot';

/** The collection slot picked on a test page, carried to the booking page. */
export function saveLabSlot(slot: CollectionChoice) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(slot));
  } catch {
    // Storage blocked — the booking page asks again.
  }
}

export function readLabSlot(): CollectionChoice | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CollectionChoice) : null;
  } catch {
    return null;
  }
}

export function clearLabSlot() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // nothing to clear
  }
}

const LAB_KEY = 'curxx_lab_choice';
export type LabChoice = { slug: string; name: string; mode: 'home' | 'lab' };

/** A lab picked on its profile page, so the booking page starts with it selected. */
export function saveLabChoice(choice: LabChoice) {
  try {
    sessionStorage.setItem(LAB_KEY, JSON.stringify(choice));
  } catch {
    // Storage blocked — the booking page assigns the nearest lab instead.
  }
}

export function readLabChoice(): LabChoice | null {
  try {
    const raw = sessionStorage.getItem(LAB_KEY);
    return raw ? (JSON.parse(raw) as LabChoice) : null;
  } catch {
    return null;
  }
}

export function clearLabChoice() {
  try {
    sessionStorage.removeItem(LAB_KEY);
  } catch {
    // nothing to clear
  }
}

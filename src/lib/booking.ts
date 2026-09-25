'use client';
import type { Appointment, ConsultMode } from './api';

const KEY = 'curxx_booking';

export type BookingDraft = {
  slotId: string;
  doctorSlug: string;
  doctorName: string;
  startsAt: string;
  mode: ConsultMode;
  fee: number;
  /** Why the patient is consulting (sub-specialty slug), from the video-consult flow. */
  focus?: string;
  patient?: Appointment['patient'];
};

/** The in-progress booking, carried across the slot → details → payment steps. */
export function getDraft(): BookingDraft | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BookingDraft) : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: BookingDraft) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(draft));
  } catch {
    // Storage blocked — the user can still finish in this tab via the URL's slot id.
  }
}

export function clearDraft() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // nothing to clear
  }
}

/** "Video consultation" / "Phone consultation" / "In-clinic visit". */
export function modeLabel(mode: ConsultMode, short = false) {
  if (mode === 'audio') return short ? 'Phone consult' : 'Phone consultation';
  if (mode === 'video') return short ? 'Video consult' : 'Video consultation';
  return short ? 'Clinic visit' : 'In-clinic visit';
}

/** "Sat, 20 Sep · 05:45 PM" — the format used across the booking steps. */
export function formatSlot(startsAt: string) {
  const date = new Date(startsAt);
  const day = date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  return `${day} · ${formatTime(startsAt)}`;
}

export function formatTime(startsAt: string) {
  return new Date(startsAt)
    .toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    .toUpperCase();
}

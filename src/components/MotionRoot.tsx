'use client';
import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/** Honours the OS "reduce motion" setting for every animation in the app. */
export default function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

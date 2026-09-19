'use client';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Opacity only: a transform here would re-anchor `fixed` children (modals, sticky bars).
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div className="flex flex-col flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }}>
      {children}
    </motion.div>
  );
}

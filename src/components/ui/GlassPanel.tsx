'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function GlassPanel({ children, className, delay = 0, hover = true }: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -4, borderColor: 'rgba(255,32,78,0.4)' } : undefined}
      className={cn(
        'glass rounded-2xl border border-white/10 p-6 transition-colors duration-300',
        hover && 'hover:shadow-neon-sm',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { SectionId } from '@/types';
import { cn } from '@/utils/cn';

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'hero', label: 'Главная' },
  { id: 'hardware', label: 'Компьютер' },
  { id: 'steam', label: 'Steam' },
  { id: 'projects', label: 'Проекты' },
  { id: 'skills', label: 'Навыки' },
  { id: 'statistics', label: 'Статистика' },
  { id: 'contacts', label: 'Контакты' }
];

export function SystemDock() {
  const [active, setActive] = useState<SectionId>('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(entry.target.id as SectionId);
            }
          });
        },
        { threshold: 0.5 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function goTo(id: SectionId) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
      <motion.nav
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
          aria-label="Навигация по разделам системы"
      >
        {SECTIONS.map((section) => (
            <button
                key={section.id}
                onClick={() => goTo(section.id)}
                className="group flex items-center justify-end gap-3"
                aria-label={`Перейти к разделу ${section.label}`}
            >
          <span
              className={cn(
                  'translate-x-2 whitespace-nowrap rounded-md bg-surface/80 px-2 py-1 text-xs text-text-secondary opacity-0 backdrop-blur transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100',
                  active === section.id && 'text-primary'
              )}
          >
            {section.label}
          </span>
              <span
                  className={cn(
                      'h-2 w-2 rounded-full border border-white/30 transition-all duration-300',
                      active === section.id
                          ? 'scale-125 border-primary bg-primary shadow-neon-sm'
                          : 'bg-transparent group-hover:border-white/60'
                  )}
              />
            </button>
        ))}
      </motion.nav>
  );
}
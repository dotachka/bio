'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { SectionId } from '@/types';
import { cn } from '@/utils/cn';

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'hero', label: 'Главная' },
  { id: 'hardware', label: 'Конфиг' },
  { id: 'steam', label: 'Игры' },
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
    <>
      {/* Десктоп — боковой dock справа */}
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

      {/* Мобильная/планшетная навигация — нижний бар */}
      <motion.nav
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-1 border-t border-white/10 bg-black/70 px-2 py-2 backdrop-blur-lg lg:hidden"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
        aria-label="Навигация по разделам системы"
      >
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => goTo(section.id)}
            className="flex flex-1 flex-col items-center gap-1 rounded-lg px-1 py-1.5 transition-colors"
            aria-label={`Перейти к разделу ${section.label}`}
          >
            <span
              className={cn(
                'h-1.5 w-1.5 rounded-full border border-white/30 transition-all duration-300',
                active === section.id
                  ? 'scale-125 border-primary bg-primary shadow-neon-sm'
                  : 'bg-transparent'
              )}
            />
            <span
              className={cn(
                'text-center font-grotesk text-[9px] leading-none text-text-secondary transition-colors',
                active === section.id && 'text-primary'
              )}
            >
              {section.label}
            </span>
          </button>
        ))}
      </motion.nav>
    </>
  );
}

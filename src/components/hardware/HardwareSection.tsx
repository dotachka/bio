'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { hardwareConfig } from '@/lib/hardware-data';
import { hardwareIcons } from './hardware-icons';

export function HardwareSection() {
  return (
    <section id="hardware" className="relative px-6 py-32 md:px-16">
      <SectionHeader
        index="01 · ЯДРО СИСТЕМЫ"
        title="Компьютер"
        subtitle="Сердце всей системы — конфигурация, на которой создаётся каждое мое творение"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hardwareConfig.map((item, i) => {
          const Icon = hardwareIcons[item.icon];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] p-6 transition-all duration-300 hover:border-primary/30"
              style={{ background: 'rgba(14,14,14,0.7)', backdropFilter: 'blur(20px)' }}
            >
              {/* hover glow */}
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                style={{ background: 'radial-gradient(circle, #ff204e, transparent 70%)' }}
              />

              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {Icon && <Icon size={20} />}
                </span>
                <span className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-text-secondary">
                  {item.category}
                </span>
              </div>

              <h3 className="font-grotesk text-base font-semibold leading-tight text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">{item.value}</p>
              {item.description && (
                <p className="mt-2 text-xs text-text-secondary">{item.description}</p>
              )}

              {/* нижняя линия-акцент */}
              <div
                className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:w-full"
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

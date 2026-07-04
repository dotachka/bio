'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { contacts } from '@/lib/contacts-data';
import { contactIcons } from './contact-icons';

export function ContactsSection() {
  return (
    <section id="contacts" className="relative overflow-hidden px-6 py-32 md:px-16">
      <div className="absolute inset-0 bg-glow-radial opacity-70" />

      <SectionHeader
        index="07 · ВЫХОД НА СВЯЗЬ"
        title="Контакты"
        subtitle="Не пишите и не переходите"
      />

      <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact, i) => {
          const Icon = contactIcons[contact.icon];
          return (
            <motion.a
              key={contact.id}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur-xl transition-shadow duration-300 hover:shadow-neon"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-secondary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20 group-hover:from-primary group-hover:to-secondary" />
              <div className="relative flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-primary">
                  {Icon && <Icon size={22} />}
                </span>
                <div>
                  <p className="font-grotesk text-lg font-medium">{contact.label}</p>
                  <p className="text-sm text-text-secondary">{contact.value}</p>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      <p className="relative mt-20 text-center font-grotesk text-xs tracking-[0.3em] text-text-secondary">
        DOTACHKA · СИСТЕМА АКТИВНА
      </p>
    </section>
  );
}

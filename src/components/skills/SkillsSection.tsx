'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { skills } from '@/lib/skills-data';

export function SkillsSection() {
  return (
    <section id="skills" className="relative px-6 py-32 md:px-16">
      <SectionHeader index="05 · НАВЫКИ" title="Навыки" subtitle="Технологии, в которых я не шарю" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="glass rounded-2xl border border-white/10 p-6"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-grotesk text-lg font-medium">{skill.name}</h3>
              <span className="text-sm text-secondary">{skill.level}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

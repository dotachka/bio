'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Gamepad2, GitBranch, Star, Rocket, Zap, type LucideIcon } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useSteamProfile } from '@/hooks/useSteamProfile';
import { projects } from '@/lib/projects-data';
import { useCountUp } from '@/hooks/useCountUp';
import { formatNumber } from '@/utils/cn';

interface GithubStats { repositoriesCount: number; totalStars: number; followers: number; }

interface StatBadge {
  id: string;
  Icon: LucideIcon;
  label: string;
  sublabel: string;
  value: number;
  suffix?: string;
  color: string;
  description: string;
  maxValue?: number;
  wide?: boolean;
}

function StatCard({ badge, index }: { badge: StatBadge; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const value = useCountUp(badge.value, isInView);
  const progress = badge.maxValue ? Math.min((badge.value / badge.maxValue) * 100, 100) : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] p-6 transition-all duration-300 hover:border-white/20 ${badge.wide ? 'md:col-span-2' : ''}`}
      style={{ background: 'rgba(12,12,12,0.7)', backdropFilter: 'blur(20px)' }}
    >
      {/* hover glow */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: `radial-gradient(circle, ${badge.color}, transparent 70%)` }}
      />

      {/* Иконка — точь-в-точь как в контактах */}
      <div className="mb-5 flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.05)',
            boxShadow: `0 0 12px ${badge.color}55, inset 0 0 0 1px ${badge.color}30`
          }}
        >
          <badge.Icon size={16} style={{ color: badge.color, filter: `drop-shadow(0 0 4px ${badge.color})` }} />
        </span>
        <div>
          <p className="font-grotesk text-[11px] font-medium text-white/90">{badge.label}</p>
          <p className="font-grotesk text-[9px] tracking-widest text-text-secondary uppercase">{badge.sublabel}</p>
        </div>
      </div>

      {/* Число */}
      <p
        className="font-grotesk text-5xl font-bold leading-none md:text-6xl"
        style={{ color: badge.color, textShadow: `0 0 24px ${badge.color}60` }}
      >
        {formatNumber(value)}{badge.suffix ?? ''}
      </p>
      <p className="mt-2 text-sm text-text-secondary">{badge.description}</p>

      {/* Прогресс */}
      {progress !== null && (
        <div className="mt-5 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${progress}%` } : {}}
            transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${badge.color}, ${badge.color}55)` }}
          />
        </div>
      )}
    </motion.div>
  );
}

export function StatisticsSection() {
  const { profile } = useSteamProfile();
  const [github, setGithub] = useState<GithubStats | null>(null);

  useEffect(() => {
    fetch('/api/github').then(r => r.json()).then(d => { if (!d.error) setGithub(d); }).catch(() => {});
  }, []);

  const hoursPlayed = profile ? Math.round(profile.totalHoursPlayed / 60) : 0;
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  const badges: StatBadge[] = [
    { id: 'hours',    Icon: Gamepad2,  label: 'Часов в играх',       sublabel: 'Steam · всего сыграно', value: hoursPlayed,                    color: '#ff204e', description: 'Мог бы выучить C++. Не выучил.', maxValue: 500, wide: true },
    { id: 'repos',    Icon: GitBranch, label: 'Репозиториев',         sublabel: 'GitHub · публичные',    value: github?.repositoriesCount ?? 0, color: '#8b3dff', description: 'Публичных проектов', maxValue: 50 },
    { id: 'level',    Icon: Zap,       label: 'Уровень Steam',        sublabel: 'Steam · профиль',       value: profile?.level ?? 0,            color: '#4fc3f7', description: profile?.nickname ?? '...', maxValue: 100 },
    { id: 'projects', Icon: Rocket,    label: 'Завершённых проектов', sublabel: 'Портфолио',             value: completedProjects,              color: '#ff6b35', description: 'Задеплоено и работает' },
    { id: 'stars',    Icon: Star,      label: 'Звёзд',                sublabel: 'GitHub · stars',        value: github?.totalStars ?? 0,        color: '#f0b840', description: 'Скоро будет больше' },
  ];

  return (
    <section id="statistics" className="relative px-6 py-32 md:px-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #8b3dff, transparent 70%)' }} />
      <SectionHeader index="06 · МОНИТОРИНГ" title="Статистика" subtitle="Цифры дает мне великий Габен" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge, i) => <StatCard key={badge.id} badge={badge} index={i} />)}
      </div>
    </section>
  );
}

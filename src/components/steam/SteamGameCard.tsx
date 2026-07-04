'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatHours } from '@/utils/cn';
import type { SteamGame } from '@/types';

export function SteamGameCard({ game, delay = 0 }: { game: SteamGame; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl border border-white/10"
    >
      <div className="relative h-32 w-full">
        <Image
          src={game.imageUrl}
          alt={game.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="truncate font-grotesk text-sm font-medium">{game.name}</p>
        <p className="text-xs text-text-secondary">{formatHours(game.hoursPlayed)} часов</p>
      </div>
      {game.isFavorite && (
        <span className="absolute right-2 top-2 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
          The best
        </span>
      )}
    </motion.div>
  );
}

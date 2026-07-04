'use client';

import Image from 'next/image';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { formatHours, formatNumber } from '@/utils/cn';
import type { SteamProfile } from '@/types';

const STATUS_LABELS: Record<SteamProfile['status'], string> = {
  online: 'В сети',
  offline: 'Не в сети',
  away: 'Отошёл',
  busy: 'Не беспокоить',
  'in-game': 'В игре'
};

const STATUS_COLOR: Record<SteamProfile['status'], string> = {
  online: 'bg-green-400',
  offline: 'bg-gray-500',
  away: 'bg-yellow-400',
  busy: 'bg-red-400',
  'in-game': 'bg-primary'
};

export function SteamProfileCard({ profile }: { profile: SteamProfile }) {
  return (
    <GlassPanel className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 ring-primary/40">
        <Image src={profile.avatarUrl} alt={profile.nickname} fill className="object-cover" />
      </div>
      <div>
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <h3 className="font-grotesk text-xl font-medium">{profile.nickname}</h3>
          <span className={`h-2 w-2 rounded-full ${STATUS_COLOR[profile.status]}`} />
        </div>
        <p className="text-sm text-text-secondary">{STATUS_LABELS[profile.status]}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm sm:justify-start">
          <span className="text-secondary">Уровень {profile.level}</span>
          <span className="text-text-secondary">{formatNumber(profile.gamesCount)} игр</span>
          <span className="text-text-secondary">
            {formatHours(profile.totalHoursPlayed)} ч в играх
          </span>
        </div>
      </div>
    </GlassPanel>
  );
}

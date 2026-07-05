'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { useSteamProfile } from '@/hooks/useSteamProfile';
import { SteamProfileCard } from './SteamProfileCard';
import { SteamGameCard } from './SteamGameCard';

export function SteamSection() {
  const { profile, games, isLoading, error } = useSteamProfile();

  const isPrivate = error?.includes('PRIVATE_PROFILE') || error?.includes('Сведения об играх');

  return (
    <section id="steam" className="relative px-5 py-20 sm:px-6 sm:py-24 md:px-16 md:py-32">
      <SectionHeader
        index="02 · ИГРУШКИ ТУДА СЮДА"
        title="Steam"
        subtitle="Данные подключены через мой профиль стима"
      />

      {isLoading && (
        <p className="font-grotesk text-sm text-text-secondary">Подключение к Steam...</p>
      )}

      {!isLoading && error && (
        <GlassPanel hover={false} className="max-w-xl">
          {isPrivate ? (
            <div className="flex flex-col gap-2">
              <p className="font-grotesk text-sm font-medium text-primary">🔒 Профиль Steam закрыт</p>
              <p className="text-sm text-text-secondary">
                Зайди в Steam → Настройки → Конфиденциальность → <strong className="text-white">&quot;Сведения об играх&quot;</strong> → поставь <strong className="text-white">&quot;Открытый профиль&quot;</strong>
              </p>
            </div>
          ) : (
            <p className="text-sm text-text-secondary">
              {error} — добавь <code className="text-primary">STEAM_API_KEY</code> и <code className="text-primary">STEAM_ID</code> в <code>.env.local</code>
            </p>
          )}
        </GlassPanel>
      )}

      {!isLoading && profile && (
        <div className="flex flex-col gap-10">
          <SteamProfileCard profile={profile} />
          <div>
            <h3 className="mb-4 font-grotesk text-lg text-text-secondary">Избранные игры</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {games.map((game, i) => (
                <SteamGameCard key={game.appId} game={game} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

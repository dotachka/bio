'use client';

import { useEffect, useState } from 'react';
import type { SteamGame, SteamProfile } from '@/types';

interface SteamData {
  profile: SteamProfile | null;
  games: SteamGame[];
  isLoading: boolean;
  error: string | null;
}

export function useSteamProfile(): SteamData {
  const [data, setData] = useState<SteamData>({
    profile: null,
    games: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/steam');
        const json = await res.json();

        if (cancelled) return;

        if (!res.ok) {
          setData({ profile: null, games: [], isLoading: false, error: json.error });
          return;
        }

        setData({ profile: json.profile, games: json.games, isLoading: false, error: null });
      } catch {
        if (!cancelled) {
          setData({
            profile: null,
            games: [],
            isLoading: false,
            error: 'Ошибка подключения к Steam'
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}

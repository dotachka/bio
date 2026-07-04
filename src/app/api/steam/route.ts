import { NextResponse } from 'next/server';
import type { SteamGame, SteamProfile } from '@/types';
import { FEATURED_APP_IDS } from '@/lib/featured-games';

const STEAM_API_BASE = 'https://api.steampowered.com';

function mapPersonaState(state: number): SteamProfile['status'] {
  switch (state) {
    case 0: return 'offline';
    case 1: return 'online';
    case 2: return 'busy';
    case 3: return 'away';
    default: return 'in-game';
  }
}

export async function GET() {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;

  if (!apiKey || !steamId) {
    return NextResponse.json({ error: 'STEAM_API_KEY и STEAM_ID не заданы' }, { status: 503 });
  }

  const cacheOpts: RequestInit =
    process.env.NODE_ENV === 'development'
      ? { cache: 'no-store' }
      : { next: { revalidate: 300 } } as RequestInit;

  try {
    const [summaryRes, gamesRes, levelRes] = await Promise.all([
      fetch(`${STEAM_API_BASE}/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`, cacheOpts),
      fetch(`${STEAM_API_BASE}/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&include_appinfo=1&include_played_free_games=1`, cacheOpts),
      fetch(`${STEAM_API_BASE}/IPlayerService/GetSteamLevel/v1/?key=${apiKey}&steamid=${steamId}`, cacheOpts)
    ]);

    const summaryData = await summaryRes.json();
    const gamesData = await gamesRes.json();
    const levelData = await levelRes.json();

    const player = summaryData?.response?.players?.[0];
    if (!player) throw new Error('Профиль Steam не найден');

    // Если games отсутствует — профиль приватный
    const gamesRaw = gamesData?.response?.games;
    if (!gamesRaw) {
      return NextResponse.json({
        error: 'PRIVATE_PROFILE',
        message: 'Список игр недоступен. Зайди в Steam → Настройки → Приватность → "Сведения об играх" → выставь "Открытый профиль"'
      }, { status: 403 });
    }

    type SteamApiGame = { appid: number; name: string; playtime_forever: number; rtime_last_played?: number };
    const games: SteamApiGame[] = gamesRaw;

    const profile: SteamProfile = {
      steamId: player.steamid,
      nickname: player.personaname,
      avatarUrl: player.avatarfull,
      status: mapPersonaState(player.personastate),
      level: levelData?.response?.player_level ?? 0,
      gamesCount: gamesData?.response?.game_count ?? games.length,
      totalHoursPlayed: games.reduce((sum, g) => sum + g.playtime_forever, 0),
      friendsCount: 0
    };

    const gamesById = new Map<number, SteamApiGame>(games.map((g) => [g.appid, g]));

    let selectedGames: SteamApiGame[];
    if (FEATURED_APP_IDS.length > 0) {
      selectedGames = FEATURED_APP_IDS.map((id) => gamesById.get(id)).filter((g): g is SteamApiGame => Boolean(g));
    } else {
      selectedGames = [...games].sort((a, b) => b.playtime_forever - a.playtime_forever).slice(0, 12);
    }

    // dev: показываем какие ID не нашлись (помогает отладить)
    if (process.env.NODE_ENV === 'development') {
      const missing = FEATURED_APP_IDS.filter((id) => !gamesById.has(id));
      if (missing.length > 0) console.warn('[Steam] Не найдены appid:', missing, '| Всего игр в библиотеке:', games.length);
    }

    const sortedGames: SteamGame[] = selectedGames.map((g) => ({
      appId: g.appid,
      name: g.name,
      imageUrl: `https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
      hoursPlayed: g.playtime_forever,
      lastPlayed: g.rtime_last_played ? new Date(g.rtime_last_played * 1000).toISOString() : null,
      isFavorite: g.playtime_forever > 1000
    }));

    return NextResponse.json({ profile, games: sortedGames });
  } catch (error) {
    return NextResponse.json({ error: 'Не удалось загрузить данные Steam', details: String(error) }, { status: 502 });
  }
}

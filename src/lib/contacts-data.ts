import type { ContactLink } from '@/types';

/** Замените value/href на свои реальные ссылки и идентификаторы. */
export const contacts: ContactLink[] = [
  {
    id: 'telegram',
    label: 'Telegram',
    value: '@Mrdotachka',
    href: 'https://t.me/mrdotachka',
    icon: 'telegram'
  },
  {
    id: 'steam',
    label: 'Steam',
    value: 'dotachka',
    href: 'https://steamcommunity.com/profiles/76561199490249254/',
    icon: 'steam'
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'dotachka',
    href: 'https://github.com/dotachka',
    icon: 'github'
  },
  {
    id: 'discord',
    label: 'Discord',
    value: 'dotachka',
    href: 'https://discord.com/users/mrdotachka',
    icon: 'discord'
  },
  {
    id: 'email',
    label: 'TgChanel',
    value: 'Lifechik',
    href: 'https://t.me/+ONsEMkw4lg8xMjli',
    icon: 'telegram'
  },
  {
    id: 'TikTok',
    label: 'TikTok',
    value: 'Mrdotachka',
    href: 'https://www.tiktok.com/@mrdotachka?_r=1&_t=ZP-97tmAyUd1lG',
    icon: 'TikTok'
  },
];

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
    label: 'Email',
    value: 'hello@dotaa.dev',
    href: 'mailto:hello@dotaa.dev',
    icon: 'email'
  }
];

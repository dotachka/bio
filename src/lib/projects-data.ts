import type { Project } from '@/types';

/**
 * ВАЖНО: замените содержимое этого файла на ваши реальные проекты.
 * Структура полностью готова — просто впишите свои данные,
 * пути к скриншотам (public/images/projects/...) и ссылки.
 */
export const projects: Project[] = [
  {
    id: 'DotaVpn',
    title: 'VpnDota',
    shortDescription: 'Самый лучший в мире бот для выдачи ключей впн',
    fullDescription:
      'Помогает от запретов и 政府和RCN的混蛋 ',
    logoUrl: 'https://i.ibb.co/pv37VCQJ/image.png',
    technologies: ['Python', 'Js', 'HTML/CSS'],
    screenshots: [
      'https://i.ibb.co/hJsMXQVr/50a76063c2f6906997adaf78af61fe6d.jpg',
      'https://i.ibb.co/CsTsJ96r/11ea791d4c61f4de604dfce8bd1999ee.jpg'
    ],
    githubUrl: 'https://github.com/dotachka/vpn-bot-ui',
    demoUrl: '',
    status: 'completed',
    year: 2025
  },
  {
    id: 'Bloker',
    title: 'Bloker',
    shortDescription: 'Ограничитель времени в телефоне',
    fullDescription:
      'Помогает вам ограничит ваше время в телефоне, дает мат задачи, если вы пытаетесь зайти в блокнутое приложение, так же встроенная библиотека',
    logoUrl: 'https://i.ibb.co/LDBYq3Ym/ic-launcher.png',
    technologies: ['Python', 'Docker', 'Automation'],
    screenshots: ['https://i.ibb.co/QjpWCCnh/image.png'],
    githubUrl: 'https://github.com/dotachka/bloker',
    demoUrl: '',
    status: 'in-progress',
    year: 2026
  }
];

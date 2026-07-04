# DOTAA — персональная цифровая система

Интерактивное портфолио, оформленное как операционная система, построенная вокруг игрового компьютера. Next.js 15, TypeScript, TailwindCSS, Three.js (React Three Fiber), Framer Motion, GSAP, Lenis.

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`.

## Подключение Steam

1. Получите ключ API: https://steamcommunity.com/dev/apikey
2. Узнайте свой 64-битный SteamID: https://steamid.io
3. Скопируйте `.env.local.example` в `.env.local` и заполните `STEAM_API_KEY` и `STEAM_ID`.

Без ключей раздел Steam покажет аккуратное сообщение с инструкцией вместо ошибки.

## Подключение GitHub-статистики

В `.env.local` укажите `GITHUB_USERNAME` (и опционально `GITHUB_TOKEN` для увеличения лимита запросов).

## Что нужно донастроить вручную

- `src/lib/projects-data.ts` — впишите свои реальные проекты, скриншоты (`public/images/projects/...`) и ссылки.
- `src/lib/contacts-data.ts` — замените на свои реальные ссылки.
- `src/components/workspace/WorkspaceSection.tsx` — замените плейсхолдер-блок на реальное фото рабочего места (`public/images/workspace.jpg`).
- 3D-модель компьютера в `src/components/three/PCModel.tsx` собрана процедурно (без готового `.glb`). Если у вас есть готовый 3D-меш компьютера, замените содержимое компонента на загрузку модели через `useGLTF` из `@react-three/drei` — структура компонента уже готова для подмены.
- Иконка сайта: добавьте `favicon.ico` в `src/app/`.

## Структура проекта

```
src/
  app/                 # роуты Next.js (страница, API: steam, github)
  components/
    loading/           # экран загрузки
    hero/               # главный экран
    hardware/           # раздел "Компьютер"
    steam/               # раздел Steam
    projects/           # раздел "Проекты" (окна ОС)
    workspace/           # раздел "Рабочее место"
    skills/               # раздел "Навыки"
    statistics/           # раздел "Статистика"
    contacts/             # раздел "Контакты"
    background/           # фоновые эффекты
    three/                 # 3D-сцена компьютера (R3F)
    ui/                     # переиспользуемые UI-компоненты
  hooks/                 # useLenis, useSteamProfile, useCountUp
  lib/                   # данные (hardware, skills, projects, contacts)
  types/                 # TypeScript-типы
  utils/                 # утилиты (cn, форматирование чисел)
```

## Производительность

- 3D-сцена подключена через `next/dynamic` с `ssr: false` (код не попадает в основной бандл).
- Изображения — через `next/image`.
- Плавный скролл — Lenis, синхронизированный с `requestAnimationFrame`.
- Анимации появления используют `whileInView` с `once: true`, чтобы не пересчитываться повторно.

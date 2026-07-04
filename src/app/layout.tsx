import type { Metadata, Viewport } from 'next';
import { Sora, Manrope } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { NoiseOverlay } from '@/components/background/NoiseOverlay';

// Geist в next/font/google сейчас падает с ошибкой "override values not found" —
// используем Sora: тот же чистый геометричный стиль, без этого бага.
const geist = Sora({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap'
});

// Space Grotesk не поддерживает кириллицу в next/font/google — Manrope того же
// геометрического духа и покрывает latin + cyrillic для всего русского интерфейса.
const spaceGrotesk = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-space-grotesk',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'DOTACHKA - все о легенде',
  description:
    'ХУЙ',
  icons: { icon: '/favicon.ico' }
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${geist.variable} ${spaceGrotesk.variable}`}>
      <body className="font-geist bg-background text-white antialiased selection:bg-primary/30">
        <NoiseOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

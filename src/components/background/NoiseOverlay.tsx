'use client';

export function NoiseOverlay() {
  return (
    <>
      {/* Статичная сетка через CSS вместо canvas — нулевая нагрузка на CPU */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,32,78,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,32,78,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          mixBlendMode: 'screen'
        }}
      />

      {/* Сканлайны через CSS-анимацию (GPU-композитинг, не JS) */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
        style={{ mixBlendMode: 'screen' }}
      >
        <div className="scanline scanline-1" />
        <div className="scanline scanline-2" />
      </div>

      {/* Шум — статичная SVG-текстура, не анимируется */}
      <div
        className="pointer-events-none fixed inset-0 z-[2] opacity-[0.028] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
        }}
      />

      {/* Статичные glow-пятна */}
      <div
        className="pointer-events-none fixed left-[15%] top-[20%] z-0 h-[500px] w-[500px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #ff204e, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="pointer-events-none fixed bottom-[15%] right-[10%] z-0 h-[400px] w-[400px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #8b3dff, transparent 70%)', filter: 'blur(40px)' }}
      />
    </>
  );
}

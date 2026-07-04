'use client';

import { useEffect, useRef } from 'react';

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const draw = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      ctx.clearRect(0, 0, W, H);

      // Сетка
      const step = 80;
      ctx.strokeStyle = 'rgba(255,32,78,0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Плавающие сканлайны
      const scanY = ((t * 0.4) % (H + 200)) - 100;
      const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.5, 'rgba(255,32,78,0.035)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 60, W, 120);

      const scanY2 = ((t * 0.18 + H * 0.5) % (H + 200)) - 100;
      const grad2 = ctx.createLinearGradient(0, scanY2 - 40, 0, scanY2 + 40);
      grad2.addColorStop(0, 'transparent');
      grad2.addColorStop(0.5, 'rgba(139,61,255,0.025)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, scanY2 - 40, W, 80);

      t += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <>
      {/* Анимированный canvas — сетка + сканлайны */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Шум */}
      <div
        className="pointer-events-none fixed inset-0 z-[2] opacity-[0.028] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
        }}
      />

      {/* Постоянные glow-пятна */}
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

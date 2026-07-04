'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function HeroVideo() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);
  const rotateX = useTransform(springY, [-1, 1], [4, -4]);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-full w-full items-center justify-center"
      style={{ perspective: 1000 }}
    >
      {/* фоновое свечение */}
      <div
        className="pointer-events-none absolute h-[70%] w-[70%] rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, #ff204e, transparent 70%)', filter: 'blur(40px)' }}
      />

      <motion.div
        style={{ rotateY, rotateX, transformStyle: 'preserve-3d', boxShadow: '0 0 40px rgba(255,32,78,0.2), 0 0 80px rgba(139,61,255,0.12)' }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10"
      >
        <video
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
        {/* лёгкая неоновая рамка поверх */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{ boxShadow: 'inset 0 0 30px rgba(255,32,78,0.15)' }}
        />
      </motion.div>
    </div>
  );
}

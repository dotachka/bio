'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { HeroVideo } from './HeroVideo';

export function Hero() {
  function enterSystem() {
    document.getElementById('hardware')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="hero" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 lg:h-screen lg:py-0 md:px-16">
      <div className="absolute inset-0 bg-glow-radial" />
      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        {/* min-w-0 обязателен на грид-колонках — иначе текст может выдавливать соседнюю колонку вместо того чтобы сжиматься */}
        <div className="min-w-0">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="font-grotesk text-xs tracking-[0.3em] text-text-secondary sm:text-sm">
            ЛИЧНАЯ ИНФА · v1.0
          </motion.span>
          {/* Динамический размер шрифта через clamp() — плавно подстраивается под ширину экрана,
              не скачет по breakpoint'ам и никогда не вылезает за пределы колонки */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-grotesk font-semibold leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 8rem)' }}
          >
            DOTACHKA
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="mt-5 flex flex-wrap gap-3 font-grotesk text-base text-text-secondary sm:text-lg md:text-xl">
            <span>КОДЕР</span><span className="text-primary">·</span><span>ГЕЙмер</span><span className="text-primary">·</span><span>ИГРОК</span>
          </motion.div>
          <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} onClick={enterSystem} className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3.5 font-grotesk text-sm font-medium tracking-wide shadow-neon transition-transform duration-300 hover:scale-105 sm:mt-12 sm:px-8 sm:py-4 sm:text-base">
           УЗНАТЬ ИНФУ
            <ArrowDown size={18} className="transition-transform group-hover:translate-y-1" />
          </motion.button>
        </div>
        {/* min-w-0 + w-full — видео тоже не должно быть жёстко привязано к контенту, а сжиматься вместе с колонкой */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative h-[320px] w-full min-w-0 sm:h-[420px] md:h-[500px] lg:h-[760px]">
          <HeroVideo />
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-text-secondary lg:bottom-10 lg:block">
        <ArrowDown size={20} className="animate-float" />
      </motion.div>
    </section>
  );
}

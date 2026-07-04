'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BOOT_LINES = [
  'Инициализация системы...',
  'Загрузка оборудования...',
  'Подключение Steam...',
  'Загрузка проектов...',
  'Загрузка рабочего пространства...',
  'Запуск интерфейса...',
  'Добро пожаловать.'
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      const timeout = setTimeout(() => setIsDone(true), 500);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setLineIndex((i) => i + 1), 420);
    return () => clearTimeout(timeout);
  }, [lineIndex]);

  useEffect(() => {
    if (isDone) {
      const timeout = setTimeout(onComplete, 700);
      return () => clearTimeout(timeout);
    }
  }, [isDone, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="w-[min(90vw,520px)] font-grotesk text-sm text-text-secondary">
            {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={i === lineIndex - 1 ? 'text-white' : ''}
              >
                <span className="text-primary">{'>'}</span> {line}
              </motion.p>
            ))}
            <span className="mt-1 inline-block h-4 w-2 animate-blink bg-primary align-middle" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

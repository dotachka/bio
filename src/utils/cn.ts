import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(Math.round(value));
}

export function formatHours(minutes: number): string {
  return formatNumber(Math.round(minutes / 60));
}

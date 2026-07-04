import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#101010',
        primary: '#FF204E',
        secondary: '#8B3DFF',
        'text-secondary': '#B7B7B7'
      },
      fontFamily: {
        geist: ['var(--font-geist)', 'sans-serif'],
        grotesk: ['var(--font-space-grotesk)', 'sans-serif']
      },
      backgroundImage: {
        'glow-radial':
          'radial-gradient(circle at center, rgba(255,32,78,0.18) 0%, rgba(139,61,255,0.08) 45%, transparent 70%)'
      },
      boxShadow: {
        neon: '0 0 24px rgba(255,32,78,0.35), 0 0 48px rgba(139,61,255,0.15)',
        'neon-sm': '0 0 12px rgba(255,32,78,0.25)'
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite'
      },
      keyframes: {
        blink: { '50%': { opacity: '0' } },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        }
      }
    }
  },
  plugins: []
};

export default config;

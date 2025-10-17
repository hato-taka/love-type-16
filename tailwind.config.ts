import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
    './src/types/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        surface: '#ffffff',
        candy: {
          base: '#ff6fb7',
          soft: '#ffe3f1',
          accent: '#8fd3fe',
          plum: '#40254b',
          lavender: '#7a5c8d'
        }
      },
      fontFamily: {
        sans: [
          '"Zen Maru Gothic"',
          '"Noto Sans JP"',
          'system-ui',
          'sans-serif'
        ]
      },
      boxShadow: {
        pop: '0 12px 30px rgba(255, 111, 183, 0.20)',
        popHover: '0 18px 36px rgba(255, 111, 183, 0.28)',
        pastel: '0 18px 35px rgba(143, 211, 254, 0.28)'
      },
      borderRadius: {
        xl: '1.5rem'
      }
    }
  },
  plugins: []
};

export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f0f0f0',
        foreground: '#191919',
        accent: '#f9e291',
      },
      fontFamily: {
        kalice: ['var(--font-kalice)'],
        neue: ['var(--font-neue-montreal)'],
      },
      fontSize: {
        'hero-desktop': ['140px', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'hero-tablet': ['96px', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'hero-mobile': ['56px', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display': ['128px', { lineHeight: '0.95' }],
      },
      spacing: {
        '18': '72px',
        '22': '88px',
        '30': '120px',
        '32': '128px',
      },
      maxWidth: {
        'container': '1400px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;

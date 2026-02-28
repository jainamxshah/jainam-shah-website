import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#fffbf9',
        foreground: '#191919',
        accent: '#d28c3f',
      },
      fontFamily: {
        kalice: ['var(--font-kalice)'],
        neue: ['var(--font-neue-montreal)'],
      },
      fontSize: {
        // Reduced global font sizes
        'hero-desktop': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'hero-tablet': ['36px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'hero-mobile': ['28px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'display': ['64px', { lineHeight: '1.1' }],
        'section-title': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'section-title-sm': ['24px', { lineHeight: '1.3' }],
        'card-title': ['20px', { lineHeight: '1.3' }],
        'body-lg': ['16px', { lineHeight: '1.7' }],
        'body': ['15px', { lineHeight: '1.7' }],
        'body-sm': ['14px', { lineHeight: '1.6' }],
        'caption': ['12px', { lineHeight: '1.5' }],
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

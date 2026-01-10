import { Variants } from 'framer-motion';

// Smooth easing curve
export const smoothEase = [0.22, 1, 0.36, 1];

// Stagger container for hero headlines
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// Fade up animation for hero text lines
export const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

// Fade in animation for supporting text
export const fadeInVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: smoothEase,
      delay: 0.8,
    },
  },
};

// Stagger children for sections
export const sectionStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Card fade up for grid items
export const cardFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

// Scale hover for cards
export const scaleHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: smoothEase,
    },
  },
};

// Navigation underline animation
export const navUnderline: Variants = {
  initial: { scaleX: 0 },
  hover: {
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: smoothEase,
    },
  },
};

// Character scramble pool
export const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789↑→←↓';

// Get random character from pool
export const getRandomChar = (): string => {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
};

// Scramble text utility
export const scrambleText = (
  originalText: string,
  targetText: string,
  progress: number
): string => {
  const maxLength = Math.max(originalText.length, targetText.length);
  let result = '';

  for (let i = 0; i < maxLength; i++) {
    if (progress < 0.5) {
      // First half: scrambling from original
      const charProgress = progress * 2;
      if (Math.random() < charProgress) {
        result += getRandomChar();
      } else {
        result += originalText[i] || ' ';
      }
    } else {
      // Second half: revealing target
      const charProgress = (progress - 0.5) * 2;
      if (Math.random() < charProgress || i < progress * maxLength) {
        result += targetText[i] || ' ';
      } else {
        result += getRandomChar();
      }
    }
  }

  return result;
};


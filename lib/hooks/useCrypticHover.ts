'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%→↑';

interface UseCrypticHoverOptions {
  originalText: string;
  targetText: string;
  scrambleDuration?: number;
  morphDuration?: number;
}

interface UseCrypticHoverReturn {
  displayText: string;
  isAnimating: boolean;
  startAnimation: () => void;
  reverseAnimation: () => void;
  cancelAnimation: () => void;
}

export function useCrypticHover({
  originalText,
  targetText,
  scrambleDuration = 0.4,
  morphDuration = 0.3,
}: UseCrypticHoverOptions): UseCrypticHoverReturn {
  const [displayText, setDisplayText] = useState(originalText);
  const [isAnimating, setIsAnimating] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastHoverTime = useRef<number>(0);

  const getRandomChar = useCallback(() => {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }, []);

  const cancelAnimation = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const runScrambleAnimation = useCallback(
    (from: string, to: string, onComplete?: () => void) => {
      cancelAnimation();
      setIsAnimating(true);

      const maxLength = Math.max(from.length, to.length);
      const totalDuration = (scrambleDuration + morphDuration) * 1000;
      const scrambleEndTime = scrambleDuration * 1000;
      const startTime = performance.now();

      // Character-specific delays for more organic feel
      const charDelays = Array.from({ length: maxLength }, () => Math.random() * 50);

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);

        let result = '';

        for (let i = 0; i < maxLength; i++) {
          const charElapsed = elapsed - charDelays[i];

          if (charElapsed < 0) {
            // Haven't started this character yet
            result += from[i] || ' ';
          } else if (charElapsed < scrambleEndTime) {
            // Scramble phase - random characters cycling
            const scrambleProgress = charElapsed / scrambleEndTime;
            // More scrambling as we progress
            if (Math.random() < 0.3 + scrambleProgress * 0.5) {
              result += getRandomChar();
            } else {
              result += from[i] || ' ';
            }
          } else {
            // Morph phase - gradually reveal target
            const morphElapsed = charElapsed - scrambleEndTime;
            const morphDurationMs = morphDuration * 1000;
            const morphProgress = Math.min(morphElapsed / morphDurationMs, 1);

            // Left-to-right reveal with some randomness
            const charPosition = i / maxLength;
            const revealThreshold = morphProgress * 1.3; // Slight overshoot for smoother reveal

            if (charPosition < revealThreshold || Math.random() < morphProgress * 0.5) {
              result += to[i] || ' ';
            } else {
              result += getRandomChar();
            }
          }
        }

        setDisplayText(result.trim() || to);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayText(to);
          setIsAnimating(false);
          onComplete?.();
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    },
    [cancelAnimation, getRandomChar, scrambleDuration, morphDuration]
  );

  const startAnimation = useCallback(() => {
    const now = Date.now();
    // Debounce rapid hover triggers
    if (now - lastHoverTime.current < 100) return;
    lastHoverTime.current = now;

    runScrambleAnimation(originalText.toUpperCase(), targetText);
  }, [originalText, targetText, runScrambleAnimation]);

  const reverseAnimation = useCallback(() => {
    const now = Date.now();
    if (now - lastHoverTime.current < 100) return;
    lastHoverTime.current = now;

    runScrambleAnimation(targetText, originalText.toUpperCase());
  }, [originalText, targetText, runScrambleAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimation();
    };
  }, [cancelAnimation]);

  // Reset display text when original text changes
  useEffect(() => {
    setDisplayText(originalText.toUpperCase());
  }, [originalText]);

  return {
    displayText,
    isAnimating,
    startAnimation,
    reverseAnimation,
    cancelAnimation,
  };
}


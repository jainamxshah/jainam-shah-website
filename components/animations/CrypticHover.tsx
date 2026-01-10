'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { SCRAMBLE_CHARS } from '@/lib/animations';

interface CrypticHoverProps {
  originalText: string;
  targetText: string;
  isHovering: boolean;
  className?: string;
}

export default function CrypticHover({
  originalText,
  targetText,
  isHovering,
  className = '',
}: CrypticHoverProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [displayText, setDisplayText] = useState(originalText);

  const getRandomChar = useCallback(() => {
    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }, []);

  const scrambleToTarget = useCallback(
    (from: string, to: string, duration: number = 0.6) => {
      const maxLength = Math.max(from.length, to.length);
      const chars = Array.from({ length: maxLength }, (_, i) => from[i] || ' ');

      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Scramble phase - characters become random
      const scrambleDuration = duration * 0.5;
      const iterations = Math.floor(scrambleDuration * 60); // ~60fps

      for (let frame = 0; frame < iterations; frame++) {
        const progress = frame / iterations;
        tl.call(
          () => {
            const scrambled = chars.map((char) => {
              // More characters scramble as we progress
              if (Math.random() < progress * 0.8) {
                return getRandomChar();
              }
              return char;
            });
            setDisplayText(scrambled.join(''));
          },
          [],
          frame * (scrambleDuration / iterations)
        );
      }

      // Reveal phase - characters resolve to target
      const revealDuration = duration * 0.5;
      const revealIterations = Math.floor(revealDuration * 60);

      for (let frame = 0; frame < revealIterations; frame++) {
        const progress = frame / revealIterations;
        tl.call(
          () => {
            const revealed = Array.from({ length: maxLength }, (_, i) => {
              const targetChar = to[i] || ' ';
              // Characters resolve from left to right with some randomness
              if (i / maxLength < progress + Math.random() * 0.3) {
                return targetChar;
              }
              return getRandomChar();
            });
            setDisplayText(revealed.join(''));
          },
          [],
          scrambleDuration + frame * (revealDuration / revealIterations)
        );
      }

      // Final state
      tl.call(() => {
        setDisplayText(to);
      });

      return tl;
    },
    [getRandomChar]
  );

  useEffect(() => {
    if (isHovering) {
      scrambleToTarget(originalText, targetText, 0.6);
    } else {
      scrambleToTarget(targetText, originalText, 0.4);
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isHovering, originalText, targetText, scrambleToTarget]);

  return (
    <span
      ref={textRef}
      className={`font-mono tracking-wider ${className}`}
      aria-label={isHovering ? targetText : originalText}
    >
      {displayText}
    </span>
  );
}


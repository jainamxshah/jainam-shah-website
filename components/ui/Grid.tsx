'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GridProps {
  className?: string;
}

export default function Grid({ className = '' }: GridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Subtle parallax effect on scroll
    gsap.to(grid, {
      backgroundPosition: '0px 100px',
      ease: 'none',
      scrollTrigger: {
        trigger: grid,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className={`absolute inset-0 pointer-events-none grid-background ${className}`}
      aria-hidden="true"
    />
  );
}


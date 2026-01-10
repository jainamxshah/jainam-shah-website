'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { stats } from '@/lib/stats';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface CountUpProps {
  target: number;
  suffix?: string;
  displayValue: string;
  isInView: boolean;
}

function CountUp({ target, suffix = '', displayValue, isInView }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      const startValue = 0;

      const animateCount = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quad
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeProgress);
        
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isInView, target, hasAnimated]);

  return (
    <span>
      {displayValue.includes('K') && count >= 1000 
        ? `${Math.floor(count)}K` 
        : count}
      {suffix}
    </span>
  );
}

export default function ByTheNumbers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section className="bg-background py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16"
          >
            Impact By The Numbers
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="text-center"
              >
                <p className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-3 tabular-nums">
                  <CountUp
                    target={stat.value}
                    suffix={stat.suffix}
                    displayValue={stat.displayValue}
                    isInView={isInView}
                  />
                </p>
                <p className="font-sans text-sm md:text-base text-foreground/70">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


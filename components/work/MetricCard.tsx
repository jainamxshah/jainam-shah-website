'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface MetricCardProps {
  value: string;
  label: string;
  index: number;
}

export default function MetricCard({ value, label, index }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  // Extract numeric part and suffix from value
  const numericMatch = value.match(/^([\d.]+)(.*)$/);
  const numericPart = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const suffix = numericMatch ? numericMatch[2] : value;
  const isNumeric = numericMatch !== null;

  useEffect(() => {
    if (!isInView || !isNumeric) {
      if (!isNumeric) setDisplayValue(value);
      return;
    }

    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (numericPart - startValue) * easeProgress;

      // Format based on original value format
      if (numericPart % 1 === 0) {
        setDisplayValue(Math.round(currentValue) + suffix);
      } else {
        setDisplayValue(currentValue.toFixed(1) + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    // Small delay based on index for stagger effect
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, index * 150);

    return () => clearTimeout(timeoutId);
  }, [isInView, value, numericPart, suffix, isNumeric, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center md:text-left"
    >
      <motion.p
        initial={{ scale: 0.9 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
        className="font-kalice text-5xl md:text-6xl lg:text-7xl text-foreground"
      >
        {displayValue}
      </motion.p>
      <p className="text-sm md:text-base text-foreground/70 mt-2">{label}</p>
    </motion.div>
  );
}


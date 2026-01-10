'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Capability } from '@/lib/capabilities';

interface CapabilityBlockProps {
  capability: Capability;
  index: number;
  isLast: boolean;
}

export default function CapabilityBlock({ capability, index, isLast }: CapabilityBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`py-16 ${!isLast ? 'border-b border-foreground/[0.08]' : ''}`}
    >
      <h3 className="font-kalice text-4xl md:text-5xl text-foreground mb-6">
        {capability.title}
      </h3>
      <p className="text-lg md:text-xl text-foreground/85 leading-relaxed max-w-3xl mb-6">
        {capability.description}
      </p>
      {capability.bullets && (
        <ul className="space-y-2 max-w-3xl">
          {capability.bullets.map((bullet, bulletIndex) => (
            <li
              key={bulletIndex}
              className="text-base text-foreground/70 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-foreground/40"
            >
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}


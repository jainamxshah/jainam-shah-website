'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ProcessStep as ProcessStepType } from '@/lib/capabilities';

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
}

export default function ProcessStep({ step, index }: ProcessStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center md:text-left"
    >
      <span className="text-sm text-accent uppercase tracking-widest font-medium mb-3 block">
        {step.number}
      </span>
      <h4 className="text-xl md:text-2xl font-medium text-foreground mb-3">{step.title}</h4>
      <p className="text-base text-foreground/70 leading-relaxed">{step.description}</p>
    </motion.div>
  );
}


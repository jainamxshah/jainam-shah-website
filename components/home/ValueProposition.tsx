'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { sectionStagger, cardFadeUp } from '@/lib/animations';

const propositions = [
  {
    headline: 'Strategy',
    description: 'We define what actually moves the needle.',
  },
  {
    headline: 'Execution',
    description: 'Engineered for performance, not demos.',
  },
  {
    headline: 'Growth',
    description: 'Visibility, conversion, and compounding ROI.',
  },
];

export default function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container-main">
        <motion.div
          variants={sectionStagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
        >
          {propositions.map((prop, index) => (
            <motion.div key={index} variants={cardFadeUp} className="text-left">
              <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">
                {prop.headline}
              </h3>
              <p className="text-base text-foreground/60 leading-relaxed">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


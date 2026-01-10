'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const approaches = [
  {
    number: '01',
    title: 'Business-First Thinking',
    description: 'I start by understanding your market, users, and competitive landscape—not with wireframes.',
  },
  {
    number: '02',
    title: 'AI as Advantage',
    description: 'I identify where AI can create real differentiation, not just add trendy features.',
  },
  {
    number: '03',
    title: 'Performance Obsessed',
    description: 'Every decision optimized for speed, conversion, and search visibility.',
  },
  {
    number: '04',
    title: 'Measurable Outcomes',
    description: 'I define success metrics upfront and optimize relentlessly toward them.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

export default function Approach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section className="bg-background py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-16"
          >
            My Approach to Projects
          </motion.h2>

          <div className="space-y-12">
            {approaches.map((approach) => (
              <motion.div key={approach.number} variants={itemVariants}>
                {/* Number */}
                <span className="font-sans text-sm uppercase tracking-widest text-accent mb-3 block">
                  {approach.number}
                </span>

                {/* Title */}
                <h3 className="font-sans text-xl md:text-2xl lg:text-3xl font-medium text-foreground mb-3">
                  {approach.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-base md:text-lg text-foreground/85 leading-relaxed">
                  {approach.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


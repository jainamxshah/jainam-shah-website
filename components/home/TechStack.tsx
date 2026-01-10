'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { technologies } from '@/lib/technologies';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section className="bg-foreground py-20 md:py-24" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-background text-center mb-12"
          >
            Technologies I Work With
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {technologies.map((tech) => (
              <motion.span
                key={tech.name}
                variants={badgeVariants}
                className="font-sans text-sm text-background/90 bg-background/10 border border-background/20 px-5 py-3 rounded-lg hover:bg-accent/10 hover:border-accent transition-colors duration-300 cursor-default"
              >
                {tech.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


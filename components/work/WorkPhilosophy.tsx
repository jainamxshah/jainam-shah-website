'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

export default function WorkPhilosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section className="bg-foreground py-20 md:py-24" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Quote */}
          <motion.blockquote
            variants={itemVariants}
            className="font-display text-2xl md:text-3xl lg:text-4xl text-background leading-snug mb-6"
          >
            &quot;Every project is a business challenge, not just a design problem.&quot;
          </motion.blockquote>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base md:text-lg text-background/80 leading-relaxed max-w-2xl mx-auto"
          >
            I approach each project with strategic thinking, technical precision, and an obsession with measurable outcomes.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}


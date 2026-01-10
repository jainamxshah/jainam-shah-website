'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { industries } from '@/lib/industries';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export default function Industries() {
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
            className="font-sans text-2xl md:text-3xl lg:text-4xl font-medium text-background mb-12"
          >
            Industries I've Worked In
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <motion.div
                key={industry.id}
                variants={itemVariants}
                className="group bg-background/5 border border-background/10 rounded-xl p-6 md:p-8 hover:border-accent hover:bg-accent/5 transition-colors duration-300"
              >
                <h3 className="font-sans text-lg md:text-xl font-medium text-background mb-2 group-hover:text-accent transition-colors duration-300">
                  {industry.name}
                </h3>
                <p className="font-sans text-sm text-background/70 leading-relaxed">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


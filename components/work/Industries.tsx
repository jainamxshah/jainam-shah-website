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
    <section className="bg-background py-20 md:py-24" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="font-sans text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-12"
          >
            I&apos;ve worked with{' '}
            <span className="text-black">design</span> across{' '}
            <span className="text-black">various industries</span> and domains.
          </motion.h2>

          <div className="grid grid-cols-2 gap-6">
            {industries.map((industry) => (
              <motion.div
                key={industry.id}
                variants={itemVariants}
                className="bg-gray-100 rounded-lg p-6"
              >
                <p className="font-sans text-sm md:text-base text-black leading-relaxed">
                  {industry.name}, {industry.description.toLowerCase()}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section className="bg-background py-24 md:py-32 overflow-hidden" ref={ref} data-header-theme="light">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 lg:px-12 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Headline */}
          <motion.h2
            variants={itemVariants}
            className="font-kalice text-2xl md:text-3xl lg:text-[36px] text-foreground leading-[1.3] mb-10"
          >
            Ready to build something that actually wins?
          </motion.h2>

          {/* Buttons Container */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary Button */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto font-neue text-sm font-medium bg-foreground text-background px-8 py-3 rounded-lg hover:bg-accent hover:text-foreground transition-colors duration-300"
              >
                Start a Project
              </motion.button>
            </Link>

            {/* Secondary Button */}
            <Link href="/work">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto font-neue text-sm font-medium bg-transparent text-foreground border border-foreground px-8 py-3 rounded-lg hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                View My Work
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


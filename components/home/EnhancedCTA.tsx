'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

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

export default function EnhancedCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section className="bg-background py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Headline */}
          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
          >
            Let&apos;s build something that matters.
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto"
          >
            I work with founders and teams who are serious about winning.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary Button */}
            <Link href="/contact">
              <motion.button
                className="w-full sm:w-auto font-sans text-base font-medium bg-foreground text-background px-10 py-4 rounded-lg hover:bg-accent hover:text-foreground transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start a Project
              </motion.button>
            </Link>

            {/* Secondary Button */}
            <Link href="/work">
              <motion.button
                className="w-full sm:w-auto font-sans text-base font-medium bg-transparent text-foreground border-2 border-foreground px-10 py-4 rounded-lg hover:bg-foreground hover:text-background transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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


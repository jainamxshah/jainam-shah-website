'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const principles = [
  {
    heading: 'Builder',
    description:
      "I don't ship decks or demos. I ship working AI systems that users rely on and businesses monetize.",
  },
  {
    heading: 'Strategist',
    description:
      'Every feature, model, and interface is designed around growth, retention, and distribution.',
  },
  {
    heading: 'Owner',
    description:
      "I treat your product like it's my own—because outcomes matter more than deliverables.",
  },
];

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

export default function HowIShowUp() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section ref={ref} className="bg-background py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="font-kalice text-2xl md:text-3xl lg:text-[36px] text-foreground mb-6 text-center"
          >
            How I Show Up on Desk
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="font-neue text-base md:text-lg text-foreground/80 mb-10 text-center max-w-3xl mx-auto leading-relaxed"
          >
            I don&apos;t ship decks or demos. I ship working AI systems that users rely on and businesses monetize. Every feature, model, and interface is designed around growth, retention, and distribution.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.heading}
                variants={itemVariants}
                className="bg-foreground/5 rounded-lg p-6"
              >
                <h3 className="font-kalice text-lg md:text-xl font-medium text-foreground mb-2 text-center">
                  {principle.heading}
                </h3>
                <p className="font-neue text-sm md:text-base text-foreground leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

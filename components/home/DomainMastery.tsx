'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const domains = [
  {
    name: 'AI SaaS & Knowledge Systems',
    description: 'Building LLM-powered platforms that teams actually use in production.',
  },
  {
    name: 'Search-First Growth Products',
    description: 'Products engineered to compound organic traffic and discovery.',
  },
  {
    name: 'Fintech & Analytics',
    description: 'Real-time data systems, dashboards, and decision engines.',
  },
  {
    name: 'Healthcare & Diagnostics',
    description: 'AI systems designed for high-trust, high-accuracy environments.',
  },
  {
    name: 'B2B Internal Tools',
    description: 'Workflow automation and intelligence layers for teams.',
  },
];

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

const tileVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function DomainMastery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-background py-24 md:py-32" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[36px] text-foreground mb-10 md:mb-12"
        >
          Where I Operate
        </motion.h2>

        {/* Domain Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16"
        >
          {domains.map((domain) => (
            <motion.div
              key={domain.name}
              variants={tileVariants}
              className="group"
            >
              {/* Domain Name */}
              <h3 className="font-neue text-base md:text-lg lg:text-xl font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                {domain.name}
              </h3>

              {/* Outcome Description */}
              <p className="font-neue text-sm md:text-base text-foreground/75 leading-[1.6]">
                {domain.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


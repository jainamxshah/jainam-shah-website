'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const principles = [
  {
    heading: 'Builder',
    description: "I don't ship decks or demos. I ship working AI systems that users rely on and businesses monetize.",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4L4 14V34L24 44L44 34V14L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M4 14L24 24M24 24L44 14M24 24V44" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    heading: 'Strategist',
    description: 'Every feature, model, and interface is designed around growth, retention, and distribution.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
        <path d="M24 12V24L32 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="4" fill="currentColor"/>
      </svg>
    ),
  },
  {
    heading: 'Owner',
    description: "I treat your product like it's my own—because outcomes matter more than deliverables.",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4L28.5 17H42L31 26L35.5 40L24 31L12.5 40L17 26L6 17H19.5L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

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

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HowIShowUp() {
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
          className="font-kalice text-2xl md:text-3xl lg:text-[36px] text-foreground text-center mb-12 md:mb-16"
        >
          How I Show Up
        </motion.h2>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {principles.map((principle) => (
            <motion.div
              key={principle.heading}
              variants={cardVariants}
              className="group"
            >
              {/* Icon */}
              <div className="text-accent mb-4 transition-transform duration-300 group-hover:scale-110 [&>svg]:w-10 [&>svg]:h-10">
                {principle.icon}
              </div>

              {/* Heading */}
              <h3 className="font-neue text-lg md:text-xl font-semibold text-foreground mb-3">
                {principle.heading}
              </h3>

              {/* Description */}
              <p className="font-neue text-sm md:text-base text-foreground/80 leading-[1.6]">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const benefits = [
  {
    title: 'End-to-End Ownership',
    description: 'From strategy to launch, I own the entire product lifecycle. No handoffs, no gaps—just seamless execution.',
    icon: '→',
  },
  {
    title: 'AI-First Approach',
    description: 'Every product leverages modern AI capabilities to create competitive advantage and unlock new possibilities.',
    icon: '⚡',
  },
  {
    title: 'Business-Focused Results',
    description: 'I optimize for outcomes that matter: conversion rates, user growth, revenue impact, and compounding ROI.',
    icon: '↗',
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

export default function WhyChooseMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section className="bg-background py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-16 md:mb-20"
          >
            Why Partner With Me
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="group"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                  <span className="text-xl text-foreground">{benefit.icon}</span>
                </div>

                {/* Title */}
                <h3 className="font-sans text-2xl md:text-[1.75rem] font-medium text-foreground mb-4">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-base md:text-lg text-foreground/85 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


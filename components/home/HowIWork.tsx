'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Deep dive into your business, users, and market. I uncover what truly drives results.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Define the product roadmap, technical architecture, and go-to-market approach.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Engineer your product with AI capabilities, performance optimization, and user focus.',
  },
  {
    number: '04',
    title: 'Scale',
    description: 'Launch, measure, iterate. Grow through data-driven optimization and continuous improvement.',
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

export default function HowIWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section className="bg-foreground py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-background text-center mb-16 md:mb-20"
          >
            How I Work
          </motion.h2>

          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-6 left-0 right-0 h-[1px] bg-background/20" />
              
              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Number Badge */}
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-6">
                      <span className="font-sans text-foreground font-bold text-lg">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Content */}
                    <h3 className="font-sans text-xl md:text-2xl font-medium text-background mb-3">
                      {step.title}
                    </h3>
                    <p className="font-sans text-base text-background/80 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline (Vertical) */}
          <div className="md:hidden space-y-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative pl-16"
              >
                {/* Vertical Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-[1px] bg-background/20 -mb-10" />
                )}

                {/* Number Badge */}
                <div className="absolute left-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="font-sans text-foreground font-bold text-lg">
                    {step.number}
                  </span>
                </div>

                {/* Step Content */}
                <h3 className="font-sans text-xl font-medium text-background mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-base text-background/80 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


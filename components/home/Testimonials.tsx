'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { testimonials } from '@/lib/testimonials';

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

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-background py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16"
          >
            What Clients Say
          </motion.h2>

          {/* Testimonial Content */}
          <motion.div variants={itemVariants} className="text-center">
            {/* Quote Mark */}
            <span className="text-6xl md:text-8xl text-accent font-display leading-none block mb-4">
              &quot;
            </span>

            {/* Quote Text */}
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-sans text-xl md:text-2xl text-foreground leading-relaxed italic mb-8"
            >
              {testimonials[activeIndex].quote}
            </motion.p>

            {/* Author Info */}
            <motion.div
              key={`author-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="font-sans text-base font-medium text-foreground">
                {testimonials[activeIndex].author}
              </p>
              <p className="font-sans text-sm text-foreground/70">
                {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
              </p>
            </motion.div>
          </motion.div>

          {/* Navigation Dots */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-3 mt-10"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex
                    ? 'bg-accent'
                    : 'bg-foreground/30 hover:bg-foreground/50'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Philosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section className="bg-foreground py-24 md:py-32 overflow-hidden" ref={ref} data-header-theme="dark">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 lg:px-12 text-center">
        {/* Decorative Quote Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="font-kalice text-[48px] md:text-[64px] lg:text-[80px] text-accent leading-none select-none">
            &quot;
          </span>
        </motion.div>

        {/* Main Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-xl md:text-2xl lg:text-[32px] text-background leading-[1.4] mb-6"
        >
          AI doesn&apos;t win because it&apos;s impressive. It wins because it&apos;s embedded in real workflows that make money.
        </motion.blockquote>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-neue text-sm md:text-base text-background/70"
        >
          I design and engineer products that survive contact with reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4"
        >
          <span className="font-kalice text-[48px] md:text-[64px] lg:text-[80px] text-accent leading-none select-none">
            &quot;
          </span>
        </motion.div>
      </div>
    </section>
  );
}


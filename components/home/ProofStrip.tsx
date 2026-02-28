'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const products = [
  {
    name: 'Surfgeo',
    oneliner: 'AI-powered search and growth engine',
  },
  {
    name: 'Natasha',
    oneliner: 'Agentic assistant with persistent memory',
  },
  {
    name: 'LexRAG',
    oneliner: 'AI legal risk and contract intelligence',
  },
  {
    name: 'CARag',
    oneliner: 'Tax and compliance automation system',
  },
  {
    name: 'Punchly',
    oneliner: 'Effortless time tracking and intelligence',
  },
];

export default function ProofStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products];

  return (
    <section className="bg-foreground py-20 md:py-24 overflow-hidden" ref={ref} data-header-theme="dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-neue text-lg md:text-xl lg:text-2xl font-medium text-background text-center max-w-[800px] mx-auto mb-10 md:mb-12"
        >
          Built and scaled products across high-stakes industries:
        </motion.h2>

        {/* Infinite Horizontal Scroll */}
        <div className="overflow-hidden relative py-4">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />

          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6"
            animate={{
              x: ['0%', '-50%'], // Move by 50% (half the duplicated content)
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
            style={{ width: 'max-content' }}
          >
            {duplicatedProducts.map((product, index) => (
              <motion.div
                key={`${product.name}-${index}`}
                whileHover={{ y: -4, borderColor: 'rgba(210, 140, 63, 1)' }}
                transition={{ duration: 0.3 }}
                className="bg-background/5 border border-background/10 rounded-xl p-6 md:p-8 text-center cursor-default flex-shrink-0 w-[280px] md:w-[320px] relative"
                style={{
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.1) inset, 0 0 10px rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                {/* Product Name */}
                <h3 className="font-neue text-base md:text-lg font-medium text-background mb-1.5">
                  {product.name}
                </h3>

                {/* One-liner */}
                <p className="font-neue text-xs md:text-sm text-background/60 leading-[1.5]">
                  {product.oneliner}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


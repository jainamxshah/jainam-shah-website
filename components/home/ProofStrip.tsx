'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const products = [
  {
    name: 'Surfgeo',
    oneliner: 'AI-powered search and growth engine',
  },
  {
    name: 'Nexus AI',
    oneliner: 'Enterprise knowledge and RAG platform',
  },
  {
    name: 'Quantflow',
    oneliner: 'Real-time analytics & trading intelligence',
  },
  {
    name: 'Aura Health',
    oneliner: 'AI-powered diagnostic assistant',
  },
  {
    name: 'Voxel Commerce',
    oneliner: 'Conversational commerce system',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProofStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-foreground py-20 md:py-24" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-neue text-lg md:text-xl lg:text-2xl font-medium text-background text-center max-w-[800px] mx-auto mb-10 md:mb-12"
        >
          I&apos;ve built and scaled products across high-stakes industries:
        </motion.h2>

        {/* Product Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.name}
              variants={cardVariants}
              whileHover={{ y: -4, borderColor: 'rgba(249, 226, 145, 1)' }}
              transition={{ duration: 0.3 }}
              className="bg-background/5 border border-background/10 rounded-xl p-6 md:p-8 text-center cursor-default"
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
    </section>
  );
}


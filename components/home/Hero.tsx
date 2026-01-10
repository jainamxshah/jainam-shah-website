'use client';

import { motion } from 'framer-motion';
import Grid from '@/components/ui/Grid';
import { staggerContainer, fadeUpVariant, fadeInVariant } from '@/lib/animations';

const heroLines = ['Products', 'Built To Win', 'And Scale'];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid Background */}
      <Grid />

      {/* Content */}
      <div className="container-main relative z-10 pt-24 pb-16">
        <div className="max-w-5xl">
          {/* Main Headline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            {heroLines.map((line, index) => (
              <motion.h1
                key={index}
                variants={fadeUpVariant}
                className="font-kalice text-hero-mobile md:text-hero-tablet xl:text-hero-desktop text-foreground leading-none"
              >
                {line}
              </motion.h1>
            ))}
          </motion.div>

          {/* Supporting Tagline */}
          <motion.p
            variants={fadeInVariant}
            initial="hidden"
            animate="visible"
            className="text-base md:text-lg text-foreground/70 max-w-md ml-auto text-right"
          >
            AI-powered products engineered for serious companies
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-foreground/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}


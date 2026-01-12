'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ContactQualificationForm from '@/components/contact/ContactQualificationForm';

export default function ContactContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Section 1: Hero (Light) */}
      <HeroSection />

      {/* Section 2 & 3: Context Setting + Form (Light) */}
      <FormSection />

      {/* Section 4: Optional Direct Channel (Dark) */}
      <DirectChannelSection />
    </div>
  );
}

// ============================================
// SECTION 1: HERO
// ============================================

function HeroSection() {
  return (
    <section className="bg-background pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[40px] text-foreground leading-[1.3] mb-5"
        >
          Let&apos;s build something that wins.
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-neue text-sm md:text-base text-foreground/70 leading-[1.7] max-w-[600px] mx-auto"
        >
          Tell me a bit about your product, your goals, and where you want to go. If it looks like a strong fit, we&apos;ll take it forward.
        </motion.p>
      </div>
    </section>
  );
}

// ============================================
// SECTION 2 & 3: CONTEXT + FORM
// ============================================

function FormSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="bg-background py-4 md:py-6" ref={ref}>
      <div className="max-w-[700px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ContactQualificationForm />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 4: DIRECT CHANNEL
// ============================================

function DirectChannelSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-foreground py-20 md:py-24" ref={ref}>
      <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-neue text-sm md:text-base text-background/80 mb-6"
        >
          Prefer a direct intro?
        </motion.p>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4"
        >
          {/* Email Link */}
          <a
            href="mailto:hello@jainamshah.com"
            className="font-neue text-base text-accent hover:underline underline-offset-4 transition-all duration-300"
          >
            hello@jainamshah.com
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/jainamshah"
              target="_blank"
              rel="noopener noreferrer"
              className="font-neue text-sm text-background/80 hover:text-accent transition-colors duration-300"
            >
              LinkedIn
            </a>
            <span className="text-background/30">•</span>
            <a
              href="https://twitter.com/jainamshah"
              target="_blank"
              rel="noopener noreferrer"
              className="font-neue text-sm text-background/80 hover:text-accent transition-colors duration-300"
            >
              X / Twitter
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

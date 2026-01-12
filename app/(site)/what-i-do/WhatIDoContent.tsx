'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

// ============================================
// WHAT I DO PAGE - 7 Sections
// ============================================

export default function WhatIDoContent() {
  return (
    <div className="min-h-screen">
      {/* Section 1: Hero – Positioning Statement (Light) */}
      <HeroSection />
      
      {/* Section 2: Who I Work With (Light) */}
      <WhoIWorkWith />
      
      {/* Section 3: How I Create Leverage (Dark) */}
      <HowICreateLeverage />
      
      {/* Section 4: Core Capabilities (Light) */}
      <CoreCapabilities />
      
      {/* Section 5: The Way I Work (Dark) */}
      <TheWayIWork />
      
      {/* Section 6: What It Feels Like (Light) */}
      <WhatItFeelsLike />
      
      {/* Section 7: Call to Action (Dark) */}
      <CallToActionSection />
    </div>
  );
}

// ============================================
// SECTION 1: HERO
// ============================================

function HeroSection() {
  return (
    <section className="bg-background min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="max-w-[900px] mx-auto px-6 md:px-8 text-center">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[40px] text-foreground leading-[1.3] tracking-[-0.01em] mb-6"
        >
          I don&apos;t just build products. I help teams win markets.
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-neue text-sm md:text-base lg:text-lg text-foreground/75 leading-[1.7] max-w-[700px] mx-auto mb-10"
        >
          I work with founders and growth-stage teams building AI-powered products, helping them move from idea to traction to scale with clarity and momentum.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="font-neue text-sm font-medium bg-foreground text-background px-8 py-3 rounded-lg hover:bg-accent hover:text-foreground transition-colors duration-300"
            >
              Start a Conversation
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 2: WHO I WORK WITH
// ============================================

const idealFor = [
  'AI-first startups',
  'Growth-stage SaaS companies',
  'Teams modernizing their product stack',
  'Founders launching new platforms',
  'Companies competing in crowded markets',
];

function WhoIWorkWith() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-background py-20 md:py-24" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column – Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-neue text-sm md:text-base text-foreground/80 leading-[1.7] mb-5">
              I partner with ambitious founders, product teams, and operators who treat digital products as strategic assets—not side projects.
            </p>
            <p className="font-neue text-sm md:text-base text-foreground/80 leading-[1.7]">
              If you&apos;re building something that matters and want a partner who thinks about distribution, product, and technology as one system, we&apos;ll work well together.
            </p>
          </motion.div>

          {/* Right Column – Bullet List */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-neue text-base md:text-lg font-medium text-foreground mb-4">
              Ideal for
            </h3>
            <ul className="flex flex-col gap-2">
              {idealFor.map((item, index) => (
                <li key={index} className="font-neue text-sm text-foreground/70 flex items-start gap-2">
                  <span className="text-foreground/40">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 3: HOW I CREATE LEVERAGE
// ============================================

const leverageCards = [
  {
    title: 'Strategy',
    description: 'I help you decide what to build, what to ignore, and where to compete—using market insight, positioning, and data.',
  },
  {
    title: 'Systems',
    description: 'I architect the product, data, and AI systems that make your strategy real in production.',
  },
  {
    title: 'Growth',
    description: 'I design distribution, SEO, and conversion directly into the product so traction compounds over time.',
  },
];

function HowICreateLeverage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-foreground py-24 md:py-32" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[36px] text-background text-center mb-12"
        >
          How I Create Leverage
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {leverageCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, borderColor: 'rgba(249, 226, 145, 1)' }}
              className="bg-background/5 border border-background/10 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:bg-accent/5"
            >
              {/* Number */}
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <span className="font-neue text-xs text-accent font-bold">{String(index + 1).padStart(2, '0')}</span>
              </div>

              {/* Title */}
              <h3 className="font-neue text-lg md:text-xl font-semibold text-background mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="font-neue text-sm md:text-base text-background/75 leading-[1.6]">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 4: CORE CAPABILITIES
// ============================================

const capabilities = [
  {
    name: 'Product Strategy',
    description: 'Transform ambiguous ideas into clear product roadmaps, prioritization frameworks, and market positioning.',
  },
  {
    name: 'AI & Intelligent Systems',
    description: 'Design and build LLM-powered platforms, recommendation engines, and generative interfaces that create competitive advantage.',
  },
  {
    name: 'Conversion & Experience Design',
    description: 'Optimize every interface and flow for trust, clarity, and action—so users become customers.',
  },
  {
    name: 'Search-First Architecture',
    description: 'Engineer products to be discovered organically through technical SEO, content systems, and performance optimization.',
  },
];

function CoreCapabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-background py-24 md:py-32" ref={ref}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[36px] text-foreground mb-10"
        >
          Core Capabilities
        </motion.h2>

        {/* Capabilities List */}
        <div className="flex flex-col">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`py-10 md:py-12 ${index !== capabilities.length - 1 ? 'border-b border-foreground/8' : ''}`}
            >
              {/* Capability Name */}
              <h3 className="font-neue text-base md:text-lg lg:text-xl font-medium text-foreground mb-2">
                {capability.name}
              </h3>

              {/* Description */}
              <p className="font-neue text-sm md:text-base text-foreground/75 leading-[1.6] max-w-[700px]">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 5: THE WAY I WORK
// ============================================

const processSteps = [
  {
    number: '01',
    name: 'Discover',
    description: 'Understand your market, users, and competitive landscape.',
  },
  {
    number: '02',
    name: 'Design',
    description: 'Define the product, system architecture, and growth model.',
  },
  {
    number: '03',
    name: 'Build',
    description: 'Engineer scalable, production-grade AI products.',
  },
  {
    number: '04',
    name: 'Scale',
    description: 'Optimize distribution, performance, and conversion to compound results.',
  },
];

function TheWayIWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-foreground py-24 md:py-32" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[36px] text-background text-center mb-12"
        >
          The Way I Work
        </motion.h2>

        {/* Process Flow */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-background/20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Step Number */}
                <div className="inline-block mb-3">
                  <span className="font-neue text-xs uppercase tracking-[0.1em] text-accent">
                    {step.number}
                  </span>
                </div>

                {/* Step Name */}
                <h3 className="font-neue text-base md:text-lg font-semibold text-background mb-2">
                  {step.name}
                </h3>

                {/* Step Description */}
                <p className="font-neue text-sm text-background/70 leading-[1.6]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 6: WHAT IT FEELS LIKE
// ============================================

function WhatItFeelsLike() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-background py-24 md:py-32" ref={ref}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 lg:px-12 text-center">
        {/* Decorative Quote Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="font-kalice text-[48px] md:text-[64px] text-accent leading-none select-none">
            &quot;
          </span>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-xl md:text-2xl lg:text-[32px] text-foreground leading-[1.4]"
        >
          You don&apos;t get a vendor. You get a partner who thinks about your business as deeply as you do.
        </motion.blockquote>
      </div>
    </section>
  );
}

// ============================================
// SECTION 7: CALL TO ACTION
// ============================================

function CallToActionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-foreground py-24 md:py-32" ref={ref}>
      <div className="max-w-[800px] mx-auto px-6 md:px-8 lg:px-12 text-center">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[36px] text-background leading-[1.3] mb-10"
        >
          Ready to build something that matters?
        </motion.h2>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="font-neue text-sm font-medium bg-accent text-foreground px-8 py-3 rounded-lg hover:bg-background transition-colors duration-300"
            >
              Let&apos;s Talk
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

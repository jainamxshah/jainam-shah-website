'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

// ============================================
// WHAT I DO PAGE - 8 Sections
// ============================================

export default function WhatIDoContent() {
  return (
    <div className="min-h-screen">
      {/* Section 1: Hero – Statement of Power (Light) */}
      <HeroSection />

      {/* Section 2: The Jainam Loop – Core Visual (Dark) */}
      <JainamLoopSection />

      {/* Section 3: Where I Plug In (Light) */}
      <WhereIPlugIn />

      {/* Section 4: What Happens When You Hire Me (Dark) */}
      <WhatHappens />

      {/* Section 5: What I Actually Build (Light) */}
      <WhatIBuild />

      {/* Section 6: What Changes (Dark) */}
      <WhatChanges />

      {/* Section 7: Philosophy (Light) */}
      <PhilosophySection />

      {/* Section 8: Call to Action (Dark) */}
      <CallToActionSection />
    </div>
  );
}

// ============================================
// SECTION 1: HERO – Statement of Power
// ============================================

function HeroSection() {
  return (
    <section className="bg-background min-h-screen flex items-center justify-center pt-20 pb-20 relative overflow-hidden">
      {/* Floating Diagram Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 0.04, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-[600px] md:w-[800px] lg:w-[1000px] aspect-square"
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Outer Circle */}
            <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
            {/* Inner Circles */}
            <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            <circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            {/* Connecting Lines */}
            <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            <line x1="60" y1="60" x2="340" y2="340" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            <line x1="340" y1="60" x2="60" y2="340" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            {/* Nodes */}
            <circle cx="200" cy="20" r="8" className="fill-foreground" />
            <circle cx="200" cy="380" r="8" className="fill-foreground" />
            <circle cx="20" cy="200" r="8" className="fill-foreground" />
            <circle cx="380" cy="200" r="8" className="fill-foreground" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-8 text-center relative z-10">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-3xl md:text-4xl lg:text-[56px] xl:text-[64px] text-foreground leading-[1.15] tracking-[-0.02em] mb-8"
        >
          I don&apos;t deliver features.
          <br />
          <span className="text-foreground/80">I build machines that create momentum.</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-neue text-base md:text-lg lg:text-xl text-foreground/70 leading-[1.7] max-w-[700px] mx-auto mb-12"
        >
          I partner with founders and teams to design AI-powered products that grow, learn, and scale on their own.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="font-neue text-sm font-medium bg-foreground text-background px-10 py-4 rounded-lg hover:bg-accent hover:text-foreground transition-colors duration-300"
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
// SECTION 2: THE JAINAM LOOP
// ============================================

const loopSteps = [
  { name: 'Market', angle: 270 },
  { name: 'Product', angle: 330 },
  { name: 'AI Systems', angle: 30 },
  { name: 'Distribution', angle: 90 },
  { name: 'Revenue', angle: 150 },
  { name: 'Data', angle: 210 },
];

function JainamLoopSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="bg-foreground py-24 md:py-32 lg:py-40" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[40px] text-background text-center mb-6"
        >
          The Jainam Loop
        </motion.h2>

        {/* Central Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] mx-auto aspect-square my-12"
        >
          {/* Circular Path */}
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Main Circle */}
            <motion.circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="rgba(249, 226, 145, 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
            />
            
            {/* Arrows between nodes */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="rgba(249, 226, 145, 0.6)" />
              </marker>
            </defs>
            
            {/* Curved arrows */}
            <motion.path
              d="M 200 50 A 150 150 0 0 1 325 125"
              fill="none"
              stroke="rgba(249, 226, 145, 0.4)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
            />
            <motion.path
              d="M 325 125 A 150 150 0 0 1 325 275"
              fill="none"
              stroke="rgba(249, 226, 145, 0.4)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.0 }}
            />
            <motion.path
              d="M 325 275 A 150 150 0 0 1 200 350"
              fill="none"
              stroke="rgba(249, 226, 145, 0.4)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.2 }}
            />
            <motion.path
              d="M 200 350 A 150 150 0 0 1 75 275"
              fill="none"
              stroke="rgba(249, 226, 145, 0.4)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.4 }}
            />
            <motion.path
              d="M 75 275 A 150 150 0 0 1 75 125"
              fill="none"
              stroke="rgba(249, 226, 145, 0.4)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.6 }}
            />
            <motion.path
              d="M 75 125 A 150 150 0 0 1 200 50"
              fill="none"
              stroke="rgba(249, 226, 145, 0.4)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.8 }}
            />
          </svg>

          {/* Loop Labels */}
          {loopSteps.map((step, index) => {
            const radius = 150;
            const angleRad = (step.angle * Math.PI) / 180;
            const x = 50 + (50 + (radius / 2) * Math.cos(angleRad));
            const y = 50 + (50 + (radius / 2) * Math.sin(angleRad));

            return (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="bg-accent/20 backdrop-blur-sm border border-accent/40 rounded-xl px-4 py-2.5 md:px-5 md:py-3">
                  <span className="font-neue text-xs md:text-sm font-medium text-accent whitespace-nowrap">
                    {step.name}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Center Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent flex items-center justify-center">
              <span className="text-foreground text-xl md:text-2xl">↺</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-neue text-base md:text-lg text-background/80 text-center max-w-[600px] mx-auto leading-[1.7]"
        >
          This is the loop I design for every product.
          <br />
          <span className="text-accent">When it works, growth stops being effort — and starts becoming physics.</span>
        </motion.p>
      </div>
    </section>
  );
}

// ============================================
// SECTION 3: WHERE I PLUG IN
// ============================================

const plugInAreas = [
  {
    title: 'Market',
    description: 'Positioning, ICP, and competitive intelligence',
    icon: '◎',
    gradient: 'from-amber-100 to-orange-50',
  },
  {
    title: 'Product',
    description: 'UX, flows, onboarding, and activation',
    icon: '◇',
    gradient: 'from-emerald-50 to-teal-50',
  },
  {
    title: 'AI',
    description: 'LLMs, automation, recommendations, and generation',
    icon: '⬡',
    gradient: 'from-violet-50 to-purple-50',
  },
  {
    title: 'Distribution',
    description: 'Search, SEO, virality, and conversion',
    icon: '△',
    gradient: 'from-sky-50 to-blue-50',
  },
];

function WhereIPlugIn() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="bg-background py-24 md:py-32" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[40px] text-foreground text-center mb-14 md:mb-20"
        >
          Where I Plug In
        </motion.h2>

        {/* Four Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {plugInAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`relative bg-gradient-to-br ${area.gradient} border border-foreground/8 rounded-2xl p-8 md:p-10 lg:p-12 overflow-hidden group cursor-default`}
            >
              {/* Background Icon */}
              <div className="absolute top-4 right-4 text-foreground/5 text-[100px] md:text-[120px] font-light leading-none pointer-events-none group-hover:text-foreground/8 transition-colors duration-500">
                {area.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-kalice text-xl md:text-2xl lg:text-[28px] text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="font-neue text-sm md:text-base text-foreground/70 leading-[1.6]">
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-neue text-base md:text-lg text-foreground/80 text-center max-w-[600px] mx-auto leading-[1.7]"
        >
          Most teams only optimize one layer.
          <br />
          <span className="text-foreground font-medium">I connect all four into one system.</span>
        </motion.p>
      </div>
    </section>
  );
}

// ============================================
// SECTION 4: WHAT HAPPENS WHEN YOU HIRE ME
// ============================================

const timelineSteps = [
  {
    number: '01',
    title: 'Chaos',
    description: 'Ideas, features, half-built models, unclear traction',
  },
  {
    number: '02',
    title: 'Clarity',
    description: 'We define the market, the user, and the growth path',
  },
  {
    number: '03',
    title: 'System',
    description: 'I architect the product + AI + distribution stack',
  },
  {
    number: '04',
    title: 'Momentum',
    description: 'The product starts pulling users, data, and revenue on its own',
  },
];

function WhatHappens() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="bg-foreground py-24 md:py-32" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[40px] text-background text-center mb-14 md:mb-20"
        >
          What Happens When You Hire Me
        </motion.h2>

        {/* Timeline Strip */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-accent/20 via-accent/60 to-accent/20 origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center lg:text-left"
              >
                {/* Step Number Circle */}
                <div className="flex justify-center lg:justify-start mb-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center relative z-10">
                    <span className="font-neue text-xs md:text-sm font-bold text-accent">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Arrow (Mobile/Tablet) */}
                {index < timelineSteps.length - 1 && (
                  <div className="hidden md:block lg:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <span className="text-accent/50 text-2xl">↓</span>
                  </div>
                )}

                {/* Title */}
                <h3 className="font-kalice text-lg md:text-xl text-background mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-neue text-sm text-background/65 leading-[1.6] max-w-[250px] mx-auto lg:mx-0">
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
// SECTION 5: WHAT I ACTUALLY BUILD
// ============================================

const buildCards = [
  {
    title: 'Growth Engines',
    description: 'SEO, programmatic pages, content systems, acquisition loops',
    icon: '⚡',
  },
  {
    title: 'AI Infrastructure',
    description: 'LLMs, RAG, pipelines, automation, intelligence layers',
    icon: '🧠',
  },
  {
    title: 'Product Experiences',
    description: 'Dashboards, workflows, onboarding, trust, conversion',
    icon: '✨',
  },
  {
    title: 'Data Loops',
    description: 'Analytics, feedback, optimization, and learning systems',
    icon: '🔄',
  },
];

function WhatIBuild() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="bg-background py-24 md:py-32" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[40px] text-foreground text-center mb-14 md:mb-20"
        >
          What I Actually Build
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {buildCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, borderColor: 'rgba(24, 24, 24, 0.2)' }}
              className="bg-white border border-foreground/8 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-xl group"
            >
              {/* Icon */}
              <div className="text-3xl md:text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="font-kalice text-lg md:text-xl lg:text-2xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {card.title}
              </h3>

              {/* Description */}
              <p className="font-neue text-sm md:text-base text-foreground/70 leading-[1.6]">
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
// SECTION 6: WHAT CHANGES
// ============================================

const beforeItems = [
  'You guess what to build',
  'Marketing fights product',
  'AI is a feature',
  'Growth is manual',
];

const afterItems = [
  'You know where to compete',
  'Product generates demand',
  'AI becomes leverage',
  'Growth compounds',
];

function WhatChanges() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="bg-foreground py-24 md:py-32" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[40px] text-background text-center mb-14 md:mb-20"
        >
          What Changes
        </motion.h2>

        {/* Before / After Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
          {/* Before Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:pr-10 lg:pr-16 md:border-r border-background/15"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <h3 className="font-neue text-lg md:text-xl font-semibold text-background/60 uppercase tracking-wider">
                Before
              </h3>
            </div>
            <ul className="space-y-4">
              {beforeItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="font-neue text-base md:text-lg text-background/55 flex items-start gap-3"
                >
                  <span className="text-background/30 mt-1">–</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* After Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:pl-10 lg:pl-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <h3 className="font-neue text-lg md:text-xl font-semibold text-accent uppercase tracking-wider">
                After
              </h3>
            </div>
            <ul className="space-y-4">
              {afterItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="font-neue text-base md:text-lg text-background flex items-start gap-3"
                >
                  <span className="text-accent mt-1">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 7: PHILOSOPHY
// ============================================

function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-background py-24 md:py-32 lg:py-40" ref={ref}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 lg:px-12 text-center">
        {/* Decorative Quote Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="font-kalice text-[60px] md:text-[80px] lg:text-[100px] text-accent leading-none select-none">
            &quot;
          </span>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-xl md:text-2xl lg:text-[36px] xl:text-[40px] text-foreground leading-[1.35] tracking-[-0.01em]"
        >
          Most startups fail because they build things.
          <br />
          <span className="text-foreground/70">I help teams build systems.</span>
        </motion.blockquote>

        {/* Closing Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <span className="font-kalice text-[60px] md:text-[80px] lg:text-[100px] text-accent leading-none select-none rotate-180 inline-block">
            &quot;
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 8: CALL TO ACTION
// ============================================

function CallToActionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-foreground py-24 md:py-32 lg:py-40" ref={ref}>
      <div className="max-w-[900px] mx-auto px-6 md:px-8 lg:px-12 text-center">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[40px] xl:text-[48px] text-background leading-[1.25] mb-12"
        >
          Ready to install a growth engine into your product?
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
              className="font-neue text-sm md:text-base font-medium bg-accent text-foreground px-10 py-4 rounded-lg hover:bg-background transition-colors duration-300"
            >
              Let&apos;s Talk
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

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

      {/* Section 5: Philosophy (Light) */}
      <PhilosophySection />

      {/* Section 6: Call to Action (Dark) */}
      <CallToActionSection />
    </div>
  );
}

// ============================================
// SECTION 1: HERO – Statement of Power
// ============================================

function HeroSection() {
  return (
    <section className="bg-background min-h-screen flex items-center justify-center pt-20 pb-20 relative overflow-hidden" data-header-theme="light">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 text-center relative z-10">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-[28px] md:text-[36px] lg:text-[44px] text-foreground leading-[1.3] tracking-[-0.01em] mb-8"
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
          className="font-neue text-sm md:text-base text-foreground/60 leading-[1.6] max-w-[700px] mx-auto mb-12"
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
    <section className="bg-foreground py-2 md:py-4 lg:py-8" ref={ref} data-header-theme="dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Central Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] mx-auto aspect-square"
        >
          {/* Section Title - Centered in circle */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center font-kalice text-xl md:text-2xl lg:text-[28px] text-background text-center z-10 pointer-events-none"
          >
            The Jainam Loop
          </motion.h2>
          {/* Circular Path */}
          <motion.svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            style={{ transformOrigin: 'center center' }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          >
            {/* Main Circle */}
            <motion.circle
              cx="200"
              cy="200"
              r="130"
              fill="none"
              stroke="rgba(210, 140, 63, 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
            />

            {/* Arrows between nodes */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="rgba(210, 140, 63, 0.6)" />
              </marker>
            </defs>

            {/* Curved arrows */}
            <motion.path
              d="M 200 70 A 130 130 0 0 1 292 112"
              fill="none"
              stroke="rgba(210, 140, 63, 0.4)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
            />
            <motion.path
              d="M 292 112 A 130 130 0 0 1 292 288"
              fill="none"
              stroke="rgba(210, 140, 63, 0.4)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.0 }}
            />
            <motion.path
              d="M 292 288 A 130 130 0 0 1 200 330"
              fill="none"
              stroke="rgba(210, 140, 63, 0.4)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.2 }}
            />
            <motion.path
              d="M 200 330 A 130 130 0 0 1 108 288"
              fill="none"
              stroke="rgba(210, 140, 63, 0.4)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.4 }}
            />
            <motion.path
              d="M 108 288 A 130 130 0 0 1 108 112"
              fill="none"
              stroke="rgba(210, 140, 63, 0.4)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.6 }}
            />
            <motion.path
              d="M 108 112 A 130 130 0 0 1 200 70"
              fill="none"
              stroke="rgba(210, 140, 63, 0.4)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.8 }}
            />
          </motion.svg>

          {/* Loop Labels */}
          {loopSteps.map((step, index) => {
            const svgCenter = 180; // Center of 400x400 viewBox
            const mainRadius = 110;
            // Position box centers outside the circle so inner edge touches circle
            // Estimate box width ~20-25 SVG units, so center should be ~12 units outside circle
            const boxOffset = 12; // Distance from circle edge to box center
            const labelRadius = mainRadius + boxOffset;
            const angleRad = (step.angle * Math.PI) / 180;
            // Calculate position in SVG coordinates (0-400)
            // In SVG, y increases downward, so sin works correctly for standard angles
            const svgX = svgCenter + labelRadius * Math.cos(angleRad);
            const svgY = svgCenter + labelRadius * Math.sin(angleRad);
            // Convert to percentage for absolute positioning
            const x = (svgX / 410) * 100;
            const y = (svgY / 390) * 100;

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
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-neue text-base md:text-lg text-background/80 text-center max-w-[600px] mx-auto leading-[1.7] mb-12"
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
    <section className="bg-background py-24 md:py-32" ref={ref} data-header-theme="light">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-xl md:text-2xl lg:text-[28px] text-foreground text-center mb-14 md:mb-20"
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
                <h3 className="font-kalice text-lg md:text-xl lg:text-[22px] text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
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
    <section className="bg-foreground py-24 md:py-32" ref={ref} data-header-theme="dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-xl md:text-2xl lg:text-[28px] text-background text-center mb-14 md:mb-20"
        >
          What Happens When You Hire Me
        </motion.h2>

        {/* Timeline Strip */}
        <div className="relative pt-12 pb-8">
          {/* Horizontal Timeline Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-12 left-0 right-0 h-[2px] bg-accent origin-left"
          />

          {/* Timeline Steps */}
          <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-4 lg:gap-8">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex-1 text-center"
              >
                {/* Step Number Circle - positioned on the line */}
                <div className="flex justify-center mb-5 relative z-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-foreground border-2 border-accent flex items-center justify-center -mt-6">
                    <span className="font-neue text-sm md:text-base font-bold text-accent">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-kalice text-lg md:text-xl text-background mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-neue text-sm text-background/65 leading-[1.6]">
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
// SECTION 5: PHILOSOPHY
// ============================================

function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-foreground py-24 md:py-32 lg:py-40" ref={ref} data-header-theme="dark">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 lg:px-12 text-center">
        {/* Decorative Quote Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
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
          className="font-kalice text-xl md:text-2xl lg:text-[32px] text-background leading-[1.4]"
        >
          Most startups fail because they build things.
          <br />
          <span className="text-background/70">I help teams build systems.</span>
        </motion.blockquote>

        {/* Closing Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4"
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
// SECTION 6: CALL TO ACTION
// ============================================

function CallToActionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-background py-24 md:py-32 lg:py-40" ref={ref} data-header-theme="light">
      <div className="max-w-[900px] mx-auto px-6 md:px-8 lg:px-12 text-center">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-xl md:text-2xl lg:text-[28px] text-foreground leading-[1.3] mb-12"
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

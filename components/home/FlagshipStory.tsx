'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const storyContent = {
  title: 'Surfgeo – From SEO to Growth Engine',
  quote: "Search is changing. Surfgeo ensures you're the one answering.",
  paragraphs: [
    'Traditional SEO is failing in the age of AI answers. I built Surfgeo to solve a brutal shift: users are moving to AI-powered search (GEO) that synthesizes answers instead of linking to sources.',
    'Surfgeo is an AI-powered growth engine that analyzes competitor citations, finds traffic gaps, and generates optimized content specifically designed to be referenced by LLMs like ChatGPT and Perplexity.',
    'It turns organic discovery from a manual guessing game into a predictable, compounding acquisition channel.',
  ],
  ctaText: 'View Full Case Study →',
  ctaHref: '/work/surfgeo',
  visualUrl: '/images/projects/surfgeo-dashboard.jpg',
};

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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FlagshipStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-foreground py-24 md:py-32 overflow-hidden" ref={ref} data-header-theme="dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Story */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="font-kalice text-2xl md:text-3xl lg:text-[36px] text-background leading-[1.2] mb-5"
            >
              {storyContent.title}
            </motion.h2>

            {/* Quote */}
            <motion.blockquote
              variants={itemVariants}
              className="font-neue text-base md:text-lg lg:text-xl text-background/90 italic mb-6 pl-4 border-l-4 border-accent"
            >
              &quot;{storyContent.quote}&quot;
            </motion.blockquote>

            {/* Story Paragraphs */}
            {storyContent.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={itemVariants}
                className="font-neue text-sm md:text-base text-background/80 leading-[1.7] mb-5 whitespace-pre-line"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* CTA Link */}
            <motion.div variants={itemVariants}>
              <Link
                href={storyContent.ctaHref}
                className="inline-block font-neue text-sm md:text-base text-accent hover:underline underline-offset-4 transition-all duration-300 group"
              >
                {storyContent.ctaText}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {/* Gradient placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-foreground/30" />

              {/* Product Screenshot */}
              <Image
                src={storyContent.visualUrl}
                alt="Surfgeo Dashboard"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              />

              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-50" />
            </div>

            {/* Floating accent element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


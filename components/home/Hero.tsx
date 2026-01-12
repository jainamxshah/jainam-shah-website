'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Grid from '@/components/ui/Grid';

const trustProducts = ['Surfgeo', 'Nexus AI', 'Quantflow', 'Aura Health', 'Voxel Commerce'];

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Grid Background */}
      <Grid />

      {/* Content */}
      <div className="container-main relative z-10 py-24 md:py-32">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border border-foreground/10 shadow-xl bg-gradient-to-br from-foreground/5 to-foreground/10">
              <Image
                src="/images/profile.jpg"
                alt="Jainam Shah"
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              />
              {/* Initials fallback */}
              <div className="absolute inset-0 flex items-center justify-center text-foreground/50 font-kalice text-xl md:text-2xl">
                JS
              </div>
            </div>
          </motion.div>

          {/* Main Headline - Two-part styling */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-kalice text-[28px] md:text-[36px] lg:text-[44px] text-foreground leading-[1.3] tracking-[-0.01em] mb-6"
          >
            <span className="font-normal">I&apos;m Jainam,</span>{' '}
            <span className="italic text-foreground/80">building AI products that turn into real businesses.</span>
          </motion.h1>

          {/* Role Strip */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm md:text-base text-foreground/60 mb-12"
          >
            Founder <span className="mx-3 text-foreground/30">|</span> AI Product Architect <span className="mx-3 text-foreground/30">|</span> Growth Engineer
          </motion.p>

          {/* Supporting Line - Hidden, merged into headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-foreground/70 leading-[1.6] max-w-[600px] mx-auto mb-10 hidden"
          >
            I help founders and teams turn fragile AI ideas into scalable, revenue-generating platforms.
          </motion.p>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-3 gap-y-2"
          >
            {trustProducts.map((product, index) => (
              <span key={product} className="flex items-center">
                <span className="text-xs md:text-sm text-foreground/50 hover:text-foreground/70 transition-colors duration-300 cursor-default">
                  {product}
                </span>
                {index < trustProducts.length - 1 && (
                  <span className="ml-2 md:ml-3 text-foreground/25">·</span>
                )}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Simple Chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-foreground/30"
          >
            <path 
              d="M6 9L12 15L18 9" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

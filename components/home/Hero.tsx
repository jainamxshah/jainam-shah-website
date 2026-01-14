'use client';

import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Floating Diagram Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ 
            opacity: 0.04, 
            scale: 1, 
            rotate: [0, 360]
          }}
          transition={{ 
            opacity: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
            rotate: { 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear", 
              delay: 1.5,
              times: [0, 1]
            }
          }}
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
            <DraggableImage />
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

function DraggableImage() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDragEnd = () => {
    // Animate back to center with spring animation
    animate(x, 0, { type: 'spring', stiffness: 400, damping: 35 });
    animate(y, 0, { type: 'spring', stiffness: 400, damping: 35 });
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
      dragElastic={0.1}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      style={{ 
        x, 
        y,
      }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 50 }}
      className="relative w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border border-foreground/10 shadow-xl bg-gradient-to-br from-foreground/5 to-foreground/10 cursor-grab active:cursor-grabbing"
    >
      <Image
        src="/images/Jainam_Photo.jpg"
        alt="Jainam Shah"
        fill
        className="object-cover pointer-events-none"
        priority
        onError={(e) => {
          e.currentTarget.style.opacity = '0';
        }}
      />
    </motion.div>
  );
}

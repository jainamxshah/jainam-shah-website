'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export default function QuietCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section ref={sectionRef} className="py-20 md:py-24 bg-background">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="font-kalice text-2xl md:text-3xl lg:text-4xl text-foreground mb-6">
            Let&apos;s build something that matters.
          </h2>
          <Link
            href="/contact"
            className="inline-block text-base text-foreground/70 hover:text-accent transition-colors relative group"
          >
            <span>Get in touch</span>
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-px bg-accent origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


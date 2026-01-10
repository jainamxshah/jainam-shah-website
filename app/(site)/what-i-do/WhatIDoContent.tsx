'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { capabilities, processSteps } from '@/lib/capabilities';
import CapabilityBlock from '@/components/what-i-do/CapabilityBlock';
import ProcessStep from '@/components/what-i-do/ProcessStep';

export default function WhatIDoContent() {
  return (
    <div className="min-h-screen">
      {/* Intro Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-main">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-kalice text-5xl md:text-6xl lg:text-7xl text-foreground"
          >
            What I Do
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl lg:text-2xl text-foreground/70 mt-6 max-w-3xl leading-relaxed"
          >
            I partner with teams to design, build, and scale digital products.
          </motion.p>
        </div>
      </section>

      {/* Capability Blocks */}
      <section className="pb-16 md:pb-24">
        <div className="container-main">
          {capabilities.map((capability, index) => (
            <CapabilityBlock
              key={capability.id}
              capability={capability}
              index={index}
              isLast={index === capabilities.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Process Strip */}
      <section className="py-24 bg-foreground/[0.02]">
        <div className="container-main">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-medium text-foreground text-center mb-16"
          >
            The Process
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {processSteps.map((step, index) => (
              <ProcessStep key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 md:py-32">
        <div className="container-main text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-kalice text-3xl md:text-4xl text-foreground mb-8"
          >
            Ready to build something that matters?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 bg-foreground text-background rounded-md text-base font-medium transition-all duration-300 hover:bg-accent hover:text-foreground hover:scale-105"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


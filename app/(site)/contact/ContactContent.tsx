'use client';

import { motion } from 'framer-motion';
import Grid from '@/components/ui/Grid';
import ContactForm from '@/components/contact/ContactForm';
import ContactMethod from '@/components/contact/ContactMethod';

export default function ContactContent() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-16">
        <Grid />
        <div className="container-main relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-kalice text-4xl md:text-5xl lg:text-6xl text-foreground max-w-4xl mx-auto"
          >
            Let&apos;s build something serious.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-foreground/70 mt-6 max-w-2xl mx-auto"
          >
            I work with founders and teams building ambitious products.
          </motion.p>
        </div>
      </section>

      {/* Contact Options Section */}
      <section className="py-16 md:py-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column: Context */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-xl md:text-2xl font-medium text-foreground mb-6">
                Who I Work With
              </h2>
              <div className="space-y-4 text-foreground/85 leading-relaxed">
                <p>
                  I partner with ambitious founders building AI-powered products, growth-stage
                  companies scaling their platforms, and teams who treat digital products as
                  strategic assets.
                </p>
                <p>
                  If you&apos;re looking for fast execution, strategic thinking, and someone who
                  cares about business outcomes as much as craft—let&apos;s talk.
                </p>
              </div>

              {/* Ideal Projects */}
              <div className="mt-10">
                <h3 className="text-sm text-foreground/60 uppercase tracking-wide mb-4">
                  Ideal for:
                </h3>
                <ul className="space-y-3">
                  {[
                    'AI-powered product development',
                    'Growth and conversion optimization',
                    'Technical SEO and search strategy',
                    'Full-stack web applications',
                    'Product design and strategy',
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="text-foreground/70 pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-foreground/40"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column: Contact Methods */}
            <div className="space-y-10">
              {/* Email */}
              <ContactMethod label="Email" delay={0.5}>
                <a
                  href="mailto:hello@jainamshah.com"
                  className="text-xl md:text-2xl text-foreground hover:text-accent transition-colors duration-300 underline-offset-4 hover:underline"
                >
                  hello@jainamshah.com
                </a>
              </ContactMethod>

              {/* Divider */}
              <div className="border-t border-foreground/[0.08]" />

              {/* Calendar */}
              <ContactMethod label="Schedule a Call" delay={0.6}>
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3.5 bg-foreground text-background rounded-md text-base font-medium transition-all duration-300 hover:bg-accent hover:text-foreground"
                >
                  Book 30 Minutes
                </a>
              </ContactMethod>

              {/* Divider */}
              <div className="border-t border-foreground/[0.08]" />

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Response Expectation */}
      <section className="py-16 bg-foreground/[0.02]">
        <div className="container-main max-w-3xl text-center">
          <p className="text-foreground/70 leading-relaxed">
            I review every message personally and typically respond within 24-48 hours. If
            we&apos;re a good fit, I&apos;ll propose a discovery call to discuss your project in
            detail.
          </p>
        </div>
      </section>
    </div>
  );
}


'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ProjectImage } from '@/lib/projects';

interface CaseStudySectionProps {
  title: string;
  body: string;
  callout?: string;
  images?: ProjectImage[];
  index?: number;
}

export default function CaseStudySection({
  title,
  body,
  callout,
  images,
  index = 0,
}: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Split body into paragraphs
  const paragraphs = body.split('\n\n').filter((p) => p.trim());

  return (
    <section ref={sectionRef} className="mt-20 md:mt-24 pt-8 border-t border-foreground/10">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-8"
      >
        {title}
      </motion.h2>

      {/* Body Content */}
      <div className="max-w-[680px]">
        {paragraphs.map((paragraph, pIndex) => (
          <motion.p
            key={pIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.2 + pIndex * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-base md:text-lg text-foreground leading-relaxed mb-6"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {/* Callout Box */}
      {callout && (
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="my-12 p-6 md:p-8 bg-foreground/[0.03] rounded-xl border-l-4 border-accent"
        >
          <p className="text-base md:text-lg text-foreground italic leading-relaxed">{callout}</p>
        </motion.blockquote>
      )}

      {/* Image Gallery */}
      {images && images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-12 grid gap-6 ${images.length > 1 ? 'md:grid-cols-2' : ''}`}
        >
          {images.map((image, imgIndex) => (
            <figure key={imgIndex}>
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-foreground/5">
                {/* Placeholder gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, 
                      hsl(${((index + imgIndex) * 40) % 360}, 15%, 88%) 0%, 
                      hsl(${((index + imgIndex) * 40 + 30) % 360}, 20%, 82%) 100%)`,
                  }}
                />
                <Image
                  src={image.url}
                  alt={image.caption}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                />
              </div>
              {image.caption && (
                <figcaption className="text-sm text-foreground/50 mt-3 text-center">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </motion.div>
      )}
    </section>
  );
}


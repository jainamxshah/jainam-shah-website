'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const domains = [
  {
    name: 'Search-First Growth Engines',
    description: 'Engineering systems that dominate the new era of AI search (GEO).',
  },
  {
    name: 'Agentic AI Systems',
    description: 'Building autonomous AI identities with long-term memory and personality.',
  },
  {
    name: 'Legal & Compliance AI',
    description: 'RAG-powered intelligence for automated contract and tax law analysis.',
  },
  {
    name: 'Productivity & Time Intelligence',
    description: 'Tools that recover lost billable hours and optimize team performance.',
  },
  {
    name: 'B2B Enterprise SaaS',
    description: 'Full-stack platforms designed for high-trust, production environments.',
  },
];

export default function DomainMastery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredNode, setHoveredNode] = useState<number | 'center' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate responsive radius
  const getRadius = () => {
    if (typeof window === 'undefined') return 140;
    const width = window.innerWidth;
    if (width < 768) return 185; // Significantly increased for mobile
    if (width < 1024) return 120;
    return 155;
  };

  const [radius, setRadius] = useState(getRadius);

  useEffect(() => {
    const handleResize = () => setRadius(getRadius());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nodeCount = domains.length;
  const angleStep = (2 * Math.PI) / nodeCount;

  // SVG viewBox coordinates (centered at 0,0)
  const svgSize = 500;
  const centerX = 0;
  const centerY = 0;

  return (
    <section className="bg-foreground py-24 md:py-32 lg:py-40 overflow-hidden" ref={ref} data-header-theme="dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12">
          {/* Section Content */}
          <div className="flex-shrink-0 lg:w-[400px] lg:max-w-[400px]">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-kalice text-2xl md:text-3xl lg:text-[36px] text-background lg:text-left text-center mb-4"
            >
              Domains I Build In
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 font-neue text-sm md:text-base text-background/80 lg:text-left text-center"
            >
              <p>
                These are the arenas where I&apos;ve built and shipped real products.
              </p>

              <p>
                From growth engines to financial systems and healthcare tools, each node reflects work that&apos;s live, used, and scaling — not theoretical.
              </p>
            </motion.div>
          </div>

          {/* Radial Graph Container */}
          <div ref={containerRef} className="relative w-full aspect-square max-w-4xl flex-1 lg:ml-auto lg:mr-0">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={`${-svgSize / 2} ${-svgSize / 2} ${svgSize} ${svgSize}`}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Connection Lines - rendered first (behind nodes) */}
              {domains.map((_, index) => {
                const angle = index * angleStep - Math.PI / 2; // Start from top
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);

                const isHighlighted = hoveredNode === index || hoveredNode === 'center';
                const isDimmed = hoveredNode !== null && hoveredNode !== index && hoveredNode !== 'center';

                return (
                  <motion.line
                    key={`line-${index}`}
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-background/30"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: isInView ? 1 : 0,
                      opacity: isHighlighted ? 0.6 : isDimmed ? 0.15 : 0.25,
                    }}
                    transition={{
                      pathLength: { duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.3 },
                    }}
                  />
                );
              })}
            </svg>

            {/* Center Node */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredNode('center')}
                onMouseLeave={() => setHoveredNode(null)}
                onFocus={() => setHoveredNode('center')}
                onBlur={() => setHoveredNode(null)}
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 pointer-events-auto"
                tabIndex={0}
                role="button"
                aria-label="Central operator"
              >
                <div
                  className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-accent border-2 border-accent flex items-center justify-center group hover:scale-105 transition-transform duration-300"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                  }}
                >
                  <span className="font-kalice text-base md:text-xl lg:text-2xl text-foreground font-bold">JS</span>
                </div>
              </motion.div>
            </div>

            {/* Outer Nodes */}
            {domains.map((domain, index) => {
              const angle = index * angleStep - Math.PI / 2;
              // Convert SVG coordinates to percentage for absolute positioning
              const svgX = centerX + radius * Math.cos(angle);
              const svgY = centerY + radius * Math.sin(angle);
              // Convert to percentage (svgSize/2 = 300 is 50% in viewBox)
              const percentX = 50 + (svgX / (svgSize / 2)) * 50;
              const percentY = 50 + (svgY / (svgSize / 2)) * 50;

              const isHovered = hoveredNode === index;
              const isDimmed = hoveredNode !== null && hoveredNode !== index && hoveredNode !== 'center';

              return (
                <OuterNode
                  key={domain.name}
                  domain={domain}
                  index={index}
                  percentX={percentX}
                  percentY={percentY}
                  isInView={isInView}
                  isHovered={isHovered}
                  isDimmed={isDimmed}
                  onHover={() => setHoveredNode(index)}
                  onLeave={() => setHoveredNode(null)}
                  delay={0.5 + index * 0.15}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

interface OuterNodeProps {
  domain: { name: string; description: string };
  index: number;
  percentX: number;
  percentY: number;
  isInView: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
  delay: number;
}

function OuterNode({
  domain,
  index,
  percentX,
  percentY,
  isInView,
  isHovered,
  isDimmed,
  onHover,
  onLeave,
  delay,
}: OuterNodeProps) {
  // Idle drift animation - small circular motion
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);
  const springX = useSpring(driftX, { stiffness: 30, damping: 15 });
  const springY = useSpring(driftY, { stiffness: 30, damping: 15 });

  useEffect(() => {
    if (!isInView) return;

    const animate = () => {
      const time = Date.now() * 0.0008;
      // Circular drift motion
      const offsetX = Math.sin(time * 0.6 + index * 1.2) * 6;
      const offsetY = Math.cos(time * 0.8 + index * 1.2) * 6;
      driftX.set(offsetX);
      driftY.set(offsetY);
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [isInView, index, driftX, driftY]);

  // Convert drift to percentage offset
  const offsetX = useTransform(springX, (v) => v * 0.5); // Scale down for percentage
  const offsetY = useTransform(springY, (v) => v * 0.5);

  const finalX = useTransform(offsetX, (v) => `${percentX + v}%`);
  const finalY = useTransform(offsetY, (v) => `${percentY + v}%`);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={
        isInView
          ? {
            opacity: isDimmed ? 0.3 : 1,
            scale: isHovered ? 1.05 : 1,
          }
          : { opacity: 0, scale: 0 }
      }
      transition={{
        opacity: { duration: 0.4 },
        scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{
        position: 'absolute',
        left: finalX,
        top: finalY,
        x: '-50%',
        y: '-50%',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className="z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-xl"
      tabIndex={0}
      role="button"
      aria-label={`${domain.name}: ${domain.description}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        className="bg-foreground border border-background/20 rounded-xl p-2.5 md:p-4 lg:p-5 w-[110px] md:w-[260px] lg:w-[300px] shadow-sm hover:shadow-md hover:border-accent/50 transition-all duration-300"
      >
        <h3 className="font-neue text-[10px] md:text-sm lg:text-base font-semibold text-background mb-1 md:mb-1.5 leading-tight text-center md:text-left">
          {domain.name}
        </h3>
        <p
          className={`font-neue text-[10px] md:text-xs lg:text-sm text-background/70 leading-[1.5] transition-opacity duration-300 ${isHovered ? 'opacity-100 block' : 'hidden md:block md:opacity-70'
            }`}
        >
          {domain.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

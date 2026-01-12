'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/projects';

interface WorkPageContentProps {
  projects: Project[];
}

// Characters for cryptic scramble effect
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

// Hook for scramble text effect
function useScrambleText(text: string, isActive: boolean, delay: number = 0) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = text.length * 1.5; // Reduced from 3 to 1.5
    
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / 1.5) { // Adjusted to match new multiplier
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        iteration++;

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsScrambling(false);
        }
      }, 15); // Reduced from 30ms to 15ms

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isActive, delay]);

  return { displayText, isScrambling };
}

export default function WorkPageContent({ projects }: WorkPageContentProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileWorkPage projects={projects} />;
  }

  return <DesktopCanvasWorkPage projects={projects} />;
}

// ============================================
// DESKTOP HORIZONTAL CANVAS
// ============================================

function DesktopCanvasWorkPage({ projects }: WorkPageContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = projects.length + 1; // +1 for exit slide

  const scrollToSlide = useCallback((index: number) => {
    if (containerRef.current) {
      const slideWidth = window.innerWidth;
      containerRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth',
      });
    }
  }, []);

  // Handle scroll to update current slide
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slideWidth = window.innerWidth;
      const newSlide = Math.round(container.scrollLeft / slideWidth);
      setCurrentSlide(newSlide);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
        scrollToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        scrollToSlide(currentSlide - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides, scrollToSlide]);

  return (
    <div className="fixed inset-0 bg-foreground overflow-hidden pt-[72px] z-[50]">
      {/* Canvas Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(240, 240, 240, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240, 240, 240, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="relative flex overflow-x-auto overflow-y-hidden h-full scroll-smooth snap-x snap-mandatory scrollbar-hide z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Project Slides */}
        {projects.map((project, index) => (
          <ProjectSlide 
            key={project.id} 
            project={project} 
            slideNumber={index + 1}
            isActive={currentSlide === index}
          />
        ))}

        {/* Exit Slide */}
        <ExitSlide isActive={currentSlide === projects.length} />
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-20">
        <span className="font-neue text-sm text-background/60 tracking-wider">
          {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-accent w-6' 
                : 'bg-background/30 hover:bg-background/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <div className="absolute bottom-8 left-8 z-20 flex gap-4">
        <button
          onClick={() => currentSlide > 0 && scrollToSlide(currentSlide - 1)}
          disabled={currentSlide === 0}
          className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          ←
        </button>
        <button
          onClick={() => currentSlide < totalSlides - 1 && scrollToSlide(currentSlide + 1)}
          disabled={currentSlide === totalSlides - 1}
          className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    </div>
  );
}

// ============================================
// PROJECT SLIDE
// ============================================

interface ProjectSlideProps {
  project: Project;
  slideNumber: number;
  isActive: boolean;
}

function ProjectSlide({ project, slideNumber, isActive }: ProjectSlideProps) {
  // Scramble text effects
  const { displayText: nameText } = useScrambleText(
    project.name.toUpperCase().split(' ')[0],
    isActive,
    50
  );
  const { displayText: tagText } = useScrambleText(
    project.identityTag,
    isActive,
    80
  );
  const { displayText: descText } = useScrambleText(
    project.workPageDescription || project.shortDescription,
    isActive,
    100
  );
  const { displayText: outcomeText } = useScrambleText(
    project.workPageOutcome || project.impactSummary,
    isActive,
    120
  );

  return (
    <div 
      className="flex-shrink-0 w-screen h-full snap-start snap-always"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="h-full flex items-center px-8 lg:px-16 py-8 gap-6 lg:gap-8">
        {/* Left Column - Project Name */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
          transition={{ duration: 0.5, delay: isActive ? 0.2 : 0 }}
          className="flex-shrink-0 w-[100px] lg:w-[140px] flex flex-col justify-center"
        >
          {/* Vertical Project Name */}
          <h2 
            className="font-kalice text-3xl lg:text-4xl xl:text-5xl text-background tracking-[-0.02em] leading-none"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
          >
            {nameText}
          </h2>
          
          {/* Identity Tag */}
          <p className="font-neue text-xs text-background/60 italic mt-3 ml-2">
            {tagText}
          </p>
        </motion.div>

        {/* Center Column - Product Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.98 }}
          transition={{ duration: 0.6, delay: isActive ? 0.1 : 0 }}
          className="flex-1 flex items-center justify-center min-w-0"
        >
          <div className="relative w-full max-w-4xl max-h-[65vh] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
            {/* Gradient placeholder */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(${(slideNumber * 60) % 360}, 20%, 25%) 0%, 
                  hsl(${(slideNumber * 60 + 40) % 360}, 25%, 18%) 100%)`,
              }}
            />
            
            {/* Product Image */}
            <Image
              src={project.workPageVisualUrl || project.heroImageUrl}
              alt={`${project.name} interface`}
              fill
              className="object-cover"
              sizes="60vw"
              priority={slideNumber <= 2}
              onError={(e) => {
                e.currentTarget.style.opacity = '0';
              }}
            />
          </div>
        </motion.div>

        {/* Right Column - Metadata */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
          transition={{ duration: 0.5, delay: isActive ? 0.3 : 0 }}
          className="flex-shrink-0 w-[200px] lg:w-[240px] flex flex-col justify-center"
        >
          {/* Description */}
          <p className="font-neue text-xs lg:text-sm text-background/75 leading-relaxed mb-4">
            {descText}
          </p>

          {/* Year */}
          <p className="font-neue text-[10px] lg:text-xs text-background/50 mb-1">
            {project.year}
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-x-2 gap-y-0.5 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="font-neue text-[9px] lg:text-[10px] uppercase tracking-wider text-background/60">
                {tag}
              </span>
            ))}
          </div>

          {/* One-line Outcome */}
          <p className="font-neue text-xs lg:text-sm font-medium text-accent mb-4">
            {outcomeText}
          </p>

          {/* CTA Button */}
          <Link href={`/work/${project.slug}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-background text-background rounded-lg font-neue text-xs hover:bg-accent hover:border-accent hover:text-foreground transition-all duration-300"
            >
              View Case →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================
// EXIT SLIDE
// ============================================

interface ExitSlideProps {
  isActive: boolean;
}

function ExitSlide({ isActive }: ExitSlideProps) {
  return (
    <div 
      className="flex-shrink-0 w-screen h-full snap-start snap-always flex items-center justify-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="text-center px-8 max-w-[800px]"
      >
        {/* Big Quote */}
        <h2 className="font-kalice text-2xl md:text-3xl xl:text-4xl text-background leading-[1.3] mb-10">
          Every system here exists because a business needed to win.
        </h2>

        {/* CTA Button */}
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="font-neue text-sm font-medium bg-accent text-foreground px-8 py-3 rounded-lg hover:bg-background transition-colors duration-300"
          >
            Start a Project
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

// ============================================
// MOBILE VERTICAL SCROLL VERSION
// ============================================

function MobileWorkPage({ projects }: WorkPageContentProps) {
  return (
    <div className="bg-foreground min-h-screen">
      {/* Header */}
      <div className="pt-28 pb-10 px-6">
        <h1 className="font-kalice text-2xl md:text-3xl text-background mb-3">
          Selected Work
        </h1>
        <p className="font-neue text-sm text-background/60">
          Products designed to win in the real world.
        </p>
      </div>

      {/* Project Cards */}
      <div className="px-6 pb-16 space-y-8">
        {projects.map((project, index) => (
          <MobileProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Exit Section */}
      <div className="bg-foreground py-12 px-6 text-center border-t border-background/10">
        <h2 className="font-kalice text-xl md:text-2xl text-background mb-6 max-w-md mx-auto">
          Every system here exists because a business needed to win.
        </h2>
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="font-neue text-sm font-medium bg-accent text-foreground px-8 py-3 rounded-lg"
          >
            Start a Project
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

interface MobileProjectCardProps {
  project: Project;
  index: number;
}

function MobileProjectCard({ project, index }: MobileProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-background/5 rounded-2xl overflow-hidden border border-background/10"
    >
      {/* Visual */}
      <div className="relative aspect-[16/10]">
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              hsl(${(index * 60) % 360}, 20%, 25%) 0%, 
              hsl(${(index * 60 + 40) % 360}, 25%, 18%) 100%)`,
          }}
        />
        <Image
          src={project.workPageVisualUrl || project.heroImageUrl}
          alt={project.name}
          fill
          className="object-cover"
          sizes="100vw"
          onError={(e) => {
            e.currentTarget.style.opacity = '0';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-kalice text-lg text-background">
            {project.name}
          </h3>
          <span className="font-neue text-[10px] text-background/50 italic">
            {project.identityTag}
          </span>
        </div>

        <p className="font-neue text-xs text-background/70 mb-3">
          {project.workPageDescription || project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-wider text-background/50 font-neue">
              {tag}
            </span>
          ))}
        </div>

        <p className="font-neue text-xs text-accent mb-4">
          {project.workPageOutcome || project.impactSummary}
        </p>

        <Link href={`/work/${project.slug}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 border border-background/30 text-background rounded-lg text-xs font-neue hover:bg-background/10 transition-colors">
            View Case →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Article, formatDate } from '@/lib/articles';

interface InsightsContentProps {
  articles: Article[];
}

// Category filters
const categories = [
  'All',
  'AI & LLMs',
  'Product Strategy',
  'Growth & SEO',
  'Case Breakdowns',
  'Systems Thinking',
];

// Map article categories to filter categories
const categoryMap: Record<string, string> = {
  'AI & Product': 'AI & LLMs',
  'AI & Growth': 'AI & LLMs',
  'Growth': 'Growth & SEO',
  'Product': 'Product Strategy',
  'Design': 'Product Strategy',
};

export default function InsightsContent({ articles }: InsightsContentProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredArticles = articles.filter((article) => {
    if (activeFilter === 'All') return true;
    const mappedCategory = categoryMap[article.category] || article.category;
    return mappedCategory === activeFilter;
  });

  const featuredArticle = articles[0]; // Most recent is featured
  const streamArticles = activeFilter === 'All'
    ? filteredArticles.slice(1) // Exclude featured in stream when showing all
    : filteredArticles;

  return (
    <div className="min-h-screen">
      {/* Section 1: Hero – Editorial Identity (Light) */}
      <HeroSection />

      {/* Section 2: Editorial Navigation (Light) */}
      <EditorialNavigation
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Section 3: Featured Story (Dark) - Only show when "All" is selected */}
      {activeFilter === 'All' && featuredArticle && (
        <FeaturedStory article={featuredArticle} />
      )}

      {/* Section 4: Story Stream (Light) */}
      <StoryStream articles={streamArticles} />

      {/* Section 5: Strategic CTA (Light) */}
      <StrategicCTA />
    </div>
  );
}

// ============================================
// SECTION 1: HERO
// ============================================

function HeroSection() {
  return (
    <section className="bg-background pt-32 pb-16 md:pt-40 md:pb-20" data-header-theme="light">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 text-center">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-kalice text-2xl md:text-3xl lg:text-[40px] text-foreground leading-[1.3] mb-6"
        >
          Thinking about how modern products are built — and how they win.
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-neue text-sm md:text-base text-foreground/70 leading-[1.7] max-w-[700px] mx-auto"
        >
          Essays, breakdowns, and frameworks on AI, product strategy, search-first growth, and building software that actually scales.
        </motion.p>
      </div>
    </section>
  );
}

// ============================================
// SECTION 2: EDITORIAL NAVIGATION
// ============================================

interface EditorialNavigationProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

function EditorialNavigation({ activeFilter, onFilterChange }: EditorialNavigationProps) {
  return (
    <section className="bg-background py-6 border-b border-foreground/10 sticky top-[72px] z-40" data-header-theme="light">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              className={`font-neue text-sm md:text-base px-4 md:px-5 py-2 rounded-full transition-all duration-300 ${activeFilter === category
                  ? 'bg-foreground text-background'
                  : 'text-foreground/70 hover:bg-foreground/5'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 3: FEATURED STORY
// ============================================

interface FeaturedStoryProps {
  article: Article;
}

function FeaturedStory({ article }: FeaturedStoryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="bg-foreground py-16 md:py-24" ref={ref} data-header-theme="dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        <Link href={`/insights/${article.slug}`} className="group block">
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Featured Image */}
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8 bg-background/10">
              {article.featuredImage && (
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                {/* Category Badge */}
                <span className="inline-block bg-accent text-foreground px-4 py-1.5 rounded text-xs font-neue uppercase tracking-[0.1em] mb-4">
                  {article.category}
                </span>

                {/* Title */}
                <h2 className="font-kalice text-xl md:text-2xl lg:text-[32px] text-background leading-[1.3] mb-3 max-w-[700px] group-hover:text-accent transition-colors duration-300">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="font-neue text-sm md:text-base text-background/80 leading-[1.6] max-w-[600px] mb-4 hidden md:block">
                  {article.excerpt}
                </p>

                {/* Read CTA */}
                <span className="font-neue text-sm text-accent group-hover:underline underline-offset-4">
                  Read →
                </span>
              </div>
            </div>
          </motion.article>
        </Link>
      </div>
    </section>
  );
}

// ============================================
// SECTION 4: STORY STREAM
// ============================================

interface StoryStreamProps {
  articles: Article[];
}

function StoryStream({ articles }: StoryStreamProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });

  if (articles.length === 0) {
    return (
      <section className="bg-background py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-center">
          <p className="font-neue text-lg text-foreground/60">
            No articles found in this category yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-16 md:py-24" ref={ref} data-header-theme="light">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface ArticleCardProps {
  article: Article;
  index: number;
}

function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        href={`/insights/${article.slug}`}
        className="group block py-10 md:py-12 border-b border-foreground/8 hover:bg-foreground/[0.02] transition-colors duration-300 -mx-4 px-4"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Article Image */}
          <div className="relative w-full md:w-64 lg:w-80 aspect-video md:aspect-[4/3] flex-shrink-0 overflow-hidden rounded-lg bg-foreground/5">
            {article.featuredImage ? (
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 256px"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center">
                <span className="text-foreground/20 text-4xl">📝</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Category */}
            <span className="font-neue text-[10px] uppercase tracking-[0.1em] text-foreground/50 mb-2 block">
              {article.category}
            </span>

            {/* Article Title */}
            <h3 className="font-neue text-lg md:text-xl lg:text-2xl font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300 leading-[1.3]">
              {article.title}
            </h3>

            {/* Meta Row */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-neue text-xs text-foreground/50">
                {formatDate(article.date)}
              </span>
              <span className="text-foreground/30">|</span>
              <span className="font-neue text-xs text-foreground/50">
                {article.readTime}
              </span>
            </div>

            {/* One-line Thesis */}
            <p className="font-neue text-sm text-foreground/70 leading-[1.6] line-clamp-2 max-w-[700px]">
              {article.excerpt}
            </p>

            {/* Read Link */}
            <span className="inline-block font-neue text-xs text-foreground/60 mt-3 group-hover:text-accent group-hover:underline underline-offset-4 transition-all duration-300">
              Read Article →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ============================================
// SECTION 5: STRATEGIC CTA
// ============================================

function StrategicCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-background py-20 md:py-24 border-t border-foreground/8" ref={ref} data-header-theme="light">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-neue text-base md:text-lg text-foreground mb-6"
        >
          Want to apply these ideas to your product?
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary */}
          <Link href="/what-i-do">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto font-neue text-base font-medium bg-foreground text-background px-8 py-3.5 rounded-lg hover:bg-accent hover:text-foreground transition-colors duration-300"
            >
              Work with me
            </motion.button>
          </Link>

          {/* Secondary */}
          <Link href="/work">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto font-neue text-base font-medium bg-transparent text-foreground border-2 border-foreground px-8 py-3.5 rounded-lg hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              See my products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

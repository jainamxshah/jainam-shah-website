'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Article, formatDate } from '@/lib/articles';

interface ArticleCardProps {
  article: Article;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group border-b border-foreground/[0.08] py-12 first:pt-0"
    >
      <Link href={`/insights/${article.slug}`} className="block">
        <div className="transition-colors duration-300 rounded-lg -mx-4 px-4 py-2 group-hover:bg-foreground/[0.02]">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground group-hover:text-accent transition-colors duration-300 mb-3">
            {article.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-foreground/60 mb-4">
            <span>{formatDate(article.date)}</span>
            <span className="hidden md:inline">|</span>
            <span>{article.category}</span>
            <span className="hidden md:inline">|</span>
            <span>{article.readTime}</span>
          </div>
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed line-clamp-2 mb-4 max-w-3xl">
            {article.excerpt}
          </p>
          <span className="inline-flex items-center text-sm text-foreground group-hover:text-accent transition-colors duration-300">
            Read Article
            <svg
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}


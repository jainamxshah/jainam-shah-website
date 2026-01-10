'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Article, formatDate } from '@/lib/articles';
import type { ReactElement } from 'react';

interface ArticleContentProps {
  article: Article;
}

// Simple markdown-like parser for the article content
function parseContent(content: string) {
  const lines = content.split('\n');
  const elements: ReactElement[] = [];
  let inBlockquote = false;
  let blockquoteContent: string[] = [];
  let key = 0;

  const flushBlockquote = () => {
    if (blockquoteContent.length > 0) {
      elements.push(
        <blockquote
          key={key++}
          className="border-l-4 border-accent pl-8 my-12 italic text-foreground/85 text-lg md:text-xl"
        >
          {blockquoteContent.join(' ')}
        </blockquote>
      );
      blockquoteContent = [];
    }
    inBlockquote = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Blockquote
    if (line.startsWith('> ')) {
      inBlockquote = true;
      blockquoteContent.push(line.slice(2));
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="text-2xl md:text-3xl font-medium text-foreground mt-16 mb-6 pt-8 border-t border-foreground/[0.08]"
        >
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-xl md:text-2xl font-medium text-foreground mt-12 mb-4">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    // List item
    if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-foreground/85 leading-relaxed ml-6 mb-2">
          {line.slice(2)}
        </li>
      );
      continue;
    }

    // Numbered list item
    if (/^\d+\. /.test(line)) {
      const text = line.replace(/^\d+\. /, '');
      elements.push(
        <li key={key++} className="text-foreground/85 leading-relaxed ml-6 mb-2 list-decimal">
          {text}
        </li>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      continue;
    }

    // Bold text handling
    const processedLine = line;
    if (line.includes('**')) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      elements.push(
        <p key={key++} className="text-base md:text-lg text-foreground leading-relaxed mb-6">
          {parts.map((part, idx) =>
            idx % 2 === 1 ? (
              <strong key={idx} className="font-semibold">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="text-base md:text-lg text-foreground leading-relaxed mb-6">
        {processedLine}
      </p>
    );
  }

  // Flush any remaining blockquote
  flushBlockquote();

  return elements;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <article className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Article Header */}
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          {/* Category */}
          <span className="text-xs text-accent uppercase tracking-widest font-medium mb-4 block">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="font-kalice text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
            {article.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-6 text-sm text-foreground/60">
            <span>{formatDate(article.date)}</span>
            <span>|</span>
            <span>{article.readTime}</span>
          </div>
        </motion.header>

        {/* Featured Image */}
        {article.featuredImage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[21/9] rounded-xl overflow-hidden mb-16 bg-foreground/5"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(${(parseInt(article.id) * 50) % 360}, 20%, 85%) 0%, 
                  hsl(${(parseInt(article.id) * 50 + 40) % 360}, 25%, 75%) 100%)`,
              }}
            />
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                e.currentTarget.style.opacity = '0';
              }}
            />
          </motion.div>
        )}

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="prose prose-lg max-w-none"
        >
          {parseContent(article.content)}
        </motion.div>

        {/* Article Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-foreground/[0.08]"
        >
          <Link
            href="/insights"
            className="inline-flex items-center text-base text-foreground hover:text-accent transition-colors duration-300 group"
          >
            <svg
              className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Insights
          </Link>
        </motion.footer>
      </div>
    </article>
  );
}


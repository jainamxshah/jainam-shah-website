'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 ease-smooth focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2';

  const variants = {
    primary: 'bg-foreground text-background hover:bg-foreground/90',
    secondary: 'bg-transparent border border-foreground/20 text-foreground hover:border-foreground/50',
    text: 'bg-transparent text-foreground hover:text-accent underline-offset-4 hover:underline',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-6 py-3 text-sm',
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const MotionComponent = motion.span;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        <MotionComponent
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          {children}
        </MotionComponent>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedStyles}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}


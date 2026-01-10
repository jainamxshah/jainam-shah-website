'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <motion.h1
          className="font-display text-6xl md:text-7xl text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Oops
        </motion.h1>
        <motion.p
          className="font-sans text-xl text-foreground/70 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          Something went wrong
        </motion.p>
        <motion.p
          className="font-sans text-base text-foreground/60 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <button
            onClick={reset}
            className="px-6 py-3 bg-foreground text-background rounded-md font-sans text-base font-medium transition-colors duration-300 hover:bg-accent hover:text-foreground"
          >
            Try Again
          </button>
          <a
            href="mailto:hello@jainamshah.com"
            className="px-6 py-3 border-2 border-foreground text-foreground rounded-md font-sans text-base font-medium transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}


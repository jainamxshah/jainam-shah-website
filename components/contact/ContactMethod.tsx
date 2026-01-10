'use client';

import { motion } from 'framer-motion';

interface ContactMethodProps {
  label: string;
  children: React.ReactNode;
  delay?: number;
}

export default function ContactMethod({ label, children, delay = 0 }: ContactMethodProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="text-sm text-foreground/60 uppercase tracking-widest mb-3">{label}</h3>
      {children}
    </motion.div>
  );
}


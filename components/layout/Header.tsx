'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/what-i-do', label: 'What I Do' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
];

// Pages with dark backgrounds
const darkPages = ['/work'];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Check if we're on a dark background page
  const isDarkPage = darkPages.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Dynamic colors based on page
  const textColor = isDarkPage ? 'text-background' : 'text-foreground';
  const textColorMuted = isDarkPage ? 'text-background/70' : 'text-foreground/70';
  const bgColor = isScrolled
    ? isDarkPage
      ? 'bg-foreground/95 backdrop-blur-md'
      : 'bg-background/90 backdrop-blur-md shadow-sm'
    : 'bg-transparent';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${bgColor}`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between py-5">
        {/* Brand */}
        <Link
          href="/"
          className={`text-base font-medium tracking-tight hover:opacity-70 transition-opacity ${textColor}`}
        >
          Jainam Shah
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink 
                href={link.href} 
                active={pathname === link.href}
                isDarkPage={isDarkPage}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <motion.span
            className={`block w-6 h-0.5 ${isDarkPage ? 'bg-background' : 'bg-foreground'}`}
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 4 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className={`block w-6 h-0.5 ${isDarkPage ? 'bg-background' : 'bg-foreground'}`}
            animate={{
              opacity: isMobileMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className={`block w-6 h-0.5 ${isDarkPage ? 'bg-background' : 'bg-foreground'}`}
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -4 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`lg:hidden backdrop-blur-md border-t ${
              isDarkPage 
                ? 'bg-foreground/95 border-background/10' 
                : 'bg-background/95 border-foreground/5'
            }`}
          >
            <ul className="max-w-7xl mx-auto px-6 md:px-8 py-8 space-y-6">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={`block text-2xl font-medium transition-colors ${
                      pathname === link.href
                        ? textColor
                        : `${textColorMuted} hover:${textColor}`
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  active?: boolean;
  isDarkPage?: boolean;
  children: React.ReactNode;
}

function NavLink({ href, active, isDarkPage, children }: NavLinkProps) {
  const textColor = isDarkPage ? 'text-background' : 'text-foreground';
  const textColorMuted = isDarkPage ? 'text-background/70' : 'text-foreground/70';
  
  return (
    <Link href={href} className="relative group py-1">
      <span
        className={`text-sm transition-colors ${
          active ? textColor : `${textColorMuted} group-hover:${textColor}`
        }`}
      >
        {children}
      </span>
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
        initial={{ scaleX: active ? 1 : 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </Link>
  );
}


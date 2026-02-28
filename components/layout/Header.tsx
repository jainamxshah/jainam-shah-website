'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { getLenis } from '@/lib/lenis';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/what-i-do', label: 'What I Do' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();

  // Handle scroll detection with Lenis for better reliability
  useEffect(() => {
    const handleScroll = (scrollData: { scroll?: number } | null | undefined) => {
      const scrollY = scrollData?.scroll || window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', () => handleScroll({ scroll: window.scrollY }), { passive: true });
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', () => handleScroll({ scroll: window.scrollY }));
      }
    };
  }, []);

  // Intersection Observer to detect section theme dynamically
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-0px 0px -90% 0px', // Detect when section hits the top 10%
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute('data-header-theme');
          if (theme === 'dark' || theme === 'light') {
            setActiveTheme(theme);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Initial scan and setup observers
    const sections = document.querySelectorAll('[data-header-theme]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [pathname]); // Re-observe on route change

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isDark = activeTheme === 'dark';

  // Dynamic colors based on active section theme
  const textColor = isDark ? 'text-background' : 'text-foreground';
  const textColorMuted = isDark ? 'text-background/70' : 'text-foreground/70';

  // Header background logic
  const bgColor = isScrolled
    ? isDark
      ? 'bg-foreground/95 backdrop-blur-md shadow-lg border-b border-background/5'
      : 'bg-background/90 backdrop-blur-md shadow-sm border-b border-foreground/5'
    : 'bg-transparent';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${bgColor}`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between py-4 md:py-5">
        {/* Brand */}
        <Link
          href="/"
          className={`text-base font-semibold tracking-tight hover:opacity-70 transition-all duration-300 ${textColor}`}
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
                isDark={isDark}
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
            className={`block w-6 h-0.5 rounded-full ${isDark ? 'bg-background' : 'bg-foreground'}`}
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 4 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={`block w-6 h-0.5 rounded-full ${isDark ? 'bg-background' : 'bg-foreground'}`}
            animate={{
              opacity: isMobileMenuOpen ? 0 : 1,
              x: isMobileMenuOpen ? 10 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className={`block w-6 h-0.5 rounded-full ${isDark ? 'bg-background' : 'bg-foreground'}`}
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -4 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </nav>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`lg:hidden backdrop-blur-xl border-t ${isDark
              ? 'bg-foreground/98 border-background/10'
              : 'bg-background/98 border-foreground/10'
              }`}
          >
            <ul className="max-w-7xl mx-auto px-6 md:px-8 py-10 space-y-8">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`block text-3xl font-medium tracking-tight transition-colors ${pathname === link.href
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
  isDark?: boolean;
  children: React.ReactNode;
}

function NavLink({ href, active, isDark, children }: NavLinkProps) {
  const textColor = isDark ? 'text-background' : 'text-foreground';
  const textColorMuted = isDark ? 'text-background/70' : 'text-foreground/70';

  return (
    <Link href={href} className="relative group py-1">
      <span
        className={`text-sm font-medium transition-colors duration-300 ${active ? textColor : `${textColorMuted} group-hover:${textColor}`
          }`}
      >
        {children}
      </span>
      <motion.span
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDark ? 'bg-background' : 'bg-accent'} origin-left`}
        initial={{ scaleX: active ? 1 : 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </Link>
  );
}



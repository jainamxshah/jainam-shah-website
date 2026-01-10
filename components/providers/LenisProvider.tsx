'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initLenis, destroyLenis, getLenis } from '@/lib/lenis';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis on mount
    const lenis = initLenis();

    // Cleanup on unmount
    return () => {
      destroyLenis();
    };
  }, []);

  // Handle route changes
  useEffect(() => {
    const lenis = getLenis();
    
    if (lenis) {
      // Scroll to top on route change
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback for reduced motion
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}


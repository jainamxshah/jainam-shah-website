'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Pages that don't need footer (full-screen canvas pages)
const noFooterPages = ['/work'];

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideFooter = noFooterPages.includes(pathname);

  return (
    <>
      <Header />
      
      <main id="main-content">
        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </>
  );
}

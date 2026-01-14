'use client';

import Sidebar from './Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
}

export default function AdminLayout({ children, title, actions }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-60 min-h-screen">
        <div className="p-8">
          {(title || actions) && (
            <header className="flex items-center justify-between mb-8 pb-6 border-b border-foreground/10">
              {title && <h1 className="text-2xl md:text-3xl font-medium text-foreground">{title}</h1>}
              {actions && <div className="flex items-center gap-4">{actions}</div>}
            </header>
          )}

          {children}
        </div>
      </main>
    </div>
  );
}




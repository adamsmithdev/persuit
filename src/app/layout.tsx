'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] font-[var(--font-sans)] antialiased">
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

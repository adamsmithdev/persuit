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
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans">
        <SessionProvider>
          <div className="min-h-screen">
            <Header />
            <main className="p-6">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

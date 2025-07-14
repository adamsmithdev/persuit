'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans">
        <SessionProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

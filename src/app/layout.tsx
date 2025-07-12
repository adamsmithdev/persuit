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
      <body>
        <SessionProvider>
          <Header />
          <main className="p-4">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}

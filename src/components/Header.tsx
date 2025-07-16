'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--info)] rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
              💼
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                Job Tracker
              </h1>
              <p className="text-xs text-[var(--foreground-muted)] hidden sm:block">
                Stay organized, land your dream job
              </p>
            </div>
          </Link>

          {/* User section */}
          <div className="flex items-center space-x-4">
            {session?.user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-3">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full ring-2 ring-[var(--border)] hover:ring-[var(--primary)] transition-all duration-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full ring-2 ring-[var(--border)] hover:ring-[var(--primary)] transition-all duration-200 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {(session.user.name || session.user.email || 'U')
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {session.user.name || 'User'}
                    </span>
                    <span className="text-xs text-[var(--foreground-muted)]">
                      {session.user.email}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

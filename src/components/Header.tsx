'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import { MobileMenuButton } from './Sidebar';

interface HeaderProps {
  readonly onMobileMenuClick: () => void;
}

export default function Header({ onMobileMenuClick }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)] shadow-sm">
      <div className="px-4 lg:px-8 relative">
        <div
          className="flex items-center justify-end"
          style={{ height: '4rem' }}
        >
          {/* Mobile menu button - positioned absolutely to left */}
          <div className="absolute left-4 lg:left-8">
            <MobileMenuButton onClick={onMobileMenuClick} />
          </div>

          {/* User section - always positioned at right */}
          <div className="flex items-center space-x-4">
            {session?.user ? (
              <>
                {/* User info - hidden on mobile */}
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

                {/* Sign out button */}
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              /* Sign in button */
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

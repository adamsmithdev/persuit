'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-[var(--elementBackground)] shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">📋</div>
            <div>
              <h1 className="text-xl font-bold text-[var(--accent)]">Job Tracker</h1>
              <p className="text-xs text-gray-400">Stay organized</p>
            </div>
          </Link>

          {/* User section */}
          <div className="flex items-center space-x-4">
            {session?.user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-3">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {session.user.name || 'User'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {session.user.email}
                    </span>
                  </div>
                </div>
                <Button onClick={() => signOut()}>Sign Out</Button>
              </div>
            ) : (
              <Button onClick={() => signIn('github')}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

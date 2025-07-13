'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Button from './Button';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full p-4 h-16 flex justify-between items-center bg-[var(--elementBackground)]">
      <Link href="/" className="text-xl font-bold hover:opacity-90 transition-opacity">
        Job Tracker
      </Link>
      <div className="flex items-center gap-3">
        {session?.user ? (
          <>
            <span className="text-sm text-gray-400">
              Hi, {session.user.name || 'User'}
            </span>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </>
        ) : (
          <Button onClick={() => signIn('github')}>Sign In</Button>
        )}
      </div>
    </header>
  );
}

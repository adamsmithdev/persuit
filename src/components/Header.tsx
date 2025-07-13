'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full p-4 flex justify-between items-center bg-[var(--elementBackground)]">
      <h1 className="text-xl font-bold">Job Tracker</h1>
      <div className="flex items-center gap-3">
        {session?.user ? (
          <>
            <span className="text-sm text-gray-400">
              Hi, {session.user.name || 'User'}
            </span>
            <button
              onClick={() => signOut()}
              className="px-3 py-1 text-sm bg-[var(--accent)] text-white rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn('github')}
            className="px-3 py-1 text-sm bg-[var(--accent)] text-white rounded"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

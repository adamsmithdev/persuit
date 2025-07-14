'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <aside className="bg-[var(--elementBackground)] text-[var(--foreground)] w-64 min-h-screen p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6 text-[var(--accent)]">📋 Job Tracker</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/" className="hover:text-[var(--accent)]">
          Dashboard
        </Link>
        {/* Add more links here */}
      </nav>

      <div className="mt-auto">
        {session?.user ? (
          <button
            onClick={() => signOut()}
            className="text-sm text-left hover:text-[var(--accent)]"
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={() => signIn('github')}
            className="text-sm text-left hover:text-[var(--accent)]"
          >
            Sign in
          </button>
        )}
      </div>
    </aside>
  );
}

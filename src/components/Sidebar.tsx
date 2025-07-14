'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: '📊' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="bg-[var(--elementBackground)] text-[var(--foreground)] w-64 min-h-screen flex flex-col shadow-lg border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl">📋</div>
          <div>
            <h1 className="text-xl font-bold text-[var(--accent)]">Job Tracker</h1>
            <p className="text-xs text-gray-400">Stay organized</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-[var(--accent)] text-white'
                    : 'hover:bg-[var(--background)] text-[var(--foreground)]'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {session?.user ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--foreground)] truncate">
                  {session.user.name || 'User'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-[var(--accent)] transition-colors duration-200 focus:outline-none"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('github')}
            className="w-full px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accentHover)] text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none"
          >
            Sign in with GitHub
          </button>
        )}
      </div>
    </aside>
  );
}

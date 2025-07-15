'use client';

import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function LoginContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // Redirect authenticated users away from login page
  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (session?.user) {
      router.replace(callbackUrl);
    }
  }, [session, status, router, callbackUrl]);

  const handleSignIn = () => {
    signIn('github', { callbackUrl });
  };

  // Show loading while checking authentication status
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--background)]">
        <div className="text-[var(--foreground-muted)]">Loading...</div>
      </div>
    );
  }

  // Don't render login form if user is already authenticated
  if (session?.user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--background)]">
        <div className="text-[var(--foreground-muted)]">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[var(--background)]">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)] shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--info)] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-3">
            Welcome Back
          </h1>
          <p className="text-[var(--foreground-muted)] mb-8 leading-relaxed">
            Sign in to access your job tracking dashboard and continue managing
            your applications.
          </p>
          <button
            onClick={handleSignIn}
            className="w-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground-muted)] px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-3"
          >
            <span className="text-lg">📱</span>
            <span>Sign in with GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center items-center">
          <div className="text-[var(--foreground-muted)]">Loading...</div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

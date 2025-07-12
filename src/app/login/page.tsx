'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <button
        onClick={() => signIn('github')}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}

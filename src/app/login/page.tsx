'use client';

import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { Icon } from '@/components/ui';
import { faLock } from '@/lib/fontawesome';

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

	const handleSignInGitHub = () => {
		signIn('github', { callbackUrl });
	};

	const handleSignInGoogle = () => {
		signIn('google', { callbackUrl });
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
						<Icon icon={faLock} className="text-3xl text-white" />
					</div>
					<h1 className="text-2xl font-bold text-[var(--foreground)] mb-3">
						Welcome Back
					</h1>
					<p className="text-[var(--foreground-muted)] mb-8 leading-relaxed">
						Sign in to access your Persuit dashboard and continue managing your
						job hunt.
					</p>
					<div className="space-y-4">
						<button
							onClick={handleSignInGoogle}
							className="w-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground-muted)] px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-3"
						>
							<svg className="w-5 h-5" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							<span>Sign in with Google</span>
						</button>
						<button
							onClick={handleSignInGitHub}
							className="w-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground-muted)] px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-3"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
							</svg>
							<span>Sign in with GitHub</span>
						</button>
					</div>
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

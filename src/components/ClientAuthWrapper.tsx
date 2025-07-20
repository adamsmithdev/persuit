'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ClientAuthWrapperProps {
	readonly children: ReactNode;
	readonly redirectTo?: string;
	readonly fallback?: ReactNode;
}

export function ClientAuthWrapper({
	children,
	redirectTo = '/login',
	fallback,
}: ClientAuthWrapperProps) {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'loading') return; // Still loading

		if (!session?.user?.email) {
			router.push(redirectTo);
		}
	}, [session, status, router, redirectTo]);

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center min-h-[50vh]">
				<div className="text-[var(--foreground-muted)]">Loading...</div>
			</div>
		);
	}

	if (!session?.user?.email) {
		if (fallback) {
			return <>{fallback}</>;
		}
		return null;
	}

	return <>{children}</>;
}

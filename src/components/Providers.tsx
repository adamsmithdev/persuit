'use client';

import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
	readonly children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	return <SessionProvider>{children}</SessionProvider>;
}

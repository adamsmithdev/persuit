'use client';

import './globals.css';
import '@/lib/fontawesome';
import { SessionProvider } from 'next-auth/react';
import AppLayout from '@/components/AppLayout';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="bg-[var(--background)] text-[var(--foreground)] font-[var(--font-sans)] antialiased">
				<SessionProvider>
					<AppLayout>{children}</AppLayout>
				</SessionProvider>
			</body>
		</html>
	);
}

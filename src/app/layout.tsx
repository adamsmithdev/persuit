import './globals.css';
import '@/lib/fontawesome';
import AppLayout from '@/components/AppLayout';
import Providers from '@/components/Providers';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="bg-[var(--background)] text-[var(--foreground)] font-[var(--font-sans)] antialiased">
				<Providers>
					<AppLayout>{children}</AppLayout>
				</Providers>
			</body>
		</html>
	);
}

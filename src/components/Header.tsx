'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import { Icon, Avatar } from '@/components/ui';
import { faBars } from '@/lib/fontawesome';

interface HeaderProps {
	readonly onMobileMenuClick: () => void;
	readonly isAuthenticated: boolean;
}

export default function Header({
	onMobileMenuClick,
	isAuthenticated,
}: HeaderProps) {
	const { data: session } = useSession();

	return (
		<header className="sticky top-0 z-50 w-full bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)] shadow-sm">
			<div className="px-4 lg:px-8">
				<div
					className="flex items-center justify-between"
					style={{ height: '4rem' }}
				>
					{/* Left section - Logo and hamburger */}
					<div className="flex items-center space-x-4">
						{/* Hamburger menu for mobile */}
						{isAuthenticated && (
							<button
								onClick={onMobileMenuClick}
								className="lg:hidden p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-variant)] rounded-lg transition-colors"
							>
								<Icon icon={faBars} />
							</button>
						)}

						{/* Desktop logo */}
						{isAuthenticated && (
							<Link href="/" className="hidden lg:flex items-center">
								<Image
									src="/images/logo_full.png"
									alt="Persuit Logo"
									width={120}
									height={40}
									className="object-contain hover:opacity-80 transition-opacity duration-200"
								/>
							</Link>
						)}

						{/* Logo for non-authenticated users */}
						{!isAuthenticated && (
							<Link href="/" className="flex items-center">
								<Image
									src="/images/logo_full.png"
									alt="Persuit Logo"
									width={120}
									height={40}
									className="object-contain hover:opacity-80 transition-opacity duration-200"
								/>
							</Link>
						)}
					</div>

					{/* Right section - User info and sign in/out */}
					<div className="flex items-center space-x-4">
						{session?.user ? (
							<>
								{/* User info - hidden on mobile */}
								<div className="hidden md:flex items-center space-x-3">
									<Avatar
										src={session.user.image}
										alt="Profile"
										name={session.user.name}
										fallbackText={session.user.email}
										size="sm"
										hover
									/>
									<div className="flex flex-col">
										<span className="text-sm font-medium text-[var(--foreground)]">
											{session.user.name || 'User'}
										</span>
										<span className="text-xs text-[var(--foreground-muted)]">
											{session.user.email}
										</span>
									</div>
								</div>

								{/* Sign out button */}
								<Button variant="outline" size="sm" onClick={() => signOut()}>
									Sign Out
								</Button>
							</>
						) : (
							/* Sign in button */
							<Link href="/login">
								<Button variant="outline" size="sm">
									Sign In
								</Button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}

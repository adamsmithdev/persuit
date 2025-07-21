'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AppLayoutProps {
	readonly children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
	const { data: session, status } = useSession();
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Load sidebar state from localStorage on mount
	useEffect(() => {
		const savedCollapsedState = localStorage.getItem('sidebar-collapsed');
		if (savedCollapsedState !== null) {
			setIsSidebarCollapsed(JSON.parse(savedCollapsedState));
		}
	}, []);

	// Save sidebar state to localStorage whenever it changes
	const handleToggleSidebar = () => {
		const newCollapsedState = !isSidebarCollapsed;
		setIsSidebarCollapsed(newCollapsedState);
		localStorage.setItem(
			'sidebar-collapsed',
			JSON.stringify(newCollapsedState),
		);
	};

	const isAuthenticated = status === 'authenticated' && session?.user;

	return (
		<div className="min-h-screen bg-[var(--background)]">
			{/* Header - always show (contains sign in/out, logo, and hamburger) */}
			<Header
				onMobileMenuClick={() => setIsMobileMenuOpen(true)}
				isAuthenticated={!!isAuthenticated}
			/>

			{/* Content area below header */}
			<div className="flex min-h-[calc(100vh-4rem)]">
				{/* Sidebar - only show when authenticated */}
				{isAuthenticated && (
					<Sidebar
						isCollapsed={isSidebarCollapsed}
						isMobileOpen={isMobileMenuOpen}
						setIsMobileOpen={setIsMobileMenuOpen}
						onToggleCollapse={handleToggleSidebar}
					/>
				)}

				{/* Main content area */}
				<div className="flex-1 flex flex-col min-w-0">
					{/* Main content */}
					<main className="flex-1 px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
}

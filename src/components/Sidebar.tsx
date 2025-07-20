'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
	{
		name: 'Dashboard',
		href: '/',
		icon: '📊',
		description: 'Overview & stats',
	},
	{
		name: 'Applications',
		href: '/applications',
		icon: '📋',
		description: 'Manage applications',
	},
	{
		name: 'Interviews',
		href: '/interviews',
		icon: '📅',
		description: 'Interviews & schedule',
	},
	{
		name: 'Documents',
		href: '/documents',
		icon: '📄',
		description: 'Resumes & cover letters',
	},
	{
		name: 'Profile',
		href: '/profile',
		icon: '👤',
		description: 'Your information',
	},
	{
		name: 'Settings',
		href: '/settings',
		icon: '⚙️',
		description: 'App preferences',
	},
];

interface SidebarProps {
	readonly isCollapsed: boolean;
	readonly setIsCollapsed: (collapsed: boolean) => void;
	readonly isMobileOpen: boolean;
	readonly setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({
	isCollapsed,
	setIsCollapsed,
	isMobileOpen,
	setIsMobileOpen,
}: SidebarProps) {
	const pathname = usePathname();

	const isActive = (href: string) => {
		if (href === '/') {
			return pathname === '/';
		}
		return pathname.startsWith(href);
	};

	return (
		<>
			{/* Mobile overlay */}
			{isMobileOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={() => setIsMobileOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
          bg-[var(--surface)] border-r border-[var(--border)]
          transition-all duration-300 ease-in-out flex-shrink-0
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${
						isMobileOpen
							? 'fixed left-0 z-50 top-16 h-[calc(100vh-4rem)]'
							: 'hidden lg:sticky lg:top-0 lg:h-screen lg:block lg:z-auto'
					}
        `}
			>
				<div className="flex flex-col h-full">
					{/* Header */}
					<div className="border-b border-[var(--border)]">
						<div
							className={`
              flex items-center justify-between
              ${isCollapsed ? 'px-3' : 'px-6'}
            `}
							style={{ height: '4rem' }}
						>
							<div
								className={`
              flex items-center space-x-3 overflow-hidden
              transition-all duration-300 ease-in-out
              ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
            `}
							>
								<div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[var(--primary)] to-[var(--info)] rounded-lg flex-shrink-0">
									💼
								</div>
								<div className="min-w-0">
									<h2 className="font-semibold text-[var(--foreground)] whitespace-nowrap">
										Application Tracker
									</h2>
									<p className="text-xs text-[var(--foreground-muted)] whitespace-nowrap">
										Stay organized
									</p>
								</div>
							</div>

							{/* Mobile close button */}
							<button
								onClick={() => setIsMobileOpen(false)}
								className="lg:hidden p-1.5 text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-variant)] rounded-lg transition-colors"
							>
								<span className="text-lg">✕</span>
							</button>

							{/* Desktop collapse button */}
							<button
								onClick={() => setIsCollapsed(!isCollapsed)}
								className={`
                hidden lg:flex p-1.5 text-[var(--foreground-muted)] hover:text-[var(--foreground)] 
                transition-colors
                ${isCollapsed ? 'mx-auto' : ''}
              `}
							>
								<span className="text-lg">☰</span>
							</button>
						</div>
					</div>

					{/* Navigation */}
					<nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
						{navigationItems.map((item) => {
							const active = isActive(item.href);

							// Determine link classes based on state
							const getLinkClasses = () => {
								const baseClasses =
									'group flex items-center text-sm font-medium transition-all duration-200';
								const paddingClasses = isCollapsed
									? 'justify-center p-2'
									: 'px-3 py-2.5';

								if (active && !isCollapsed) {
									return `${baseClasses} ${paddingClasses} bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/25 rounded-xl`;
								} else if (!isCollapsed) {
									return `${baseClasses} ${paddingClasses} text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-variant)] rounded-xl`;
								} else {
									return `${baseClasses} ${paddingClasses} text-[var(--foreground-muted)] hover:text-[var(--foreground)]`;
								}
							};

							// Determine icon classes based on state
							const getIconClasses = () => {
								const baseClasses =
									'flex-shrink-0 text-lg transition-all duration-200';
								const marginClass = !isCollapsed ? 'mr-3' : '';

								if (isCollapsed && active) {
									return `${baseClasses} ${marginClass} w-10 h-10 flex items-center justify-center bg-[var(--primary)] text-white rounded-full shadow-lg shadow-[var(--primary)]/25`;
								} else if (isCollapsed) {
									return `${baseClasses} ${marginClass} w-10 h-10 flex items-center justify-center hover:bg-[var(--surface-variant)] rounded-full`;
								} else {
									return `${baseClasses} ${marginClass}`;
								}
							};

							return (
								<Link
									key={item.name}
									href={item.href}
									onClick={() => setIsMobileOpen(false)}
									className={getLinkClasses()}
									title={isCollapsed ? item.name : undefined}
								>
									<span className={getIconClasses()}>{item.icon}</span>

									<div
										className={`
                    flex-1 min-w-0 overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                  `}
									>
										<div className="font-medium whitespace-nowrap">
											{item.name}
										</div>
										<div
											className={`
                      text-xs mt-0.5 whitespace-nowrap
                      ${
												active
													? 'text-white/80'
													: 'text-[var(--foreground-muted)]'
											}
                    `}
										>
											{item.description}
										</div>
									</div>
								</Link>
							);
						})}
					</nav>

					{/* Footer */}
					<div
						className={`
            p-4 border-t border-[var(--border)]
            ${isCollapsed ? 'px-3' : 'px-6'}
          `}
					>
						{isCollapsed ? (
							/* Collapsed: Just version */
							<div className="text-xs text-[var(--foreground-muted)] text-center">
								<p className="whitespace-nowrap">v0.1.0</p>
							</div>
						) : (
							/* Expanded: Full text with version - smooth transition */
							<div
								className={`
                text-xs text-[var(--foreground-muted)] text-center overflow-hidden
                transition-all duration-300 ease-in-out
                ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
              `}
							>
								{/* Desktop: Full text with version */}
								<p className="whitespace-nowrap hidden lg:block">
									Application Tracker v0.1.0 by{' '}
									<a
										href="https://adamsmith.tech"
										target="_blank"
										rel="noopener noreferrer"
										className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors duration-200 font-medium hover:underline"
									>
										Adam Smith
									</a>
								</p>
								{/* Mobile: Just version */}
								<p className="whitespace-nowrap lg:hidden">v0.1.0</p>
							</div>
						)}
					</div>
				</div>
			</aside>
		</>
	);
}

// Mobile menu button component
export function MobileMenuButton({
	onClick,
}: Readonly<{
	onClick: () => void;
}>) {
	return (
		<button
			onClick={onClick}
			className="lg:hidden p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-variant)] rounded-lg transition-colors"
		>
			<span className="text-lg">☰</span>
		</button>
	);
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui';
import {
	faChartBar,
	faClipboard,
	faCalendar,
	faFileAlt,
	faUser,
	faCog,
	faTimes,
	faChevronLeft,
	faChevronRight,
	faUsers,
} from '@/lib/fontawesome';

const navigationItems = [
	{
		name: 'Dashboard',
		href: '/',
		icon: faChartBar,
		description: 'Overview & stats',
	},
	{
		name: 'Applications',
		href: '/applications',
		icon: faClipboard,
		description: 'Manage applications',
	},
	{
		name: 'Interviews',
		href: '/interviews',
		icon: faCalendar,
		description: 'Interviews & schedule',
	},
	{
		name: 'Contacts',
		href: '/contacts',
		icon: faUsers,
		description: 'Manage contacts',
	},
	{
		name: 'Documents',
		href: '/documents',
		icon: faFileAlt,
		description: 'Resumes & cover letters',
	},
	{
		name: 'Profile',
		href: '/profile',
		icon: faUser,
		description: 'Your information',
	},
	{
		name: 'Settings',
		href: '/settings',
		icon: faCog,
		description: 'App preferences',
	},
];

interface SidebarProps {
	readonly isCollapsed: boolean;
	readonly isMobileOpen: boolean;
	readonly setIsMobileOpen: (open: boolean) => void;
	readonly onToggleCollapse: () => void;
}

export default function Sidebar({
	isCollapsed,
	isMobileOpen,
	setIsMobileOpen,
	onToggleCollapse,
}: SidebarProps) {
	const pathname = usePathname();

	const isActive = (href: string) => {
		if (href === '/') {
			return pathname === '/';
		}

		// Handle special cases where route patterns differ from nav hrefs
		if (href === '/applications') {
			return (
				pathname.startsWith('/applications') ||
				pathname.startsWith('/application')
			);
		}

		if (href === '/interviews') {
			return (
				pathname.startsWith('/interviews') || pathname.startsWith('/interview')
			);
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
							: 'hidden lg:block lg:sticky lg:left-0 lg:top-16 lg:z-30 lg:h-[calc(100vh-4rem)]'
					}
        `}
			>
				<div className="flex flex-col h-full">
					{/* Mobile header with close button */}
					{isMobileOpen && (
						<div className="border-b border-[var(--border)] lg:hidden">
							<div
								className="flex items-center justify-between px-6"
								style={{ height: '4rem' }}
							>
								<div className="flex items-center space-x-3">
									<Image
										src="/images/logo_full.png"
										alt="Persuit Logo"
										width={100}
										height={100}
										className="object-contain"
									/>
								</div>
								<button
									onClick={() => setIsMobileOpen(false)}
									className="p-1.5 text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-variant)] rounded-lg transition-colors"
								>
									<Icon icon={faTimes} />
								</button>
							</div>
						</div>
					)}

					{/* Navigation */}
					<nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
						{/* Desktop collapse toggle button */}
						<div className="hidden lg:block mb-4">
							<button
								onClick={onToggleCollapse}
								className={`
									flex items-center p-2.5 
									text-[var(--foreground-muted)]/60 hover:text-[var(--foreground-muted)] 
									rounded-lg transition-all duration-200
									${isCollapsed ? 'justify-center w-full' : 'justify-end w-full'}
								`}
								title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
							>
								<Icon
									icon={isCollapsed ? faChevronRight : faChevronLeft}
									className="text-lg"
								/>
							</button>
						</div>

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

							// For collapsed state, we need to wrap the icon in a container for circular background
							const renderIcon = () => {
								if (isCollapsed) {
									return (
										<div className={getIconClasses()}>
											<Icon icon={item.icon} />
										</div>
									);
								} else if (typeof item.icon === 'string') {
									return <span className={getIconClasses()}>{item.icon}</span>;
								} else {
									return <Icon icon={item.icon} className={getIconClasses()} />;
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
									{renderIcon()}

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
									Persuit v0.1.0 by{' '}
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

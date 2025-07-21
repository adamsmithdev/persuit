'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import Card from './Card';
import { Icon } from './Icon';
import { faChevronRight } from '@/lib/fontawesome';

interface ListItemProps {
	href: string;
	children: ReactNode;
	className?: string;
}

export default function ListItem({
	href,
	children,
	className = '',
}: Readonly<ListItemProps>) {
	return (
		<Link href={href} className="block group">
			<Card
				variant="surface-variant"
				hoverable
				clickable
				className={`p-6 ${className}`}
			>
				<div className="flex items-start justify-between">
					<div className="flex-1 min-w-0">{children}</div>

					<div className="flex-shrink-0 ml-4">
						<div className="w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] transition-all duration-200">
							<Icon
								icon={faChevronRight}
								className="w-4 h-4 text-[var(--foreground-muted)] group-hover:text-white transition-colors"
							/>
						</div>
					</div>
				</div>
			</Card>
		</Link>
	);
}

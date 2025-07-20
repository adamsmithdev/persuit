'use client';

import React, { ReactNode } from 'react';

interface GridProps {
	children: ReactNode;
	cols?: 1 | 2 | 3;
	gap?: 2 | 3 | 4 | 6;
	className?: string;
}

export default function Grid({
	children,
	cols = 2,
	gap = 4,
	className = '',
}: Readonly<GridProps>) {
	const colsClasses = {
		1: 'grid-cols-1',
		2: 'grid-cols-1 sm:grid-cols-2',
		3: 'grid-cols-1 sm:grid-cols-3',
	};

	const gapClasses = {
		2: 'gap-2',
		3: 'gap-3',
		4: 'gap-4',
		6: 'gap-6',
	};

	return (
		<div
			className={`grid ${colsClasses[cols]} ${gapClasses[gap]} ${className}`}
		>
			{children}
		</div>
	);
}

'use client';

import React, { ReactNode } from 'react';

interface FormActionsProps {
	children: ReactNode;
	layout?: 'row' | 'column' | 'space-between';
	className?: string;
}

export default function FormActions({
	children,
	layout = 'row',
	className = '',
}: Readonly<FormActionsProps>) {
	const layoutClasses = {
		row: 'flex flex-col sm:flex-row gap-3',
		column: 'flex flex-col gap-3',
		'space-between': 'flex flex-col sm:flex-row sm:justify-between gap-3',
	};

	return (
		<div className={`pt-6 ${layoutClasses[layout]} ${className}`}>
			{children}
		</div>
	);
}

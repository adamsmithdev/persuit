'use client';

import React, { ReactNode } from 'react';

interface FormSectionProps {
	title: string;
	description?: string;
	children: ReactNode;
	className?: string;
}

export default function FormSection({
	title,
	description,
	children,
	className = '',
}: Readonly<FormSectionProps>) {
	return (
		<div className={`space-y-4 ${className}`}>
			<div>
				<h3 className="text-lg font-semibold text-[var(--foreground)] border-b border-[var(--border)] pb-2">
					{title}
				</h3>
				{description && (
					<p className="text-sm text-[var(--foreground-muted)] mt-1">
						{description}
					</p>
				)}
			</div>
			{children}
		</div>
	);
}

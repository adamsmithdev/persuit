'use client';

import React, { ReactNode } from 'react';

interface FormContainerProps {
	title: string;
	description?: string;
	children: ReactNode;
	className?: string;
}

export default function FormContainer({
	title,
	description,
	children,
	className = '',
}: Readonly<FormContainerProps>) {
	return (
		<div className={`max-w-2xl mx-auto ${className}`}>
			<div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)] shadow-lg">
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
						{title}
					</h2>
					{description && (
						<p className="text-[var(--foreground-muted)]">{description}</p>
					)}
				</div>
				{children}
			</div>
		</div>
	);
}

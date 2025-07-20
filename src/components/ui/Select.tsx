'use client';

import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	error?: boolean;
	children: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ className = '', error = false, children, ...props }, ref) => {
		const baseClasses =
			'w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200 appearance-none cursor-pointer';

		const errorClasses = error
			? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]'
			: '';

		const combinedClasses = `${baseClasses} ${errorClasses} ${className}`;

		return (
			<div className="relative">
				<select
					ref={ref}
					className={combinedClasses}
					style={{
						backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
						backgroundPosition: 'right 0.75rem center',
						backgroundRepeat: 'no-repeat',
						backgroundSize: '1.5em 1.5em',
					}}
					{...props}
				>
					{children}
				</select>
			</div>
		);
	},
);

Select.displayName = 'Select';

export default Select;

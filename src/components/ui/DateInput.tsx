'use client';

import React, { forwardRef } from 'react';

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
	placeholder?: string;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
	({ className = '', error = false, placeholder, ...props }, ref) => {
		const baseClasses =
			'w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200 cursor-pointer relative z-10';

		const errorClasses = error
			? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]'
			: '';

		const combinedClasses = `${baseClasses} ${errorClasses} ${className}`;

		return (
			<div className="relative">
				<input
					ref={ref}
					type="date"
					className={combinedClasses}
					style={{
						colorScheme: 'dark',
					}}
					{...props}
				/>
				{!props.value && placeholder && (
					<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[var(--foreground-muted)] z-0">
						{placeholder}
					</div>
				)}
				<div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none z-20">
					<svg
						className="w-5 h-5 text-[var(--foreground-muted)]"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M7 4V2a1 1 0 012 0v2h6V2a1 1 0 012 0v2h1a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h1zM4 10h16M9 14h6"
						/>
					</svg>
				</div>
			</div>
		);
	},
);

DateInput.displayName = 'DateInput';

export default DateInput;

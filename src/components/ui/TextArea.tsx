'use client';

import React, { forwardRef } from 'react';

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ className = '', error = false, ...props }, ref) => {
		const baseClasses =
			'w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] resize-vertical transition-all duration-200';

		const errorClasses = error
			? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]'
			: '';

		const combinedClasses = `${baseClasses} ${errorClasses} ${className}`;

		return <textarea ref={ref} className={combinedClasses} {...props} />;
	},
);

TextArea.displayName = 'TextArea';

export default TextArea;

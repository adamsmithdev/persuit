'use client';

import React from 'react';

interface CheckboxProps {
	id: string;
	name?: string;
	checked?: boolean;
	disabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}

export default function Checkbox({
	id,
	name,
	checked = false,
	disabled = false,
	onChange,
	className = '',
}: Readonly<CheckboxProps>) {
	return (
		<input
			type="checkbox"
			id={id}
			name={name || id}
			checked={checked}
			disabled={disabled}
			onChange={onChange}
			className={`w-5 h-5 text-[var(--primary)] bg-[var(--surface-variant)] border-[var(--border)] rounded focus:ring-[var(--primary)] disabled:opacity-60 ${className}`}
		/>
	);
}

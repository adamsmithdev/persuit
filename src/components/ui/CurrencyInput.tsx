'use client';

import React, { forwardRef } from 'react';
import Input from './Input';

interface CurrencyInputProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		'type' | 'onChange'
	> {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
	({ value = '', onChange, ...props }, ref) => {
		const formatCurrency = (amount: string) => {
			// Remove all non-digit characters
			const cleaned = amount.replace(/\D/g, '');

			// Convert to number and format with commas
			if (cleaned === '') return '';

			const number = parseInt(cleaned, 10);
			return number.toLocaleString();
		};

		const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const formattedValue = formatCurrency(e.target.value);

			// Create a new event with the formatted value
			const newEvent = {
				...e,
				target: {
					...e.target,
					value: formattedValue,
					name: e.target.name, // Explicitly preserve the name
				},
			};

			onChange?.(newEvent as React.ChangeEvent<HTMLInputElement>);
		};

		return (
			<div className="relative">
				<span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--foreground-muted)] pointer-events-none">
					$
				</span>
				<Input
					{...props}
					ref={ref}
					type="text"
					value={value}
					onChange={handleCurrencyChange}
					className="pl-8"
					placeholder="80,000"
				/>
			</div>
		);
	},
);

CurrencyInput.displayName = 'CurrencyInput';

export default CurrencyInput;

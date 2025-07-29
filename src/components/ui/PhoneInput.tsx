'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import Input from './Input';

interface PhoneInputProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		'type' | 'onChange'
	> {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
	({ value = '', onChange, ...props }, ref) => {
		const [internalValue, setInternalValue] = useState('');

		// Update internal value when external value changes
		useEffect(() => {
			setInternalValue(formatPhoneNumber(value));
		}, [value]);

		const formatPhoneNumber = (phone: string) => {
			// Remove all non-digit characters
			const cleaned = phone.replace(/\D/g, '');

			// Limit to 10 digits
			const limited = cleaned.slice(0, 10);

			// Apply formatting based on length
			if (limited.length === 0) {
				return '';
			} else if (limited.length <= 3) {
				return limited;
			} else if (limited.length <= 6) {
				return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
			} else {
				return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
			}
		};

		const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = e.target.value;
			const formattedPhone = formatPhoneNumber(inputValue);

			setInternalValue(formattedPhone);

			// Call the parent onChange with the formatted value
			if (onChange) {
				const newEvent = {
					...e,
					target: {
						...e.target,
						value: formattedPhone,
						name: e.target.name, // Explicitly preserve the name
					},
				};
				onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
			}
		};

		return (
			<Input
				{...props}
				ref={ref}
				type="tel"
				value={internalValue}
				onChange={handlePhoneChange}
				placeholder="(555) 123-4567"
				maxLength={14} // (XXX) XXX-XXXX
			/>
		);
	},
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;

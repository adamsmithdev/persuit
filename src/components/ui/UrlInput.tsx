'use client';

import React, { forwardRef } from 'react';
import Input from './Input';

interface UrlInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UrlInput = forwardRef<HTMLInputElement, UrlInputProps>(
	(
		{ value = '', onChange, placeholder = 'https://example.com', ...props },
		ref,
	) => {
		const formatUrl = (url: string) => {
			if (!url) return '';

			// If it doesn't start with http:// or https://, and it's not empty, add https://
			const httpRegex = /^https?:\/\//i;
			if (url && !httpRegex.exec(url)) {
				return `https://${url}`;
			}

			return url;
		};

		const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
			const formattedUrl = formatUrl(e.target.value);

			if (formattedUrl !== e.target.value) {
				// Create a new event with the formatted value
				const newEvent = {
					...e,
					target: {
						...e.target,
						value: formattedUrl,
						name: e.target.name, // Explicitly preserve the name
					},
				} as React.ChangeEvent<HTMLInputElement>;

				onChange?.(newEvent);
			}

			// Call original onBlur if provided
			props.onBlur?.(e);
		};

		return (
			<Input
				{...props}
				ref={ref}
				type="url"
				value={value}
				onChange={onChange}
				onBlur={handleUrlBlur}
				placeholder={placeholder}
			/>
		);
	},
);

UrlInput.displayName = 'UrlInput';

export default UrlInput;

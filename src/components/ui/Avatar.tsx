import React from 'react';
import Image from 'next/image';

interface AvatarProps {
	/** The image URL for the avatar. If not provided, initials will be shown */
	src?: string | null;
	/** The alt text for the image */
	alt?: string;
	/** The name to generate initials from. Will use first letter of each word */
	name?: string | null;
	/** Alternative text to generate initials from (fallback if name is not provided) */
	fallbackText?: string | null;
	/** Size variant for the avatar */
	size?: 'sm' | 'md' | 'lg' | 'xl';
	/** Whether to show hover effects */
	hover?: boolean;
	/** Additional CSS classes */
	className?: string;
}

const SIZE_CONFIG = {
	sm: { classes: 'w-9 h-9 text-sm', pixels: 36 },
	md: { classes: 'w-12 h-12 text-sm', pixels: 48 },
	lg: { classes: 'w-16 h-16 text-lg', pixels: 64 },
	xl: { classes: 'w-20 h-20 text-2xl', pixels: 80 },
} as const;

export default function Avatar({
	src,
	alt = 'Avatar',
	name,
	fallbackText,
	size = 'md',
	hover = false,
	className = '',
}: Readonly<AvatarProps>) {
	const getInitials = () => {
		const text = name || fallbackText || 'U';

		// If it's a full name, take first letter of each word
		const words = text.trim().split(/\s+/);
		if (words.length >= 2) {
			return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
		}

		// Otherwise, just take the first character
		return text.charAt(0).toUpperCase();
	};

	const sizeConfig = SIZE_CONFIG[size];
	const ringClasses = size === 'xl' ? 'ring-4' : 'ring-2';
	const hoverClasses = hover
		? 'hover:ring-[var(--primary)] transition-all duration-200'
		: '';
	const baseClasses = `${sizeConfig.classes} rounded-full ${ringClasses} ring-[var(--border)] ${hoverClasses}`;

	if (src) {
		return (
			<Image
				src={src}
				alt={alt}
				width={sizeConfig.pixels}
				height={sizeConfig.pixels}
				className={`${baseClasses} object-cover ${className}`}
			/>
		);
	}

	return (
		<div
			className={`${baseClasses} bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ${className}`}
		>
			<span className="text-white font-semibold">{getInitials()}</span>
		</div>
	);
}

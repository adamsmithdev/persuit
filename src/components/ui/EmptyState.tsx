'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../Button';
import { Icon } from './Icon';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@/lib/fontawesome';

interface EmptyStateProps {
	icon: string | IconDefinition;
	title: string;
	description: string;
	actionLabel?: string;
	actionHref?: string;
	onAction?: () => void;
	size?: 'sm' | 'md' | 'lg';
}

export default function EmptyState({
	icon,
	title,
	description,
	actionLabel,
	actionHref,
	onAction,
	size = 'md',
}: Readonly<EmptyStateProps>) {
	const sizeClasses = {
		sm: {
			container: 'py-8',
			icon: 'text-4xl mb-3',
			iconContainer: 'w-12 h-12',
			title: 'text-base',
			description: 'text-sm',
		},
		md: {
			container: 'py-12',
			icon: 'text-6xl mb-4',
			iconContainer: 'w-16 h-16',
			title: 'text-lg',
			description: 'text-sm',
		},
		lg: {
			container: 'py-16',
			icon: 'text-3xl',
			iconContainer: 'w-16 h-16',
			title: 'text-xl',
			description: 'text-base',
		},
	};

	const classes = sizeClasses[size];

	const renderAction = () => {
		if (!actionLabel) return null;

		if (actionHref) {
			return (
				<Link href={actionHref}>
					<Button size={size === 'lg' ? 'lg' : 'md'}>
						<Icon icon={faPlus} className="mr-2" />
						<span>{actionLabel}</span>
					</Button>
				</Link>
			);
		}

		if (onAction) {
			return (
				<Button onClick={onAction} size={size === 'lg' ? 'lg' : 'md'}>
					<Icon icon={faPlus} className="mr-2" />
					<span>{actionLabel}</span>
				</Button>
			);
		}

		return null;
	};

	return (
		<div
			className={`text-center text-[var(--foreground-muted)] ${classes.container}`}
		>
			<div
				className={`${classes.iconContainer} bg-[var(--surface-variant)] rounded-2xl flex items-center justify-center mx-auto mb-6`}
			>
				{typeof icon === 'string' ? (
					<span className={classes.icon}>{icon}</span>
				) : (
					<Icon icon={icon} className={classes.icon} />
				)}
			</div>
			<h3
				className={`font-semibold text-[var(--foreground)] mb-3 ${classes.title}`}
			>
				{title}
			</h3>
			<p
				className={`max-w-md mx-auto leading-relaxed mb-8 ${classes.description}`}
			>
				{description}
			</p>
			{renderAction()}
		</div>
	);
}

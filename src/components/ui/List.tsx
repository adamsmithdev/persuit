'use client';

import React, { ReactNode } from 'react';

interface ListProps {
	children: ReactNode;
	className?: string;
}

export default function List({
	children,
	className = '',
}: Readonly<ListProps>) {
	return <div className={`space-y-3 ${className}`}>{children}</div>;
}

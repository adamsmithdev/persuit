import { Application } from '@prisma/client';
import React from 'react';
import ApplicationListItem from './ApplicationListItem';
import { List } from './ui';

interface Props {
	readonly applications: Application[];
}

export default function ApplicationList({ applications }: Props) {
	return (
		<List>
			{applications.map((application) => (
				<ApplicationListItem key={application.id} application={application} />
			))}
		</List>
	);
}

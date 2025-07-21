'use client';

import { useState, useMemo } from 'react';
import { Application } from '@prisma/client';
import Link from 'next/link';
import Button from '@/components/Button';
import ApplicationList from '@/components/ApplicationList';
import DashboardStats from '@/components/DashboardStats';
import SearchAndFilter from '@/components/SearchAndFilter';
import { EmptyState } from './ui';

interface Props {
	readonly applications: Application[];
}

export default function Dashboard({ applications }: Props) {
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('');

	const filteredApplications = useMemo(() => {
		return applications.filter((application) => {
			const matchesSearch =
				searchQuery === '' ||
				application.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
				application.position.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesStatus =
				statusFilter === '' || application.status === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}, [applications, searchQuery, statusFilter]);

	const renderApplicationsContent = () => {
		if (filteredApplications.length > 0) {
			return <ApplicationList applications={filteredApplications} />;
		}

		if (applications.length === 0) {
			return (
				<EmptyState
					icon="📝"
					title="Ready to start your application search?"
					description="Track applications, organize interviews, and stay on top of your application search journey with ease."
					actionLabel="Add Your First Application"
					actionHref="/application/new"
					size="lg"
				/>
			);
		}

		return (
			<EmptyState
				icon="🔍"
				title="No applications match your filters"
				description="Try adjusting your search terms or filters to see more results."
				size="md"
			/>
		);
	};

	return (
		<div className="space-y-8">
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
				<div>
					<h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
						Job Application Dashboard
					</h1>
					<p className="text-[var(--foreground-muted)]">
						Track and manage your job applications in one place
					</p>
				</div>
				<Link href="/application/new">
					<Button>
						<span className="mr-2">+</span>
						<span>Add New Application</span>
					</Button>
				</Link>
			</div>

			{/* Stats Section */}
			<DashboardStats applications={applications} />

			{/* Main Content */}
			<div className="bg-[var(--surface)] rounded-2xl p-6 lg:p-8 border border-[var(--border)] shadow-sm">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
					<div>
						<h2 className="text-xl font-semibold text-[var(--foreground)]">
							Your Applications
						</h2>
						<p className="text-sm text-[var(--foreground-muted)] mt-1">
							{filteredApplications.length} of {applications.length}{' '}
							applications
						</p>
					</div>
				</div>

				<div className="mb-6">
					<SearchAndFilter
						onSearch={setSearchQuery}
						onFilterStatus={setStatusFilter}
						currentFilter={statusFilter}
					/>
				</div>

				{renderApplicationsContent()}
			</div>
		</div>
	);
}

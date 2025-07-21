'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ClientAuthWrapper } from '@/components/ClientAuthWrapper';
import Link from 'next/link';
import Button from '@/components/Button';
import ApplicationList from '@/components/ApplicationList';
import SearchAndFilter from '@/components/SearchAndFilter';
import { Application } from '@prisma/client';
import { EmptyState } from '@/components/ui';

export default function ApplicationsPage() {
	const { data: session } = useSession();
	const [applications, setApplications] = useState<Application[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('');

	// Fetch applications using the applications service via API
	useEffect(() => {
		if (!session?.user?.email) return;

		const fetchApplications = async () => {
			try {
				const response = await fetch('/api/application');
				if (response.ok) {
					const data = await response.json();
					setApplications(data);
				} else {
					console.error('Failed to fetch applications:', response.statusText);
				}
			} catch (error) {
				console.error('Error fetching applications:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchApplications();
	}, [session]);

	// Filter applications based on search and status
	const filteredApplications = useMemo(() => {
		return applications.filter((application) => {
			const matchesSearch =
				application.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
				application.position
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				application.location
					?.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				application.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				application.industry
					?.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				application.contactName
					?.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				application.contactEmail
					?.toLowerCase()
					.includes(searchQuery.toLowerCase());

			const matchesStatus =
				!statusFilter || application.status === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}, [applications, searchQuery, statusFilter]);

	if (loading) {
		return (
			<ClientAuthWrapper>
				<div className="flex items-center justify-center min-h-[50vh]">
					<div className="text-[var(--foreground-muted)]">
						Loading applications...
					</div>
				</div>
			</ClientAuthWrapper>
		);
	}

	return (
		<ClientAuthWrapper>
			<div className="space-y-8">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
					<div>
						<h1 className="text-3xl font-bold text-[var(--foreground)]">
							All Applications
						</h1>
						<p className="text-[var(--foreground-muted)] mt-2">
							Manage and track all your applications ({applications.length}{' '}
							total)
						</p>
					</div>
					<Link href="/application/new">
						<Button>
							<span className="mr-2">+</span>
							<span>Add New Application</span>
						</Button>
					</Link>
				</div>

				{/* Search and Filter */}
				{applications.length > 0 && (
					<SearchAndFilter
						onSearch={setSearchQuery}
						onFilterStatus={setStatusFilter}
						currentFilter={statusFilter}
					/>
				)}

				{/* Applications List */}
				{(() => {
					if (applications.length === 0) {
						return (
							<EmptyState
								icon="📄"
								title="No applications yet"
								description="Start tracking your application search by adding your first application."
								actionLabel="Add Your First Application"
								actionHref="/application/new"
							/>
						);
					}

					if (filteredApplications.length === 0) {
						return (
							<EmptyState
								icon="🔍"
								title="No applications match your filters"
								description="Try adjusting your search terms or filters to see more results."
							/>
						);
					}

					return <ApplicationList applications={filteredApplications} />;
				})()}
			</div>
		</ClientAuthWrapper>
	);
}

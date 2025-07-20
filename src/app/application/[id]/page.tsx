import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getApplication } from '@/lib/services/applicationsService';
import { DeleteApplicationButton } from '@/components/DeleteApplicationButton';
import Button from '@/components/Button';
import { getApplicationStatusConfig } from '@/lib/constants';
import AuthWrapper from '@/components/AuthWrapper';
import { StatusBadge } from '@/components/ui';

interface ApplicationDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ApplicationDetailPage({
	params,
}: ApplicationDetailPageProps) {
	const { id } = await params;
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		notFound();
	}

	const application = await getApplication(id, session.user.email);

	if (!application) {
		notFound();
	}

	const config = getApplicationStatusConfig(application.status);

	return (
		<AuthWrapper>
			<div className="space-y-8">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold text-[var(--foreground)]">
							Application Details
						</h1>
						<p className="text-[var(--foreground-muted)] mt-2">
							View and manage this application
						</p>
					</div>
					<Link href="/applications">
						<Button variant="secondary">
							<span className="mr-2">←</span>
							<span>Back to Applications</span>
						</Button>
					</Link>
				</div>

				<div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)] shadow-sm">
					{/* Header Section */}
					<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
						<div className="space-y-4 flex-1">
							<div>
								<h1 className="text-2xl font-bold text-slate-900">
									{application.position}
								</h1>
								<p className="text-lg text-slate-600">{application.company}</p>
							</div>

							<div className="flex flex-wrap items-center gap-4">
								<div
									className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white ${config.color}`}
								>
									<span>{config.emoji}</span>
									<span>{config.label}</span>
								</div>
								{application.location && (
									<div className="flex items-center gap-2 text-[var(--foreground-muted)]">
										<span>📍</span>
										<span>{application.location}</span>
									</div>
								)}
							</div>
						</div>

						<div className="flex items-center gap-4">
							<StatusBadge status={application.status} config={config} />
							{application.applicationUrl && (
								<a
									href={application.applicationUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
								>
									<span>View Application</span>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</a>
							)}
						</div>
					</div>

					{/* Details Section */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
						<div className="space-y-6">
							<div className="bg-[var(--surface-variant)] rounded-xl p-6">
								<h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
									Timeline
								</h3>
								<div className="space-y-4">
									<div>
										<p className="text-sm text-[var(--foreground-muted)] mb-1">
											Applied Date
										</p>
										<p className="text-[var(--foreground)] font-medium">
											{new Date(application.appliedAt).toLocaleDateString(
												'en-US',
												{
													weekday: 'long',
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												},
											)}
										</p>
									</div>

									{application.applicationDeadline && (
										<div>
											<p className="text-sm text-[var(--foreground-muted)] mb-1">
												Application Deadline
											</p>
											<p className="text-[var(--foreground)] font-medium">
												{new Date(
													application.applicationDeadline,
												).toLocaleDateString('en-US', {
													weekday: 'long',
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												})}
											</p>
										</div>
									)}

									<div>
										<p className="text-sm text-[var(--foreground-muted)] mb-1">
											Last Updated
										</p>
										<p className="text-[var(--foreground)] font-medium">
											{new Date(application.updatedAt).toLocaleDateString(
												'en-US',
												{
													weekday: 'long',
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												},
											)}
										</p>
									</div>
								</div>
							</div>

							{/* Company & Application Details */}
							<div className="bg-[var(--surface-variant)] rounded-xl p-6">
								<h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
									Application Details
								</h3>
								<div className="space-y-4">
									{(application.salaryMin || application.salaryMax) && (
										<div>
											<p className="text-sm text-[var(--foreground-muted)] mb-1">
												Salary Range
											</p>
											<p className="text-[var(--foreground)] font-medium">
												{(() => {
													if (application.salaryMin && application.salaryMax) {
														return `$${application.salaryMin.toLocaleString()} - $${application.salaryMax.toLocaleString()}`;
													} else if (application.salaryMin) {
														return `$${application.salaryMin.toLocaleString()}+`;
													} else {
														return `Up to $${application.salaryMax?.toLocaleString()}`;
													}
												})()}
											</p>
										</div>
									)}

									{application.companySize && (
										<div>
											<p className="text-sm text-[var(--foreground-muted)] mb-1">
												Company Size
											</p>
											<p className="text-[var(--foreground)] font-medium">
												{application.companySize === 'STARTUP' &&
													'🚀 Startup (1-10 employees)'}
												{application.companySize === 'SMALL' &&
													'🏢 Small (11-50 employees)'}
												{application.companySize === 'MEDIUM' &&
													'🏬 Medium (51-200 employees)'}
												{application.companySize === 'LARGE' &&
													'🏭 Large (201-1000 employees)'}
												{application.companySize === 'ENTERPRISE' &&
													'🏗️ Enterprise (1000+ employees)'}
											</p>
										</div>
									)}

									{application.industry && (
										<div>
											<p className="text-sm text-[var(--foreground-muted)] mb-1">
												Industry
											</p>
											<p className="text-[var(--foreground)] font-medium">
												{application.industry}
											</p>
										</div>
									)}

									{application.applicationUrl && (
										<div>
											<p className="text-sm text-[var(--foreground-muted)] mb-1">
												Application Posting
											</p>
											<a
												href={application.applicationUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="text-[var(--primary)] hover:underline font-medium"
											>
												View Original Posting ↗
											</a>
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="space-y-6">
							{/* Contact Information */}
							{(application.contactName ||
								application.contactEmail ||
								application.contactPhone) && (
								<div className="bg-[var(--surface-variant)] rounded-xl p-6">
									<h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
										Contact Information
									</h3>
									<div className="space-y-4">
										{application.contactName && (
											<div>
												<p className="text-sm text-[var(--foreground-muted)] mb-1">
													Contact Person
												</p>
												<p className="text-[var(--foreground)] font-medium">
													{application.contactName}
												</p>
											</div>
										)}

										{application.contactEmail && (
											<div>
												<p className="text-sm text-[var(--foreground-muted)] mb-1">
													Email
												</p>
												<a
													href={`mailto:${application.contactEmail}`}
													className="text-[var(--primary)] hover:underline font-medium"
												>
													{application.contactEmail}
												</a>
											</div>
										)}

										{application.contactPhone && (
											<div>
												<p className="text-sm text-[var(--foreground-muted)] mb-1">
													Phone
												</p>
												<a
													href={`tel:${application.contactPhone}`}
													className="text-[var(--primary)] hover:underline font-medium"
												>
													{application.contactPhone}
												</a>
											</div>
										)}
									</div>
								</div>
							)}

							{application.notes && (
								<div className="space-y-3">
									<h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide">
										Notes
									</h3>
									<div className="bg-[var(--surface-variant)] rounded-xl p-6 border border-[var(--border)]">
										<p className="whitespace-pre-line text-[var(--foreground)] leading-relaxed">
											{application.notes}
										</p>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[var(--border)]">
						<Link
							href={`/application/${application.id}/edit`}
							className="flex-1 sm:flex-none"
						>
							<Button fullWidth>
								<span className="mr-2">✏️</span>
								<span>Edit Application</span>
							</Button>
						</Link>
						<div className="flex-1 sm:flex-none">
							<DeleteApplicationButton applicationId={application.id} />
						</div>
					</div>
				</div>
			</div>
		</AuthWrapper>
	);
}

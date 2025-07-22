'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DeleteContactButton from '@/components/DeleteContactButton';
import Button from '@/components/Button';
import { ClientAuthWrapper } from '@/components/ClientAuthWrapper';
import { Icon, Avatar } from '@/components/ui';
import {
	faPhone,
	faBuilding,
	faBriefcase,
	faLink,
	faPencilAlt,
	faExternalLinkAlt,
	faFileAlt,
} from '@/lib/fontawesome';
import { Contact } from '@prisma/client';

interface ContactDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default function ContactDetailPage({ params }: ContactDetailPageProps) {
	const { data: session } = useSession();
	const router = useRouter();
	const [contact, setContact] = useState<Contact | null>(null);
	const [loading, setLoading] = useState(true);
	const [contactId, setContactId] = useState<string>('');

	useEffect(() => {
		const initPage = async () => {
			const { id } = await params;
			setContactId(id);
		};
		initPage();
	}, [params]);

	useEffect(() => {
		if (!session?.user?.email || !contactId) return;

		const fetchContact = async () => {
			try {
				const response = await fetch(`/api/contact/${contactId}`);
				if (response.ok) {
					const data = await response.json();
					setContact(data);
				} else if (response.status === 404) {
					router.push('/contacts');
				}
			} catch (error) {
				console.error('Failed to fetch contact:', error);
				router.push('/contacts');
			} finally {
				setLoading(false);
			}
		};

		fetchContact();
	}, [session?.user?.email, contactId, router]);

	const handleContactDelete = () => {
		router.push('/contacts');
	};

	if (loading) {
		return (
			<ClientAuthWrapper>
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-center">
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--primary)] mx-auto"></div>
						<p className="mt-4 text-[var(--foreground-muted)]">
							Loading contact...
						</p>
					</div>
				</div>
			</ClientAuthWrapper>
		);
	}

	if (!contact) {
		return (
			<ClientAuthWrapper>
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-center">
						<p className="text-[var(--foreground-muted)]">Contact not found</p>
						<Link href="/contacts">
							<Button variant="primary">Back to Contacts</Button>
						</Link>
					</div>
				</div>
			</ClientAuthWrapper>
		);
	}

	return (
		<ClientAuthWrapper>
			<div className="space-y-8">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold text-[var(--foreground)]">
							Contact Details
						</h1>
						<p className="text-[var(--foreground-muted)] mt-2">
							View and manage this contact
						</p>
					</div>
					<Link href="/contacts">
						<Button variant="secondary">
							<span className="mr-2">←</span>
							<span>Back to Contacts</span>
						</Button>
					</Link>
				</div>

				<div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)] shadow-sm">
					{/* Header Section */}
					<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
						<div className="flex items-start gap-6 flex-1">
							<Avatar
								name={`${contact.firstName} ${contact.lastName}`}
								size="lg"
							/>
							<div className="space-y-4 flex-1">
								<div>
									<h1 className="text-2xl font-bold text-white">
										{contact.firstName} {contact.lastName}
									</h1>
									{contact.jobTitle && contact.company && (
										<p className="text-lg text-slate-300">
											{contact.jobTitle} at {contact.company}
										</p>
									)}
									{contact.jobTitle && !contact.company && (
										<p className="text-lg text-slate-300">{contact.jobTitle}</p>
									)}
									{!contact.jobTitle && contact.company && (
										<p className="text-lg text-slate-300">{contact.company}</p>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Details Section */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
						<div className="space-y-6">
							{/* Professional Information */}
							<div className="bg-[var(--surface-variant)] rounded-xl p-6">
								<h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
									Professional Information
								</h3>
								<div className="space-y-4">
									{contact.jobTitle && (
										<div>
											<p className="text-sm text-[var(--foreground-muted)] mb-1">
												Job Title
											</p>
											<div className="flex items-center gap-2">
												<Icon
													icon={faBriefcase}
													className="w-4 h-4 text-purple-500"
												/>
												<p className="text-[var(--foreground)] font-medium">
													{contact.jobTitle}
												</p>
											</div>
										</div>
									)}
									{contact.company && (
										<div>
											<p className="text-sm text-[var(--foreground-muted)] mb-1">
												Company
											</p>
											<div className="flex items-center gap-2">
												<Icon
													icon={faBuilding}
													className="w-4 h-4 text-gray-500"
												/>
												<p className="text-[var(--foreground)] font-medium">
													{contact.company}
												</p>
											</div>
										</div>
									)}
									{contact.linkedIn && (
										<div>
											<p className="text-sm text-[var(--foreground-muted)] mb-1">
												LinkedIn Profile
											</p>
											<div className="flex items-center gap-2">
												<Icon icon={faLink} className="w-4 h-4 text-blue-600" />
												<a
													href={contact.linkedIn}
													target="_blank"
													rel="noopener noreferrer"
													className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium flex items-center gap-1 transition-colors"
												>
													View Profile
													<Icon icon={faExternalLinkAlt} className="w-3 h-3" />
												</a>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="space-y-6">
							{/* Contact Information */}
							<div className="bg-[var(--surface-variant)] rounded-xl p-6">
								<h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
									Contact Information
								</h3>
								<div className="space-y-4">
									{contact.email && (
										<div>
											<p className="text-sm text-[var(--foreground-muted)] mb-1">
												Email Address
											</p>
											<div className="flex items-center gap-2">
												<span className="text-blue-500">📧</span>
												<a
													href={`mailto:${contact.email}`}
													className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-colors"
												>
													{contact.email}
												</a>
											</div>
										</div>
									)}
									{contact.phone && (
										<div>
											<p className="text-sm text-[var(--foreground-muted)] mb-1">
												Phone Number
											</p>
											<div className="flex items-center gap-2">
												<Icon
													icon={faPhone}
													className="w-4 h-4 text-green-500"
												/>
												<a
													href={`tel:${contact.phone}`}
													className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-colors"
												>
													{contact.phone}
												</a>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Notes Section */}
							{contact.notes && (
								<div className="bg-[var(--surface-variant)] rounded-xl p-6">
									<h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3 flex items-center gap-2">
										<Icon
											icon={faFileAlt}
											className="w-4 h-4 text-yellow-500"
										/>
										Notes
									</h3>
									<div className="prose prose-sm max-w-none">
										<p className="text-[var(--foreground)] whitespace-pre-wrap">
											{contact.notes}
										</p>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[var(--border)]">
						<Link
							href={`/contacts/${contact.id}/edit`}
							className="flex-1 sm:flex-none"
						>
							<Button fullWidth>
								<Icon icon={faPencilAlt} className="mr-2" />
								<span>Edit Contact</span>
							</Button>
						</Link>
						<div className="flex-1 sm:flex-none">
							<DeleteContactButton
								contactId={contact.id}
								contactName={`${contact.firstName} ${contact.lastName}`}
								onDelete={handleContactDelete}
							/>
						</div>
					</div>
				</div>
			</div>
		</ClientAuthWrapper>
	);
}

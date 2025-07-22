'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ClientAuthWrapper } from '@/components/ClientAuthWrapper';
import Link from 'next/link';
import Button from '@/components/Button';
import ContactList from '@/components/ContactList';
import { Contact } from '@prisma/client';
import { EmptyState, Icon, Input } from '@/components/ui';
import { faPlus, faUsers, faSearch } from '@/lib/fontawesome';

export default function ContactsPage() {
	const { data: session } = useSession();
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');

	// Fetch contacts using the contacts service via API
	useEffect(() => {
		if (!session?.user?.email) return;

		const fetchContacts = async () => {
			try {
				const response = await fetch('/api/contact');
				if (response.ok) {
					const data = await response.json();
					setContacts(data);
				} else {
					console.error('Failed to fetch contacts:', response.statusText);
				}
			} catch (error) {
				console.error('Error fetching contacts:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchContacts();
	}, [session]);

	// Filter contacts based on search
	const filteredContacts = useMemo(() => {
		return contacts.filter((contact) => {
			const searchTerm = searchQuery.toLowerCase();
			const fullName =
				`${contact.firstName} ${contact.lastName || ''}`.toLowerCase();
			return (
				fullName.includes(searchTerm) ||
				contact.company?.toLowerCase().includes(searchTerm) ||
				contact.jobTitle?.toLowerCase().includes(searchTerm) ||
				contact.email?.toLowerCase().includes(searchTerm)
			);
		});
	}, [contacts, searchQuery]);

	if (loading) {
		return (
			<ClientAuthWrapper>
				<div className="container mx-auto px-4 py-8">
					<div className="text-center">Loading contacts...</div>
				</div>
			</ClientAuthWrapper>
		);
	}

	return (
		<ClientAuthWrapper>
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
							Contacts
						</h1>
						<p className="text-[var(--text-muted)]">
							Manage your professional contacts
						</p>
					</div>
					<Link href="/contacts/new">
						<Button>
							<Icon icon={faPlus} className="mr-2" />
							Add Contact
						</Button>
					</Link>
				</div>

				{contacts.length === 0 ? (
					<EmptyState
						icon={faUsers}
						title="No contacts yet"
						description="Get started by adding your first contact"
						actionLabel="Add Contact"
						actionHref="/contacts/new"
					/>
				) : (
					<>
						<div className="mb-6">
							<div className="max-w-md">
								<Input
									type="text"
									placeholder="Search contacts..."
									value={searchQuery}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setSearchQuery(e.target.value)
									}
									className="w-full"
								/>
							</div>
						</div>

						{filteredContacts.length === 0 && searchQuery ? (
							<EmptyState
								icon={faSearch}
								title="No matching contacts found"
								description={`No contacts match "${searchQuery}". Try adjusting your search terms.`}
							/>
						) : (
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<p className="text-sm text-[var(--text-muted)]">
										{filteredContacts.length} contact
										{filteredContacts.length !== 1 ? 's' : ''} found
									</p>
								</div>
								<ContactList contacts={filteredContacts} />
							</div>
						)}
					</>
				)}
			</div>
		</ClientAuthWrapper>
	);
}

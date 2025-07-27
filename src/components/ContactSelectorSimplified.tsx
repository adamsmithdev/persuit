'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Contact } from '@prisma/client';
import Button from './Button';
import QuickContactModal from './QuickContactModal';

interface ContactSelectorSimplifiedProps {
	selectedContactId: string;
	onContactSelect: (contactId: string, contact?: Contact) => void;
	companyName?: string;
}

export default function ContactSelectorSimplified({
	selectedContactId,
	onContactSelect,
	companyName = '',
}: Readonly<ContactSelectorSimplifiedProps>) {
	const { data: session } = useSession();
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [suggestedContacts, setSuggestedContacts] = useState<Contact[]>([]);
	const [loading, setLoading] = useState(true);
	const [showQuickModal, setShowQuickModal] = useState(false);

	useEffect(() => {
		if (!session?.user?.email) return;

		const fetchContacts = async () => {
			try {
				const response = await fetch('/api/contact');
				if (response.ok) {
					const data = await response.json();
					setContacts(data);
				}
			} catch (error) {
				console.error('Error fetching contacts:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchContacts();
	}, [session]);

	// Smart suggestions based on company name
	useEffect(() => {
		if (companyName && contacts.length > 0) {
			const suggestions = contacts.filter((contact) =>
				contact.company?.toLowerCase().includes(companyName.toLowerCase()),
			);
			setSuggestedContacts(suggestions);
		} else {
			setSuggestedContacts([]);
		}
	}, [companyName, contacts]);

	const handleContactSelect = (contact: Contact) => {
		onContactSelect(contact.id, contact);
	};

	const handleContactCreated = (newContact: Contact) => {
		setContacts((prev) => [newContact, ...prev]);
		handleContactSelect(newContact);
	};

	if (loading) {
		return <div className="text-center py-4">Loading contacts...</div>;
	}

	const selectedContact = contacts.find((c) => c.id === selectedContactId);

	return (
		<div className="space-y-4">
			{/* Smart Suggestions */}
			{suggestedContacts.length > 0 && !selectedContactId && (
				<div className="bg-[var(--primary-light)] border border-[var(--primary)] rounded-lg p-4">
					<h4 className="text-sm font-medium text-[var(--primary)] mb-2">
						💡 Contacts from {companyName}:
					</h4>
					<div className="grid gap-2">
						{suggestedContacts.slice(0, 3).map((contact) => (
							<button
								key={contact.id}
								type="button"
								className="text-left p-2 bg-[var(--surface)] border border-[var(--border)] rounded hover:bg-[var(--surface-variant)] transition-colors"
								onClick={() => handleContactSelect(contact)}
							>
								<div className="font-medium text-[var(--foreground)]">
									{contact.firstName} {contact.lastName || ''}
								</div>
								{contact.jobTitle && (
									<div className="text-sm text-[var(--foreground-muted)]">
										{contact.jobTitle}
									</div>
								)}
								{contact.email && (
									<div className="text-sm text-[var(--foreground-subtle)]">
										{contact.email}
									</div>
								)}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Selected Contact Display */}
			{selectedContact && (
				<div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
					<div className="flex justify-between items-start">
						<div>
							<h4 className="font-medium text-[var(--foreground)]">
								✓ Selected: {selectedContact.firstName}{' '}
								{selectedContact.lastName || ''}
							</h4>
							{selectedContact.jobTitle && selectedContact.company && (
								<p className="text-sm text-[var(--foreground-muted)]">
									{selectedContact.jobTitle} at {selectedContact.company}
								</p>
							)}
							{selectedContact.email && (
								<p className="text-sm text-[var(--foreground-subtle)]">
									{selectedContact.email}
								</p>
							)}
							{selectedContact.phone && (
								<p className="text-sm text-[var(--foreground-subtle)]">
									{selectedContact.phone}
								</p>
							)}
						</div>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => onContactSelect('')}
						>
							Change
						</Button>
					</div>
				</div>
			)}

			{/* Action Buttons - Only show if no contact selected */}
			{!selectedContactId && (
				<div className="flex gap-3 justify-center">
					<Button
						type="button"
						variant="outline"
						onClick={() => setShowQuickModal(true)}
					>
						+ Create New Contact
					</Button>
				</div>
			)}

			{/* Contact Selection - Only show if no contact selected */}
			{!selectedContactId && (
				<div className="space-y-2">
					<h4 className="text-sm font-medium text-[var(--foreground-muted)] mb-2">
						Or select an existing contact:
					</h4>
					{contacts.length === 0 ? (
						<div className="text-center py-8 text-[var(--foreground-subtle)]">
							<p>No contacts found.</p>
							<Button
								type="button"
								variant="primary"
								size="sm"
								onClick={() => setShowQuickModal(true)}
							>
								Create Your First Contact
							</Button>
						</div>
					) : (
						<div className="grid gap-2 max-h-60 overflow-y-auto border border-[var(--border)] rounded-lg p-2 bg-[var(--surface)]">
							{contacts.map((contact) => (
								<div
									key={contact.id}
									className="p-3 border border-[var(--border)] rounded-lg cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--surface-variant)] transition-colors"
									onClick={() => handleContactSelect(contact)}
								>
									<div className="font-medium text-[var(--foreground)]">
										{contact.firstName} {contact.lastName || ''}
									</div>
									{contact.jobTitle && contact.company && (
										<p className="text-sm text-[var(--foreground-muted)]">
											{contact.jobTitle} at {contact.company}
										</p>
									)}
									{contact.email && (
										<p className="text-sm text-[var(--foreground-subtle)]">
											{contact.email}
										</p>
									)}
									{contact.phone && (
										<p className="text-sm text-[var(--foreground-subtle)]">
											{contact.phone}
										</p>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			)}

			{/* Quick Contact Modal */}
			<QuickContactModal
				isOpen={showQuickModal}
				onClose={() => setShowQuickModal(false)}
				onContactCreated={handleContactCreated}
				prefillName=""
			/>
		</div>
	);
}

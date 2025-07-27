'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Contact } from '@prisma/client';
import { FormField, Grid, Input } from './ui';
import Button from './Button';

interface ContactSelectorEnhancedProps {
	selectedContactId: string;
	onContactSelect: (contactId: string, contact?: Contact) => void;
	manualContactData: {
		contactName: string;
		contactEmail: string;
		contactPhone: string;
	};
	onManualContactChange: (field: string, value: string) => void;
	onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactSelectorEnhanced({
	selectedContactId,
	onContactSelect,
	manualContactData,
	onManualContactChange,
	onPhoneChange,
}: Readonly<ContactSelectorEnhancedProps>) {
	const { data: session } = useSession();
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [loading, setLoading] = useState(true);
	const [showManualEntry, setShowManualEntry] = useState(!selectedContactId);

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

	const handleContactSelect = (contact: Contact) => {
		onContactSelect(contact.id, contact);
		setShowManualEntry(false);
	};

	const handleManualEntry = () => {
		onContactSelect('');
		setShowManualEntry(true);
	};

	const handleCreateNewContact = () => {
		window.open('/contacts/new', '_blank', 'noopener,noreferrer');
	};

	if (loading) {
		return <div className="text-center py-4">Loading contacts...</div>;
	}

	return (
		<div className="space-y-4">
			{/* Mode Selection */}
			<div className="flex gap-2">
				<Button
					type="button"
					variant={!showManualEntry ? 'primary' : 'outline'}
					size="sm"
					onClick={() => setShowManualEntry(false)}
				>
					Select Existing Contact
				</Button>
				<Button
					type="button"
					variant={showManualEntry ? 'primary' : 'outline'}
					size="sm"
					onClick={handleManualEntry}
				>
					Enter Manually
				</Button>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={handleCreateNewContact}
				>
					+ New Contact
				</Button>
			</div>

			{!showManualEntry ? (
				// Contact Selection Mode
				<div className="space-y-2">
					{contacts.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							<p>No contacts found.</p>
							<Button
								type="button"
								variant="primary"
								size="sm"
								onClick={handleCreateNewContact}
							>
								Create Your First Contact
							</Button>
						</div>
					) : (
						<div className="grid gap-2 max-h-60 overflow-y-auto">
							{contacts.map((contact) => (
								<div
									key={contact.id}
									className={`p-3 border rounded-lg cursor-pointer transition-colors ${
										selectedContactId === contact.id
											? 'border-blue-500 bg-blue-50'
											: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
									}`}
									onClick={() => handleContactSelect(contact)}
								>
									<div className="flex justify-between items-start">
										<div className="flex-1">
											<h4 className="font-medium text-gray-900">
												{contact.firstName} {contact.lastName || ''}
											</h4>
											{contact.jobTitle && contact.company && (
												<p className="text-sm text-gray-600">
													{contact.jobTitle} at {contact.company}
												</p>
											)}
											{contact.email && (
												<p className="text-sm text-gray-500">{contact.email}</p>
											)}
											{contact.phone && (
												<p className="text-sm text-gray-500">{contact.phone}</p>
											)}
										</div>
										{selectedContactId === contact.id && (
											<div className="ml-2">
												<svg
													className="w-5 h-5 text-blue-500"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			) : (
				// Manual Entry Mode
				<Grid cols={3}>
					<FormField label="Contact Name" id="contactName">
						<Input
							id="contactName"
							name="contactName"
							placeholder="e.g. Jane Smith"
							value={manualContactData.contactName}
							onChange={(e) =>
								onManualContactChange('contactName', e.target.value)
							}
						/>
					</FormField>
					<FormField label="Contact Email" id="contactEmail">
						<Input
							id="contactEmail"
							type="email"
							name="contactEmail"
							placeholder="jane@company.com"
							value={manualContactData.contactEmail}
							onChange={(e) =>
								onManualContactChange('contactEmail', e.target.value)
							}
						/>
					</FormField>
					<FormField label="Contact Phone" id="contactPhone">
						<Input
							id="contactPhone"
							type="tel"
							name="contactPhone"
							placeholder="(555) 123-4567"
							value={manualContactData.contactPhone}
							onChange={onPhoneChange}
						/>
					</FormField>
				</Grid>
			)}
		</div>
	);
}

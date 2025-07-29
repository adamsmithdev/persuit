'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Contact } from '@prisma/client';
import { FormField, Grid, Input, PhoneInput } from './ui';
import Button from './Button';
import QuickContactModal from './QuickContactModal';

interface SmartContactSelectorProps {
	selectedContactId: string;
	onContactSelect: (contactId: string, contact?: Contact) => void;
	manualContactData: {
		contactName: string;
		contactEmail: string;
		contactPhone: string;
	};
	onManualContactChange: (field: string, value: string) => void;
	onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	companyName?: string; // New prop to provide smart suggestions
}

export default function SmartContactSelector({
	selectedContactId,
	onContactSelect,
	manualContactData,
	onManualContactChange,
	onPhoneChange,
	companyName = '',
}: Readonly<SmartContactSelectorProps>) {
	const { data: session } = useSession();
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [suggestedContacts, setSuggestedContacts] = useState<Contact[]>([]);
	const [loading, setLoading] = useState(true);
	const [showManualEntry, setShowManualEntry] = useState(!selectedContactId);
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
		setShowManualEntry(false);
	};

	const handleManualEntry = () => {
		onContactSelect('');
		setShowManualEntry(true);
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
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
					<h4 className="text-sm font-medium text-blue-900 mb-2">
						💡 Suggested contacts from {companyName}:
					</h4>
					<div className="grid gap-2">
						{suggestedContacts.slice(0, 3).map((contact) => (
							<button
								key={contact.id}
								type="button"
								className="text-left p-2 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors"
								onClick={() => handleContactSelect(contact)}
							>
								<div className="font-medium text-blue-900">
									{contact.firstName} {contact.lastName || ''}
								</div>
								{contact.jobTitle && (
									<div className="text-sm text-blue-700">
										{contact.jobTitle}
									</div>
								)}
								{contact.email && (
									<div className="text-sm text-blue-600">{contact.email}</div>
								)}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Selected Contact Display */}
			{selectedContact && (
				<div className="bg-green-50 border border-green-200 rounded-lg p-4">
					<div className="flex justify-between items-start">
						<div>
							<h4 className="font-medium text-green-900">
								✓ Selected: {selectedContact.firstName}{' '}
								{selectedContact.lastName || ''}
							</h4>
							{selectedContact.jobTitle && selectedContact.company && (
								<p className="text-sm text-green-700">
									{selectedContact.jobTitle} at {selectedContact.company}
								</p>
							)}
							{selectedContact.email && (
								<p className="text-sm text-green-600">
									{selectedContact.email}
								</p>
							)}
							{selectedContact.phone && (
								<p className="text-sm text-green-600">
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

			{/* Mode Selection - Only show if no contact selected */}
			{!selectedContactId && (
				<div className="flex gap-2 flex-wrap">
					<Button
						type="button"
						variant={!showManualEntry ? 'primary' : 'outline'}
						size="sm"
						onClick={() => setShowManualEntry(false)}
					>
						Select Existing
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
						onClick={() => setShowQuickModal(true)}
					>
						+ Quick Add
					</Button>
				</div>
			)}

			{!selectedContactId && !showManualEntry && (
				// Contact Selection Mode
				<div className="space-y-2">
					{contacts.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
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
						<div className="grid gap-2 max-h-60 overflow-y-auto">
							{contacts.map((contact) => (
								<div
									key={contact.id}
									className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-colors"
									onClick={() => handleContactSelect(contact)}
								>
									<div className="font-medium text-gray-900">
										{contact.firstName} {contact.lastName || ''}
									</div>
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
							))}
						</div>
					)}
				</div>
			)}

			{!selectedContactId && showManualEntry && (
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
						<PhoneInput
							id="contactPhone"
							name="contactPhone"
							value={manualContactData.contactPhone}
							onChange={onPhoneChange}
						/>
					</FormField>
				</Grid>
			)}

			{/* Quick Contact Modal */}
			<QuickContactModal
				isOpen={showQuickModal}
				onClose={() => setShowQuickModal(false)}
				onContactCreated={handleContactCreated}
				prefillName={companyName ? `${companyName} Contact` : ''}
			/>
		</div>
	);
}

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Contact } from '@prisma/client';
import { Select, FormField, Grid, Input } from './ui';
import Link from 'next/link';
import Button from './Button';

interface ContactSelectorProps {
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

export default function ContactSelector({
	selectedContactId,
	onContactSelect,
	manualContactData,
	onManualContactChange,
	onPhoneChange,
}: Readonly<ContactSelectorProps>) {
	const { data: session } = useSession();
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [loading, setLoading] = useState(true);

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

	const handleContactChange = (value: string) => {
		const selectedContact = contacts.find((c) => c.id === value);
		onContactSelect(value, selectedContact);
	};

	if (loading) {
		return <div>Loading contacts...</div>;
	}

	return (
		<>
			<FormField label="Contact" id="contactSelect">
				<div className="flex gap-2">
					<div className="flex-1">
						<Select
							id="contactSelect"
							name="contactSelect"
							value={selectedContactId}
							onChange={(e) => handleContactChange(e.target.value)}
						>
							<option value="">Enter contact details manually</option>
							{contacts.map((contact) => (
								<option key={contact.id} value={contact.id}>
									{contact.firstName} {contact.lastName || ''}
									{contact.company && ` (${contact.company})`}
								</option>
							))}
						</Select>
					</div>
					<Link href="/contacts/new" target="_blank" rel="noopener noreferrer">
						<Button type="button" variant="outline" size="sm">
							<span className="mr-1">+</span> New Contact
						</Button>
					</Link>
				</div>
			</FormField>

			{!selectedContactId && (
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
		</>
	);
}

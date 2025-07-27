'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Contact } from '@prisma/client';
import { FormField, Input } from './ui';
import QuickContactModal from './QuickContactModal';

interface ContactAutocompleteProps {
	selectedContactId: string;
	onContactSelect: (contactId: string, contact?: Contact) => void;
}

export default function ContactAutocomplete({
	selectedContactId,
	onContactSelect,
}: Readonly<ContactAutocompleteProps>) {
	const { data: session } = useSession();
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	const [loading, setLoading] = useState(true);
	const [showQuickModal, setShowQuickModal] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		if (searchTerm.trim() === '') {
			setFilteredContacts(contacts);
		} else {
			const filtered = contacts.filter((contact) => {
				const fullName =
					`${contact.firstName} ${contact.lastName || ''}`.toLowerCase();
				const company = contact.company?.toLowerCase() || '';
				const email = contact.email?.toLowerCase() || '';
				const term = searchTerm.toLowerCase();

				return (
					fullName.includes(term) ||
					company.includes(term) ||
					email.includes(term)
				);
			});
			setFilteredContacts(filtered);
		}
	}, [searchTerm, contacts]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		setShowDropdown(true);

		// If user is typing, clear current selection
		if (selectedContactId) {
			onContactSelect('');
		}
	};

	const handleContactSelect = (contact: Contact) => {
		setSearchTerm(`${contact.firstName} ${contact.lastName || ''}`.trim());
		setShowDropdown(false);
		onContactSelect(contact.id, contact);
	};

	const handleCreateNewContact = () => {
		setShowDropdown(false);
		setShowQuickModal(true);
	};

	const handleContactCreated = (newContact: Contact) => {
		setContacts((prev) => [newContact, ...prev]);
		onContactSelect(newContact.id, newContact);
		setSearchTerm(
			`${newContact.firstName} ${newContact.lastName || ''}`.trim(),
		);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				!inputRef.current?.contains(event.target as Node)
			) {
				setShowDropdown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const renderDropdownContent = () => {
		if (filteredContacts.length > 0) {
			return (
				<>
					{filteredContacts.map((contact) => (
						<button
							key={contact.id}
							type="button"
							className="w-full px-4 py-2 text-left hover:bg-[var(--surface-variant)] focus:bg-[var(--surface-variant)] focus:outline-none"
							onClick={() => handleContactSelect(contact)}
						>
							<div className="font-medium text-[var(--foreground)]">
								{contact.firstName} {contact.lastName || ''}
							</div>
							{contact.company && (
								<div className="text-sm text-[var(--foreground-muted)]">
									{contact.company}
								</div>
							)}
							{contact.email && (
								<div className="text-sm text-[var(--foreground-subtle)]">
									{contact.email}
								</div>
							)}
						</button>
					))}
					{searchTerm.trim() && !hasExactMatch && (
						<div className="border-t border-[var(--border)]">
							<button
								type="button"
								className="w-full px-4 py-2 text-left hover:bg-[var(--primary-light)] focus:bg-[var(--primary-light)] focus:outline-none text-[var(--primary)]"
								onClick={handleCreateNewContact}
							>
								<span className="font-medium">
									+ Create &quot;{searchTerm}&quot;
								</span>
								<div className="text-sm">Add as new contact</div>
							</button>
						</div>
					)}
				</>
			);
		}

		if (searchTerm.trim()) {
			return (
				<button
					type="button"
					className="w-full px-4 py-2 text-left hover:bg-[var(--primary-light)] focus:bg-[var(--primary-light)] focus:outline-none text-[var(--primary)]"
					onClick={handleCreateNewContact}
				>
					<span className="font-medium">+ Create &quot;{searchTerm}&quot;</span>
					<div className="text-sm">Add as new contact</div>
				</button>
			);
		}

		return (
			<div className="px-4 py-2 text-[var(--foreground-subtle)]">
				Start typing to search contacts
			</div>
		);
	};

	const hasExactMatch = filteredContacts.some(
		(contact) =>
			`${contact.firstName} ${contact.lastName || ''}`.toLowerCase().trim() ===
			searchTerm.toLowerCase().trim(),
	);

	return (
		<div className="relative">
			<FormField label="Contact" id="contactSearch">
				<div className="relative">
					<Input
						ref={inputRef}
						id="contactSearch"
						name="contactSearch"
						placeholder="Search contacts or enter new contact name..."
						value={searchTerm}
						onChange={handleSearchChange}
						onFocus={() => setShowDropdown(true)}
						autoComplete="off"
					/>

					{showDropdown && !loading && (
						<div
							ref={dropdownRef}
							className="absolute z-10 w-full mt-1 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-md shadow-lg max-h-60 overflow-auto"
						>
							{renderDropdownContent()}
						</div>
					)}
				</div>
			</FormField>

			{/* Quick Contact Modal */}
			<QuickContactModal
				isOpen={showQuickModal}
				onClose={() => setShowQuickModal(false)}
				onContactCreated={handleContactCreated}
				prefillName={searchTerm}
			/>
		</div>
	);
}

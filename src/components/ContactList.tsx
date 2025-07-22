'use client';

import { Contact } from '@prisma/client';
import ContactListItem from './ContactListItem';
import { List } from './ui';

interface ContactListProps {
	contacts: Contact[];
}

export default function ContactList({ contacts }: Readonly<ContactListProps>) {
	if (contacts.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-[var(--text-muted)] text-lg">No contacts found</p>
			</div>
		);
	}

	return (
		<List>
			{contacts.map((contact) => (
				<ContactListItem key={contact.id} contact={contact} />
			))}
		</List>
	);
}

'use client';

import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import { ClientAuthWrapper } from '@/components/ClientAuthWrapper';
import ContactForm from '@/components/ContactForm';
import { Contact } from '@prisma/client';

interface EditContactPageProps {
	params: Promise<{ id: string }>;
}

export default function EditContactPage({ params }: EditContactPageProps) {
	const { data: session } = useSession();
	const { id } = use(params);
	const [contact, setContact] = useState<Contact | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!session?.user?.email) return;

		const fetchContact = async () => {
			try {
				const response = await fetch(`/api/contact/${id}`);
				if (response.ok) {
					const data = await response.json();
					setContact(data);
				} else if (response.status === 404) {
					setError('Contact not found');
				} else {
					setError('Failed to load contact');
				}
			} catch (error) {
				console.error('Error fetching contact:', error);
				setError('Failed to load contact');
			} finally {
				setLoading(false);
			}
		};

		fetchContact();
	}, [session, id]);

	if (loading) {
		return (
			<ClientAuthWrapper>
				<div className="container mx-auto px-4 py-8">
					<div className="text-center">Loading contact...</div>
				</div>
			</ClientAuthWrapper>
		);
	}

	if (error || !contact) {
		return (
			<ClientAuthWrapper>
				<div className="container mx-auto px-4 py-8">
					<div className="text-center text-red-600">
						{error || 'Contact not found'}
					</div>
				</div>
			</ClientAuthWrapper>
		);
	}

	return (
		<ClientAuthWrapper>
			<div className="container mx-auto px-4 py-8">
				<ContactForm
					mode="edit"
					initialData={{
						...contact,
						lastName: contact.lastName || undefined,
						email: contact.email || undefined,
						phone: contact.phone || undefined,
						jobTitle: contact.jobTitle || undefined,
						company: contact.company || undefined,
						linkedIn: contact.linkedIn || undefined,
						notes: contact.notes || undefined,
					}}
				/>
			</div>
		</ClientAuthWrapper>
	);
}

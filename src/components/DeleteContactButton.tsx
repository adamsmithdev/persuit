'use client';

import { useState } from 'react';
import Button from './Button';
import { Icon } from './ui';
import { faTrash } from '@/lib/fontawesome';

interface DeleteContactButtonProps {
	contactId: string;
	contactName: string;
	onDelete: (id: string) => void;
}

export default function DeleteContactButton({
	contactId,
	contactName,
	onDelete,
}: Readonly<DeleteContactButtonProps>) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		if (!confirm(`Are you sure you want to delete ${contactName}?`)) {
			return;
		}

		setIsDeleting(true);
		try {
			const response = await fetch(`/api/contact/${contactId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				onDelete(contactId);
			} else {
				console.error('Failed to delete contact');
				alert('Failed to delete contact. Please try again.');
			}
		} catch (error) {
			console.error('Error deleting contact:', error);
			alert('Failed to delete contact. Please try again.');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<Button
			variant="danger"
			onClick={handleDelete}
			disabled={isDeleting}
			fullWidth
		>
			<Icon icon={faTrash} className="mr-2" />
			<span>Delete Contact</span>
		</Button>
	);
}

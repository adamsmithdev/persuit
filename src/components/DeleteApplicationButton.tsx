'use client';

import { useRouter } from 'next/navigation';
import Button from './Button';
import { Icon } from './ui';
import { faTrash } from '@/lib/fontawesome';

export function DeleteApplicationButton({
	applicationId,
}: {
	readonly applicationId: string;
}) {
	const router = useRouter();

	const handleDelete = async () => {
		const confirmDelete = confirm(
			'Are you sure you want to delete this application?\n\nThis action cannot be undone.',
		);
		if (!confirmDelete) return;

		try {
			const res = await fetch(`/api/application/${applicationId}`, {
				method: 'DELETE',
			});

			if (res.ok) {
				router.push('/');
			} else {
				alert('Failed to delete application. Please try again.');
			}
		} catch {
			alert('An error occurred while deleting the application.');
		}
	};

	return (
		<Button onClick={handleDelete} variant="danger" fullWidth>
			<Icon icon={faTrash} className="mr-2" />
			<span>Delete Application</span>
		</Button>
	);
}

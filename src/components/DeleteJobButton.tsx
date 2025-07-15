'use client';

import { useRouter } from 'next/navigation';
import Button from './Button';

export function DeleteJobButton({ jobId }: { readonly jobId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this application?\n\nThis action cannot be undone.'
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/job/${jobId}`, {
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
    <Button onClick={handleDelete} variant="danger" size="sm">
      <span className="mr-2">🗑️</span>
      <span>Delete Application</span>
    </Button>
  );
}

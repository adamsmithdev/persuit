'use client';

import { useRouter } from 'next/navigation';
import Button from './Button';

export function DeleteJobButton({ jobId }: { readonly jobId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this job?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/job/${jobId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('Failed to delete job');
    }
  };

  return (
    <Button onClick={handleDelete}>
      Delete Job
    </Button>
  );
}

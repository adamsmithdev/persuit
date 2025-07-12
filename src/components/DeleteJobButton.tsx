'use client';

import { useRouter } from 'next/navigation';

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
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Delete Job
    </button>
  );
}

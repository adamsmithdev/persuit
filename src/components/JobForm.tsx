'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type JobFormProps = {
  mode?: 'create' | 'edit';
  initialData?: {
    id: string;
    company: string;
    position: string;
    location?: string;
    notes?: string;
    status: string;
  };
};

export default function JobForm({
  mode = 'create',
  initialData,
}: Readonly<JobFormProps>) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company: initialData?.company || '',
    position: initialData?.position || '',
    location: initialData?.location || '',
    notes: initialData?.notes || '',
    status: initialData?.status || 'WISHLIST',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      mode === 'edit' ? `/api/job/${initialData?.id}` : '/api/job';
    const method = mode === 'edit' ? 'PUT' : 'POST';

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/');
    } else {
      alert('Something went wrong');
    }
  };

  // Extract button label logic to avoid nested ternary
  let buttonLabel = '';
  if (loading) {
    buttonLabel = mode === 'edit' ? 'Saving...' : 'Creating...';
  } else {
    buttonLabel = mode === 'edit' ? 'Update Job' : 'Create Job';
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="company"
        placeholder="Company"
        required
        value={formData.company}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        required
        value={formData.position}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="WISHLIST">Wishlist</option>
        <option value="APPLIED">Applied</option>
        <option value="INTERVIEW">Interview</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
        <option value="ACCEPTED">Accepted</option>
      </select>
      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        rows={4}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {buttonLabel}
      </button>
    </form>
  );
}

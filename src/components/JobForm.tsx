'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';

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
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-[var(--elementBackground)] rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Company *
          </label>
          <input
            id="company"
            type="text"
            name="company"
            placeholder="e.g. Google, Microsoft, Spotify"
            required
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[var(--background)] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--foreground)] placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Position *
          </label>
          <input
            id="position"
            type="text"
            name="position"
            placeholder="e.g. Software Engineer, Product Manager"
            required
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[var(--background)] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--foreground)] placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="e.g. San Francisco, CA (Remote)"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[var(--background)] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--foreground)] placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[var(--background)] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--foreground)]"
          >
            <option value="WISHLIST">📝 Wishlist</option>
            <option value="APPLIED">📤 Applied</option>
            <option value="INTERVIEW">🎯 Interview</option>
            <option value="OFFER">🎉 Offer</option>
            <option value="REJECTED">❌ Rejected</option>
            <option value="ACCEPTED">✅ Accepted</option>
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Add any notes about the application, interview details, or next steps..."
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-[var(--background)] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--foreground)] placeholder-gray-400 resize-vertical"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="submit"
            disabled={loading}
          >
            {buttonLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}

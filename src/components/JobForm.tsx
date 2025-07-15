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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)] shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            {mode === 'edit' ? 'Edit Application' : 'Add New Application'}
          </h2>
          <p className="text-[var(--foreground-muted)]">
            {mode === 'edit'
              ? 'Update your job application details'
              : 'Track a new job opportunity'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-[var(--foreground)] mb-2"
            >
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
              className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-[var(--foreground)] mb-2"
            >
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
              className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-[var(--foreground)] mb-2"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="e.g. San Francisco, CA (Remote)"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-[var(--foreground)] mb-2"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
              }}
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
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-[var(--foreground)] mb-2"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Add any notes about the application, interview details, or next steps..."
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] resize-vertical transition-all duration-200"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} loading={loading}>
              {mode === 'edit' ? 'Update Application' : 'Create Application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

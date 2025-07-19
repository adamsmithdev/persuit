'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

type Job = {
  id: string;
  company: string;
  position: string;
};

type Interview = {
  id: string;
  date: Date | string;
  time: string | null;
  type: string;
  location: string | null;
  notes: string | null;
  duration: number | null;
  round: number | null;
  status: string;
  job: {
    id: string;
    company: string;
    position: string;
    status: string;
  };
};

type EditInterviewFormProps = {
  interview: Interview;
  jobs: Job[];
  onSuccess?: () => void;
  onCancel?: () => void;
};

const INTERVIEW_TYPES = [
  { value: 'PHONE', label: 'Phone Interview' },
  { value: 'VIDEO', label: 'Video Interview' },
  { value: 'ONSITE', label: 'On-site Interview' },
  { value: 'VIRTUAL', label: 'Virtual Interview' },
  { value: 'GROUP', label: 'Group Interview' },
  { value: 'TECHNICAL', label: 'Technical Interview' },
  { value: 'BEHAVIORAL', label: 'Behavioral Interview' },
  { value: 'FINAL', label: 'Final Interview' },
];

const INTERVIEW_STATUSES = [
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'RESCHEDULED', label: 'Rescheduled' },
];

export default function EditInterviewForm({
  interview,
  jobs,
  onSuccess,
  onCancel,
}: Readonly<EditInterviewFormProps>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Format date for date input (YYYY-MM-DD)
  const formatDateForInput = (date: Date | string) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    jobId: interview.job.id,
    date: formatDateForInput(interview.date),
    time: interview.time || '',
    type: interview.type,
    location: interview.location || '',
    notes: interview.notes || '',
    duration: interview.duration?.toString() || '',
    round: interview.round?.toString() || '1',
    status: interview.status,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        ...formData,
        duration: formData.duration ? parseInt(formData.duration) : undefined,
        round: parseInt(formData.round),
      };

      const response = await fetch(`/api/interview/${interview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update interview');
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/interviews');
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating interview:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to update interview'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this interview? This action cannot be undone.'
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      const response = await fetch(`/api/interview/${interview.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete interview');
      }

      router.push('/interviews');
      router.refresh();
    } catch (error) {
      console.error('Error deleting interview:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to delete interview'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)] shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Edit Interview
          </h2>
          <p className="text-[var(--foreground-muted)]">
            Update interview details for {interview.job.company} -{' '}
            {interview.job.position}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[var(--error)] bg-opacity-10 border border-[var(--error)] rounded-xl">
            <p className="text-[var(--error)] text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Selection */}
          <div>
            <label
              htmlFor="jobId"
              className="block text-sm font-medium text-[var(--foreground)] mb-2"
            >
              Job Application *
            </label>
            <select
              id="jobId"
              name="jobId"
              value={formData.jobId}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
              }}
            >
              <option value="">Select a job application</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.company} - {job.position}
                </option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Interview Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  min="2023-01-01"
                  max="2030-12-31"
                  className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200 cursor-pointer relative z-10"
                  style={{
                    colorScheme: 'dark',
                  }}
                />
                {!formData.date && (
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[var(--foreground-muted)] z-0">
                    Select interview date...
                  </div>
                )}
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none z-20">
                  <svg
                    className="w-5 h-5 text-[var(--foreground-muted)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 012 0v2h6V2a1 1 0 012 0v2h1a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h1zM4 10h16M9 14h6"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Interview Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200"
                style={{
                  colorScheme: 'dark',
                }}
              />
            </div>
          </div>

          {/* Interview Type and Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Interview Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                }}
              >
                {INTERVIEW_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
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
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                }}
              >
                {INTERVIEW_STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Round and Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="round"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Interview Round
              </label>
              <input
                type="number"
                id="round"
                name="round"
                value={formData.round}
                onChange={handleInputChange}
                min="1"
                placeholder="e.g. 1, 2, 3"
                className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Duration (minutes)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
                step="15"
                placeholder="e.g. 60"
                className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-[var(--foreground)] mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g. Company Office, Zoom, Phone"
              className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
            />
          </div>

          {/* Notes */}
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
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              placeholder="Any additional notes about the interview..."
              className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] resize-vertical transition-all duration-200"
            />
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 pt-6">
            <div>
              <Button
                type="button"
                onClick={handleDelete}
                variant="danger"
                disabled={isSubmitting || isDeleting}
                loading={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Interview'}
              </Button>
            </div>

            <div className="flex gap-3">
              {onCancel && (
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="secondary"
                  disabled={isSubmitting || isDeleting}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  isDeleting ||
                  !formData.jobId ||
                  !formData.date ||
                  !formData.type
                }
                loading={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Interview'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

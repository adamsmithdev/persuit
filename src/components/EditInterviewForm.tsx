'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import {
  FormContainer,
  FormField,
  Input,
  TextArea,
  Select,
  DateInput,
  FormActions,
  Grid,
  ErrorMessage,
} from './ui';
import { INTERVIEW_TYPES, INTERVIEW_STATUSES } from '@/lib/constants';

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
    <FormContainer
      title="Edit Interview"
      description={`Update interview details for ${interview.job.company} - ${interview.job.position}`}
    >
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Selection */}
        <FormField label="Job Application" id="jobId" required>
          <Select
            id="jobId"
            name="jobId"
            value={formData.jobId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a job application</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.company} - {job.position}
              </option>
            ))}
          </Select>
        </FormField>

        {/* Date and Time */}
        <Grid cols={2}>
          <FormField label="Interview Date" id="date" required>
            <DateInput
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              min="2023-01-01"
              max="2030-12-31"
              placeholder="Select interview date..."
            />
          </FormField>

          <FormField label="Interview Time" id="time">
            <Input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              style={{
                colorScheme: 'dark',
              }}
            />
          </FormField>
        </Grid>

        {/* Interview Type and Status */}
        <Grid cols={2}>
          <FormField label="Interview Type" id="type" required>
            <Select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              {INTERVIEW_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Status" id="status">
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              {INTERVIEW_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </Select>
          </FormField>
        </Grid>

        {/* Round and Duration */}
        <Grid cols={2}>
          <FormField label="Interview Round" id="round">
            <Input
              type="number"
              id="round"
              name="round"
              value={formData.round}
              onChange={handleInputChange}
              min="1"
              placeholder="e.g. 1, 2, 3"
            />
          </FormField>

          <FormField label="Duration (minutes)" id="duration">
            <Input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              min="1"
              step="15"
              placeholder="e.g. 60"
            />
          </FormField>
        </Grid>

        {/* Location */}
        <FormField label="Location" id="location">
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g. Company Office, Zoom, Phone"
          />
        </FormField>

        {/* Notes */}
        <FormField label="Notes" id="notes">
          <TextArea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={4}
            placeholder="Any additional notes about the interview..."
          />
        </FormField>

        {/* Form Actions */}
        <FormActions layout="space-between">
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
        </FormActions>
      </form>
    </FormContainer>
  );
}

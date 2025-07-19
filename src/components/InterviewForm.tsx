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

type InterviewFormProps = {
  mode?: 'create' | 'edit';
  jobs: Job[];
  initialData?: {
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
  onSuccess?: () => void;
};

export default function InterviewForm({
  mode = 'create',
  jobs,
  initialData,
  onSuccess,
}: Readonly<InterviewFormProps>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Format date for date input (YYYY-MM-DD)
  const formatDateForInput = (date: Date | string) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    jobId: initialData?.job.id || '',
    date: initialData ? formatDateForInput(initialData.date) : '',
    time: initialData?.time || '',
    type: initialData?.type || 'PHONE',
    location: initialData?.location || '',
    notes: initialData?.notes || '',
    duration: initialData?.duration?.toString() || '',
    round: initialData?.round?.toString() || '1',
    status: initialData?.status || 'SCHEDULED',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const endpoint =
        mode === 'edit'
          ? `/api/interview/${initialData?.id}`
          : '/api/interview';
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        duration: formData.duration ? parseInt(formData.duration) : undefined,
        round: parseInt(formData.round),
      };

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const action = mode === 'edit' ? 'update' : 'create';
        throw new Error(errorData.error || `Failed to ${action} interview`);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/interviews');
        router.refresh();
      }
    } catch (error) {
      const action = mode === 'edit' ? 'updating' : 'creating';
      console.error(`Error ${action} interview:`, error);
      const defaultMessage = `Failed to ${
        mode === 'edit' ? 'update' : 'create'
      } interview`;
      setError(error instanceof Error ? error.message : defaultMessage);
    } finally {
      setIsSubmitting(false);
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
      title={mode === 'edit' ? 'Edit Interview' : 'Schedule New Interview'}
      description={
        mode === 'edit' && initialData
          ? `Update interview details for ${initialData.job.company} - ${initialData.job.position}`
          : 'Add a new interview for one of your job applications'
      }
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

        {/* Interview Type and Status/Round */}
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

          {mode === 'edit' ? (
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
          ) : (
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
          )}
        </Grid>

        {/* Round (for edit mode) and Location/Duration */}
        <Grid cols={2}>
          {mode === 'edit' && (
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
          )}

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

          {mode === 'create' && (
            <FormField label="Duration (minutes)" id="duration">
              <Input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
                step="1"
                placeholder="e.g. 60"
              />
            </FormField>
          )}
        </Grid>

        {/* Duration for edit mode */}
        {mode === 'edit' && (
          <FormField label="Duration (minutes)" id="duration">
            <Input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              min="1"
              step="1"
              placeholder="e.g. 60"
            />
          </FormField>
        )}

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
        <FormActions>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
            {(() => {
              if (isSubmitting) {
                return mode === 'edit' ? 'Updating...' : 'Scheduling...';
              }
              return mode === 'edit'
                ? 'Update Interview'
                : 'Schedule Interview';
            })()}
          </Button>
        </FormActions>
      </form>
    </FormContainer>
  );
}

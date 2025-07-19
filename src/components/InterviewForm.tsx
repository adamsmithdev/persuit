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
import { INTERVIEW_TYPES } from '@/lib/constants';

type Job = {
  id: string;
  company: string;
  position: string;
};

type InterviewFormProps = {
  jobs: Job[];
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function InterviewForm({
  jobs,
  onSuccess,
  onCancel,
}: Readonly<InterviewFormProps>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    jobId: '',
    date: '',
    time: '',
    type: 'PHONE',
    location: '',
    notes: '',
    duration: '',
    round: '1',
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

      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create interview');
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/interviews');
        router.refresh();
      }
    } catch (error) {
      console.error('Error creating interview:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to create interview'
      );
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
      title="Schedule New Interview"
      description="Add a new interview for one of your job applications"
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

        {/* Interview Type and Round */}
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
        </Grid>

        {/* Location and Duration */}
        <Grid cols={2}>
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
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !formData.jobId ||
              !formData.date ||
              !formData.type
            }
            loading={isSubmitting}
          >
            {isSubmitting ? 'Scheduling...' : 'Schedule Interview'}
          </Button>
        </FormActions>
      </form>
    </FormContainer>
  );
}

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
    salaryMin?: number;
    salaryMax?: number;
    jobUrl?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    companySize?: string;
    industry?: string;
    applicationDeadline?: string;
    interviewDate?: string;
    interviewTime?: string;
    interviewType?: string;
    interviewLocation?: string;
    interviewNotes?: string;
    interviewDuration?: number;
    interviewRound?: number;
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
    salaryMin: initialData?.salaryMin?.toString() || '',
    salaryMax: initialData?.salaryMax?.toString() || '',
    jobUrl: initialData?.jobUrl || '',
    contactName: initialData?.contactName || '',
    contactEmail: initialData?.contactEmail || '',
    contactPhone: initialData?.contactPhone || '',
    companySize: initialData?.companySize || '',
    industry: initialData?.industry || '',
    applicationDeadline: initialData?.applicationDeadline?.split('T')[0] || '',
    interviewDate: initialData?.interviewDate?.split('T')[0] || '',
    interviewTime: initialData?.interviewTime || '',
    interviewType: initialData?.interviewType || '',
    interviewLocation: initialData?.interviewLocation || '',
    interviewNotes: initialData?.interviewNotes || '',
    interviewDuration: initialData?.interviewDuration?.toString() || '',
    interviewRound: initialData?.interviewRound?.toString() || '',
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedPhone = formatPhoneNumber(value);
    setFormData((prev) => ({ ...prev, contactPhone: formattedPhone }));
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '');

    // Limit to 10 digits
    const limitedPhone = phoneNumber.substring(0, 10);

    // Format based on length
    if (limitedPhone.length <= 3) {
      return limitedPhone;
    } else if (limitedPhone.length <= 6) {
      return `(${limitedPhone.slice(0, 3)}) ${limitedPhone.slice(3)}`;
    } else {
      return `(${limitedPhone.slice(0, 3)}) ${limitedPhone.slice(
        3,
        6
      )}-${limitedPhone.slice(6)}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      mode === 'edit' ? `/api/job/${initialData?.id}` : '/api/job';
    const method = mode === 'edit' ? 'PUT' : 'POST';

    // Prepare the data with proper types
    const submitData = {
      ...formData,
      salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : null,
      salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : null,
      applicationDeadline: formData.applicationDeadline
        ? new Date(formData.applicationDeadline).toISOString()
        : null,
      companySize: formData.companySize || null,
      jobUrl: formData.jobUrl || null,
      contactName: formData.contactName || null,
      contactEmail: formData.contactEmail || null,
      contactPhone: formData.contactPhone || null,
      industry: formData.industry || null,
      interviewDate: formData.interviewDate
        ? new Date(formData.interviewDate).toISOString()
        : null,
      interviewTime: formData.interviewTime || null,
      interviewType: formData.interviewType || null,
      interviewLocation: formData.interviewLocation || null,
      interviewNotes: formData.interviewNotes || null,
      interviewDuration: formData.interviewDuration
        ? parseInt(formData.interviewDuration)
        : null,
      interviewRound: formData.interviewRound
        ? parseInt(formData.interviewRound)
        : null,
    };

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submitData),
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

          {/* Salary Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="salaryMin"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Min Salary
              </label>
              <input
                id="salaryMin"
                type="number"
                name="salaryMin"
                placeholder="e.g. 80000"
                value={formData.salaryMin}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="salaryMax"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Max Salary
              </label>
              <input
                id="salaryMax"
                type="number"
                name="salaryMax"
                placeholder="e.g. 120000"
                value={formData.salaryMax}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
              />
            </div>
          </div>

          {/* Company Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="companySize"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Company Size
              </label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                }}
              >
                <option value="">Select size</option>
                <option value="STARTUP">🚀 Startup (1-10)</option>
                <option value="SMALL">🏢 Small (11-50)</option>
                <option value="MEDIUM">🏬 Medium (51-200)</option>
                <option value="LARGE">🏭 Large (201-1000)</option>
                <option value="ENTERPRISE">🏗️ Enterprise (1000+)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Industry
              </label>
              <input
                id="industry"
                type="text"
                name="industry"
                placeholder="e.g. Technology, Finance, Healthcare"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
              />
            </div>
          </div>

          {/* Job URL and Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="jobUrl"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Job Posting URL
              </label>
              <input
                id="jobUrl"
                type="url"
                name="jobUrl"
                placeholder="https://company.com/jobs/..."
                value={formData.jobUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="applicationDeadline"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Application Deadline
              </label>
              <div className="relative">
                <input
                  id="applicationDeadline"
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  min="2023-01-01"
                  max="2030-12-31"
                  className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200 cursor-pointer relative z-10"
                  style={{
                    colorScheme: 'dark',
                  }}
                />
                {!formData.applicationDeadline && (
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[var(--foreground-muted)] z-0">
                    Select deadline date...
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--foreground)] border-b border-[var(--border)] pb-2">
              Contact Information (Optional)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="contactName"
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Contact Name
                </label>
                <input
                  id="contactName"
                  type="text"
                  name="contactName"
                  placeholder="e.g. Jane Smith"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Contact Email
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  name="contactEmail"
                  placeholder="jane@company.com"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Contact Phone
                </label>
                <input
                  id="contactPhone"
                  type="tel"
                  name="contactPhone"
                  placeholder="(555) 123-4567"
                  value={formData.contactPhone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Interview Section */}
          <div className="border-t border-[var(--border)] pt-6">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              📅 Interview Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="interviewDate"
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Interview Date
                </label>
                <div className="relative">
                  <input
                    id="interviewDate"
                    type="date"
                    name="interviewDate"
                    value={formData.interviewDate}
                    onChange={handleChange}
                    min="2023-01-01"
                    max="2030-12-31"
                    className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200 cursor-pointer relative z-10"
                    style={{
                      colorScheme: 'dark',
                    }}
                  />
                  {!formData.interviewDate && (
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="interviewTime"
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Interview Time
                </label>
                <input
                  id="interviewTime"
                  type="time"
                  name="interviewTime"
                  value={formData.interviewTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200"
                  style={{
                    colorScheme: 'dark',
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="interviewType"
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Interview Type
                </label>
                <select
                  id="interviewType"
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] transition-all duration-200 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="PHONE">📞 Phone</option>
                  <option value="VIDEO">💻 Video</option>
                  <option value="ONSITE">🏢 On-site</option>
                  <option value="VIRTUAL">🌐 Virtual</option>
                  <option value="GROUP">👥 Group</option>
                  <option value="TECHNICAL">⚙️ Technical</option>
                  <option value="BEHAVIORAL">🗣️ Behavioral</option>
                  <option value="FINAL">🎯 Final</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="interviewRound"
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Interview Round
                </label>
                <input
                  id="interviewRound"
                  type="number"
                  name="interviewRound"
                  placeholder="e.g. 1, 2, 3"
                  min="1"
                  value={formData.interviewRound}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="interviewDuration"
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Duration (minutes)
                </label>
                <input
                  id="interviewDuration"
                  type="number"
                  name="interviewDuration"
                  placeholder="e.g. 60, 90"
                  min="15"
                  step="15"
                  value={formData.interviewDuration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="interviewLocation"
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Location/Link
                </label>
                <input
                  id="interviewLocation"
                  type="text"
                  name="interviewLocation"
                  placeholder="Address or meeting link"
                  value={formData.interviewLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="interviewNotes"
                className="block text-sm font-medium text-[var(--foreground)] mb-2"
              >
                Interview Notes
              </label>
              <textarea
                id="interviewNotes"
                name="interviewNotes"
                placeholder="Preparation notes, questions to ask, interview feedback..."
                value={formData.interviewNotes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] resize-vertical transition-all duration-200"
              />
            </div>
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

// Application status configurations
export const APPLICATION_STATUS_CONFIG = {
  WISHLIST: {
    emoji: '📝',
    color: 'bg-[var(--foreground-muted)]',
    label: 'Wishlist',
  },
  APPLIED: { emoji: '📤', color: 'bg-[var(--primary)]', label: 'Applied' },
  INTERVIEW: { emoji: '🎯', color: 'bg-[var(--warning)]', label: 'Interview' },
  OFFER: { emoji: '🎉', color: 'bg-[var(--success)]', label: 'Offer' },
  REJECTED: { emoji: '❌', color: 'bg-[var(--error)]', label: 'Rejected' },
  ACCEPTED: { emoji: '✅', color: 'bg-[var(--success)]', label: 'Accepted' },
} as const;

// Interview type configurations
export const INTERVIEW_TYPES = [
  { value: 'PHONE', label: 'Phone Interview' },
  { value: 'VIDEO', label: 'Video Interview' },
  { value: 'ONSITE', label: 'On-site Interview' },
  { value: 'VIRTUAL', label: 'Virtual Interview' },
  { value: 'GROUP', label: 'Group Interview' },
  { value: 'TECHNICAL', label: 'Technical Interview' },
  { value: 'BEHAVIORAL', label: 'Behavioral Interview' },
  { value: 'FINAL', label: 'Final Interview' },
];

// Interview status configurations
export const INTERVIEW_STATUS_CONFIG = {
  SCHEDULED: { emoji: '📅', color: 'bg-[var(--primary)]', label: 'Scheduled' },
  COMPLETED: { emoji: '✅', color: 'bg-[var(--success)]', label: 'Completed' },
  CANCELLED: { emoji: '❌', color: 'bg-[var(--error)]', label: 'Cancelled' },
  RESCHEDULED: {
    emoji: '🔄',
    color: 'bg-[var(--warning)]',
    label: 'Rescheduled',
  },
} as const;

// Interview status configurations
export const INTERVIEW_STATUSES = [
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'RESCHEDULED', label: 'Rescheduled' },
];

// Company size options
export const COMPANY_SIZE_OPTIONS = [
  { value: '', label: 'Select size' },
  { value: 'STARTUP', label: '🚀 Startup (1-10)' },
  { value: 'SMALL', label: '🏢 Small (11-50)' },
  { value: 'MEDIUM', label: '🏬 Medium (51-200)' },
  { value: 'LARGE', label: '🏭 Large (201-1000)' },
  { value: 'ENTERPRISE', label: '🏗️ Enterprise (1000+)' },
];

// Application status select options
export const APPLICATION_STATUS_OPTIONS = [
  { value: 'WISHLIST', label: '📝 Wishlist' },
  { value: 'APPLIED', label: '📤 Applied' },
  { value: 'INTERVIEW', label: '🎯 Interview' },
  { value: 'OFFER', label: '🎉 Offer' },
  { value: 'REJECTED', label: '❌ Rejected' },
  { value: 'ACCEPTED', label: '✅ Accepted' },
];

// Company size display mapping
export const COMPANY_SIZE_DISPLAY = {
  STARTUP: '🚀 Startup (1-10 employees)',
  SMALL: '🏢 Small (11-50 employees)',
  MEDIUM: '🏬 Medium (51-200 employees)',
  LARGE: '🏭 Large (201-1000 employees)',
  ENTERPRISE: '🏗️ Enterprise (1000+ employees)',
} as const;

// Helper function to get application status config
export function getApplicationStatusConfig(status: string) {
  return (
    APPLICATION_STATUS_CONFIG[
      status as keyof typeof APPLICATION_STATUS_CONFIG
    ] || APPLICATION_STATUS_CONFIG.WISHLIST
  );
}

// Helper function to get interview status config
export function getInterviewStatusConfig(status: string) {
  return (
    INTERVIEW_STATUS_CONFIG[status as keyof typeof INTERVIEW_STATUS_CONFIG] ||
    INTERVIEW_STATUS_CONFIG.SCHEDULED
  );
}

// Helper function to get company size display
export function getCompanySizeDisplay(size: string) {
  return COMPANY_SIZE_DISPLAY[size as keyof typeof COMPANY_SIZE_DISPLAY];
}

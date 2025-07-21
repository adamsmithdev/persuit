import {
	faTasks,
	faFileUpload,
	faBullseye,
	faGift,
	faTimes,
	faCheck,
	faCalendar,
	faCheckCircle,
	faCalendarTimes,
	faSyncAlt,
	faRocket,
	faBuilding,
	faIndustry,
	faWarehouse,
	faHammer,
} from '@/lib/fontawesome';

// Application status configurations
export const APPLICATION_STATUS_CONFIG = {
	WISHLIST: {
		icon: faTasks,
		color: 'bg-[var(--foreground-muted)]',
		label: 'Wishlist',
	},
	APPLIED: {
		icon: faFileUpload,
		color: 'bg-[var(--primary)]',
		label: 'Applied',
	},
	INTERVIEW: {
		icon: faBullseye,
		color: 'bg-[var(--warning)]',
		label: 'Interview',
	},
	OFFER: { icon: faGift, color: 'bg-[var(--success)]', label: 'Offer' },
	REJECTED: { icon: faTimes, color: 'bg-[var(--error)]', label: 'Rejected' },
	ACCEPTED: { icon: faCheck, color: 'bg-[var(--success)]', label: 'Accepted' },
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
	SCHEDULED: {
		icon: faCalendar,
		color: 'bg-[var(--primary)]',
		label: 'Scheduled',
	},
	COMPLETED: {
		icon: faCheckCircle,
		color: 'bg-[var(--success)]',
		label: 'Completed',
	},
	CANCELLED: {
		icon: faCalendarTimes,
		color: 'bg-[var(--error)]',
		label: 'Cancelled',
	},
	RESCHEDULED: {
		icon: faSyncAlt,
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
	{ value: 'STARTUP', label: 'Startup (1-10)', icon: faRocket },
	{ value: 'SMALL', label: 'Small (11-50)', icon: faBuilding },
	{ value: 'MEDIUM', label: 'Medium (51-200)', icon: faIndustry },
	{ value: 'LARGE', label: 'Large (201-1000)', icon: faWarehouse },
	{ value: 'ENTERPRISE', label: 'Enterprise (1000+)', icon: faHammer },
];

// Application status select options
export const APPLICATION_STATUS_OPTIONS = [
	{ value: 'WISHLIST', label: 'Wishlist', icon: faTasks },
	{ value: 'APPLIED', label: 'Applied', icon: faFileUpload },
	{ value: 'INTERVIEW', label: 'Interview', icon: faBullseye },
	{ value: 'OFFER', label: 'Offer', icon: faGift },
	{ value: 'REJECTED', label: 'Rejected', icon: faTimes },
	{ value: 'ACCEPTED', label: 'Accepted', icon: faCheck },
];

// Company size display mapping
export const COMPANY_SIZE_DISPLAY = {
	STARTUP: { label: 'Startup (1-10 employees)', icon: faRocket },
	SMALL: { label: 'Small (11-50 employees)', icon: faBuilding },
	MEDIUM: { label: 'Medium (51-200 employees)', icon: faIndustry },
	LARGE: { label: 'Large (201-1000 employees)', icon: faWarehouse },
	ENTERPRISE: { label: 'Enterprise (1000+ employees)', icon: faHammer },
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

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import {
	FormContainer,
	FormField,
	Input,
	TextArea,
	FormSection,
	FormActions,
	Grid,
} from './ui';

type ContactFormProps = {
	mode?: 'create' | 'edit';
	initialData?: {
		id: string;
		firstName: string;
		lastName?: string;
		email?: string;
		phone?: string;
		jobTitle?: string;
		company?: string;
		linkedIn?: string;
		notes?: string;
	};
};

export default function ContactForm({
	mode = 'create',
	initialData,
}: Readonly<ContactFormProps>) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		firstName: initialData?.firstName || '',
		lastName: initialData?.lastName || '',
		email: initialData?.email || '',
		phone: initialData?.phone || '',
		jobTitle: initialData?.jobTitle || '',
		company: initialData?.company || '',
		linkedIn: initialData?.linkedIn || '',
		notes: initialData?.notes || '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const formatPhoneNumber = (phone: string) => {
		const cleaned = phone.replace(/\D/g, '');
		const phoneRegex = /^(\d{3})(\d{3})(\d{4})$/;
		const match = phoneRegex.exec(cleaned);
		if (match) {
			return `(${match[1]}) ${match[2]}-${match[3]}`;
		}
		return phone;
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedPhone = formatPhoneNumber(e.target.value);
		setFormData((prev) => ({ ...prev, phone: formattedPhone }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const contactData = {
				firstName: formData.firstName,
				lastName: formData.lastName || null,
				email: formData.email || null,
				phone: formData.phone || null,
				jobTitle: formData.jobTitle || null,
				company: formData.company || null,
				linkedIn: formData.linkedIn || null,
				notes: formData.notes || null,
			};

			if (mode === 'edit' && initialData?.id) {
				const response = await fetch(`/api/contact/${initialData.id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(contactData),
				});

				if (!response.ok) {
					throw new Error('Failed to update contact');
				}
			} else {
				const response = await fetch('/api/contact', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(contactData),
				});

				if (!response.ok) {
					throw new Error('Failed to create contact');
				}
			}

			router.push('/contacts');
		} catch (error) {
			console.error('Form submission error:', error);
			setError(
				error instanceof Error ? error.message : 'An unexpected error occurred',
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<FormContainer
			title={mode === 'edit' ? 'Edit Contact' : 'Create New Contact'}
		>
			<form onSubmit={handleSubmit}>
				{error && (
					<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
						{error}
					</div>
				)}

				<FormSection title="Basic Information">
					<Grid>
						<FormField label="First Name" id="firstName" required>
							<Input
								id="firstName"
								name="firstName"
								type="text"
								required
								value={formData.firstName}
								onChange={handleInputChange}
								placeholder="Enter first name"
							/>
						</FormField>

						<FormField label="Last Name" id="lastName">
							<Input
								id="lastName"
								name="lastName"
								type="text"
								value={formData.lastName}
								onChange={handleInputChange}
								placeholder="Enter last name"
							/>
						</FormField>
					</Grid>
				</FormSection>

				<FormSection title="Contact Information">
					<Grid>
						<FormField label="Email" id="email">
							<Input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="contact@company.com"
							/>
						</FormField>

						<FormField label="Phone" id="phone">
							<Input
								id="phone"
								name="phone"
								type="tel"
								value={formData.phone}
								onChange={handlePhoneChange}
								placeholder="(555) 123-4567"
							/>
						</FormField>
					</Grid>
				</FormSection>

				<FormSection title="Professional Information">
					<Grid>
						<FormField label="Job Title" id="jobTitle">
							<Input
								id="jobTitle"
								name="jobTitle"
								type="text"
								value={formData.jobTitle}
								onChange={handleInputChange}
								placeholder="e.g., Software Engineer"
							/>
						</FormField>

						<FormField label="Company" id="company">
							<Input
								id="company"
								name="company"
								type="text"
								value={formData.company}
								onChange={handleInputChange}
								placeholder="Company name"
							/>
						</FormField>
					</Grid>

					<FormField label="LinkedIn Profile" id="linkedIn">
						<Input
							id="linkedIn"
							name="linkedIn"
							type="url"
							value={formData.linkedIn}
							onChange={handleInputChange}
							placeholder="https://linkedin.com/in/username"
						/>
					</FormField>
				</FormSection>

				<FormSection title="Additional Notes">
					<FormField label="Notes" id="notes">
						<TextArea
							id="notes"
							name="notes"
							value={formData.notes}
							onChange={handleInputChange}
							placeholder="Any additional notes about this contact..."
							rows={4}
						/>
					</FormField>
				</FormSection>

				<FormActions>
					<Button
						type="button"
						variant="outline"
						onClick={() => router.push('/contacts')}
						disabled={loading}
					>
						Cancel
					</Button>
					<Button type="submit" disabled={loading}>
						{(() => {
							if (loading) {
								return mode === 'edit' ? 'Updating...' : 'Creating...';
							}
							return mode === 'edit' ? 'Update Contact' : 'Create Contact';
						})()}
					</Button>
				</FormActions>
			</form>
		</FormContainer>
	);
}

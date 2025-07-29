'use client';

import { useState } from 'react';
import { Contact } from '@prisma/client';
import { FormField, Input, PhoneInput, UrlInput, TextArea } from './ui';
import Button from './Button';

interface QuickContactModalProps {
	isOpen: boolean;
	onClose: () => void;
	onContactCreated: (contact: Contact) => void;
	prefillName?: string;
}

export default function QuickContactModal({
	isOpen,
	onClose,
	onContactCreated,
	prefillName = '',
}: Readonly<QuickContactModalProps>) {
	const [formData, setFormData] = useState({
		firstName: prefillName.split(' ')[0] || '',
		lastName: prefillName.split(' ').slice(1).join(' ') || '',
		email: '',
		phone: '',
		jobTitle: '',
		company: '',
		linkedIn: '',
		notes: '',
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !loading && formData.firstName) {
			e.preventDefault();
			handleSubmit();
		}
	};

	const handleSubmit = async () => {
		setLoading(true);

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const newContact = await response.json();
				onContactCreated(newContact);
				setFormData({
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					jobTitle: '',
					company: '',
					linkedIn: '',
					notes: '',
				});
				onClose();
			} else {
				alert('Failed to create contact');
			}
		} catch (error) {
			console.error('Error creating contact:', error);
			alert('Failed to create contact');
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
			onClick={onClose}
		>
			<div
				className="bg-[var(--surface-elevated)] rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-[var(--border)] shadow-lg"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={handleKeyDown}
				tabIndex={-1}
			>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-[var(--foreground)]">
						Quick Add Contact
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<FormField label="First Name" id="firstName" required>
							<Input
								id="firstName"
								name="firstName"
								required
								value={formData.firstName}
								onChange={handleChange}
								placeholder="Jane"
							/>
						</FormField>
						<FormField label="Last Name" id="lastName">
							<Input
								id="lastName"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								placeholder="Smith"
							/>
						</FormField>
					</div>

					<FormField label="Email" id="email">
						<Input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="jane@company.com"
						/>
					</FormField>

					<FormField label="Phone" id="phone">
						<PhoneInput
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
						/>
					</FormField>

					<div className="grid grid-cols-2 gap-4">
						<FormField label="Job Title" id="jobTitle">
							<Input
								id="jobTitle"
								name="jobTitle"
								value={formData.jobTitle}
								onChange={handleChange}
								placeholder="Software Engineer"
							/>
						</FormField>
						<FormField label="Company" id="company">
							<Input
								id="company"
								name="company"
								value={formData.company}
								onChange={handleChange}
								placeholder="Tech Corp"
							/>
						</FormField>
					</div>

					<FormField label="LinkedIn" id="linkedIn">
						<UrlInput
							id="linkedIn"
							name="linkedIn"
							value={formData.linkedIn}
							onChange={handleChange}
							placeholder="https://linkedin.com/in/janesmith"
						/>
					</FormField>

					<FormField label="Notes" id="notes">
						<TextArea
							id="notes"
							name="notes"
							value={formData.notes}
							onChange={handleChange}
							placeholder="Additional notes about this contact..."
							rows={3}
						/>
					</FormField>

					<div className="flex gap-3 pt-4">
						<Button type="button" variant="secondary" onClick={onClose}>
							Cancel
						</Button>
						<Button
							type="button"
							disabled={loading || !formData.firstName}
							loading={loading}
							onClick={handleSubmit}
						>
							Create Contact
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

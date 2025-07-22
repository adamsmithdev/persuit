import { Contact } from '@prisma/client';
import React from 'react';
import { ListItem, Icon, Avatar } from './ui';
import {
	faPhone,
	faLink,
	faBuilding,
	faBriefcase,
	faUser,
} from '@/lib/fontawesome';

interface Props {
	readonly contact: Contact;
}

export default function ContactListItem({ contact }: Props) {
	const formatContactDetails = () => {
		const details = [];
		if (contact.email) {
			details.push(
				<div key="email" className="flex items-center gap-1">
					<span className="text-blue-500">📧</span>
					<span>{contact.email}</span>
				</div>,
			);
		}
		if (contact.phone) {
			details.push(
				<div key="phone" className="flex items-center gap-1">
					<Icon icon={faPhone} className="text-green-500" />
					<span>{contact.phone}</span>
				</div>,
			);
		}
		return details;
	};

	const formatProfessionalInfo = () => {
		const info = [];
		if (contact.jobTitle && contact.company) {
			info.push(
				<div key="job" className="flex items-center gap-1">
					<Icon icon={faBriefcase} className="text-purple-500" />
					<span>
						{contact.jobTitle} at {contact.company}
					</span>
				</div>,
			);
		} else if (contact.jobTitle) {
			info.push(
				<div key="job" className="flex items-center gap-1">
					<Icon icon={faBriefcase} className="text-purple-500" />
					<span>{contact.jobTitle}</span>
				</div>,
			);
		} else if (contact.company) {
			info.push(
				<div key="company" className="flex items-center gap-1">
					<Icon icon={faBuilding} className="text-gray-500" />
					<span>{contact.company}</span>
				</div>,
			);
		}

		if (contact.linkedIn) {
			info.push(
				<div key="linkedin" className="flex items-center gap-1">
					<Icon icon={faLink} className="text-blue-600" />
					<span>LinkedIn</span>
				</div>,
			);
		}

		return info;
	};

	return (
		<ListItem href={`/contacts/${contact.id}`}>
			<div className="flex items-center justify-between mb-3">
				<Avatar
					name={`${contact.firstName} ${contact.lastName}`}
					size="md"
					hover
				/>
				{contact.notes && (
					<div className="text-xs text-[var(--foreground-muted)] flex items-center gap-1">
						<Icon icon={faUser} className="text-gray-400" />
						<span>Has notes</span>
					</div>
				)}
			</div>

			<h3 className="font-semibold text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
				{contact.firstName} {contact.lastName}
			</h3>

			{(contact.jobTitle || contact.company) && (
				<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 text-sm text-[var(--foreground-muted)]">
					{formatProfessionalInfo()}
				</div>
			)}

			<div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-[var(--foreground-subtle)]">
				{formatContactDetails()}
			</div>
		</ListItem>
	);
}

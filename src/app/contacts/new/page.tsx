import { ClientAuthWrapper } from '@/components/ClientAuthWrapper';
import ContactForm from '@/components/ContactForm';

export default function NewContactPage() {
	return (
		<ClientAuthWrapper>
			<div className="container mx-auto px-4 py-8">
				<ContactForm mode="create" />
			</div>
		</ClientAuthWrapper>
	);
}

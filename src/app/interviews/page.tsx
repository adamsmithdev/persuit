import AuthWrapper from '@/components/AuthWrapper';
import Interviews from '@/components/Interviews';
import Link from 'next/link';
import Button from '@/components/Button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getInterviews } from '@/lib/services/interviewsService';
import { Icon } from '@/components/ui';
import { faPlus } from '@/lib/fontawesome';

export default async function InterviewsPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		return <div>Please log in to view your interviews</div>;
	}

	const interviews = await getInterviews(session.user.email);

	return (
		<AuthWrapper>
			<div className="space-y-8">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
					<div>
						<h1 className="text-3xl font-bold text-[var(--foreground)]">
							Interview Schedule
						</h1>
						<p className="text-[var(--foreground-muted)] mt-2">
							Track your upcoming interviews and stay organized
						</p>
					</div>
					<Link href="/interviews/new">
						<Button>
							<Icon icon={faPlus} className="mr-2" />
							<span>Schedule Interview</span>
						</Button>
					</Link>
				</div>

				{/* Interview List Component */}
				<Interviews interviews={interviews} />
			</div>
		</AuthWrapper>
	);
}

import AuthWrapper from '@/components/AuthWrapper';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import Button from '@/components/Button';
import { Icon, Avatar } from '@/components/ui';
import {
	faPlus,
	faClipboard,
	faLock,
	faCalendar,
	faSave,
	faSignOutAlt,
} from '@/lib/fontawesome';

export default async function ProfilePage() {
	const session = await getServerSession(authOptions);

	return (
		<AuthWrapper>
			<div className="space-y-8">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-[var(--foreground)]">
						Your Profile
					</h1>
					<p className="text-[var(--foreground-muted)] mt-2">
						Manage your account information and preferences
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Profile Info */}
					<div className="lg:col-span-2 space-y-6">
						<div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)]">
							<h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
								Account Information
							</h2>

							<div className="space-y-6">
								<div className="flex items-center space-x-6">
									<Avatar
										src={session?.user?.image}
										alt="Profile"
										name={session?.user?.name}
										fallbackText={session?.user?.email}
										size="xl"
									/>
									<div>
										<h3 className="text-lg font-medium text-[var(--foreground)]">
											{session?.user?.name || 'User'}
										</h3>
										<p className="text-[var(--foreground-muted)]">
											{session?.user?.email}
										</p>
									</div>
								</div>

								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<label
											htmlFor="fullName"
											className="block text-sm font-medium text-[var(--foreground)] mb-2"
										>
											Full Name
										</label>
										<input
											id="fullName"
											type="text"
											value={session?.user?.name || ''}
											disabled
											className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl text-[var(--foreground)] disabled:opacity-60"
										/>
									</div>
									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium text-[var(--foreground)] mb-2"
										>
											Email Address
										</label>
										<input
											id="email"
											type="email"
											value={session?.user?.email || ''}
											disabled
											className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl text-[var(--foreground)] disabled:opacity-60"
										/>
									</div>
								</div>

								<div className="pt-4 border-t border-[var(--border)]">
									<p className="text-sm text-[var(--foreground-muted)] mb-4">
										Your profile information is managed through your OAuth
										provider. To update your name or email, please update it in
										your Google or GitHub account.
									</p>
									<Button variant="outline" disabled>
										<Icon icon={faLock} className="mr-2" /> Edit Profile (Coming
										Soon)
									</Button>
								</div>
							</div>
						</div>

						{/* Job Search Preferences */}
						<div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)]">
							<h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
								Job Search Preferences
							</h2>

							<div className="space-y-4">
								<div>
									<label
										htmlFor="jobTitles"
										className="block text-sm font-medium text-[var(--foreground)] mb-2"
									>
										Preferred Job Titles
									</label>
									<input
										id="jobTitles"
										type="text"
										placeholder="e.g. Software Engineer, Product Manager"
										disabled
										className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--foreground-muted)] disabled:opacity-60"
									/>
								</div>
								<div>
									<label
										htmlFor="locations"
										className="block text-sm font-medium text-[var(--foreground)] mb-2"
									>
										Preferred Locations
									</label>
									<input
										id="locations"
										type="text"
										placeholder="e.g. San Francisco, Remote, New York"
										disabled
										className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--foreground-muted)] disabled:opacity-60"
									/>
								</div>
								<div>
									<label
										htmlFor="salaryRange"
										className="block text-sm font-medium text-[var(--foreground)] mb-2"
									>
										Target Salary Range
									</label>
									<input
										id="salaryRange"
										type="text"
										placeholder="e.g. $80,000 - $120,000"
										disabled
										className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--foreground-muted)] disabled:opacity-60"
									/>
								</div>
							</div>

							<div className="pt-6">
								<Button variant="outline" disabled>
									<Icon icon={faSave} className="mr-2" /> Save Preferences
									(Coming Soon)
								</Button>
							</div>
						</div>
					</div>

					{/* Quick Stats & Actions */}
					<div className="space-y-6">
						<div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
							<h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
								Quick Actions
							</h3>
							<div className="space-y-3">
								<Link href="/application/new" className="block">
									<Button fullWidth>
										<Icon icon={faPlus} className="mr-2" /> Add New Application
									</Button>
								</Link>
								<Link href="/applications" className="block">
									<Button variant="outline" fullWidth>
										<Icon icon={faClipboard} className="mr-2" /> View All
										Applications
									</Button>
								</Link>
								<Link href="/interviews" className="block">
									<Button variant="outline" fullWidth>
										<Icon icon={faCalendar} className="mr-2" /> Check Interviews
									</Button>
								</Link>
							</div>
						</div>

						<div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
							<h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
								Account
							</h3>
							<div className="space-y-3">
								<p className="text-sm text-[var(--foreground-muted)]">
									Account created:{' '}
									{session?.user?.email ? 'Connected via OAuth' : 'Unknown'}
								</p>
								<div className="pt-3 border-t border-[var(--border)]">
									<Button variant="outline" size="sm" fullWidth>
										<Icon icon={faSignOutAlt} className="mr-2" /> Sign Out
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AuthWrapper>
	);
}

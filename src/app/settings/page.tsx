import AuthWrapper from '@/components/AuthWrapper';
import Button from '@/components/Button';
import Link from 'next/link';
import { Icon, FormField, Select, Checkbox } from '@/components/ui';
import {
	faDownload,
	faSyncAlt,
	faTrash,
	faHourglassHalf,
	faBook,
	faQuestionCircle,
} from '@/lib/fontawesome';
export default function SettingsPage() {
	return (
		<AuthWrapper>
			<div className="space-y-8">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-[var(--foreground)]">
						Settings
					</h1>
					<p className="text-[var(--foreground-muted)] mt-2">
						Customize your Persuit experience
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Settings Content */}
					<div className="lg:col-span-2 space-y-6">
						{/* Notifications */}
						<div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)]">
							<h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
								Notifications
							</h2>

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium text-[var(--foreground)]">
											Email Notifications
										</h3>
										<p className="text-sm text-[var(--foreground-muted)]">
											Receive email updates about your applications
										</p>
									</div>
									<Checkbox id="emailNotifications" disabled />
								</div>

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium text-[var(--foreground)]">
											Interview Reminders
										</h3>
										<p className="text-sm text-[var(--foreground-muted)]">
											Get reminded about upcoming interviews
										</p>
									</div>
									<Checkbox id="interviewReminders" disabled />
								</div>

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium text-[var(--foreground)]">
											Weekly Summaries
										</h3>
										<p className="text-sm text-[var(--foreground-muted)]">
											Receive weekly progress reports
										</p>
									</div>
									<Checkbox id="weeklySummaries" disabled />
								</div>
							</div>
						</div>

						{/* Display Preferences */}
						<div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)]">
							<h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
								Display Preferences
							</h2>

							<div className="space-y-6">
								<div>
									<FormField label="Theme" id="theme">
										<Select id="theme" disabled>
											<option value="system">System Default</option>
											<option value="light">Light</option>
											<option value="dark">Dark</option>
										</Select>
									</FormField>
								</div>{' '}
								<div>
									<FormField label="Items per Page" id="itemsPerPage">
										<Select id="itemsPerPage" disabled>
											<option value="10">10</option>
											<option value="25">25</option>
											<option value="50">50</option>
											<option value="100">100</option>
										</Select>
									</FormField>
								</div>
								<div>
									<FormField label="Default View" id="defaultView">
										<Select id="defaultView" disabled>
											<option value="dashboard">Dashboard</option>
											<option value="applications">Applications List</option>
											<option value="interviews">Interviews</option>
										</Select>
									</FormField>
								</div>
							</div>
						</div>

						{/* Data & Privacy */}
						<div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)]">
							<h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
								Data & Privacy
							</h2>

							<div className="space-y-6">
								<div className="space-y-4">
									<Button variant="outline" disabled fullWidth>
										<Icon icon={faDownload} className="mr-2" /> Export My Data
										(Coming Soon)
									</Button>

									<Button variant="outline" disabled fullWidth>
										<Icon icon={faSyncAlt} className="mr-2" /> Backup Data
										(Coming Soon)
									</Button>
								</div>

								<div className="pt-4 border-t border-[var(--border)]">
									<div className="bg-red-50 border border-red-200 rounded-xl p-4">
										<h4 className="font-medium text-red-800 mb-2">
											Danger Zone
										</h4>
										<p className="text-sm text-red-700 mb-4">
											These actions cannot be undone. Please be careful.
										</p>
										<Button variant="outline" disabled>
											<Icon icon={faTrash} className="mr-2" /> Delete Account
											(Coming Soon)
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						<div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
							<h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
								Coming Soon
							</h3>
							<div className="space-y-3 text-sm text-[var(--foreground-muted)]">
								<div className="flex items-center space-x-3">
									<Icon icon={faHourglassHalf} className="text-yellow-500" />
									<span>Custom dashboard layouts</span>
								</div>
								<div className="flex items-center space-x-3">
									<Icon icon={faHourglassHalf} className="text-yellow-500" />
									<span>Advanced filtering options</span>
								</div>
								<div className="flex items-center space-x-3">
									<Icon icon={faHourglassHalf} className="text-yellow-500" />
									<span>Integration settings</span>
								</div>
								<div className="flex items-center space-x-3">
									<Icon icon={faHourglassHalf} className="text-yellow-500" />
									<span>API access management</span>
								</div>
							</div>
						</div>

						<div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
							<h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
								Need Help?
							</h3>
							<div className="space-y-3">
								<Link href="/" className="block">
									<Button variant="outline" fullWidth>
										<Icon icon={faBook} className="mr-2" /> Documentation
									</Button>
								</Link>
								<Link href="/" className="block">
									<Button variant="outline" fullWidth>
										<Icon icon={faQuestionCircle} className="mr-2" /> Support
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AuthWrapper>
	);
}

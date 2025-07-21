import AuthWrapper from '@/components/AuthWrapper';
import Link from 'next/link';
import Button from '@/components/Button';
import { Icon } from '@/components/ui';
import {
	faPlus,
	faFileAlt,
	faEdit,
	faLink,
	faClipboard,
	faCheck,
} from '@/lib/fontawesome';

export default function DocumentsPage() {
	return (
		<AuthWrapper>
			<div className="space-y-8">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
					<div>
						<h1 className="text-3xl font-bold text-[var(--foreground)]">
							Documents & Files
						</h1>
						<p className="text-[var(--foreground-muted)] mt-2">
							Manage your resumes, cover letters, and other application
							materials
						</p>
					</div>
					<Button>
						<Icon icon={faPlus} className="mr-2" />
						<span>Upload Document</span>
					</Button>
				</div>

				{/* Coming Soon Content */}
				<div className="text-center py-20">
					<div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--info)] rounded-3xl flex items-center justify-center mx-auto mb-8">
						<Icon icon={faFileAlt} className="text-4xl text-white" />
					</div>
					<h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
						Document Management Coming Soon
					</h2>
					<p className="text-[var(--foreground-muted)] mb-8 max-w-2xl mx-auto leading-relaxed">
						Soon you&apos;ll be able to upload, organize, and attach your
						resumes, cover letters, and portfolios directly to your job
						applications. Features will include:
					</p>

					<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
						<div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
							<div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
								<Icon
									icon={faEdit}
									className="text-2xl text-[var(--primary)]"
								/>
							</div>
							<h3 className="font-semibold text-[var(--foreground)] mb-2">
								Resume Versions
							</h3>
							<p className="text-sm text-[var(--foreground-muted)]">
								Upload multiple resume versions for different job types
							</p>
						</div>

						<div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
							<div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
								<Icon
									icon={faFileAlt}
									className="text-2xl text-[var(--primary)]"
								/>
							</div>
							<h3 className="font-semibold text-[var(--foreground)] mb-2">
								Cover Letter Templates
							</h3>
							<p className="text-sm text-[var(--foreground-muted)]">
								Create and save customizable cover letter templates
							</p>
						</div>

						<div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
							<div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
								<Icon
									icon={faLink}
									className="text-2xl text-[var(--primary)]"
								/>
							</div>
							<h3 className="font-semibold text-[var(--foreground)] mb-2">
								Smart Attachments
							</h3>
							<p className="text-sm text-[var(--foreground-muted)]">
								Easily attach relevant documents to each application
							</p>
						</div>
					</div>

					<div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)] max-w-3xl mx-auto mb-8">
						<h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
							What You&apos;ll Be Able To Do:
						</h3>
						<div className="grid md:grid-cols-2 gap-4 text-left">
							<div className="flex items-start space-x-3">
								<Icon icon={faCheck} className="text-green-500 mt-1" />
								<span className="text-sm text-[var(--foreground-muted)]">
									Upload PDFs, Word docs, and other file types
								</span>
							</div>
							<div className="flex items-start space-x-3">
								<Icon icon={faCheck} className="text-green-500 mt-1" />
								<span className="text-sm text-[var(--foreground-muted)]">
									Preview documents without downloading
								</span>
							</div>
							<div className="flex items-start space-x-3">
								<Icon icon={faCheck} className="text-green-500 mt-1" />
								<span className="text-sm text-[var(--foreground-muted)]">
									Version control for document updates
								</span>
							</div>
							<div className="flex items-start space-x-3">
								<Icon icon={faCheck} className="text-green-500 mt-1" />
								<span className="text-sm text-[var(--foreground-muted)]">
									Share secure document links
								</span>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<p className="text-[var(--foreground-muted)]">
							For now, you can add document links in the notes section of your
							applications.
						</p>
						<Link href="/applications">
							<Button variant="secondary">
								<Icon icon={faClipboard} className="mr-2" />
								<span>View Applications</span>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</AuthWrapper>
	);
}

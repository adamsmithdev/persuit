import Link from 'next/link';
import ApplicationForm from '@/components/ApplicationForm';
import Button from '@/components/Button';
import AuthWrapper from '@/components/AuthWrapper';

export default function NewApplicationPage() {
  return (
    <AuthWrapper>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              Add New Application
            </h1>
            <p className="text-[var(--foreground-muted)] mt-2">
              Track a new application opportunity
            </p>
          </div>
          <Link href="/applications">
            <Button variant="secondary">
              <span className="mr-2">←</span>
              <span>Back to Applications</span>
            </Button>
          </Link>
        </div>

        <ApplicationForm />
      </div>
    </AuthWrapper>
  );
}

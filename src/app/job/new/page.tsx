import Link from 'next/link';
import JobForm from '@/components/JobForm';
import Button from '@/components/Button';

export default function NewJobPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Add New Application
          </h1>
          <p className="text-[var(--foreground-muted)] mt-2">
            Track a new job opportunity
          </p>
        </div>
        <Link href="/">
          <Button variant="secondary">
            <span className="mr-2">←</span>
            <span>Back to Dashboard</span>
          </Button>
        </Link>
      </div>

      <JobForm />
    </div>
  );
}

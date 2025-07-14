import Link from 'next/link';
import JobForm from '@/components/JobForm';
import Button from '@/components/Button';

export default function NewJobPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Add New Job</h1>
          <p className="text-gray-400 mt-1">Track a new job application</p>
        </div>
        <Link href="/">
          <Button>
            ← Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <JobForm />
    </div>
  );
}

import JobForm from '@/components/JobForm';

export default function NewJobPage() {
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Add New Job</h1>
      <JobForm />
    </div>
  );
}

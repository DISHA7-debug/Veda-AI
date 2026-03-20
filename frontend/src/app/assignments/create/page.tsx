import { CreateForm } from '@/components/assignment/CreateForm';

export default function CreateAssignmentPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create Assignment</h1>
        <p className="text-sm text-gray-500 mt-0.5">Create a new assignment for your students.</p>
      </div>
      <CreateForm />
    </div>
  );
}

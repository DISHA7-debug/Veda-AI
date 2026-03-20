import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from 'next/link';
import { use } from 'react';

export default function AssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/assignments">
          <Button variant="secondary">&larr; Back</Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Assignment Details: {resolvedParams.id}</h1>
      </div>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Details for ID: {resolvedParams.id}</h2>
        <p className="text-gray-600">Placeholder content for a single assignment.</p>
      </Card>
    </div>
  );
}

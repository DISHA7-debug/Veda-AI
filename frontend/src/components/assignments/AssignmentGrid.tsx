import { AssignmentCard, type Assignment } from './AssignmentCard';

interface AssignmentGridProps {
  assignments: Assignment[];
}

export const AssignmentGrid = ({ assignments }: AssignmentGridProps) => {
  if (assignments.length === 0) {
    return (
      <div className="col-span-2 text-center py-20 text-sm text-gray-400">
        No assignments match your search.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {assignments.map((a) => (
        <AssignmentCard key={a.id} assignment={a} />
      ))}
    </div>
  );
};

import { useAssignmentStore } from '@/store/assignment.store';

/** Custom hook – thin wrapper around the Zustand store for components that don't need actions */
export const useAssignment = () => {
  const assignments = useAssignmentStore((s) => s.assignments);
  const currentAssignment = useAssignmentStore((s) => s.currentAssignment);
  const loading = useAssignmentStore((s) => s.loading);
  const error = useAssignmentStore((s) => s.error);

  return { assignments, currentAssignment, loading, error };
};

import { create } from 'zustand';
import type { Assignment, AssignmentDetail, CreateAssignmentPayload } from '@/types/assignment.types';
import * as api from '@/services/api';

interface AssignmentStore {
  // State
  assignments: Assignment[];
  currentAssignment: AssignmentDetail | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchAssignments: () => Promise<void>;
  fetchAssignmentById: (id: string) => Promise<void>;
  createAssignment: (payload: CreateAssignmentPayload) => Promise<Assignment>;
  clearError: () => void;
  clearCurrent: () => void;
}

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  // Initial state
  assignments: [],
  currentAssignment: null,
  loading: false,
  error: null,

  // Fetch list
  fetchAssignments: async () => {
    set({ loading: true, error: null });
    try {
      const data = await api.getAssignments();
      set({ assignments: data, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load assignments',
      });
    }
  },

  // Fetch single
  fetchAssignmentById: async (id: string) => {
    set({ loading: true, error: null, currentAssignment: null });
    try {
      const data = await api.getAssignmentById(id);
      set({ currentAssignment: data, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load assignment',
      });
    }
  },

  // Create
  createAssignment: async (payload: CreateAssignmentPayload) => {
    set({ loading: true, error: null });
    try {
      const created = await api.createAssignment(payload);
      set((state) => ({
        assignments: [created, ...state.assignments],
        loading: false,
      }));
      return created;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create assignment';
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  clearError: () => set({ error: null }),
  clearCurrent: () => set({ currentAssignment: null }),
}));

/**
 * API Service Layer
 * All backend calls go through this module.
 * Base URL is configured via NEXT_PUBLIC_API_URL env variable (defaults to localhost:8000).
 */

import type {
  Assignment,
  AssignmentDetail,
  CreateAssignmentPayload,
  ApiResponse,
} from '@/types/assignment.types';

const BASE_URL =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000')
    : (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000');

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    // Try to parse JSON and extract the message field
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message ?? errorText);
    } catch (parseErr) {
      // If not JSON, check if it's already a clean Error (from inner throw above)
      if (parseErr instanceof Error && parseErr.message !== errorText) throw parseErr;
      throw new Error(errorText || `Request failed: ${response.status} ${response.statusText}`);
    }
  }

  return response.json() as Promise<ApiResponse<T>>;
}

// ── Assignments ─────────────────────────────────────────────────────────────

/** Fetch all assignments for the current user */
export async function getAssignments(): Promise<Assignment[]> {
  const res = await request<Assignment[]>('/api/assignments');
  return res.data;
}

/** Fetch a single assignment with its generated question paper */
export async function getAssignmentById(id: string): Promise<AssignmentDetail> {
  const res = await request<AssignmentDetail>(`/api/assignments/${id}`);
  return res.data;
}

/** Create a new assignment and trigger AI generation */
export async function createAssignment(
  payload: CreateAssignmentPayload
): Promise<Assignment> {
  const res = await request<Assignment>('/api/assignments', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data;
}

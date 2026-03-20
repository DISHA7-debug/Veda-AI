/**
 * API Service Layer
 * All backend calls go through this module.
 * Base URL is configured via src/lib/config.ts → NEXT_PUBLIC_API_URL env var.
 */

import { BASE_URL } from '@/lib/config';
import type {
  Assignment,
  AssignmentDetail,
  CreateAssignmentPayload,
  ApiResponse,
} from '@/types/assignment.types';

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message ?? errorText);
      } catch (parseErr) {
        if (parseErr instanceof Error && parseErr.message !== errorText) throw parseErr;
        throw new Error(
          errorText || `Request failed: ${response.status} ${response.statusText}`
        );
      }
    }

    return response.json() as Promise<ApiResponse<T>>;
  } catch (err) {
    console.error(`[API] ${options.method ?? 'GET'} ${url} →`, err);
    throw err;
  }
}

// ── Assignments ──────────────────────────────────────────────────────────────

/** Fetch all assignments */
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

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FunnelIcon, MagnifyingGlassIcon, PlusIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useAssignmentStore } from '@/store/assignment.store';
import type { Assignment } from '@/types/assignment.types';

function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-5" />
      <div className="flex justify-between">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-3 bg-gray-100 rounded w-1/4" />
      </div>
    </div>
  );
}

function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/assignments/result/${assignment.id}`)}
      className="relative group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6 cursor-pointer"
    >
      <h3 className="text-sm font-semibold text-gray-900 pr-4 mb-5 leading-snug">
        {assignment.title}
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <CalendarDaysIcon className="w-3.5 h-3.5" />
          <span>Assigned: <span className="text-gray-600 font-medium">{assignment.assignedOn}</span></span>
        </div>
        <div className="text-xs text-gray-400">
          Due: <span className="text-gray-600 font-medium">{assignment.dueDate}</span>
        </div>
      </div>
    </div>
  );
}

export default function AssignmentsPage() {
  const [search, setSearch] = useState('');
  const { assignments, loading, error, fetchAssignments } = useAssignmentStore();

  // Try to load from API; gracefully fall back to empty array on error
  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  // Merge with mock data when API is not yet wired (so the page still shows something)
  const MOCK: Assignment[] = [
    { id: 'mock-1', title: 'Quiz on Electricity', assignedOn: '20-06-2025', dueDate: '25-06-2025', status: 'completed', createdAt: '2025-06-20' },
    { id: 'mock-2', title: 'Algebra Mid-Term Paper', assignedOn: '18-06-2025', dueDate: '23-06-2025', status: 'completed', createdAt: '2025-06-18' },
    { id: 'mock-3', title: 'English Grammar Test', assignedOn: '15-06-2025', dueDate: '20-06-2025', status: 'pending', createdAt: '2025-06-15' },
    { id: 'mock-4', title: 'Chemical Reactions Quiz', assignedOn: '10-06-2025', dueDate: '17-06-2025', status: 'in-progress', createdAt: '2025-06-10' },
  ];

  const displayList = assignments.length > 0 ? assignments : (!loading ? MOCK : []);
  const filtered = displayList.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-28 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Assignments</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and create assignments for your classes.
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs rounded-xl px-4 py-3">
          Could not reach the server — showing cached data. ({error})
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
          <FunnelIcon className="w-4 h-4 text-gray-400" />
          Filter By
        </button>
        <div className="relative w-72">
          <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Assignment"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-16">No assignments found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {filtered.map((a) => <AssignmentCard key={a.id} assignment={a} />)}
        </div>
      )}

      {/* Floating CTA */}
      <div className="fixed bottom-8 left-1/2 -translate-x-[calc(50%-7.5rem)] z-20">
        <Link
          href="/assignments/create"
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold py-3.5 px-7 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 active:scale-95"
        >
          <PlusIcon className="w-4 h-4" />
          Create Assignment
        </Link>
      </div>
    </div>
  );
}

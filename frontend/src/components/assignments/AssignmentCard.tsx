'use client';

import { useState } from 'react';
import { EllipsisVerticalIcon, EyeIcon, TrashIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

export interface Assignment {
  id: string;
  title: string;
  assignedOn: string;
  dueDate: string;
}

interface AssignmentCardProps {
  assignment: Assignment;
}

export const AssignmentCard = ({ assignment }: AssignmentCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="relative group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6 cursor-pointer"
      onClick={() => menuOpen && setMenuOpen(false)}
    >
      {/* 3-dot menu */}
      <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
          aria-label="More options"
        >
          <EllipsisVerticalIcon className="w-4 h-4" />
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden py-1">
            <button
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <EyeIcon className="w-4 h-4 text-gray-400" />
              View Assignment
            </button>
            <button
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <TrashIcon className="w-4 h-4 text-red-400" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 pr-10 mb-5 leading-snug">
        {assignment.title}
      </h3>

      {/* Dates */}
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
};

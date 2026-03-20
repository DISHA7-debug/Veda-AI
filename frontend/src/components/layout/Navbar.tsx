'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  BellIcon,
  ChevronDownIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

export const Navbar = () => {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-20 shadow-sm">
      {/* Left: Back + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <ClipboardDocumentListIcon className="w-4 h-4" />
          <span className="font-medium text-gray-600">Assignment</span>
        </div>
      </div>

      {/* Right: Notification + Avatar */}
      <div className="flex items-center gap-2">
        {/* Bell */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
          aria-label="Notifications"
        >
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* User */}
        <button className="flex items-center gap-2.5 pl-1 pr-2 py-1.5 rounded-xl hover:bg-gray-100 transition-all duration-200">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="text-white text-xs font-bold">J</span>
          </div>
          <span className="text-sm font-semibold text-gray-700">John Doe</span>
          <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  );
};

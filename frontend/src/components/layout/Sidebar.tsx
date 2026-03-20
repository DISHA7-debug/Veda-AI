'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { label: 'Home',               href: '/dashboard',          icon: HomeIcon },
  { label: 'My Groups',          href: '/my-groups',          icon: UserGroupIcon },
  { label: 'Assignments',        href: '/assignments',        icon: ClipboardDocumentListIcon },
  { label: 'AI Teacher Toolkit', href: '/ai-teacher-toolkit', icon: SparklesIcon },
  { label: 'My Library',         href: '/my-library',         icon: BookOpenIcon },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-white border-r border-gray-100 flex flex-col z-30 shadow-sm">
      {/* ── Logo ── */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-sm">V</span>
        </div>
        <span className="text-gray-900 font-bold text-lg tracking-tight">VedaAI</span>
      </div>

      {/* ── Create Assignment CTA ── */}
      <div className="px-4 mb-5">
        <Link
          href="/assignments/create"
          className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold py-2.5 px-4 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
        >
          <PlusIcon className="w-4 h-4" />
          Create Assignment
        </Link>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-gray-100 text-gray-900 font-semibold'
                  : 'text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  isActive ? 'text-gray-900' : 'text-gray-400'
                }`}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom Section ── */}
      <div className="px-3 pb-5 mt-2 border-t border-gray-100 pt-4 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200"
        >
          <Cog6ToothIcon className="w-4 h-4 text-gray-400" />
          Settings
        </Link>

        {/* School Card */}
        <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl mt-1 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-amber-500 flex-shrink-0 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-900 truncate">Delhi Public School</p>
            <p className="text-xs text-gray-500 truncate">Nehru Inner City</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

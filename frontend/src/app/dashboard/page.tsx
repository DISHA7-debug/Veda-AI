import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

// SVG illustration matching the Figma design
function EmptyIllustration() {
  return (
    <svg
      width="160"
      height="140"
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-6"
    >
      {/* Document shadow */}
      <rect x="30" y="22" width="100" height="110" rx="8" fill="#E5E7EB" />
      {/* Main document */}
      <rect x="24" y="16" width="100" height="110" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
      {/* Document lines */}
      <rect x="40" y="40" width="68" height="5" rx="2.5" fill="#F3F4F6" />
      <rect x="40" y="52" width="52" height="5" rx="2.5" fill="#F3F4F6" />
      <rect x="40" y="64" width="60" height="5" rx="2.5" fill="#F3F4F6" />
      <rect x="40" y="76" width="44" height="5" rx="2.5" fill="#F3F4F6" />

      {/* Red X circle badge */}
      <circle cx="106" cy="92" r="24" fill="#FEF2F2" stroke="#FECACA" strokeWidth="1.5" />
      <circle cx="106" cy="92" r="17" fill="#EF4444" />
      {/* X mark */}
      <path d="M100 86 L112 98M112 86 L100 98" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

      {/* Sparkles */}
      <circle cx="26" cy="18" r="3" fill="#E5E7EB" />
      <circle cx="138" cy="30" r="2" fill="#E5E7EB" />
      <path d="M140 108 L143 108 M141.5 106.5 L141.5 109.5" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 90 L21 90 M19.5 88.5 L19.5 91.5" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-7rem)]">
      {/* Empty State Card */}
      <div className="flex flex-col items-center text-center max-w-sm mx-auto px-4">
        {/* Illustration */}
        <EmptyIllustration />

        {/* Text */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          No assignments yet
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xs">
          Create your first assignment to start collecting and grading student
          submissions. You can set up rubrics, define marking criteria, and let
          AI assist with grading.
        </p>

        {/* CTA */}
        <Link
          href="/assignments/create"
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-200 active:scale-95"
        >
          <PlusIcon className="w-4 h-4" />
          Create Your First Assignment
        </Link>
      </div>
    </div>
  );
}

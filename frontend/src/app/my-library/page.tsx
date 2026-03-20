import { BookOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const MOCK_LIBRARY = [
  { id: '1', title: 'Electricity – Chapter Quiz', subject: 'Science', class: '8th', date: '15 Mar 2026', pages: 2 },
  { id: '2', title: 'Algebra Mid-Term Paper', subject: 'Mathematics', class: '9th', date: '10 Mar 2026', pages: 4 },
  { id: '3', title: 'English Grammar Test', subject: 'English', class: '10th', date: '05 Mar 2026', pages: 3 },
  { id: '4', title: 'Chemical Reactions – Unit Test', subject: 'Science', class: '9th', date: '01 Mar 2026', pages: 3 },
];

export default function MyLibraryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Library</h1>
          <p className="text-sm text-gray-500 mt-1">
            Access your saved assignments and generated materials.
          </p>
        </div>
        {/* Search */}
        <div className="relative w-64">
          <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search library..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200"
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {MOCK_LIBRARY.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 px-6 py-4 flex items-center gap-4 cursor-pointer"
          >
            {/* Icon */}
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpenIcon className="w-5 h-5 text-gray-500" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {item.subject} · Class {item.class} · {item.pages} pages
              </p>
            </div>

            {/* Date + link */}
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-400">{item.date}</p>
              <p className="text-xs text-gray-600 font-medium mt-1 hover:underline">View →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

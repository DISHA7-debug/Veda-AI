import { UserGroupIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const MOCK_GROUPS = [
  { id: '1', name: 'Class 8 – Science', members: 32, updatedAt: '20 Mar 2026' },
  { id: '2', name: 'Class 9 – Mathematics', members: 28, updatedAt: '18 Mar 2026' },
  { id: '3', name: 'Class 10 – English', members: 35, updatedAt: '15 Mar 2026' },
];

export default function MyGroupsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Groups</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your classes and student groups.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
          <PlusCircleIcon className="w-4 h-4" />
          New Group
        </button>
      </div>

      {/* Group Cards */}
      <div className="grid grid-cols-2 gap-6">
        {MOCK_GROUPS.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <UserGroupIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{g.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{g.members} students</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>Last updated {g.updatedAt}</span>
              <span className="text-indigo-600 font-medium hover:underline">View →</span>
            </div>
          </div>
        ))}

        {/* Add Group placeholder */}
        <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-6 flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-100 transition-all duration-200">
          <div className="text-center">
            <PlusCircleIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-500">Create a new group</p>
          </div>
        </div>
      </div>
    </div>
  );
}

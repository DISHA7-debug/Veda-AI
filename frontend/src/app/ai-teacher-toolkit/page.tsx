import {
  SparklesIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

const TOOLS = [
  {
    id: '1',
    name: 'Question Generator',
    description: 'AI-powered question paper generation from any topic or document.',
    icon: DocumentTextIcon,
    color: 'bg-amber-50 text-amber-600',
    badge: 'Active',
  },
  {
    id: '2',
    name: 'Lesson Planner',
    description: 'Build structured lesson plans aligned to your curriculum automatically.',
    icon: AcademicCapIcon,
    color: 'bg-blue-50 text-blue-600',
    badge: 'Coming Soon',
  },
  {
    id: '3',
    name: 'Quiz Builder',
    description: 'Create interactive quizzes from slides, PDFs, or text content.',
    icon: ClipboardDocumentCheckIcon,
    color: 'bg-green-50 text-green-600',
    badge: 'Coming Soon',
  },
  {
    id: '4',
    name: 'Rubric Maker',
    description: 'Automatically generate grading rubrics tailored to each assignment.',
    icon: ListBulletIcon,
    color: 'bg-purple-50 text-purple-600',
    badge: 'Coming Soon',
  },
];

export default function AITeacherToolkitPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <SparklesIcon className="w-5 h-5 text-amber-500" />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Teacher Toolkit</h1>
        </div>
        <p className="text-sm text-gray-500">
          Generate and manage AI-powered teaching resources in seconds.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-2 gap-6">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const isActive = tool.badge === 'Active';
          return (
            <div
              key={tool.id}
              className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transition-all duration-200 ${
                isActive
                  ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
                  : 'opacity-70 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tool.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {tool.badge}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{tool.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{tool.description}</p>
              {isActive && (
                <div className="mt-4">
                  <span className="text-xs font-semibold text-amber-600 hover:underline cursor-pointer">
                    Open Tool →
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

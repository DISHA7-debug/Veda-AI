'use client';

import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const QUESTION_TYPE_OPTIONS = [
  'Multiple Choice Questions',
  'Short Questions',
  'Diagram/Graph-based Questions',
  'Numerical Problems',
  'Long Questions',
  'True / False',
];

export interface QuestionRowData {
  id: string;
  type: string;
  numQuestions: number;
  marks: number;
}

interface QuestionRowProps {
  row: QuestionRowData;
  onChange: (id: string, field: keyof QuestionRowData, value: string | number) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

const Counter = ({
  value,
  onIncrease,
  onDecrease,
}: {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) => (
  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={onDecrease}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-200 active:scale-90"
    >
      <MinusIcon className="w-3.5 h-3.5" />
    </button>
    <span className="w-7 text-center text-sm font-semibold text-gray-800 tabular-nums">{value}</span>
    <button
      type="button"
      onClick={onIncrease}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-200 active:scale-90"
    >
      <PlusIcon className="w-3.5 h-3.5" />
    </button>
  </div>
);

export const QuestionRow = ({ row, onChange, onRemove, canRemove }: QuestionRowProps) => {
  const adjust = (field: 'numQuestions' | 'marks', delta: number) => {
    onChange(row.id, field, Math.max(0, row[field] + delta));
  };

  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-gray-100 last:border-0">
      {/* Type Dropdown */}
      <select
        value={row.type}
        onChange={(e) => onChange(row.id, 'type', e.target.value)}
        className="flex-1 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 cursor-pointer"
      >
        {QUESTION_TYPE_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      {/* Questions Counter */}
      <Counter
        value={row.numQuestions}
        onIncrease={() => adjust('numQuestions', 1)}
        onDecrease={() => adjust('numQuestions', -1)}
      />

      {/* Marks Counter */}
      <Counter
        value={row.marks}
        onIncrease={() => adjust('marks', 1)}
        onDecrease={() => adjust('marks', -1)}
      />

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(row.id)}
        disabled={!canRemove}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
        aria-label="Remove"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

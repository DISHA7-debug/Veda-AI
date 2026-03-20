'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpTrayIcon, PlusCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { QuestionRow, type QuestionRowData } from './QuestionRow';
import { useAssignmentStore } from '@/store/assignment.store';

const DEFAULT_ROWS: QuestionRowData[] = [
  { id: '1', type: 'Multiple Choice Questions', numQuestions: 4, marks: 1 },
  { id: '2', type: 'Short Questions', numQuestions: 3, marks: 2 },
  { id: '3', type: 'Diagram/Graph-based Questions', numQuestions: 5, marks: 5 },
  { id: '4', type: 'Numerical Problems', numQuestions: 5, marks: 5 },
];

let nextId = 5;

export const CreateForm = () => {
  const router = useRouter();
  const { createAssignment, loading, error, clearError } = useAssignmentStore();

  const [rows, setRows] = useState<QuestionRowData[]>(DEFAULT_ROWS);
  const [dueDate, setDueDate] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const totalQuestions = useMemo(() => rows.reduce((s, r) => s + r.numQuestions, 0), [rows]);
  const totalMarks = useMemo(() => rows.reduce((s, r) => s + r.numQuestions * r.marks, 0), [rows]);

  const handleChange = useCallback(
    (id: string, field: keyof QuestionRowData, value: string | number) =>
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))),
    []
  );
  const handleRemove = useCallback(
    (id: string) => setRows((prev) => prev.filter((r) => r.id !== id)),
    []
  );
  const handleAdd = () =>
    setRows((prev) => [
      ...prev,
      { id: String(nextId++), type: 'Multiple Choice Questions', numQuestions: 1, marks: 1 },
    ]);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = async () => {
    // Client-side validation first
    setFormError(null);
    if (!dueDate) {
      setFormError('Please select a due date before continuing.');
      return;
    }
    if (totalQuestions === 0) {
      setFormError('Please add at least one question.');
      return;
    }
    clearError();
    try {
      const assignment = await createAssignment({
        title: fileName ?? `Assignment – ${new Date().toLocaleDateString()}`,
        dueDate,
        questionTypes: rows,
        totalQuestions,
        totalMarks,
        instructions: additionalInfo || undefined,
      });
      router.push(`/assignments/result/${assignment.id}`);
    } catch {
      // Error is already set in the store; UI will display it
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Progress */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full bg-gray-900" />
        <div className="flex-1 h-1 rounded-full bg-gray-200" />
        <div className="flex-1 h-1 rounded-full bg-gray-200" />
      </div>

      {/* Error Banner — client-side or API */}
      {(formError || error) && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{formError ?? error}</span>
        </div>
      )}

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-8 space-y-8">

        {/* Assignment Details */}
        <section className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Assignment Details</h2>
            <p className="text-xs text-gray-500 mt-0.5">Basic information about your assignment</p>
          </div>

          {/* Upload */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleFileDrop}
            className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl py-12 px-6 transition-all duration-200 cursor-pointer ${
              dragging ? 'border-gray-500 bg-gray-50' : 'border-gray-200 bg-gray-50/30 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <ArrowUpTrayIcon className="w-5 h-5 text-gray-500" />
            </div>
            {fileName ? (
              <p className="text-sm font-semibold text-gray-800">{fileName}</p>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-700">Choose a file or drag &amp; drop it here</p>
                <p className="text-xs text-gray-400">JPG, PNG, PDF, DOCX</p>
              </>
            )}
            <label className="mt-1 inline-flex items-center px-5 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 cursor-pointer transition-all duration-200">
              Browse Files
              <input type="file" className="hidden" onChange={handleFileInput} />
            </label>
          </div>
          <p className="text-xs text-gray-400 text-center -mt-1">Upload images of your preferred document or image</p>
        </section>

        {/* Due Date */}
        <section className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200"
          />
        </section>

        {/* Question Types */}
        <section className="space-y-3">
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            <span className="flex-1">Question Type</span>
            <span className="w-[96px] text-center">Questions</span>
            <span className="w-[96px] text-center">Marks</span>
            <span className="w-8" />
          </div>
          <div className="bg-gray-50/60 border border-gray-100 rounded-xl px-4 divide-y divide-gray-100">
            {rows.map((row) => (
              <QuestionRow key={row.id} row={row} onChange={handleChange} onRemove={handleRemove} canRemove={rows.length > 1} />
            ))}
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <PlusCircleIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors" />
            Add Question Type
          </button>
          <div className="flex flex-col items-end gap-1 border-t border-gray-100 pt-3 text-sm text-gray-600">
            <span>Total Questions: <span className="font-bold text-gray-900 ml-1">{totalQuestions}</span></span>
            <span>Total Marks: <span className="font-bold text-gray-900 ml-1">{totalMarks}</span></span>
          </div>
        </section>

        {/* Additional Info */}
        <section className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Additional Information <span className="text-gray-400 font-normal">(for better output)</span>
          </label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            rows={4}
            placeholder="e.g. Generate a question paper for Class 9 students..."
            className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 resize-none placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200"
          />
        </section>
      </div>

      {/* Nav Buttons */}
      <div className="flex justify-between pb-10">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-7 py-2.5 text-sm font-semibold text-white bg-gray-900 rounded-full shadow-sm hover:bg-gray-700 hover:shadow-md transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="inline-block w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Generating…
            </>
          ) : (
            'Next →'
          )}
        </button>
      </div>
    </div>
  );
};

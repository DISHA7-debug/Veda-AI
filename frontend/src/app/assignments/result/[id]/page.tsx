'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { PdfButton } from '@/components/result/PdfButton';

const PDF_ID = 'pdf-content';

const DIFF_STYLES: Record<string, string> = {
  Easy:        'bg-green-100 text-green-700',
  Moderate:    'bg-yellow-100 text-yellow-700',
  Hard:        'bg-red-100 text-red-700',
  Challenging: 'bg-red-100 text-red-800',
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-gray-800 rounded-2xl h-20 w-full" />
      <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-10 space-y-6">
        <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto" />
        <div className="h-3 bg-gray-100 rounded w-1/3 mx-auto" />
        <div className="h-px bg-gray-200" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-100 rounded w-full" />
        ))}
      </div>
    </div>
  );
}

// ── Pending/Processing State ───────────────────────────────────────────────────
function GeneratingState() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-2xl px-6 py-5 flex items-center gap-4 shadow-lg">
        <span className="text-amber-400 text-lg flex-shrink-0 animate-pulse">✦</span>
        <div>
          <p className="text-white text-sm font-semibold">Generating your question paper…</p>
          <p className="text-gray-400 text-xs mt-1">AI is crafting your assignment. This usually takes 10–30 seconds.</p>
        </div>
      </div>
      <div className="bg-white max-w-3xl mx-auto rounded-2xl shadow-md border border-gray-100 p-10 space-y-8 animate-pulse">
        <div className="text-center space-y-3 pb-6 border-b-2 border-gray-100">
          <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto" />
          <div className="h-3 bg-gray-100 rounded w-1/3 mx-auto" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="h-4 bg-gray-200 rounded w-6 flex-shrink-0" />
            <div className="h-4 bg-gray-100 rounded flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface AiResult {
  school?: string;
  subject?: string;
  className?: string;
  timeAllowed?: string;
  maxMarks?: number;
  instructions?: string;
  questions?: Array<{ no: number; difficulty: string; text: string; marks: number }>;
  answers?: Array<{ no: number; question: string; answer: string }>;
}

interface AssignmentData {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result: AiResult | string | null;
  totalMarks?: number;
  totalQuestions?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

async function fetchAssignment(id: string): Promise<AssignmentData> {
  const res = await fetch(`${BASE_URL}/api/assignments/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  const json = await res.json();
  return json.data as AssignmentData;
}

export default function ResultPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id ?? '');

  const [assignment, setAssignment] = useState<AssignmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = async () => {
    try {
      const data = await fetchAssignment(id);
      setAssignment(data);
      setError(null);

      // Stop polling once completed or failed
      if (data.status === 'completed' || data.status === 'failed') {
        if (pollRef.current) clearInterval(pollRef.current);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load assignment');
      if (pollRef.current) clearInterval(pollRef.current);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    load();
    // Poll every 4 seconds while backend processes the job
    pollRef.current = setInterval(() => {
      setAssignment((prev) => {
        if (prev && (prev.status === 'completed' || prev.status === 'failed')) {
          if (pollRef.current) clearInterval(pollRef.current);
          return prev;
        }
        return prev;
      });
      load();
    }, 4000);

    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ── Loading skeletons ──────────────────────────────────────────────────────
  if (loading && !assignment) return <Skeleton />;

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-6 py-5 text-sm">
          <strong>Error: </strong>{error}
        </div>
      </div>
    );
  }

  // ── Still generating ───────────────────────────────────────────────────────
  if (!assignment || assignment.status === 'pending' || assignment.status === 'processing') {
    return <GeneratingState />;
  }

  // ── Failed ─────────────────────────────────────────────────────────────────
  if (assignment.status === 'failed') {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <div className="bg-orange-50 border border-orange-200 text-orange-700 rounded-2xl px-6 py-5 text-sm">
          <strong>Generation failed.</strong> Please go back and try submitting again.
        </div>
      </div>
    );
  }

  // ── Resolve result — could be a JSON object or a raw string ───────────────
  const raw = assignment.result;
  const paper: AiResult = (raw && typeof raw === 'object')
    ? raw as AiResult
    : {
        school: 'Delhi Public School, Sector-4, Bokaro',
        subject: assignment.title,
        className: '8th',
        timeAllowed: '40 minutes',
        maxMarks: assignment.totalMarks ?? 20,
        instructions: 'All questions are compulsory unless stated otherwise.',
        questions: [],
        answers: [],
      };

  return (
    <div className="space-y-6 pb-12">
      {/* ── AI Response Bar ── */}
      <div className="bg-gray-900 rounded-2xl px-6 py-5 flex items-center justify-between gap-4 shadow-lg">
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-lg mt-0.5 flex-shrink-0">✦</span>
          <div>
            <p className="text-white text-sm font-semibold leading-snug">
              {assignment.title}
            </p>
            <p className="text-gray-400 text-xs mt-1 leading-relaxed">
              AI-generated question paper for {paper.subject ?? assignment.title}
              {paper.className ? ` · Class ${paper.className}` : ''}.
            </p>
          </div>
        </div>
        <PdfButton contentId={PDF_ID} filename="assignment.pdf" />
      </div>

      {/* ── Paper ── */}
      <div
        id={PDF_ID}
        className="bg-white max-w-3xl mx-auto rounded-2xl shadow-md border border-gray-100 p-10 font-serif"
      >
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-5 mb-6 space-y-1">
          <h2 className="text-lg font-semibold text-gray-900 tracking-wide">{paper.school ?? 'School Name'}</h2>
          <p className="text-sm text-gray-500">Subject: {paper.subject ?? '—'}</p>
          <p className="text-sm text-gray-500">Class: {paper.className ?? '—'}</p>
        </div>

        {/* Meta */}
        <div className="flex justify-between text-xs text-gray-500 mb-5">
          <span>Time Allowed: <strong className="text-gray-800">{paper.timeAllowed ?? '—'}</strong></span>
          <span>Maximum Marks: <strong className="text-gray-800">{paper.maxMarks ?? '—'}</strong></span>
        </div>

        {/* Instructions */}
        {paper.instructions && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-6">
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong className="text-gray-800">Instructions: </strong>{paper.instructions}
            </p>
          </div>
        )}

        {/* Student Info */}
        <div className="grid grid-cols-3 gap-6 mb-7 text-sm text-gray-700">
          <div>Name: <span className="inline-block border-b border-gray-400 w-28 ml-1" /></div>
          <div>Roll No: <span className="inline-block border-b border-gray-400 w-16 ml-1" /></div>
          <div>Class/Section: <span className="inline-block border-b border-gray-400 w-16 ml-1" /></div>
        </div>

        {/* Section */}
        <h3 className="text-sm font-semibold text-center text-gray-900 mb-2 tracking-widest uppercase border-b border-gray-200 pb-3">
          Section A — Questions
        </h3>
        <p className="text-xs text-gray-400 italic mb-5">Attempt all questions.</p>

        {/* Questions */}
        {paper.questions && paper.questions.length > 0 ? (
          <ol className="space-y-4">
            {paper.questions.map((q) => (
              <li key={q.no} className="flex gap-3 text-sm leading-relaxed text-gray-800">
                <span className="font-semibold text-gray-900 min-w-[22px]">{q.no}.</span>
                <div className="flex-1 flex items-start gap-2">
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0 mt-0.5 ${DIFF_STYLES[q.difficulty] ?? 'bg-gray-100 text-gray-600'}`}>
                    {q.difficulty}
                  </span>
                  <span>{q.text}</span>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-gray-400 italic text-center py-6">No questions generated.</p>
        )}

        <p className="text-center text-xs text-gray-400 italic mt-8 border-t border-dashed border-gray-200 pt-5">
          ✦ End of Question Paper ✦
        </p>

        {/* Answer Key */}
        {paper.answers && paper.answers.length > 0 && (
          <div className="mt-10 border-t-2 border-dashed border-gray-200 pt-7">
            <h2 className="text-base font-semibold text-center text-gray-900 mb-5 tracking-wide">Answer Key</h2>
            <ol className="space-y-4">
              {paper.answers.map((a) => (
                <li key={a.no} className="flex gap-3 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-700 min-w-[22px]">{a.no}.</span>
                  <div className="text-gray-700">
                    <span className="italic text-gray-500">{a.question} — </span>
                    {a.answer}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

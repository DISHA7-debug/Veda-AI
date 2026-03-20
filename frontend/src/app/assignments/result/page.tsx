import { AssignmentPreview } from '@/components/result/AssignmentPreview';
import { PdfButton } from '@/components/result/PdfButton';

const PDF_CONTENT_ID = 'pdf-content';

export default function ResultPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* ── AI Response Bar ── */}
      <div className="bg-gray-900 rounded-2xl px-6 py-5 flex items-center justify-between gap-4 shadow-lg">
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-lg mt-0.5 flex-shrink-0">✦</span>
          <div>
            <p className="text-white text-sm font-semibold leading-snug">
              Here is your generated question paper based on your inputs
            </p>
            <p className="text-gray-400 text-xs mt-1 leading-relaxed">
              Certainly! Here are customized question papers for your CBSE Grade 8 Science classes on the NCERT chapters.
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <PdfButton contentId={PDF_CONTENT_ID} filename="assignment.pdf" />
        </div>
      </div>

      {/* ── Paper Preview ── */}
      <AssignmentPreview contentId={PDF_CONTENT_ID} />
    </div>
  );
}

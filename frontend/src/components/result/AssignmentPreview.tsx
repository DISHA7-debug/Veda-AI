import { AnswerKey } from './AnswerKey';

export interface Question {
  no: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Challenging';
  text: string;
  marks: number;
}

const PAPER_META = {
  school: 'Delhi Public School, Sector-4, Bokaro',
  subject: 'Science',
  className: '8th',
  timeAllowed: '40 minutes',
  maxMarks: 20,
  instructions: 'All questions are compulsory unless stated otherwise. Write neat and legible answers.',
};

const QUESTIONS: Question[] = [
  { no: 1, difficulty: 'Easy', text: 'Define electroplating. Explain its purpose. [2 Marks]', marks: 2 },
  { no: 2, difficulty: 'Moderate', text: 'What is the role of a conductor in the process of electrolysis? [2 Marks]', marks: 2 },
  { no: 3, difficulty: 'Easy', text: 'Why does a solution of copper sulfate conduct electricity? [2 Marks]', marks: 2 },
  { no: 4, difficulty: 'Moderate', text: 'Describe one example of the chemical effect of electric current in daily life. [2 Marks]', marks: 2 },
  { no: 5, difficulty: 'Easy', text: 'Explain why electric current is said to have chemical effects. [2 Marks]', marks: 2 },
  { no: 6, difficulty: 'Hard', text: 'How is sodium hydroxide prepared during the electrolysis of brine? Write the chemical reaction involved. [2 Marks]', marks: 2 },
  { no: 7, difficulty: 'Challenging', text: 'What happens at the cathode and anode during the electrolysis of water? Name the gases evolved. [2 Marks]', marks: 2 },
  { no: 8, difficulty: 'Easy', text: 'Mention the type of current used in electroplating and justify why it is used. [2 Marks]', marks: 2 },
  { no: 9, difficulty: 'Moderate', text: 'What is the importance of electric current in the field of metallurgy? [2 Marks]', marks: 2 },
  { no: 10, difficulty: 'Challenging', text: 'Explain with a chemical equation how copper is deposited during the electroplating of an object. [2 Marks]', marks: 2 },
];

const ANSWERS = [
  { no: 1, question: 'Define electroplating', answer: 'Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current to prevent corrosion, improve appearance, or increase thickness.' },
  { no: 2, question: 'Role of conductor', answer: 'A conductor allows the flow of electric current, causing ions in the electrolyte to move and enabling chemical changes at electrodes.' },
  { no: 3, question: 'Copper sulfate conductivity', answer: 'Copper sulfate solution contains free copper and sulfate ions which carry electric charge, thus conducting electricity.' },
  { no: 4, question: 'Chemical effect example', answer: 'An example is the electroplating of silver on jewelry to prevent tarnishing.' },
  { no: 5, question: 'Electric current chemical effects', answer: 'Electric current causes the movement of ions leading to chemical changes at the electrodes, hence it shows chemical effects.' },
  { no: 6, question: 'Sodium hydroxide preparation', answer: 'Sodium hydroxide is formed at the cathode during brine electrolysis: 2H₂O + 2e⁻ → H₂ + 2OH⁻.' },
  { no: 7, question: 'Cathode and anode gases', answer: 'At the cathode, hydrogen gas is produced; at the anode, oxygen gas is produced during water electrolysis.' },
  { no: 8, question: 'Type of current in electroplating', answer: 'Direct current (DC) is used because it flows in one direction, ensuring uniform deposition of metal.' },
  { no: 9, question: 'Importance in metallurgy', answer: 'Electric current is used for electrorefining of metals like copper to achieve high purity.' },
  { no: 10, question: 'Copper deposition equation', answer: 'Cu²⁺ + 2e⁻ → Cu. Copper ions from the electrolyte are deposited on the cathode object.' },
];

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy:        'bg-green-100 text-green-700',
  Moderate:    'bg-yellow-100 text-yellow-700',
  Hard:        'bg-red-100 text-red-700',
  Challenging: 'bg-red-100 text-red-800',
};

interface AssignmentPreviewProps {
  contentId: string;
}

export const AssignmentPreview = ({ contentId }: AssignmentPreviewProps) => (
  <div
    id={contentId}
    className="bg-white max-w-3xl mx-auto rounded-2xl shadow-md border border-gray-100 p-10 font-serif"
  >
    {/* ── Header ── */}
    <div className="text-center border-b-2 border-gray-800 pb-5 mb-6 space-y-1">
      <h2 className="text-lg font-semibold text-gray-900 tracking-wide">{PAPER_META.school}</h2>
      <p className="text-sm text-gray-500">Subject: {PAPER_META.subject}</p>
      <p className="text-sm text-gray-500">Class: {PAPER_META.className}</p>
    </div>

    {/* ── Time / Marks ── */}
    <div className="flex justify-between text-xs text-gray-500 mb-5">
      <span>Time Allowed: <strong className="text-gray-800">{PAPER_META.timeAllowed}</strong></span>
      <span>Maximum Marks: <strong className="text-gray-800">{PAPER_META.maxMarks}</strong></span>
    </div>

    {/* ── Instructions ── */}
    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-6">
      <p className="text-xs text-gray-600 leading-relaxed">
        <strong className="text-gray-800">Instructions: </strong>{PAPER_META.instructions}
      </p>
    </div>

    {/* ── Student Info ── */}
    <div className="grid grid-cols-3 gap-6 mb-7 text-sm text-gray-700">
      <div>Name: <span className="inline-block border-b border-gray-400 w-28 ml-1" /></div>
      <div>Roll No: <span className="inline-block border-b border-gray-400 w-16 ml-1" /></div>
      <div>Class/Section: <span className="inline-block border-b border-gray-400 w-16 ml-1" /></div>
    </div>

    {/* ── Section A ── */}
    <h3 className="text-sm font-semibold text-center text-gray-900 mb-2 tracking-widest uppercase border-b border-gray-200 pb-3">
      Section A — Short Answer Questions
    </h3>
    <p className="text-xs text-gray-400 italic mb-5">
      Attempt all questions. Each question carries 2 marks.
    </p>

    {/* ── Questions ── */}
    <ol className="space-y-4">
      {QUESTIONS.map((q) => (
        <li key={q.no} className="flex gap-3 text-sm leading-relaxed text-gray-800">
          <span className="font-semibold text-gray-900 min-w-[22px]">{q.no}.</span>
          <div className="flex-1 flex items-start gap-2">
            <span
              className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0 mt-0.5 ${DIFFICULTY_STYLES[q.difficulty]}`}
            >
              {q.difficulty}
            </span>
            <span className="leading-relaxed">{q.text}</span>
          </div>
        </li>
      ))}
    </ol>

    {/* ── End marker ── */}
    <p className="text-center text-xs text-gray-400 italic mt-8 border-t border-dashed border-gray-200 pt-5">
      ✦ End of Question Paper ✦
    </p>

    {/* ── Answer Key ── */}
    <AnswerKey answers={ANSWERS} />
  </div>
);

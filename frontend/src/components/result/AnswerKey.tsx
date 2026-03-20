interface Answer {
  no: number;
  question: string;
  answer: string;
}

interface AnswerKeyProps {
  answers: Answer[];
}

export const AnswerKey = ({ answers }: AnswerKeyProps) => (
  <div className="mt-10 border-t-2 border-dashed border-gray-200 pt-7">
    <h2 className="text-base font-semibold text-center text-gray-900 mb-5 tracking-wide">
      Answer Key
    </h2>
    <ol className="space-y-4">
      {answers.map((a) => (
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
);

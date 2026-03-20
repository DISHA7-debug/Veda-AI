import OpenAI from "openai";

// ─── Groq client (OpenAI-compatible) ─────────────────────────────────────────
const getGroq = () => {
  const apiKey = (process.env.GROQ_API_KEY ?? "").trim();
  if (!apiKey) throw new Error("GROQ_API_KEY is not set in .env");
  return new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });
};

// ─── Prompt builder ───────────────────────────────────────────────────────────
const buildPrompt = (assignment: {
  title: string;
  numQuestions: number;
  totalMarks: number;
  questionTypes: string[];
  instructions?: string;
}) => `
You are an expert teacher. Generate a complete question paper as a single valid JSON object.
Return ONLY the raw JSON — no markdown, no backticks, no extra text.

Assignment details:
- Title: ${assignment.title}
- Total Questions: ${assignment.numQuestions}
- Total Marks: ${assignment.totalMarks}
- Question Types: ${assignment.questionTypes.join(", ")}
- Instructions: ${assignment.instructions ?? "All questions are compulsory."}

Required JSON schema (return exactly this structure):
{
  "school": "Delhi Public School",
  "subject": "${assignment.title}",
  "className": "8th",
  "timeAllowed": "40 minutes",
  "maxMarks": ${assignment.totalMarks},
  "instructions": "${assignment.instructions ?? "All questions are compulsory. Write neat and legible answers."}",
  "questions": [
    { "no": 1, "difficulty": "Easy", "text": "Full question text here [X Marks]", "marks": 2 }
  ],
  "answers": [
    { "no": 1, "question": "Short label", "answer": "Concise answer here" }
  ]
}

Rules:
- Generate exactly ${assignment.numQuestions} questions
- Each question needs: no, difficulty (Easy/Moderate/Hard/Challenging), text (with marks in brackets), marks
- Each answer needs: no, question (short label), answer (clear explanation)
- Difficulty spread: ~40% Easy, 30% Moderate, 20% Hard, 10% Challenging
- Distribute marks proportionally to reach totalMarks = ${assignment.totalMarks}
`;

// ─── Main export ──────────────────────────────────────────────────────────────
export const generateQuestionPaper = async (assignment: any): Promise<any> => {
  const groq = getGroq();
  const prompt = buildPrompt(assignment);

  console.log(`🤖 Calling Groq (llama-3.3-70b) for assignment: ${assignment.title}`);

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are a professional teacher who creates exam question papers. Always respond with valid JSON only — no markdown, no code fences, no extra text.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 4096,
  });

  const raw = completion.choices[0]?.message?.content ?? "";
  console.log("📄 Raw AI response (first 200 chars):", raw.slice(0, 200));

  // Strip markdown fences if the model adds them despite instructions
  const jsonText = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(jsonText);
    console.log(
      `✅ Paper generated: ${parsed.questions?.length ?? 0} questions`
    );
    return parsed;
  } catch {
    console.error("❌ JSON parse failed. Raw output:\n", raw);
    throw new Error("AI returned invalid JSON. Raw: " + raw.slice(0, 300));
  }
};

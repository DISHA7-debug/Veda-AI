import { GoogleGenerativeAI } from "@google/generative-ai";

const getGenAI = () => {
  const apiKey = (process.env.GEMINI_API_KEY ?? "").trim();
  if (!apiKey) {
    throw new Error(
      "Missing GEMINI_API_KEY environment variable. Please set it in your .env or system environment."
    );
  }

  // Log only a key prefix for debugging (never leak full keys in logs).
  console.log("Using Gemini API key prefix:", apiKey.slice(0, 8), "...");

  return new GoogleGenerativeAI(apiKey);
};

export const generateQuestionPaper = async (assignment: any) => {
  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
    Create a question paper:

    Title: ${assignment.title}
    Total Questions: ${assignment.numQuestions}
    Marks: ${assignment.totalMarks}
    Types: ${assignment.questionTypes.join(", ")}
    Instructions: ${assignment.instructions}
    `;

    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = response.text();

    console.log("✅ AI OUTPUT:", text);

    return text;
  } catch (error: any) {
    // Provide a clearer hint if the API key is invalid.
    if (
      error?.status === 400 &&
      Array.isArray(error?.errorDetails) &&
      error.errorDetails.some((d: any) => d?.reason === "API_KEY_INVALID")
    ) {
      console.error(
        "❌ Gemini API key is invalid or doesn't have Generative Language API enabled."
      );
      console.error(
        "   → Make sure GEMINI_API_KEY is set to a valid key and the API is enabled in GCP console."
      );
    }

    console.error("❌ AI ERROR:", error);
    throw error;
  }
};

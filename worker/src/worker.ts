import path from "path";
import { Job, Worker } from "bullmq";
import dotenv from "dotenv";

import connectDB from "./config/mongoose";
import Assignment from "./models/Assignment";
import { generateQuestionPaper } from "./services/ai.service";

// Load env from the worker folder (supports launching from any CWD)
dotenv.config({ path: path.resolve(__dirname, "../.env") });
connectDB();

// ─── Types ────────────────────────────────────────────────────────────────────
interface AssignmentJobData {
  assignmentId: string;
}

// ─── Job Processor ────────────────────────────────────────────────────────────
const processAssignment = async (
  job: Job<AssignmentJobData>
): Promise<void> => {
  const { assignmentId } = job.data;

  console.log(`🚀 Processing assignment: ${assignmentId}`);

  try {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) throw new Error("Assignment not found");

    // Update status → processing
    assignment.status = "processing";
    await assignment.save();

    console.log("🤖 Generating question paper...");

    const result = await generateQuestionPaper(assignment);

    // Save result
    assignment.result = result;
    assignment.status = "completed";

    await assignment.save();

    console.log(`✅ Completed: ${assignmentId}`);
  } catch (error) {
    console.error("❌ Error:", error);

    await Assignment.findByIdAndUpdate(assignmentId, {
      status: "failed",
    });

    throw error;
  }
};

// ─── Worker ───────────────────────────────────────────────────────────────────
const worker = new Worker<AssignmentJobData>(
  "assignmentQueue",
  async (job) => {
    if (job.name === "generate-paper") {
      await processAssignment(job);
    }
  },
  {
    connection: {
      url: process.env.REDIS_URL as string,
    },
    concurrency: 5,
  }
);

// ─── Events ───────────────────────────────────────────────────────────────────
worker.on("completed", (job) => {
  console.log(`🎉 Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`💥 Job ${job?.id} failed: ${err.message}`);
});

worker.on("error", (err) => {
  console.error(`❌ Worker error: ${err.message}`);
});

// ─── Shutdown ─────────────────────────────────────────────────────────────────
const shutdown = async () => {
  console.log("🛑 Shutting down...");
  await worker.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
console.log(
  "GEMINI_API_KEY",
  process.env.GEMINI_API_KEY ? "(set)" : "(missing)"
);

export default worker;
import { Queue } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

export interface AssignmentJobData {
  assignmentId: string;
}

export const assignmentQueue = new Queue<AssignmentJobData>(
  "assignmentQueue",
  {
    connection: {
      url: process.env.REDIS_URL as string, // ✅ FIXED
    },
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  }
);

console.log("📋 Assignment queue initialized");
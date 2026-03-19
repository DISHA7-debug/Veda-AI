import { Document, Model, Schema, model } from "mongoose";

// ─── Types ────────────────────────────────────────────────────────────────────

type AssignmentStatus = "pending" | "processing" | "completed";

// ─── Interface ────────────────────────────────────────────────────────────────

export interface IAssignment extends Document {
  title: string;
  dueDate: Date;
  questionTypes: string[];
  numQuestions: number;
  totalMarks: number;
  instructions?: string;
  status: AssignmentStatus;
  result: any | null;
  createdAt: Date;   // injected by timestamps
  updatedAt: Date;   // injected by timestamps
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    questionTypes: {
      type: [String],
      required: [true, "Question types are required"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "At least one question type must be provided",
      },
    },

    numQuestions: {
      type: Number,
      required: [true, "Number of questions is required"],
      min: [1, "numQuestions must be at least 1"],
    },

    totalMarks: {
      type: Number,
      required: [true, "Total marks is required"],
      min: [1, "totalMarks must be at least 1"],
    },

    instructions: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "processing", "completed"] as AssignmentStatus[],
        message: "Status must be pending, processing, or completed",
      },
      default: "pending",
    },

    result: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true, // auto-manages createdAt & updatedAt
  }
);

// ─── Model ────────────────────────────────────────────────────────────────────

const Assignment: Model<IAssignment> = model<IAssignment>(
  "Assignment",
  AssignmentSchema
);

export default Assignment;
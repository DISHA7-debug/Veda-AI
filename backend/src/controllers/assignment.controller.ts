import { Request, Response } from "express";
import Assignment from "../models/Assignment";
import { assignmentQueue } from "../queue/assignment.queue";

// ─── List All Assignments ─────────────────────────────────────────────────────
export const getAssignments = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const assignments = await Assignment.find()
      .sort({ createdAt: -1 })
      .select("title dueDate status createdAt numQuestions totalMarks")
      .lean();

    const mapped = assignments.map((a) => ({
      id: a._id,
      title: a.title,
      status: a.status,
      assignedOn: new Date(a.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      dueDate: a.dueDate
        ? new Date(a.dueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "—",
      createdAt: a.createdAt,
      totalMarks: a.totalMarks,
      totalQuestions: a.numQuestions,
    }));

    res.status(200).json({ success: true, data: mapped });
  } catch (error) {
    console.error("❌ List Assignments Error:", error);
    res.status(500).json({ success: false, message: "Failed to list assignments" });
  }
};

// ─── Create Assignment ────────────────────────────────────────────────────────
export const createAssignment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      dueDate,
      questionTypes,
      totalQuestions,
      totalMarks,
      instructions,
    } = req.body;

    // Extract type names for the questionTypes string array expected by the model
    const typeNames: string[] = Array.isArray(questionTypes)
      ? questionTypes.map((q: { type?: string; numQuestions?: number } | string) =>
          typeof q === "string" ? q : q.type ?? "Unknown"
        )
      : [];

    // Basic validation
    if (!title || !totalQuestions || !totalMarks) {
      res.status(400).json({
        success: false,
        message: "Title, total questions, and total marks are required",
      });
      return;
    }

    if (!dueDate) {
      res.status(400).json({
        success: false,
        message: "Due date is required",
      });
      return;
    }

    // Create document
    const assignment = await Assignment.create({
      title,
      dueDate,
      questionTypes: typeNames,
      numQuestions: Number(totalQuestions),
      totalMarks: Number(totalMarks),
      instructions,
      status: "pending",
      result: null,
    });

    // Enqueue AI generation job
    await assignmentQueue.add("generate-paper", {
      assignmentId: assignment._id.toString(),
    });

    console.log("📤 Job queued:", assignment._id);

    res.status(201).json({
      success: true,
      message: "Assignment created & queued for AI generation",
      data: {
        id: assignment._id,
        title: assignment.title,
        status: assignment.status,
        createdAt: assignment.createdAt,
        totalQuestions: assignment.numQuestions,
        totalMarks: assignment.totalMarks,
        assignedOn: new Date(assignment.createdAt).toLocaleDateString("en-GB"),
        dueDate: new Date(assignment.dueDate).toLocaleDateString("en-GB"),
      },
    });
  } catch (error) {
    console.error("❌ Create Assignment Error:", error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};

// ─── Get Assignment By ID ─────────────────────────────────────────────────────
export const getAssignmentById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const assignment = await Assignment.findById(req.params.id).lean();

    if (!assignment) {
      res.status(404).json({
        success: false,
        message: `Assignment not found: ${req.params.id}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: assignment._id,
        title: assignment.title,
        status: assignment.status,
        result: assignment.result,
        createdAt: assignment.createdAt,
        totalMarks: assignment.totalMarks,
        totalQuestions: assignment.numQuestions,
        dueDate: assignment.dueDate
          ? new Date(assignment.dueDate).toLocaleDateString("en-GB")
          : "—",
        assignedOn: new Date(assignment.createdAt).toLocaleDateString("en-GB"),
      },
    });
  } catch (error) {
    console.error("❌ Get Assignment Error:", error);
    const isCastError = error instanceof Error && error.name === "CastError";
    res.status(isCastError ? 400 : 500).json({
      success: false,
      message: isCastError
        ? `Invalid ID format: ${req.params.id}`
        : error instanceof Error ? error.message : "Unexpected error",
    });
  }
};
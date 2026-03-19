import { Request, Response } from "express";
import Assignment from "../models/Assignment";
import { assignmentQueue } from "../queue/assignment.queue";

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
      numQuestions,
      totalMarks,
      instructions,
    } = req.body;

    // ✅ Basic validation
    if (!title || !numQuestions || !totalMarks) {
      res.status(400).json({
        success: false,
        message: "Title, number of questions, and total marks are required",
      });
      return;
    }

    // ✅ Create assignment
    const assignment = await Assignment.create({
      title,
      dueDate,
      questionTypes,
      numQuestions,
      totalMarks,
      instructions,
      status: "pending",
      result: "", // initialize empty
    });

    // ✅ Add job to queue
    await assignmentQueue.add("generate-paper", {
      assignmentId: assignment._id.toString(),
    });

    console.log("📤 Job added to queue:", assignment._id);

    res.status(201).json({
      success: true,
      message: "Assignment created & queued for processing",
      data: assignment,
    });
  } catch (error) {
    console.error("❌ Create Assignment Error:", error);

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred",
      });
    }
  }
};

// ─── Get Assignment By ID ─────────────────────────────────────────────────────
export const getAssignmentById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      res.status(404).json({
        success: false,
        message: `Assignment not found with ID: ${id}`,
      });
      return;
    }

    // ✅ Helpful response for frontend
    res.status(200).json({
      success: true,
      data: {
        id: assignment._id,
        title: assignment.title,
        status: assignment.status, // pending / completed / failed
        result: assignment.result,
        createdAt: assignment.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Get Assignment Error:", error);

    if (error instanceof Error && error.name === "CastError") {
      res.status(400).json({
        success: false,
        message: `Invalid assignment ID format: ${req.params.id}`,
      });
    } else if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred",
      });
    }
  }
};
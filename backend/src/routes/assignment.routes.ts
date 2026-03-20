import { Router } from "express";

import {
  createAssignment,
  getAssignments,
  getAssignmentById,
} from "../controllers/assignment.controller";

const router: Router = Router();

router.get("/", getAssignments);         // GET  /api/assignments
router.post("/", createAssignment);      // POST /api/assignments
router.get("/:id", getAssignmentById);   // GET  /api/assignments/:id

export default router;
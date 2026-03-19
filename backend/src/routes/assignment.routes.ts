import { Router } from "express";

import { createAssignment, getAssignmentById } from "../controllers/assignment.controller";

const router: Router = Router();

router.post("/", createAssignment);
router.get("/:id", getAssignmentById);

export default router;
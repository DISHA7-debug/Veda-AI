import cors from "cors";
import express, { Application } from "express";

import assignmentRoutes from "./routes/assignment.routes";

const app: Application = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/api/assignments", assignmentRoutes);

export default app;
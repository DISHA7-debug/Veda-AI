import cors from "cors";
import express, { Application } from "express";

import assignmentRoutes from "./routes/assignment.routes";

const app: Application = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://veda-ai-self.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.options("/*", cors());

app.use(express.json());

// ─── Health ───────────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/api/assignments", assignmentRoutes);

export default app;

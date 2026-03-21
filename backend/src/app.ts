import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";

import assignmentRoutes from "./routes/assignment.routes";

const app: Application = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// ✅ CORS CONFIG (FIXED)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://veda-ai-self.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ HANDLE PREFLIGHT REQUESTS (NO WILDCARD BUG)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "https://veda-ai-self.vercel.app");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// ─── Health ───────────────────────────────────────────────────────────────────

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/api/assignments", assignmentRoutes);

export default app;

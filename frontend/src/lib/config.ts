/**
 * Centralized API configuration — single source of truth for the backend URL.
 *
 * In Next.js, env vars prefixed NEXT_PUBLIC_* are inlined at build time (client + server).
 * Set NEXT_PUBLIC_API_URL in:
 *   - .env.local          → local development
 *   - .env.production     → production build / Vercel / Render
 *   - Render / Vercel env dashboard for deployed environments
 *
 * DEFAULT FALLBACK: points to the live production backend.
 */

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://veda-backend-sdxn.onrender.com';

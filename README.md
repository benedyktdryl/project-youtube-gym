# TrainFlow

React + TypeScript app for planning and tracking YouTube-powered workouts. Built with React Router framework mode, Prisma/Postgres, Tailwind, and shadcn/ui.

## Quick Start
```bash
bun install
bun run dev       # start dev server
bun run lint      # run Biome checks
bun run build     # production build
bun run preview   # preview production build
```

## Project Structure
- `src/` — React app; routing in `src/routes.ts`, root layout in `src/root.tsx`, route modules in `src/routes` and `src/pages`, UI/domain components in `src/components`, shared logic in `src/lib`.
- `prisma/` — Prisma schema, migrations, and seed script.
- `AGENTS.md` — contributor guidelines.
- `docs/` — product docs (PRDs); see `docs/YOUTUBE_INGESTION_PRD.md`.

## Environment Variables
Create `.env.local` with:
```
DATABASE_URL=postgres://...
SESSION_SECRET=replace-me
YOUTUBE_API_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
APPLE_CLIENT_ID=...
APPLE_TEAM_ID=...
APPLE_KEY_ID=...
APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

Optional:
```
OAUTH_MOCK=true
```
`OAUTH_MOCK` enables the local mock OAuth flow used in E2E tests.

## Social Login Setup

### Google (local + prod)
1. Create an OAuth Client ID (Web application) in Google Cloud Console.
2. Add authorized redirect URIs:
   - Local: `http://localhost:5173/auth/callback/google`
   - Prod: `https://your-domain.com/auth/callback/google`
3. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

### Apple (local + prod)
1. Create a Services ID in Apple Developer and enable Sign in with Apple.
2. Add domains and redirect URLs:
   - Local: `http://localhost:5173/auth/callback/apple`
   - Prod: `https://your-domain.com/auth/callback/apple`
3. Create a Sign in with Apple key and download the `.p8` private key.
4. Set `APPLE_CLIENT_ID` (Services ID), `APPLE_TEAM_ID`, `APPLE_KEY_ID`, and `APPLE_PRIVATE_KEY`.

## E2E Tests
```bash
bun run test:e2e
```
The Playwright config runs the dev server with `OAUTH_MOCK=true` so Google/Apple flows can complete locally without external providers.

## Ingestion Worker
The worker uses pg-boss + Postgres to ingest and analyze training videos. Today it supports YouTube, and the pipeline is structured to add more sources later. No OpenAI key is required right now; analysis is rules-based (keyword extraction + simple scoring) in `src/worker/analyze-training.ts`. You can swap this out for an LLM later if needed.

### Architecture
- Queue: pg-boss in Postgres (same `DATABASE_URL` as the app).
- Worker: `src/worker/index.ts` consumes `youtube-ingestion` jobs.
- Fetchers: `src/worker/youtube.ts` pulls video metadata + comments from the YouTube Data API.
- Analyzer: `src/worker/analyze-training.ts` derives tags, intensity, equipment, and quality score.
- Persistence: results are upserted into `workout_videos` with new analysis fields.
- Reporting: each ingestion run writes an `ingestion_events` row with analyzer usage and missing field signals.

### LLM Upgrade Path (Optional)
If you want richer analysis later, keep the current worker flow and replace the analyzer module only:
- The worker already uses an LLM analyzer when `OPENAI_API_KEY` is present, and falls back to rules when it is not.
- Swap the prompt or model in `src/worker/analyze-training-llm.ts` if you want different outputs.
- Keep provider keys (e.g. `OPENAI_API_KEY`) in `.env.local` only.

### Usage
Start the worker:
```bash
bun run worker:dev
```

Enqueue a video by ID or URL:
```bash
bun run worker:enqueue -- https://www.youtube.com/watch?v=VIDEO_ID
```

### Required Environment Variables
```
DATABASE_URL=postgres://...
YOUTUBE_API_KEY=...
```

## Demo Setup
Seed demo data:
```bash
bun run prisma:seed
```

Demo accounts:
- Admin: `demo@trainflow.com` / `Demo123!`
- User: `user@trainflow.com` / `User123!`

## Contributing
- Follow `AGENTS.md` for coding conventions, UI defaults (shadcn/ui + Lucide icons), and PR expectations.
- Treat `src/components/ui` and `hooks/use-toast.ts` as vendored shadcn primitives; prefer extending via wrappers.
- Run `bun run lint` and `bun run build` before opening a PR.

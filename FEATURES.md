# TrainFlow Feature Coverage

## Implemented
- **Marketing site**: Home page hero, feature highlights, and popular workouts rendered from local mock data.
- **Auth UI**: Email/password forms plus Google/Apple social buttons; OAuth mock flow used during local testing; demo credentials surfaced on the login page.
- **Basic SSR shell**: React Router framework build served via `server.mjs`, with session cookies and protected routes for app areas.

## Mocked or Partial
- **OAuth providers**: Real Google/Apple flows require provider keys; test/dev relies on `OAUTH_MOCK` and still needs a database user record created by the backend.
- **Workout data**: Marketing “Popular Workouts” uses `src/lib/mock-data.ts`; core workout list/detail routes expect Prisma data and won’t show content without a seeded database or ingestion pipeline.
- **AI chat assistant**: `src/routes/chat.tsx` echoes canned assistant responses; no real AI planning or retrieval is wired up.
- **Ingestion dashboard**: UI expects records from the worker/Prisma tables; worker jobs must be run separately to populate data.
- **Calendar/progress features**: UI copies mention calendar sync and deeper progress tracking, but there is no calendar integration or rich analytics backend yet.

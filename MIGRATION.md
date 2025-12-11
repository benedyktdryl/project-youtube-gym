# Migration Plan: Supabase → Prisma with React Router 7

## Goals
- Replace Supabase auth/data access with Prisma + Postgres.
- Adopt React Router 7 data APIs (loaders/actions, `<RouterProvider>` update).
- Preserve existing UX/routes; keep Tailwind/shadcn UI intact.

## Assumptions & Decisions
- Postgres is available (local via Docker/Podman or managed). Connection URL will be provided via `.env`.
- Prisma will own schema; Supabase tables (`profiles`, `user_preferences`, `workout_videos`, `scheduled_workouts`, `chat_messages`) are the baseline.
- Auth will move to a simple credentials flow (email/password) with sessions (e.g., JWT or httpOnly cookie). We will stub with a minimal session handler first, then harden.
- React Router 7 will handle data fetching/mutations via loaders/actions; Supabase client will be removed.

## High-Level Phases
1) **Prep & Tooling**
   - Install Prisma + Postgres client packages; add `prisma/schema.prisma`.
   - Add scripts: `prisma generate`, `prisma migrate dev`, `prisma studio`.
   - Add `.env.example` with `DATABASE_URL` and app secrets.
2) **Schema Migration**
   - Model tables in Prisma: `UserProfile`, `UserPreference`, `WorkoutVideo`, `ScheduledWorkout`, `ChatMessage`.
   - Align columns with Supabase structure (snake_case → camelCase in Prisma with map attributes).
   - Seed script to import/demo data from `seed-demo-data.sql` equivalent.
   - Run `prisma migrate dev` to create baseline.
3) **Server/Data Layer**
   - Introduce a lightweight API/server entry (Vite + Express or Router’s future? choose Express for clarity) under `src/server` for loaders/actions.
   - Add session middleware (cookie-based) and auth helpers.
   - Implement repository functions wrapping Prisma client (profiles, preferences, workouts, videos, chat).
4) **React Router 7 Upgrade**
   - Update router creation to `createBrowserRouter` v7 signature and wrap routes with loaders/actions.
   - Replace Supabase data fetches with loader data; mutations go through actions/fetchers.
   - Ensure redirects/guards use loader data (auth) instead of context.
5) **Auth Rewrite**
   - Remove Supabase auth context; replace with Router-aware auth provider backed by session API.
   - Update login/register/logout forms to post to actions; handle errors via `useActionData`/`useFetcher`.
   - Protect routes via loaders (redirect if no session).
6) **Feature Data Migration**
   - **Dashboard/Calendar/Videos/Chat/Profile/Settings** pages: move queries to loaders; map to Prisma repositories.
   - Update hooks (`use-scheduled-workouts`, `use-user-preferences`, `use-workout-videos`) to either wrap fetchers or be removed in favor of loader data.
   - Replace Supabase mutations (add workout, toggle complete, preferences update, chat post) with actions calling Prisma layer.
7) **Cleanup & Removal**
   - Remove `src/lib/supabase.ts`, Supabase env vars, and Supabase-specific types.
   - Delete `supabase/` folder and SQL seeds once Prisma equivalents exist.
   - Update `AGENTS.md`/README to new stack and commands.
8) **Testing & Verification**
   - Add basic route-loader tests (Vitest) for auth guard and a sample mutation.
   - Smoke test all routes (login/register, dashboard data, calendar CRUD, video detail, chat display).
   - Ensure lint/build pass; run `prisma generate` in CI.

## Task Breakdown (Suggested Order)
1. **(DONE)** Add Prisma dependency, init schema, create `DATABASE_URL` in `.env.local`, generate client scaffolding.
2. Translate Supabase schema to Prisma models; run initial migration; add seed script to mirror `seed-demo-data.sql`.  
   - ✅ Prisma models + seed script prepared and applied (`npm run prisma:migrate -- --name init`, `npm run prisma:seed`) against local Postgres.
3. Add server entry (`src/server/index.ts`) with Express + Prisma client + session middleware; expose endpoints for auth, preferences, workouts, videos, chat.  
   - ✅ Server scaffold added (`src/server`), routes for auth/preferences/videos/workouts/chat, temp header-based session shim.
4. Upgrade to React Router 7; adjust router setup and protected routes using loaders/actions.
5. Replace auth context with Router-based session handling; wire login/register/logout actions; update forms.
6. Convert data flows:
   - Videos: loader for list/detail; actions for schedule/add.
   - Calendar/Scheduled workouts: loader + actions for add/toggle/delete.
   - Preferences: loader + action for update.
   - Chat: loader for history; action for new messages.
7. Remove unused Supabase code/hooks; refactor components to consume loader data or fetchers.
8. Update docs (README/AGENTS) and CI scripts; remove Supabase env vars.
9. Final QA: lint, build, prisma format/generate, run seed, manual UI checks.

## Framework-Mode Rewrite (React Router server runtime)
- Adopt React Router framework-mode (Remix-style) so loaders/actions run on the server with Prisma and cookies (no separate Express API, no browser-side Prisma calls).
- Steps:
  1) Scaffold server/client entries (`entry.server.tsx` / `entry.client.tsx`) and shared routes; adjust dev/build to use React Router server runtime.
  2) Add cookie-based session utilities for loaders/actions; remove localStorage/header token shim.
  3) Port feature routes (dashboard, calendar/workouts CRUD, videos list/detail, settings/preferences, chat, profile) to server loaders/actions, replacing Supabase/mocks/hooks with `useLoaderData`/`useFetcher`.
  4) Remove legacy layers (Supabase client, auth-context, Express API); update docs/AGENTS; ensure lint/build pass.

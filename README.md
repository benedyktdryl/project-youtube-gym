# TrainFlow

React + TypeScript app for planning and tracking YouTube-powered workouts. Built with Vite, Tailwind, shadcn/ui, and Supabase for auth, profiles, preferences, and workout scheduling.

## Migration (Supabase → Prisma + React Router Framework Mode)
- Goal: move to React Router framework mode (Remix-style) with server-run loaders/actions calling Prisma/Postgres, remove Supabase and the temporary Express API.
- Plan:
  1) Scaffold React Router server/client entries (`entry.server.tsx` / `entry.client.tsx`) and a shared route tree; switch dev/build to use the React Router server runtime.
  2) Implement cookie-based sessions in loaders/actions; wire Prisma directly in server loaders/actions (no client-side Prisma/API).
  3) Port routes (dashboard, calendar/workouts, videos list/detail, settings/preferences, chat, profile) to loaders/actions; replace Supabase/mocks/hooks with `useLoaderData`/`useFetcher`.
  4) Remove legacy layers (Supabase client, auth-context, Express API), update docs/AGENTS, and ensure lint/build pass.

## Project Structure
- `src/` — React app; routing in `App.tsx`, entry in `main.tsx`, pages in `src/pages`, UI/domain components in `src/components`, shared logic in `src/lib` (Supabase client, auth context, types, helpers).
- `supabase/` — database migrations; `seed-demo-data.sql` seeds example workouts, preferences, and chat history.
- `docs/DEMO_SETUP.md` — detailed demo account steps; `AGENTS.md` — contributor guidelines.

## Quick Start
```bash
npm install
npm run dev       # start dev server
npm run lint      # run ESLint
npm run build     # type-check + production build
npm run preview   # preview production build
```

## Environment
Create `.env.local` with:
```
VITE_SUPABASE_URL=... 
VITE_SUPABASE_ANON_KEY=...
```
These are required at build and runtime.

## Demo Data
- Use the registration form with `demo@trainflow.com` / `Demo123!`.
- Run the SQL in `seed-demo-data.sql` via Supabase SQL Editor to load preferences, scheduled workouts, and chat history.
- Full instructions live in `docs/DEMO_SETUP.md`.

## Contributing
- Follow `AGENTS.md` for coding conventions, UI defaults (shadcn/ui + Lucide icons), and PR expectations.
- Treat `src/components/ui` and `hooks/use-toast.ts` as vendored shadcn primitives; prefer extending via wrappers.
- Run `npm run lint` and `npm run build` before opening a PR.

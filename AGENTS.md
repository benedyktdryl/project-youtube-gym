# Repository Guidelines

## Project Structure & Module Organization
- React + TypeScript via Vite. `src/main.tsx` bootstraps the app, and routing lives in `src/App.tsx` with React Router.
- Feature areas sit under `src/components` (UI primitives in `ui/`, domain widgets in folders like `videos/`, `dashboard/`). Route-level screens are in `src/pages` using the `*-page.tsx` naming.
- Shared logic resides in `src/lib` (`supabase.ts` client, `auth-context.tsx`, `types.ts`, helpers under `lib/hooks/`), with `@/` path alias mapped to `src/`.
- Styling uses Tailwind via `index.css`/`App.css`. Supabase schema/migrations live in `supabase/migrations`; demo data is seeded from `seed-demo-data.sql`.

## Template & Design Defaults
- Based on the `vite-shadcn` starter; UI primitives live in `src/components/ui` (treat as vendored) and `hooks/use-toast.ts`.
- Use Tailwind + shadcn/ui components and Lucide icons; avoid adding new UI libraries unless justified.
- Target production-quality visuals: non-cookie-cutter layouts, thoughtful spacing, and consistent theming that works for both light/dark modes.

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `npm run dev` — start Vite dev server with hot reload.
- `npm run build` — type-check (`tsc -b`) then generate production build.
- `npm run preview` — serve the production build locally.
- `npm run lint` — run ESLint across the repo; fix lint issues before opening a PR.

## Coding Style & Naming Conventions
- Prefer functional React components written in TypeScript; keep props/return types explicit when non-trivial.
- Use PascalCase for component files and components; hooks start with `use` and live in `src/hooks` or `lib/hooks`. Pages follow the existing `name-page.tsx` pattern.
- Maintain 2-space indentation, single quotes, and Tailwind utility classes for layout/styling. Keep business logic in `lib` instead of component bodies when reusable.
- Import modules via `@/` alias for local code; keep relative paths shallow.

## Testing Guidelines
- No automated tests are present yet. When adding tests, use Vitest/React Testing Library, name files `*.test.tsx`, and colocate near the code under test.
- Cover new logic (auth flows, Supabase data interactions, routing guards) and keep fixtures small. Run `npm run lint` as a minimum gate before pushing.

## Commit & Pull Request Guidelines
- Write imperative, scoped commit messages (e.g., `Add video detail guard`, `Fix Supabase profile fetch`). Squash locally if commits are noisy.
- PRs should describe the change, list key commands run, and link related issues/tasks. Include screenshots or GIFs for UI changes and note any Supabase schema updates or seeds touched.

## Security & Configuration Tips
- Required env vars: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (set in a non-committed `.env.local`). Do not commit keys or service roles.
- If migrations change, document the Supabase CLI steps and keep `seed-demo-data.sql` aligned with schema changes to avoid local drift.

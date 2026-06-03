# Repository Guidelines — TrainFlow

**Linear project:** [TrainFlow](https://linear.app/primitive-technology/project/trainflow-852fe9fc3f9f)
**Repo:** `benedyktdryl/project-youtube-gym`
**Stack:** React Router 7 (framework mode), Prisma, Postgres, Tailwind, shadcn/ui, Bun, Docker

---

## Architecture

React Router 7 runs in **framework mode** (Remix-style):
- Loaders/actions run **server-side** with Prisma and cookies — no browser-side DB calls
- `src/routes/` — route modules (loader + action + default export)
- `src/pages/` — pure React page components (receive data via `useLoaderData`)
- `src/components/` — UI primitives (`ui/` = vendored shadcn) and domain widgets
- `src/lib/` — server utilities (`prisma.server.ts`, `session.server.ts`, `mappers.server.ts`)
- `src/worker/` — background ingestion worker (pg-boss + YouTube API)
- `prisma/` — schema, migrations, seed script
- `docs/` — PRDs and feature docs
- `docs/adr/` — Architecture Decision Records (see below)

## Development Commands

```bash
bun install              # install dependencies
bun run dev              # Vite dev server with hot reload
bun run build            # production build
bun run start            # serve production build
bun run lint             # Biome checks (run before every PR)
bun run format           # Biome auto-format

# Prisma
bun run prisma:migrate   # create + apply migration (dev)
bun run prisma:generate  # regenerate Prisma client
bun run prisma:seed      # seed demo data
bun run prisma:studio    # Prisma Studio GUI

# Worker
bun run worker:dev       # start background ingestion worker
bun run worker:enqueue -- https://youtube.com/watch?v=VIDEO_ID  # enqueue single video

# E2E
bun run test:e2e         # Playwright (uses OAUTH_MOCK=true)
bun run test:e2e:ui      # interactive Playwright UI
```

## Environment Variables

```env
DATABASE_URL=postgres://...
SESSION_SECRET=replace-me-with-random-string

# YouTube ingestion
YOUTUBE_API_KEY=...

# OAuth (optional — skip for v1, use OAUTH_MOCK=true in dev)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
APPLE_CLIENT_ID=...
APPLE_TEAM_ID=...
APPLE_KEY_ID=...
APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"

# Dev only
OAUTH_MOCK=true
```

## Coding Style

- Functional TypeScript components; explicit prop/return types for non-trivial cases
- PascalCase for component files; `use` prefix for hooks in `src/hooks/` or `src/lib/hooks/`
- Route modules: `src/routes/name.tsx` (kebab-case)
- Page components: `src/pages/name-page.tsx`
- `@/` alias maps to `src/`
- Tailwind + shadcn/ui; avoid new UI libraries unless justified
- Keep business logic in `src/lib/` not route bodies when reusable
- 2-space indent, single quotes

## Architecture Decision Records

Significant technical decisions go in `docs/adr/NNN-title.md`.

Format:
```
# ADR NNN: Title
Date: YYYY-MM-DD
Status: Proposed | Accepted | Superseded

## Context
## Decision
## Consequences
```

Current ADRs: *(none yet — add as decisions are made)*

## Convention: where things live

| Type | Location |
|---|---|
| Investigations, audits, research results | Linear comment on the relevant issue |
| Architecture/tech decisions | `docs/adr/NNN-*.md` |
| Feature docs, PRDs | `docs/` |
| Deployment runbooks | `docs/DOKKU_DEPLOYMENT.md` (when created) |

## PR Guidelines

- Imperative commit messages: `feat(videos): add server-side filtering`
- Always run `bun run lint` + `bun run build` before PR
- PRs should describe change, key commands run, reference Linear issue (`Refs PRI-NNN`)
- Include screenshots for UI changes
- For migrations: note `bun run prisma:migrate` was run and list changed models

## Security

- Never commit `.env.local`, API keys, or session secrets
- Demo credentials (`demo@trainflow.com`, `user@trainflow.com`) are for local dev only — must not appear in production UI
- Password hashing via `passwordHash` field — verify bcrypt/argon2 is in use
- Session cookies: httpOnly, Secure, SameSite=Lax

## Ingestion Worker

YouTube API quota: ~3 units/video, 10k units/day free tier.
Worker enqueues via pg-boss in the same Postgres as the app.
Analysis in `src/worker/analyze-training.ts` (rule-based; LLM optional via `OPENAI_API_KEY`).

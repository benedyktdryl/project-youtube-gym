# YouTube Training Ingestion Service PRD

## Specification Plan
1. Define scope: ingest YouTube videos + descriptions + top comments, analyze for training metadata, store in Postgres.
2. Choose architecture: separate worker service using pg-boss for queued ingestion tasks, with clear APIs to enqueue and monitor jobs.
3. Data model: design new tables for videos, analysis results, tags, ingestion status, and provenance.
4. Ingestion pipeline: fetch video details, comments, run analysis, score quality, persist results, handle retries.
5. Operational concerns: rate limits, quotas, deduplication, idempotency, scheduling, and backfill.
6. Security/compliance: API keys storage, content moderation, user data privacy.
7. Observability: structured logs, job metrics, error tracking.
8. Rollout: local dev setup, staging/prod configuration, acceptance criteria.

## Product Requirements Document (PRD)

### Overview
Build a background ingestion service that reads YouTube training content (video metadata, description, comments), analyzes it, and stores enriched records in Postgres so the app can recommend and categorize workouts.

### Goals
- Automate ingestion of training videos and create consistent training metadata.
- Provide reliable, scalable processing via a queue (pg-boss).
- Persist rich analysis: training type, intensity, equipment, duration, quality score, safety flags.

### Non-Goals
- Real-time live-stream ingestion.
- Building a full recommendation engine in this phase.
- Replacing manual content curation entirely.

### Users & Use Cases
- Admin/ops triggers ingestion of a YouTube URL or channel feed.
- System processes the video in background and populates the database.
- App surfaces enriched videos by tag (strength, HIIT, mobility, etc.).

### Functional Requirements
1. Enqueue ingestion jobs with a YouTube video ID or URL.
2. Fetch video metadata (title, duration, channel, thumbnails).
3. Fetch description and top N comments (configurable).
4. Analyze text to extract training tags and metadata.
5. Compute a quality score and a safety/clarity flag.
6. Persist results and mark job status.
7. Idempotent processing for duplicate jobs.
8. Retries with exponential backoff on transient failures.

### Data & Metadata Requirements
Suggested metadata fields:
- trainingType (strength, HIIT, cardio, mobility, yoga, pilates, etc.)
- intensity (low, medium, high)
- durationSeconds
- equipmentNeeded (list)
- muscleGroups (list)
- coachTone (motivational, instructional, etc.)
- qualityScore (0-100)
- safetyNotes (text, optional)
- sourceAttribution (YouTube ID, channel ID, published date)

### Architecture
- New worker service (Node/TS) with pg-boss.
- Queue table in Postgres (pg-boss schema).
- Existing app enqueues jobs via a server route or CLI.
- Ingestion pipeline modules:
  1) Fetcher (YouTube API)
  2) Analyzer (NLP rules/LLM placeholder)
  3) Persister (Prisma/Postgres)

### Storage
- Extend existing `WorkoutVideo` or add separate `IngestedVideo` and join to `WorkoutVideo` once approved.
- New tables (suggested):
  - `youtube_videos` (raw metadata)
  - `video_analysis` (derived metadata)
  - `ingestion_jobs` (status, errors)
  - `video_tags` + `tags` (normalized taxonomy)

### APIs
- POST `/admin/ingestion` with { youtubeUrl | youtubeId }
- GET `/admin/ingestion/:id` for status

### Operational Considerations
- Respect YouTube Data API quotas; cache results.
- Rate limit ingestion per channel.
- Store raw payloads for debugging (optional, size-capped).
- Monitor job failures and alert on repeated errors.

### Risks
- Quota exhaustion or API changes.
- Poor analysis accuracy without iterative tuning.
- Comment content variability/noise.

### Success Metrics
- % of ingestions completing successfully.
- Average job latency.
- Tag precision (manual spot checks).

### Milestones
1. Job queue + basic ingestion pipeline.
2. Basic NLP tagger + metadata mapping.
3. Admin UI/CLI for enqueuing.
4. Quality scoring and moderation flags.

### Open Questions
- Should ingestion be automatic for channels or only manual?
- LLM usage vs. deterministic rules for analysis?
- How to review/approve metadata before publish?

-- Add post-workout feedback fields (PRI-169)
ALTER TABLE "scheduled_workouts"
  ADD COLUMN "rating" INTEGER,
  ADD COLUMN "rating_comment" TEXT,
  ADD COLUMN "duration_sec" INTEGER;

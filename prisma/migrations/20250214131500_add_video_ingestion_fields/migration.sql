-- AlterTable
ALTER TABLE "workout_videos"
ADD COLUMN "description" TEXT,
ADD COLUMN "published_at" TIMESTAMP(3),
ADD COLUMN "comment_count" INTEGER,
ADD COLUMN "training_type" TEXT,
ADD COLUMN "training_tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "coach_tone" TEXT,
ADD COLUMN "quality_score" INTEGER,
ADD COLUMN "safety_notes" TEXT,
ADD COLUMN "analyzed_at" TIMESTAMP(3);

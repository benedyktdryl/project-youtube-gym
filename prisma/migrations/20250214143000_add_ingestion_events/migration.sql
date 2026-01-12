-- CreateTable
CREATE TABLE "ingestion_events" (
    "id" UUID NOT NULL,
    "youtube_id" TEXT NOT NULL,
    "analyzer_used" TEXT NOT NULL,
    "quality_score" INTEGER,
    "missing_fields" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingestion_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_ingestion_events_youtube" ON "ingestion_events"("youtube_id");

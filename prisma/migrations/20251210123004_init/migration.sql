-- CreateEnum
CREATE TYPE "ChatRole" AS ENUM ('user', 'assistant');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "goal" TEXT NOT NULL DEFAULT 'general-fitness',
    "preferred_duration" INTEGER NOT NULL DEFAULT 30,
    "preferred_intensity" TEXT NOT NULL DEFAULT 'medium',
    "available_equipment" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "preferred_days" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_videos" (
    "id" UUID NOT NULL,
    "youtube_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "channel_name" TEXT NOT NULL,
    "channel_thumbnail" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "intensity" TEXT NOT NULL,
    "muscle_groups" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "equipment_needed" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "exercises" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduled_workouts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "video_id" UUID NOT NULL,
    "scheduled_date" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scheduled_workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role" "ChatRole" NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_user_id_key" ON "user_preferences"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "workout_videos_youtube_id_key" ON "workout_videos"("youtube_id");

-- CreateIndex
CREATE INDEX "idx_scheduled_workouts_user_date" ON "scheduled_workouts"("user_id", "scheduled_date");

-- CreateIndex
CREATE UNIQUE INDEX "user_video_date_unique" ON "scheduled_workouts"("user_id", "video_id", "scheduled_date");

-- CreateIndex
CREATE INDEX "idx_chat_messages_user_created" ON "chat_messages"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_workouts" ADD CONSTRAINT "scheduled_workouts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_workouts" ADD CONSTRAINT "scheduled_workouts_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "workout_videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

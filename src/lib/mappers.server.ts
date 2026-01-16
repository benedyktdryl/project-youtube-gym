import type { WorkoutVideo as PrismaWorkoutVideo, ScheduledWorkout } from "@prisma/client";
import type { VideoExercise, WorkoutDay, WorkoutVideo } from "./types";

type ScheduleMeta =
  | (ScheduledWorkout & {
      isCompleted: boolean;
    })
  | null
  | undefined;

export function mapWorkoutVideo(video: PrismaWorkoutVideo, scheduled?: ScheduleMeta): WorkoutVideo {
  return {
    id: video.id,
    youtubeId: video.youtubeId,
    title: video.title,
    channelName: video.channelName,
    channelThumbnail: video.channelThumbnail,
    thumbnailUrl: video.thumbnailUrl,
    description: video.description ?? undefined,
    publishedAt: video.publishedAt?.toISOString(),
    commentCount: video.commentCount ?? undefined,
    duration: video.duration,
    intensity: video.intensity as WorkoutVideo["intensity"],
    muscleGroups: video.muscleGroups,
    equipmentNeeded: video.equipmentNeeded,
    trainingType: video.trainingType,
    trainingTags: video.trainingTags ?? [],
    coachTone: video.coachTone,
    qualityScore: video.qualityScore,
    safetyNotes: video.safetyNotes,
    analyzedAt: video.analyzedAt?.toISOString() ?? null,
    exercises: (video.exercises as unknown as VideoExercise[]) ?? [],
    scheduledId: scheduled?.id,
    scheduledDate: scheduled?.scheduledDate?.toISOString(),
    scheduledCompleted: scheduled?.isCompleted,
  };
}

export function toWorkoutDays(
  workouts: Array<ScheduledWorkout & { video: PrismaWorkoutVideo }>,
): WorkoutDay[] {
  const grouped = new Map<string, WorkoutDay>();

  for (const workout of workouts) {
    const dayKey = workout.scheduledDate.toISOString().split("T")[0];
    let day = grouped.get(dayKey);
    if (!day) {
      day = {
        id: dayKey,
        date: workout.scheduledDate,
        videos: [],
        isCompleted: workout.isCompleted,
      };
      grouped.set(dayKey, day);
    }
    day.videos.push(mapWorkoutVideo(workout.video, workout));
    day.isCompleted = day.isCompleted && workout.isCompleted;
  }

  return Array.from(grouped.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
}

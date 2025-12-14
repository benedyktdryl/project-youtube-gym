import type { ScheduledWorkout, WorkoutVideo as PrismaWorkoutVideo } from '@prisma/client';
import type { WorkoutDay, WorkoutVideo, VideoExercise } from './types';

export function mapWorkoutVideo(video: PrismaWorkoutVideo, scheduledId?: string): WorkoutVideo {
  return {
    id: video.id,
    youtubeId: video.youtubeId,
    title: video.title,
    channelName: video.channelName,
    channelThumbnail: video.channelThumbnail,
    thumbnailUrl: video.thumbnailUrl,
    duration: video.duration,
    intensity: video.intensity as WorkoutVideo['intensity'],
    muscleGroups: video.muscleGroups,
    equipmentNeeded: video.equipmentNeeded,
    exercises: (video.exercises as unknown as VideoExercise[]) ?? [],
    scheduledId,
  };
}

export function toWorkoutDays(
  workouts: Array<ScheduledWorkout & { video: PrismaWorkoutVideo }>
): WorkoutDay[] {
  const grouped = new Map<string, WorkoutDay>();

  workouts.forEach((workout) => {
    const dayKey = workout.scheduledDate.toISOString().split('T')[0];
    if (!grouped.has(dayKey)) {
      grouped.set(dayKey, {
        id: dayKey,
        date: workout.scheduledDate,
        videos: [],
        isCompleted: workout.isCompleted,
      });
    }

    const day = grouped.get(dayKey)!;
    day.videos.push(mapWorkoutVideo(workout.video, workout.id));
    day.isCompleted = day.isCompleted && workout.isCompleted;
  });

  return Array.from(grouped.values()).sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
}

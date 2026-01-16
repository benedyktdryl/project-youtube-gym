import { mapWorkoutVideo } from "@/lib/mappers.server";
import { prisma } from "@/lib/prisma.server";
import { requireUser } from "@/lib/session.server";
import type { WorkoutVideo } from "@/lib/types";
import { VideosPage } from "@/pages/videos-page";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);

  const [videos, scheduled] = await Promise.all([
    prisma.workoutVideo.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.scheduledWorkout.findMany({
      where: { userId: user.id },
      select: { id: true, videoId: true, scheduledDate: true, isCompleted: true },
      orderBy: { scheduledDate: "asc" },
    }),
  ]);

  const scheduledByVideo = new Map<string, (typeof scheduled)[number]>();
  for (const sched of scheduled) {
    const existing = scheduledByVideo.get(sched.videoId);
    if (!existing || sched.scheduledDate < existing.scheduledDate) {
      scheduledByVideo.set(sched.videoId, sched);
    }
  }

  const mapped = videos.map((video) => mapWorkoutVideo(video, scheduledByVideo.get(video.id)));

  return { videos: mapped as WorkoutVideo[] };
}

export default VideosPage;

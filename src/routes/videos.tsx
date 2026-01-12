import { mapWorkoutVideo } from "@/lib/mappers.server";
import { prisma } from "@/lib/prisma.server";
import { requireUser } from "@/lib/session.server";
import type { WorkoutVideo } from "@/lib/types";
import { VideosPage } from "@/pages/videos-page";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUser(request);

  const videos = await prisma.workoutVideo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return { videos: videos.map((video) => mapWorkoutVideo(video)) as WorkoutVideo[] };
}

export default VideosPage;

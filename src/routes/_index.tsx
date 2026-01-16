import { MOCK_VIDEOS } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma.server";
import { getUserId } from "@/lib/session.server";
import { HomePage } from "@/pages/home-page";
import type { LoaderFunctionArgs } from "react-router";
import { redirect, useLoaderData } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/dashboard");
  }

  try {
    const popularVideos = await prisma.workoutVideo.findMany({
      orderBy: [{ qualityScore: "desc" }, { createdAt: "desc" }],
      take: 6,
      select: {
        id: true,
        youtubeId: true,
        title: true,
        channelName: true,
        channelThumbnail: true,
        thumbnailUrl: true,
        duration: true,
        intensity: true,
      },
    });

    if (popularVideos.length) {
      return { popularVideos };
    }
  } catch (error) {
    console.warn("Falling back to mock videos for home page", error);
  }

  const fallbackVideos = MOCK_VIDEOS.slice(0, 6).map((video) => ({
    id: video.id,
    youtubeId: video.youtubeId,
    title: video.title,
    channelName: video.channelName,
    channelThumbnail: video.channelThumbnail,
    thumbnailUrl: video.thumbnailUrl,
    duration: video.duration,
    intensity: video.intensity,
  }));

  return { popularVideos: fallbackVideos };
}

export default function IndexRoute() {
  const { popularVideos } = useLoaderData<typeof loader>();
  return <HomePage popularVideos={popularVideos} />;
}

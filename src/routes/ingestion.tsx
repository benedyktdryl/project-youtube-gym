import { prisma } from "@/lib/prisma.server";
import { requireAdminUser } from "@/lib/session.server";
import { IngestionPage } from "@/pages/ingestion-page";
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminUser(request);

  const [events, videos] = await Promise.all([
    prisma.ingestionEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 25,
    }),
    prisma.workoutVideo.findMany({
      where: { analyzedAt: { not: null } },
      orderBy: { analyzedAt: "desc" },
      take: 20,
      select: {
        id: true,
        youtubeId: true,
        title: true,
        thumbnailUrl: true,
        channelName: true,
        duration: true,
        intensity: true,
        trainingType: true,
        trainingTags: true,
        qualityScore: true,
        analyzedAt: true,
      },
    }),
  ]);

  return {
    events: events.map((event) => ({
      ...event,
      createdAt: event.createdAt.toISOString(),
    })),
    videos: videos.map((video) => ({
      ...video,
      analyzedAt: video.analyzedAt?.toISOString() ?? null,
    })),
  };
}

export default function IngestionRoute() {
  const data = useLoaderData<typeof loader>();
  return <IngestionPage events={data.events} videos={data.videos} />;
}

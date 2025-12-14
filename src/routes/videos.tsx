import type { LoaderFunctionArgs } from 'react-router';
import { requireUser } from '@/lib/session.server';
import { prisma } from '@/lib/prisma.server';
import { mapWorkoutVideo } from '@/lib/mappers.server';
import type { WorkoutVideo } from '@/lib/types';
import { VideosPage } from '@/pages/videos-page';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUser(request);

  const videos = await prisma.workoutVideo.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return { videos: videos.map(mapWorkoutVideo) as WorkoutVideo[] };
}

export default VideosPage;

import type { LoaderFunctionArgs } from 'react-router';
import { redirect } from 'react-router';
import { prisma } from '@/lib/prisma.server';
import { mapWorkoutVideo } from '@/lib/mappers.server';
import { requireUser } from '@/lib/session.server';
import { VideoDetailPage } from '@/pages/video-detail-page';

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireUser(request);

  if (!params.id) {
    throw redirect('/videos');
  }

  const video = await prisma.workoutVideo.findUnique({
    where: { id: params.id },
  });

  if (!video) {
    throw new Response('Not Found', { status: 404 });
  }

  return { video: mapWorkoutVideo(video) };
}

export default VideoDetailPage;

import { mapWorkoutVideo } from "@/lib/mappers.server";
import { prisma } from "@/lib/prisma.server";
import { requireUser } from "@/lib/session.server";
import { VideoDetailPage } from "@/pages/video-detail-page";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await requireUser(request);

  if (!params.id) {
    throw redirect("/videos");
  }

  const video = await prisma.workoutVideo.findUnique({
    where: { id: params.id },
  });

  if (!video) {
    throw new Response("Not Found", { status: 404 });
  }

  const url = new URL(request.url);
  const scheduledIdParam = url.searchParams.get("scheduledId");
  const scheduled = await prisma.scheduledWorkout.findFirst({
    where: {
      userId: user.id,
      videoId: video.id,
      ...(scheduledIdParam ? { id: scheduledIdParam } : {}),
    },
    orderBy: { scheduledDate: "asc" },
  });

  return { video: mapWorkoutVideo(video, scheduled ?? undefined) };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const user = await requireUser(request);
  if (!params.id) {
    return Response.json({ error: "Video id required" }, { status: 400 });
  }

  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "complete-scheduled") {
    const scheduledId = String(formData.get("scheduledId") ?? "");
    if (!scheduledId) {
      return Response.json({ error: "scheduledId required" }, { status: 400 });
    }

    const scheduled = await prisma.scheduledWorkout.findFirst({
      where: { id: scheduledId, userId: user.id, videoId: params.id },
    });

    if (!scheduled) {
      return Response.json({ error: "Scheduled workout not found" }, { status: 404 });
    }

    await prisma.scheduledWorkout.update({
      where: { id: scheduled.id },
      data: { isCompleted: true, completedAt: new Date() },
    });

    return Response.json({ ok: true, completedAt: new Date().toISOString() });
  }

  return Response.json({ error: "Unsupported intent" }, { status: 400 });
}

export default VideoDetailPage;

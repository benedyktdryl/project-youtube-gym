import { toWorkoutDays } from "@/lib/mappers.server";
import { prisma } from "@/lib/prisma.server";
import { requireUserId } from "@/lib/session.server";
import type { SerializedWorkoutDay } from "@/lib/types";
import { DashboardPage } from "@/pages/dashboard-page";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);

  const upcoming = await prisma.scheduledWorkout.findMany({
    where: {
      userId,
      scheduledDate: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
    include: { video: true },
    orderBy: { scheduledDate: "asc" },
    take: 10,
  });

  const workoutDays: SerializedWorkoutDay[] = toWorkoutDays(upcoming).map((day) => ({
    ...day,
    date: day.date.toISOString(),
  }));

  return { workoutDays };
}

export default DashboardPage;

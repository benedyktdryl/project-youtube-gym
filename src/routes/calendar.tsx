import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { requireUserId } from '@/lib/session.server';
import { prisma } from '@/lib/prisma.server';
import { toWorkoutDays } from '@/lib/mappers.server';
import type { SerializedWorkoutDay } from '@/lib/types';
import { CalendarPage } from '@/pages/calendar-page';

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);

  const workouts = await prisma.scheduledWorkout.findMany({
    where: { userId },
    include: { video: true },
    orderBy: { scheduledDate: 'asc' },
  });

  const workoutDays: SerializedWorkoutDay[] = toWorkoutDays(workouts).map((day) => ({
    ...day,
    date: day.date.toISOString(),
  }));

  return { workoutDays };
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'toggle-complete') {
    const workoutId = String(formData.get('workoutId') ?? '');
    if (!workoutId) {
      return Response.json({ error: 'Workout id is required' }, { status: 400 });
    }

    const existing = await prisma.scheduledWorkout.findFirst({
      where: { id: workoutId, userId },
    });

    if (!existing) {
      return Response.json({ error: 'Workout not found' }, { status: 404 });
    }

    const updated = await prisma.scheduledWorkout.update({
      where: { id: workoutId },
      data: {
        isCompleted: !existing.isCompleted,
        completedAt: existing.isCompleted ? null : new Date(),
      },
    });

    return Response.json({ workoutId: updated.id, isCompleted: updated.isCompleted });
  }

  return Response.json({ error: 'Unsupported action' }, { status: 400 });
}

export default CalendarPage;

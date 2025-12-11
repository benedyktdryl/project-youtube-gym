import { Router } from 'express';
import { prisma } from '../db';
import type { RequestWithUser } from '../types';

export const workoutsRouter = Router();

workoutsRouter.get('/', async (req: RequestWithUser, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  const workouts = await prisma.scheduledWorkout.findMany({
    where: { userId: req.user.id },
    orderBy: { scheduledDate: 'asc' },
    include: { video: true },
  });

  return res.json({ workouts });
});

workoutsRouter.post('/', async (req: RequestWithUser, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  const { videoId, scheduledDate } = req.body as {
    videoId?: string;
    scheduledDate?: string;
  };

  if (!videoId || !scheduledDate) {
    return res.status(400).json({ error: 'videoId and scheduledDate are required' });
  }

  const workout = await prisma.scheduledWorkout.create({
    data: {
      userId: req.user.id,
      videoId,
      scheduledDate: new Date(scheduledDate),
    },
  });

  return res.status(201).json({ workout });
});

workoutsRouter.patch('/:id', async (req: RequestWithUser, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  const { isCompleted } = req.body as { isCompleted?: boolean };

  const updated = await prisma.scheduledWorkout.update({
    where: { id: req.params.id },
    data: {
      isCompleted: isCompleted ?? false,
      completedAt: isCompleted ? new Date() : null,
    },
  });

  return res.json({ workout: updated });
});

workoutsRouter.delete('/:id', async (req: RequestWithUser, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  await prisma.scheduledWorkout.delete({
    where: { id: req.params.id },
  });

  return res.json({ ok: true });
});

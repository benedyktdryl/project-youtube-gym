import { Router } from 'express';
import { prisma } from '../db';

export const videosRouter = Router();

videosRouter.get('/', async (_req, res) => {
  const videos = await prisma.workoutVideo.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return res.json({ videos });
});

videosRouter.get('/:id', async (req, res) => {
  const video = await prisma.workoutVideo.findUnique({
    where: { id: req.params.id },
  });

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  return res.json({ video });
});

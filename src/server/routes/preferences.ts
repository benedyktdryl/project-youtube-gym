import { Router } from 'express';
import { prisma } from '../db';
import type { RequestWithUser } from '../types';

export const preferencesRouter = Router();

preferencesRouter.get('/', async (req: RequestWithUser, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  const prefs = await prisma.userPreference.findUnique({
    where: { userId: req.user.id },
  });

  return res.json({ preferences: prefs });
});

preferencesRouter.put('/', async (req: RequestWithUser, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  const {
    goal,
    preferredDuration,
    preferredIntensity,
    availableEquipment,
    preferredDays,
  } = req.body as {
    goal?: string;
    preferredDuration?: number;
    preferredIntensity?: string;
    availableEquipment?: string[];
    preferredDays?: string[];
  };

  const updated = await prisma.userPreference.update({
    where: { userId: req.user.id },
    data: {
      goal,
      preferredDuration,
      preferredIntensity,
      availableEquipment,
      preferredDays,
    },
  });

  return res.json({ preferences: updated });
});

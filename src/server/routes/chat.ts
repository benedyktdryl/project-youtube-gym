import { Router } from 'express';
import { prisma } from '../db';
import type { RequestWithUser } from '../types';

export const chatRouter = Router();

chatRouter.get('/', async (req: RequestWithUser, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  const messages = await prisma.chatMessage.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return res.json({ messages });
});

chatRouter.post('/', async (req: RequestWithUser, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  const { content } = req.body as { content?: string };
  if (!content) return res.status(400).json({ error: 'content is required' });

  const message = await prisma.chatMessage.create({
    data: {
      userId: req.user.id,
      role: 'user',
      content,
    },
  });

  // TODO: add assistant response generation; for now, echo stub
  return res.status(201).json({ message });
});

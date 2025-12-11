import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { prisma } from '../db';
import type { RequestWithUser } from '../types';

export const authRouter = Router();

authRouter.get('/session', async (req: RequestWithUser, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  return res.json({ user: req.user });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // TODO: replace with real session issuance
  return res.json({ user, token: user.id });
});

authRouter.post('/register', async (req, res) => {
  const { email, password, name } = req.body as {
    email?: string;
    password?: string;
    name?: string;
  };

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
    },
  });

  await prisma.userPreference.create({
    data: {
      userId: user.id,
      goal: 'general-fitness',
      preferredDuration: 30,
      preferredIntensity: 'medium',
      availableEquipment: [],
      preferredDays: [],
    },
  });

  // TODO: replace with real session issuance
  return res.status(201).json({ user, token: user.id });
});

authRouter.post('/logout', (_req, res) => {
  // Session clearing will be implemented with real auth
  return res.json({ ok: true });
});

import type { Response, NextFunction } from 'express';
import { prisma } from '../db';
import type { RequestWithUser } from '../types';

// Attaches a user to the request based on `x-user-id` or defaults to the demo user.
// This is a temporary session shim until full auth/session handling is wired.
export async function attachUser(
  req: RequestWithUser,
  _res: Response,
  next: NextFunction
) {
  const userId = req.header('x-user-id');
  const demoEmail = 'demo@trainflow.com';

  try {
    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        req.user = user;
        return next();
      }
    }

    const demoUser = await prisma.user.findUnique({ where: { email: demoEmail } });
    if (demoUser) {
      req.user = demoUser;
    }
  } catch (error) {
    console.error('attachUser error', error);
  }

  return next();
}

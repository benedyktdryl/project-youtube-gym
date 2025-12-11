import { PrismaClient } from '@prisma/client';

// Singleton Prisma client for the server layer.
export const prisma = new PrismaClient();

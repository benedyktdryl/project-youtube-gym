import { createCookieSessionStorage, redirect } from 'react-router';
import { prisma } from './prisma.server';

const sessionSecret = process.env.SESSION_SECRET || 'dev-secret';

if (!sessionSecret) {
  throw new Error('SESSION_SECRET is required for session handling.');
}

const sessionMaxAge = 60 * 60 * 24 * 7; // 7 days
const storage = createCookieSessionStorage({
  cookie: {
    name: '__trainflow_session',
    httpOnly: true,
    maxAge: sessionMaxAge,
    path: '/',
    sameSite: 'lax',
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production',
  },
});

const USER_SESSION_KEY = 'userId';

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
};

export async function getSession(request: Request) {
  const cookie = request.headers.get('cookie');
  return storage.getSession(cookie);
}

export async function getUserId(request: Request) {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return typeof userId === 'string' ? userId : null;
}

export async function getUser(request: Request): Promise<SessionUser | null> {
  const userId = await getUserId(request);
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, avatarUrl: true },
  });

  if (!user) {
    const session = await getSession(request);
    session.unset(USER_SESSION_KEY);
    throw redirect('/login', {
      headers: { 'Set-Cookie': await storage.commitSession(session) },
    });
  }

  return user;
}

export async function requireUserId(request: Request, redirectTo = '/login') {
  const userId = await getUserId(request);
  if (!userId) {
    throw redirect(redirectTo);
  }
  return userId;
}

export async function requireUser(request: Request) {
  const user = await getUser(request);
  if (!user) {
    throw redirect('/login');
  }
  return user;
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export async function destroyUserSession(request: Request) {
  const session = await getSession(request);
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

export async function commitSession(session: Awaited<ReturnType<typeof getSession>>) {
  return storage.commitSession(session);
}

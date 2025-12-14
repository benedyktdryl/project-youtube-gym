import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { prisma } from '@/lib/prisma.server';
import { requireUserId } from '@/lib/session.server';
import { ProfilePage } from '@/pages/profile-page';

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
    },
  });

  if (!user) {
    throw new Response('User not found', { status: 404 });
  }

  return { user };
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();

  if (!name || !email) {
    return Response.json({ error: 'Name and email are required' }, { status: 400 });
  }

  const existing = await prisma.user.findFirst({
    where: { email, NOT: { id: userId } },
  });

  if (existing) {
    return Response.json({ error: 'Email already in use' }, { status: 409 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { name, email },
  });

  return Response.json({ ok: true });
}

export default ProfilePage;

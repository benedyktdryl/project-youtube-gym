import bcrypt from 'bcryptjs';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { redirect, useActionData, useNavigation } from 'react-router';
import { RegisterForm } from '@/components/auth/register-form';
import { prisma } from '@/lib/prisma.server';
import { createUserSession, getUserId } from '@/lib/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  if (userId) {
    return redirect('/dashboard');
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  const confirmPassword = String(formData.get('confirmPassword') ?? '');

  if (!name || !email || !password || !confirmPassword) {
    return Response.json({ error: 'All fields are required' }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return Response.json({ error: 'Passwords do not match' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return Response.json({ error: 'Email already registered' }, { status: 409 });
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

  return createUserSession(user.id, '/dashboard');
}

export default function RegisterRoute() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <RegisterForm error={actionData?.error} isSubmitting={navigation.state === 'submitting'} />
    </div>
  );
}

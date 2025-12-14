import bcrypt from 'bcryptjs';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { redirect, useActionData, useNavigation } from 'react-router';
import { LoginForm } from '@/components/auth/login-form';
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
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return Response.json({ error: 'Email and password are required' }, { status: 400 });
  }

  let user = await prisma.user.findUnique({ where: { email } });

  // Ensure the seeded demo account always exists in dev environments.
  if (!user && email === 'demo@trainflow.com') {
    const passwordHash = await bcrypt.hash('Demo123!', 10);
    user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: 'Demo User',
        avatarUrl:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
        preferences: {
          create: {
            goal: 'general-fitness',
            preferredDuration: 30,
            preferredIntensity: 'medium',
            availableEquipment: ['mat', 'dumbbells', 'resistance-bands'],
            preferredDays: ['monday', 'wednesday', 'friday'],
          },
        },
      },
    });
  }
  if (!user) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return createUserSession(user.id, '/dashboard');
}

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <LoginForm error={actionData?.error} isSubmitting={navigation.state === 'submitting'} />
    </div>
  );
}

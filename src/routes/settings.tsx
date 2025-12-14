import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { prisma } from '@/lib/prisma.server';
import { requireUserId } from '@/lib/session.server';
import { SettingsPage } from '@/pages/settings-page';
import type { UserPreferences } from '@/lib/types';

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);

  const preferences = await prisma.userPreference.findUnique({
    where: { userId },
  });

  if (!preferences) {
    const created = await prisma.userPreference.create({
      data: {
        userId,
        goal: 'general-fitness',
        preferredDuration: 30,
        preferredIntensity: 'medium',
        availableEquipment: [],
        preferredDays: [],
      },
    });
    const mapped: UserPreferences = {
      userId,
      goal: created.goal,
      preferredDuration: created.preferredDuration,
      preferredIntensity: created.preferredIntensity as UserPreferences['preferredIntensity'],
      availableEquipment: created.availableEquipment,
      preferredDays: created.preferredDays,
    };
    return { preferences: mapped };
  }

  const mapped: UserPreferences = {
    userId,
    goal: preferences.goal,
    preferredDuration: preferences.preferredDuration,
    preferredIntensity: preferences.preferredIntensity as UserPreferences['preferredIntensity'],
    availableEquipment: preferences.availableEquipment,
    preferredDays: preferences.preferredDays,
  };

  return { preferences: mapped };
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const goal = String(formData.get('goal') ?? 'general-fitness');
  const preferredDuration = Number(formData.get('preferredDuration') ?? 30);
  const preferredIntensity = String(formData.get('preferredIntensity') ?? 'medium');
  const availableEquipment = formData.getAll('availableEquipment').map(String);
  const preferredDays = formData.getAll('preferredDays').map(String);

  await prisma.userPreference.upsert({
    where: { userId },
    update: {
      goal,
      preferredDuration,
      preferredIntensity,
      availableEquipment,
      preferredDays,
    },
    create: {
      userId,
      goal,
      preferredDuration,
      preferredIntensity,
      availableEquipment,
      preferredDays,
    },
  });

  return Response.json({ ok: true });
}

export default SettingsPage;

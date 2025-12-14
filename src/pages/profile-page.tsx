import { useLoaderData } from 'react-router';
import { UserProfile } from '@/components/profile/user-profile';
import type { SessionUser } from '@/lib/session.server';

export function ProfilePage() {
  const { user } = useLoaderData<{ user: SessionUser }>();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      
      <p className="text-muted-foreground">
        Manage your personal information and account settings.
      </p>
      
      <UserProfile user={user} />
    </div>
  );
}

import { UserProfile } from '@/components/profile/user-profile';

export function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      
      <p className="text-muted-foreground">
        Manage your personal information and account settings.
      </p>
      
      <UserProfile />
    </div>
  );
}
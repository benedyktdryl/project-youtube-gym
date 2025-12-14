import { useLoaderData } from 'react-router';
import { PreferencesForm } from '@/components/settings/preferences-form';
import type { UserPreferences } from '@/lib/types';

export function SettingsPage() {
  const { preferences } = useLoaderData<{ preferences: UserPreferences | null }>();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <p className="text-muted-foreground">
        Customize your workout preferences and account settings.
      </p>
      
      <PreferencesForm preferences={preferences} />
    </div>
  );
}

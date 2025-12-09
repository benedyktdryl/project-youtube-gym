import { PreferencesForm } from '@/components/settings/preferences-form';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <p className="text-muted-foreground">
        Customize your workout preferences and account settings.
      </p>
      
      <PreferencesForm />
    </div>
  );
}
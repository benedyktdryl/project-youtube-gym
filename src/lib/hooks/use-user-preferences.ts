import { useCallback, useEffect, useState } from 'react';
import { supabase, type Database } from '../supabase';
import { UserPreferences } from '../types';
import { useAuth } from '../auth-context';
import { toast } from 'sonner';

export function useUserPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPreferences = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      const preference = data as Database['public']['Tables']['user_preferences']['Row'] | null;

      if (preference) {
        const mappedPreferences: UserPreferences = {
          userId: preference.user_id,
          goal: preference.goal,
          preferredDuration: preference.preferred_duration,
          preferredIntensity: preference.preferred_intensity as 'low' | 'medium' | 'high',
          availableEquipment: preference.available_equipment,
          preferredDays: preference.preferred_days,
        };

        setPreferences(mappedPreferences);
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching preferences:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to fetch preferences'
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchPreferences();
    } else {
      setLoading(false);
    }
  }, [user, fetchPreferences]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_preferences')
        .update(
          {
            goal: updates.goal,
            preferred_duration: updates.preferredDuration,
            preferred_intensity: updates.preferredIntensity,
            available_equipment: updates.availableEquipment,
            preferred_days: updates.preferredDays,
          } satisfies Partial<Database['public']['Tables']['user_preferences']['Update']>
        )
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchPreferences();
      toast.success('Preferences updated successfully');
    } catch (error) {
      console.error('Error updating preferences:', error);
      const message =
        error instanceof Error ? error.message : 'Failed to update preferences';
      toast.error(message);
    }
  };

  return { preferences, loading, error, refetch: fetchPreferences, updatePreferences };
}

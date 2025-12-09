import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { UserPreferences } from '../types';
import { useAuth } from '../auth-context';
import { toast } from 'sonner';

export function useUserPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchPreferences();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchPreferences = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const mappedPreferences: UserPreferences = {
          userId: data.user_id,
          goal: data.goal,
          preferredDuration: data.preferred_duration,
          preferredIntensity: data.preferred_intensity as 'low' | 'medium' | 'high',
          availableEquipment: data.available_equipment,
          preferredDays: data.preferred_days,
        };

        setPreferences(mappedPreferences);
      }
      setError(null);
    } catch (err: any) {
      console.error('Error fetching preferences:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_preferences')
        .update({
          goal: updates.goal,
          preferred_duration: updates.preferredDuration,
          preferred_intensity: updates.preferredIntensity,
          available_equipment: updates.availableEquipment,
          preferred_days: updates.preferredDays,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchPreferences();
      toast.success('Preferences updated successfully');
    } catch (err: any) {
      console.error('Error updating preferences:', err);
      toast.error(err.message || 'Failed to update preferences');
    }
  };

  return { preferences, loading, error, refetch: fetchPreferences, updatePreferences };
}

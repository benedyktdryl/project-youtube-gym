import { useCallback, useEffect, useState } from 'react';
import { supabase, type Database } from '../supabase';
import { useAuth } from '../auth-context';
import { toast } from 'sonner';

export interface ScheduledWorkout {
  id: string;
  userId: string;
  videoId: string;
  scheduledDate: string;
  isCompleted: boolean;
  completedAt: string | null;
  video?: {
    id: string;
    youtubeId: string;
    title: string;
    channelName: string;
    channelThumbnail: string;
    thumbnailUrl: string;
    duration: number;
    intensity: string;
    muscleGroups: string[];
    equipmentNeeded: string[];
  };
}

export function useScheduledWorkouts(startDate?: Date, endDate?: Date) {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<ScheduledWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkouts = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      let query = supabase
        .from('scheduled_workouts')
        .select(
          `
          *,
          video:workout_videos(*)
        `
        )
        .eq('user_id', user.id)
        .order('scheduled_date', { ascending: true });

      if (startDate) {
        query = query.gte(
          'scheduled_date',
          startDate.toISOString().split('T')[0]
        );
      }

      if (endDate) {
        query = query.lte(
          'scheduled_date',
          endDate.toISOString().split('T')[0]
        );
      }

      type ScheduledWithVideo =
        Database['public']['Tables']['scheduled_workouts']['Row'] & {
          video?: Database['public']['Tables']['workout_videos']['Row'] | null;
        };

      const { data, error } = await query.returns<ScheduledWithVideo[]>();

      if (error) throw error;

      const mappedWorkouts: ScheduledWorkout[] = (data ?? []).map((workout) => ({
        id: workout.id,
        userId: workout.user_id,
        videoId: workout.video_id,
        scheduledDate: workout.scheduled_date,
        isCompleted: workout.is_completed,
        completedAt: workout.completed_at,
        video: workout.video
          ? {
              id: workout.video.id,
              youtubeId: workout.video.youtube_id,
              title: workout.video.title,
              channelName: workout.video.channel_name,
              channelThumbnail: workout.video.channel_thumbnail,
              thumbnailUrl: workout.video.thumbnail_url,
              duration: workout.video.duration,
              intensity: workout.video.intensity,
              muscleGroups: workout.video.muscle_groups,
              equipmentNeeded: workout.video.equipment_needed,
            }
          : undefined,
      }));

      setWorkouts(mappedWorkouts);
      setError(null);
    } catch (error) {
      console.error('Error fetching scheduled workouts:', error);
      setError(error instanceof Error ? error.message : 'Failed to load workouts');
    } finally {
      setLoading(false);
    }
  }, [user, startDate, endDate]);

  useEffect(() => {
    if (user) {
      fetchWorkouts();
    } else {
      setLoading(false);
    }
  }, [user, fetchWorkouts]);

  const addWorkout = async (videoId: string, scheduledDate: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('scheduled_workouts')
        .insert({
          user_id: user.id,
          video_id: videoId,
          scheduled_date: scheduledDate,
          is_completed: false,
        });

      if (error) throw error;

      await fetchWorkouts();
      toast.success('Workout added to calendar');
    } catch (error) {
      console.error('Error adding workout:', error);
      const message =
        error instanceof Error ? error.message : 'Failed to add workout';
      toast.error(message);
    }
  };

  const toggleComplete = async (workoutId: string, isCompleted: boolean) => {
    try {
      const { error } = await supabase
        .from('scheduled_workouts')
        .update({
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
        })
        .eq('id', workoutId);

      if (error) throw error;

      await fetchWorkouts();
    } catch (error) {
      console.error('Error toggling workout completion:', error);
      const message =
        error instanceof Error ? error.message : 'Failed to update workout';
      toast.error(message);
    }
  };

  const removeWorkout = async (workoutId: string) => {
    try {
      const { error } = await supabase
        .from('scheduled_workouts')
        .delete()
        .eq('id', workoutId);

      if (error) throw error;

      await fetchWorkouts();
      toast.success('Workout removed from calendar');
    } catch (error) {
      console.error('Error removing workout:', error);
      const message =
        error instanceof Error ? error.message : 'Failed to remove workout';
      toast.error(message);
    }
  };

  return {
    workouts,
    loading,
    error,
    refetch: fetchWorkouts,
    addWorkout,
    toggleComplete,
    removeWorkout,
  };
}

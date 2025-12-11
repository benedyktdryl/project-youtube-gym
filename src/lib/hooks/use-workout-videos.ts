import { useCallback, useEffect, useState } from 'react';
import { supabase, type Database } from '../supabase';
import { WorkoutVideo, VideoExercise } from '../types';

export function useWorkoutVideos() {
  const [videos, setVideos] = useState<WorkoutVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workout_videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const typedVideos =
        (data as Database['public']['Tables']['workout_videos']['Row'][] | null) ??
        [];

      const mappedVideos: WorkoutVideo[] = typedVideos.map((video) => ({
        id: video.id,
        youtubeId: video.youtube_id,
        title: video.title,
        channelName: video.channel_name,
        channelThumbnail: video.channel_thumbnail,
        thumbnailUrl: video.thumbnail_url,
        duration: video.duration,
        intensity: video.intensity as 'low' | 'medium' | 'high',
        muscleGroups: video.muscle_groups,
        equipmentNeeded: video.equipment_needed,
        exercises:
          (video.exercises as unknown as VideoExercise[] | null) ?? [],
      }));

      setVideos(mappedVideos);
      setError(null);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to fetch videos'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, loading, error, refetch: fetchVideos };
}

export function useWorkoutVideo(id: string) {
  const [video, setVideo] = useState<WorkoutVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideo = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workout_videos')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      const typedVideo =
        (data as Database['public']['Tables']['workout_videos']['Row'] | null) ??
        null;

      if (typedVideo) {
        const mappedVideo: WorkoutVideo = {
          id: typedVideo.id,
          youtubeId: typedVideo.youtube_id,
          title: typedVideo.title,
          channelName: typedVideo.channel_name,
          channelThumbnail: typedVideo.channel_thumbnail,
          thumbnailUrl: typedVideo.thumbnail_url,
          duration: typedVideo.duration,
          intensity: typedVideo.intensity as 'low' | 'medium' | 'high',
          muscleGroups: typedVideo.muscle_groups,
          equipmentNeeded: typedVideo.equipment_needed,
          exercises:
            (typedVideo.exercises as unknown as VideoExercise[] | null) ?? [],
        };

        setVideo(mappedVideo);
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching video:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to fetch video'
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchVideo();
    }
  }, [id, fetchVideo]);

  return { video, loading, error, refetch: fetchVideo };
}

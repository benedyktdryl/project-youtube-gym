import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { WorkoutVideo } from '../types';

export function useWorkoutVideos() {
  const [videos, setVideos] = useState<WorkoutVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workout_videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedVideos: WorkoutVideo[] = (data || []).map((video) => ({
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
        exercises: video.exercises || [],
      }));

      setVideos(mappedVideos);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching videos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { videos, loading, error, refetch: fetchVideos };
}

export function useWorkoutVideo(id: string) {
  const [video, setVideo] = useState<WorkoutVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchVideo();
    }
  }, [id]);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workout_videos')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const mappedVideo: WorkoutVideo = {
          id: data.id,
          youtubeId: data.youtube_id,
          title: data.title,
          channelName: data.channel_name,
          channelThumbnail: data.channel_thumbnail,
          thumbnailUrl: data.thumbnail_url,
          duration: data.duration,
          intensity: data.intensity as 'low' | 'medium' | 'high',
          muscleGroups: data.muscle_groups,
          equipmentNeeded: data.equipment_needed,
          exercises: data.exercises || [],
        };

        setVideo(mappedVideo);
      }
      setError(null);
    } catch (err: any) {
      console.error('Error fetching video:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { video, loading, error, refetch: fetchVideo };
}

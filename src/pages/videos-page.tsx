import { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router';
import { VideoCard } from '@/components/videos/video-card';
import { VideoFilters } from '@/components/videos/video-filters';
import type { WorkoutVideo } from '@/lib/types';

export function VideosPage() {
  const { videos } = useLoaderData<{ videos: WorkoutVideo[] }>();
  const [filters, setFilters] = useState({
    search: '',
    muscleGroups: [] as string[],
    equipment: [] as string[],
    intensity: [] as string[],
    duration: [0, 60] as [number, number],
  });

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      if (
        filters.search &&
        !video.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.muscleGroups.length > 0 &&
        !filters.muscleGroups.some((group) => video.muscleGroups.includes(group))
      ) {
        return false;
      }

      if (
        filters.equipment.length > 0 &&
        !filters.equipment.every((eq) =>
          video.equipmentNeeded.includes(eq) ||
          (eq === 'none' && video.equipmentNeeded.length === 0)
        )
      ) {
        return false;
      }

      if (
        filters.intensity.length > 0 &&
        !filters.intensity.includes(video.intensity)
      ) {
        return false;
      }

      const videoDurationInMinutes = Math.floor(video.duration / 60);
      if (
        videoDurationInMinutes < filters.duration[0] ||
        videoDurationInMinutes > filters.duration[1]
      ) {
        return false;
      }

      return true;
    });
  }, [videos, filters]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Browse Videos</h1>
      </div>

      <p className="text-muted-foreground">
        Discover workout videos from top YouTube fitness creators, filtered to match your preferences.
      </p>

      <VideoFilters onFiltersChange={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              No videos match your filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

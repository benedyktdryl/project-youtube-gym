import { VideoCard } from "@/components/videos/video-card";
import { VideoFilters } from "@/components/videos/video-filters";
import type { WorkoutVideo } from "@/lib/types";
import type { VideoFilterState } from "@/routes/videos";
import { useCallback, useRef } from "react";
import { useLoaderData, useNavigation, useSearchParams } from "react-router";

function filtersToParams(f: VideoFilterState): URLSearchParams {
  const p = new URLSearchParams();
  if (f.search) p.set("q", f.search);
  if (f.muscleGroups.length) p.set("muscleGroups", f.muscleGroups.join(","));
  if (f.equipment.length) p.set("equipment", f.equipment.join(","));
  if (f.intensity.length) p.set("intensity", f.intensity.join(","));
  if (f.durationMin !== 0) p.set("durationMin", String(f.durationMin));
  if (f.durationMax !== 60) p.set("durationMax", String(f.durationMax));
  return p;
}

export function VideosPage() {
  const { videos, filters } = useLoaderData<{
    videos: WorkoutVideo[];
    filters: VideoFilterState;
  }>();
  const [, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const isFiltering = navigation.state === "loading";
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Filtering is server-side: writing the filter state into the URL re-runs
  // the loader, which queries Postgres with a `where`. Debounced so typing in
  // search doesn't fire a request per keystroke.
  const handleFiltersChange = useCallback(
    (next: VideoFilterState) => {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setSearchParams(filtersToParams(next), {
          replace: true,
          preventScrollReset: true,
        });
      }, 300);
    },
    [setSearchParams],
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Browse Videos</h1>
      </div>

      <p className="text-muted-foreground">
        Discover workout videos from top YouTube fitness creators, filtered to match your
        preferences.
      </p>

      <VideoFilters initialFilters={filters} onFiltersChange={handleFiltersChange} />

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity ${
          isFiltering ? "opacity-50" : "opacity-100"
        }`}
      >
        {videos.length > 0 ? (
          videos.map((video) => <VideoCard key={video.id} video={video} />)
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

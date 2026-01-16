import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/videos/video-player";
import type { WorkoutVideo } from "@/lib/types";
import { Check, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useFetcher, useLoaderData } from "react-router";
import { toast } from "sonner";

export function VideoDetailPage() {
  const { video } = useLoaderData<{ video: WorkoutVideo }>();
  const fetcher = useFetcher();
  const [isCompleted, setIsCompleted] = useState(video.scheduledCompleted ?? false);

  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold mb-4">Video not found</h1>
        <p className="text-muted-foreground mb-6">
          The video you're looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/videos">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to videos
          </Link>
        </Button>
      </div>
    );
  }

  useEffect(() => {
    if (fetcher.data?.ok) {
      setIsCompleted(true);
      toast.success("Workout marked as completed");
    } else if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.data]);

  const showCompleteCta = Boolean(video.scheduledId);

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to="/videos">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold truncate">Video Details</h1>
      </div>

      {showCompleteCta && (
        <div className="flex items-center gap-2">
          <fetcher.Form method="post" className="flex items-center gap-2">
            <input type="hidden" name="intent" value="complete-scheduled" />
            <input type="hidden" name="scheduledId" value={video.scheduledId} />
            <Button type="submit" disabled={isCompleted || fetcher.state !== "idle"}>
              {isCompleted ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                "Mark as completed"
              )}
            </Button>
          </fetcher.Form>
          {video.scheduledDate && (
            <p className="text-sm text-muted-foreground">
              Scheduled for {new Date(video.scheduledDate).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      <VideoPlayer video={video} />
    </div>
  );
}
